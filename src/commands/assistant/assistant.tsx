import * as React from 'react';
import { useState } from 'react';
import { resolve } from 'path';
import { Box, Text } from '@anthropic/ink';
import { Dialog } from '../../components/design-system/Dialog.js';
import { ListItem } from '../../components/design-system/ListItem.js';
import { useRegisterOverlay } from '../../context/overlayContext.js';
import { useKeybindings } from '../../keybindings/useKeybinding.js';
import { findGitRoot } from '../../utils/git.js';
import { buildCliLaunch, spawnCli } from '../../utils/cliLaunch.js';
import { getKairosActive, setKairosActive } from '../../bootstrap/state.js';
import type { LocalJSXCommandContext } from '../../commands.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import type { AppState } from '../../state/AppState.js';

/**
 * Compute the default directory for assistant daemon installation.
 * Prefers git root of cwd; falls back to cwd itself.
 */
export async function computeDefaultInstallDir(): Promise<string> {
  const cwd = process.cwd();
  const gitRoot = findGitRoot(cwd);
  return gitRoot || resolve(cwd);
}

interface WizardProps {
  defaultDir: string;
  onInstalled: (dir: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

/**
 * Install wizard for assistant mode. Shown when `claude assistant` finds
 * zero CCR sessions. Guides the user to start a daemon that registers
 * a bridge → CCR cloud session.
 *
 * After installation, main.tsx tells the user to run `claude assistant`
 * again in a few seconds (daemon needs time to register the bridge session).
 */
export function NewInstallWizard({ defaultDir, onInstalled, onCancel, onError }: WizardProps): React.ReactNode {
  useRegisterOverlay('assistant-install-wizard');
  const [focusIndex, setFocusIndex] = useState(0);
  const [starting, setStarting] = useState(false);

  useKeybindings(
    {
      'select:next': () => setFocusIndex(i => (i + 1) % 2),
      'select:previous': () => setFocusIndex(i => (i - 1 + 2) % 2),
      'select:accept': () => {
        if (focusIndex === 0) {
          startDaemon();
        } else {
          onCancel();
        }
      },
    },
    { context: 'Select' },
  );

  function startDaemon(): void {
    if (starting) return;
    setStarting(true);

    const dir = defaultDir || resolve('.');

    try {
      const launch = buildCliLaunch(['daemon', 'start', `--dir=${dir}`]);

      const child = spawnCli(launch, {
        cwd: dir,
        stdio: 'ignore',
        detached: true,
      });

      child.unref();

      child.on('error', err => {
        onError(`启动守护进程失败：${err.message}`);
      });

      // Give the daemon a moment to initialize, then report success.
      // The daemon still needs several more seconds to register the bridge
      // and create a CCR session — main.tsx will tell the user to reconnect.
      setTimeout(() => {
        onInstalled(dir);
      }, 1500);
    } catch (err) {
      onError(`启动守护进程失败：${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (starting) {
    return (
      <Dialog title="助手设置" onCancel={onCancel} hideInputGuide>
        <Text>Starting daemon in {defaultDir}...</Text>
      </Dialog>
    );
  }

  return (
    <Dialog title="助手设置" onCancel={onCancel} hideInputGuide>
      <Box flexDirection="column" gap={1}>
        <Text>未找到活动的助手会话。</Text>
        <Text>
          Start a daemon in <Text bold>{defaultDir || '.'}</Text> to create a cloud session?
        </Text>
        <Box flexDirection="column">
          <ListItem isFocused={focusIndex === 0}>
            <Text>启动助手守护进程</Text>
          </ListItem>
          <ListItem isFocused={focusIndex === 1}>
            <Text>取消</Text>
          </ListItem>
        </Box>
        <Text dimColor>回车选择 · Esc 取消</Text>
      </Box>
    </Dialog>
  );
}

/**
 * /assistant command implementation.
 *
 * First invocation activates KAIROS (sets kairosActive, enables brief
 * and proactive tools). Subsequent invocations toggle the assistant panel.
 */
export async function call(
  onDone: LocalJSXCommandOnDone,
  context: LocalJSXCommandContext,
  _args: string,
): Promise<React.ReactNode> {
  const { setAppState, getAppState } = context;

  // First invocation: activate KAIROS
  if (!getKairosActive()) {
    setKairosActive(true);
    setAppState(
      (prev: AppState) =>
        ({
          ...prev,
          kairosEnabled: true,
          assistantPanelVisible: true,
        }) as AppState,
    );
    onDone('KAIROS 助手模式已启用。', { display: 'system' });
    return null;
  }

  // Subsequent invocations: toggle panel visibility
  const current = getAppState();
  const isVisible = (current as Record<string, unknown>).assistantPanelVisible;

  if (isVisible) {
    setAppState(
      (prev: AppState) =>
        ({
          ...prev,
          assistantPanelVisible: false,
        }) as AppState,
    );
    onDone('助手面板已隐藏。', { display: 'system' });
  } else {
    setAppState(
      (prev: AppState) =>
        ({
          ...prev,
          assistantPanelVisible: true,
        }) as AppState,
    );
    onDone('助手面板已打开。', { display: 'system' });
  }

  return null;
}
