import React from 'react';
import { Box, color, Link, Text, useTheme, Pane, Tab, Tabs, useTabHeaderFocus } from '@anthropic/ink';
import { useKeybindings } from '../../keybindings/useKeybinding.js';
import type { CommandResultDisplay } from '../../types/command.js';
import type { SandboxDependencyCheck } from '../../utils/sandbox/sandbox-adapter.js';
import { SandboxManager } from '../../utils/sandbox/sandbox-adapter.js';
import { getSettings_DEPRECATED } from '../../utils/settings/settings.js';
import { Select } from '../CustomSelect/select.js';
import { SandboxConfigTab } from './SandboxConfigTab.js';
import { SandboxDependenciesTab } from './SandboxDependenciesTab.js';
import { SandboxOverridesTab } from './SandboxOverridesTab.js';

type Props = {
  onComplete: (result?: string, options?: { display?: CommandResultDisplay }) => void;
  depCheck: SandboxDependencyCheck;
};

type SandboxMode = 'auto-allow' | 'regular' | 'disabled';

export function SandboxSettings({ onComplete, depCheck }: Props): React.ReactNode {
  const [theme] = useTheme();
  const currentEnabled = SandboxManager.isSandboxingEnabled();
  const currentAutoAllow = SandboxManager.isAutoAllowBashIfSandboxedEnabled();
  const hasWarnings = depCheck.warnings.length > 0;
  const settings = getSettings_DEPRECATED();
  const allowAllUnixSockets = settings.sandbox?.network?.allowAllUnixSockets;
  // Show warning if seccomp missing AND user hasn't allowed all unix sockets
  const showSocketWarning = hasWarnings && !allowAllUnixSockets;

  // Determine current mode
  const getCurrentMode = (): SandboxMode => {
    if (!currentEnabled) return 'disabled';
    if (currentAutoAllow) return 'auto-allow';
    return 'regular';
  };

  const currentMode = getCurrentMode();
  const currentIndicator = color('success', theme)(`（当前）`);

  const options = [
    {
      label:
        currentMode === 'auto-allow'
          ? `沙箱运行 BashTool，自动放行 ${currentIndicator}`
          : '沙箱运行 BashTool，自动放行',
      value: 'auto-allow',
    },
    {
      label:
        currentMode === 'regular'
          ? `沙箱运行 BashTool，常规权限 ${currentIndicator}`
          : '沙箱运行 BashTool，常规权限',
      value: 'regular',
    },
    {
      label: currentMode === 'disabled' ? `不使用沙箱 ${currentIndicator}` : 'No Sandbox',
      value: 'disabled',
    },
  ];

  async function handleSelect(value: string) {
    const mode = value as SandboxMode;

    switch (mode) {
      case 'auto-allow':
        await SandboxManager.setSandboxSettings({
          enabled: true,
          autoAllowBashIfSandboxed: true,
        });
        onComplete('✓ 沙箱已启用，bash 命令自动放行');
        break;
      case 'regular':
        await SandboxManager.setSandboxSettings({
          enabled: true,
          autoAllowBashIfSandboxed: false,
        });
        onComplete('✓ 沙箱已启用，bash 使用常规权限');
        break;
      case 'disabled':
        await SandboxManager.setSandboxSettings({
          enabled: false,
          autoAllowBashIfSandboxed: false,
        });
        onComplete('○ 沙箱已禁用');
        break;
    }
  }

  useKeybindings(
    {
      'confirm:no': () => onComplete(undefined, { display: 'skip' }),
    },
    { context: 'Settings' },
  );

  const modeTab = (
    <Tab key="mode" title="模式">
      <SandboxModeTab
        showSocketWarning={showSocketWarning}
        options={options}
        onSelect={handleSelect}
        onComplete={onComplete}
      />
    </Tab>
  );

  const overridesTab = (
    <Tab key="overrides" title="覆盖设置">
      <SandboxOverridesTab onComplete={onComplete} />
    </Tab>
  );

  const configTab = (
    <Tab key="config" title="配置">
      <SandboxConfigTab />
    </Tab>
  );

  const hasErrors = depCheck.errors.length > 0;

  // If required deps missing, only show Dependencies tab
  // If only optional deps missing, show all tabs
  const tabs = hasErrors
    ? [
        <Tab key="dependencies" title="依赖">
          <SandboxDependenciesTab depCheck={depCheck} />
        </Tab>,
      ]
    : [
        modeTab,
        ...(hasWarnings
          ? [
              <Tab key="dependencies" title="依赖">
                <SandboxDependenciesTab depCheck={depCheck} />
              </Tab>,
            ]
          : []),
        overridesTab,
        configTab,
      ];

  return (
    <Pane color="permission">
      <Tabs title="沙箱：" color="permission" defaultTab="Mode">
        {tabs}
      </Tabs>
    </Pane>
  );
}

function SandboxModeTab({
  showSocketWarning,
  options,
  onSelect,
  onComplete,
}: {
  showSocketWarning: boolean;
  options: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  onComplete: Props['onComplete'];
}): React.ReactNode {
  const { headerFocused, focusHeader } = useTabHeaderFocus();
  return (
    <Box flexDirection="column" paddingY={1}>
      {showSocketWarning && (
        <Box marginBottom={1}>
          <Text color="warning">无法阻止 unix 域套接字（见「依赖」标签页）</Text>
        </Box>
      )}
      <Box marginBottom={1}>
        <Text bold>配置模式：</Text>
      </Box>
      <Select
        options={options}
        onChange={onSelect}
        onCancel={() => onComplete(undefined, { display: 'skip' })}
        onUpFromFirstItem={focusHeader}
        isDisabled={headerFocused}
      />
      <Box flexDirection="column" marginTop={1} gap={1}>
        <Text dimColor>
          <Text bold dimColor>
            自动放行模式：
          </Text>{' '}
          命令将自动尝试在沙箱中运行；若尝试在沙箱外运行，则回退为常规权限。显式的询问/拒绝规则始终生效。
        </Text>
        <Text dimColor>
          了解更多： <Link url="https://code.claude.com/docs/en/sandboxing">code.claude.com/docs/en/sandboxing</Link>
        </Text>
      </Box>
    </Box>
  );
}
