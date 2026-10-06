import * as React from 'react';
import { Box, Pane, Text, useTheme } from '@anthropic/ink';
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../../services/analytics/index.js';
import type { LocalJSXCommandCall } from '../../types/command.js';
import { ThemePicker } from '../../components/ThemePicker.js';
import { getGlobalConfig, saveCurrentProjectConfig, saveGlobalConfig } from '../../utils/config.js';
import type { ThemeSetting } from '../../utils/theme.js';

/**
 * /onboarding [subcommand]
 *
 * User-facing slash command that re-runs the first-run setup flow. The
 * official v2.1.123 binary advertises `/onboarding` and emits
 * `tengu_onboarding_step` telemetry; this command exposes a clean entry
 * point for re-running individual steps after initial setup.
 *
 * Subcommands:
 *   (none) | full | reset  — clear `hasCompletedOnboarding` so the next
 *                            REPL launch re-runs the full flow, then exit
 *                            with instructions.
 *   theme                  — render the theme picker inline.
 *   trust                  — clear the workspace trust acceptance and
 *                            instruct the user to restart.
 *   model                  — defer to /model (cannot mid-call suspend
 *                            into a separate command's Ink picker; print
 *                            instructions instead).
 *   mcp                    — print MCP setup hints (delegates to /mcp).
 *   status                 — show current onboarding state (theme,
 *                            completion flag, trust, last version).
 */
export type OnboardingSubcommand = 'full' | 'theme' | 'trust' | 'model' | 'mcp' | 'status';

const SUBCOMMANDS: ReadonlySet<OnboardingSubcommand> = new Set(['full', 'theme', 'trust', 'model', 'mcp', 'status']);

function meta(s: string): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
  return s as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS;
}

export function parseSubcommand(args: string): {
  sub: OnboardingSubcommand;
  unknownArg?: string;
} {
  const trimmed = args.trim().toLowerCase();
  if (trimmed === '' || trimmed === 'reset') {
    return { sub: 'full' };
  }
  if (SUBCOMMANDS.has(trimmed as OnboardingSubcommand)) {
    return { sub: trimmed as OnboardingSubcommand };
  }
  return { sub: 'full', unknownArg: trimmed };
}

function ThemeSubcommand({ onDone }: { onDone: (msg: string) => void }): React.ReactNode {
  const [, setTheme] = useTheme();
  return (
    <Pane color="permission">
      <ThemePicker
        onThemeSelect={(setting: ThemeSetting) => {
          setTheme(setting);
          logEvent('tengu_onboarding_step', { stepId: meta('theme') });
          onDone(`主题已设为 ${setting}。`);
        }}
        onCancel={() => onDone('主题选择器已关闭。')}
        skipExitHandling={true}
      />
    </Pane>
  );
}

function StatusView({
  theme,
  hasCompletedOnboarding,
  lastOnboardingVersion,
}: {
  theme: string;
  hasCompletedOnboarding: boolean;
  lastOnboardingVersion: string;
}): React.ReactNode {
  return (
    <Box flexDirection="column" paddingLeft={1}>
      <Text bold>引导状态</Text>
      <Text>
        - 主题： <Text bold>{theme}</Text>
      </Text>
      <Text>
        - 引导已完成： {' '}
        <Text bold color={hasCompletedOnboarding ? 'success' : 'warning'}>
          {hasCompletedOnboarding ? '是' : '否'}
        </Text>
      </Text>
      <Text>
        - 上次引导版本： <Text bold>{lastOnboardingVersion}</Text>
      </Text>
      <Text dimColor>
        运行 /onboarding（不带参数）可重新执行完整流程，或运行 /onboarding theme | trust | model | mcp 执行单个步骤。
      </Text>
    </Box>
  );
}

export const callOnboarding: LocalJSXCommandCall = async (onDone, _context, args) => {
  const { sub, unknownArg } = parseSubcommand(args);
  logEvent('tengu_onboarding_step', { stepId: meta(`slash_${sub}`) });

  if (unknownArg !== undefined) {
    onDone(
      `Unknown /onboarding subcommand: \`${unknownArg}\`.\n` + `有效值：full | theme | trust | model | mcp | status`,
      { display: 'system' },
    );
    return null;
  }

  if (sub === 'theme') {
    return <ThemeSubcommand onDone={msg => onDone(msg)} />;
  }

  if (sub === 'trust') {
    saveCurrentProjectConfig(current => ({
      ...current,
      hasTrustDialogAccepted: false,
    }));
    onDone(
      '已清除当前项目的工作区信任。' + '信任确认对话框将在下次启动 `claude` 时出现。',
      { display: 'system' },
    );
    return null;
  }

  if (sub === 'model') {
    onDone(
      'Run `/model` to pick the AI model. ' +
        'Onboarding does not own the model picker; this entry exists for ' +
        'discoverability only.',
      { display: 'system' },
    );
    return null;
  }

  if (sub === 'mcp') {
    onDone(
      'MCP 服务器配置：\n' +
        '  - `/mcp` — 列出已配置的 MCP 服务器\n' +
        '  - `claude mcp add <name> <command>` — 添加服务器（在你的 shell 中执行）\n' +
        '  - `claude mcp remove <name>` — 移除服务器\n' +
        'Servers also load from `.mcp.json` in the workspace and from ' +
        '`~/.claude.json` globally.',
      { display: 'system' },
    );
    return null;
  }

  if (sub === 'status') {
    const cfg = getGlobalConfig();
    return (
      <StatusView
        theme={cfg.theme ?? '（未设置）'}
        hasCompletedOnboarding={cfg.hasCompletedOnboarding === true}
        lastOnboardingVersion={cfg.lastOnboardingVersion ?? '（未设置）'}
      />
    );
  }

  // sub === 'full'
  // Clearing `hasCompletedOnboarding` causes `showSetupScreens()` (in
  // src/interactiveHelpers.tsx) to render the full Onboarding component
  // on the next launch. We cannot render <Onboarding /> mid-REPL because
  // it owns terminal-setup detection, OAuth flow, and final redirect to
  // the prompt — not safe to mount inside an active REPL session.
  saveGlobalConfig(current => ({
    ...current,
    hasCompletedOnboarding: false,
  }));
  onDone(
    'Onboarding flag cleared. The full first-run setup ' +
      '(theme, OAuth/API key, security notes, terminal-setup) ' +
      'will run on the next `claude` launch.\n\n' +
      '如需在本次会话中单独执行各个步骤，可使用：\n' +
      '  /onboarding theme   — 就地重新选择主题\n' +
      '  /onboarding trust   — 在下次启动时重新确认工作区信任\n' +
      '  /onboarding model   — 打开 /model 选择器\n' +
      '  /onboarding mcp     — 显示 MCP 配置提示\n' +
      '  /onboarding status  — 显示当前引导状态',
    { display: 'system' },
  );
  return null;
};
