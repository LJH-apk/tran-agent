import React from 'react';
import { Box, color, Link, Text, useTheme, useTabHeaderFocus } from '@anthropic/ink';
import type { CommandResultDisplay } from '../../types/command.js';
import { SandboxManager } from '../../utils/sandbox/sandbox-adapter.js';
import { Select } from '../CustomSelect/select.js';

type Props = {
  onComplete: (result?: string, options?: { display?: CommandResultDisplay }) => void;
};

type OverrideMode = 'open' | 'closed';

export function SandboxOverridesTab({ onComplete }: Props): React.ReactNode {
  const isEnabled = SandboxManager.isSandboxingEnabled();
  const isLocked = SandboxManager.areSandboxSettingsLockedByPolicy();
  const currentAllowUnsandboxed = SandboxManager.areUnsandboxedCommandsAllowed();

  if (!isEnabled) {
    return (
      <Box flexDirection="column" paddingY={1}>
        <Text color="subtle">沙箱未启用。请先启用沙箱以配置覆盖设置。</Text>
      </Box>
    );
  }

  if (isLocked) {
    return (
      <Box flexDirection="column" paddingY={1}>
        <Text color="subtle">
          覆盖设置由更高优先级的配置管理，无法在本地修改。
        </Text>
        <Box marginTop={1}>
          <Text dimColor>
            当前设置： {currentAllowUnsandboxed ? '允许沙箱外回退' : '严格沙箱模式'}
          </Text>
        </Box>
      </Box>
    );
  }

  return <OverridesSelect onComplete={onComplete} currentMode={currentAllowUnsandboxed ? 'open' : 'closed'} />;
}

// Split so useTabHeaderFocus() only runs when the Select renders. Calling it
// above the early returns registers a down-arrow opt-in even when we return
// static text — pressing ↓ then blurs the header with no way back.
function OverridesSelect({ onComplete, currentMode }: Props & { currentMode: OverrideMode }): React.ReactNode {
  const [theme] = useTheme();
  const { headerFocused, focusHeader } = useTabHeaderFocus();
  const currentIndicator = color('success', theme)(`（当前）`);

  const options = [
    {
      label: currentMode === 'open' ? `允许沙箱外回退 ${currentIndicator}` : 'Allow unsandboxed fallback',
      value: 'open',
    },
    {
      label: currentMode === 'closed' ? `严格沙箱模式 ${currentIndicator}` : 'Strict sandbox mode',
      value: 'closed',
    },
  ];

  async function handleSelect(value: string) {
    const mode = value as OverrideMode;

    await SandboxManager.setSandboxSettings({
      allowUnsandboxedCommands: mode === 'open',
    });

    const message =
      mode === 'open'
        ? '✓ 已允许沙箱外回退 - 必要时命令可在沙箱外运行'
        : '✓ 严格沙箱模式 - 所有命令必须在沙箱中运行，或通过 `excludedCommands` 选项排除';

    onComplete(message);
  }

  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text bold>配置覆盖项：</Text>
      </Box>
      <Select
        options={options}
        onChange={handleSelect}
        onCancel={() => onComplete(undefined, { display: 'skip' })}
        onUpFromFirstItem={focusHeader}
        isDisabled={headerFocused}
      />
      <Box flexDirection="column" marginTop={1} gap={1}>
        <Text dimColor>
          <Text bold dimColor>
            允许沙箱外回退：
          </Text>{' '}
          当命令因沙箱限制而失败时，Claude 可以用 dangerouslyDisableSandbox 重试，在沙箱外运行（回退为默认权限）。
        </Text>
        <Text dimColor>
          <Text bold dimColor>
            严格沙箱模式：
          </Text>{' '}
          模型调用的所有 bash 命令都必须在沙箱中运行，除非它们被显式列入 excludedCommands。
        </Text>
        <Text dimColor>
          了解更多：{' '}
          <Link url="https://code.claude.com/docs/en/sandboxing#configure-sandboxing">
            code.claude.com/docs/en/sandboxing#configure-sandboxing
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
