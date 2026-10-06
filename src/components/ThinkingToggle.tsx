import * as React from 'react';
import { useState } from 'react';
import { useExitOnCtrlCDWithKeybindings } from 'src/hooks/useExitOnCtrlCDWithKeybindings.js';
import { Box, Text } from '@anthropic/ink';
import { useKeybinding } from '../keybindings/useKeybinding.js';
import { ConfigurableShortcutHint } from './ConfigurableShortcutHint.js';
import { Select } from './CustomSelect/index.js';
import { Byline, KeyboardShortcutHint, Pane } from '@anthropic/ink';

export type Props = {
  currentValue: boolean;
  onSelect: (enabled: boolean) => void;
  onCancel?: () => void;
  isMidConversation?: boolean;
};

export function ThinkingToggle({ currentValue, onSelect, onCancel, isMidConversation }: Props): React.ReactNode {
  const exitState = useExitOnCtrlCDWithKeybindings();
  const [confirmationPending, setConfirmationPending] = useState<boolean | null>(null);

  const options = [
    {
      value: 'true',
      label: '启用',
      description: 'Claude 会先思考再回复',
    },
    {
      value: 'false',
      label: '禁用',
      description: 'Claude 将在不进行扩展思考的情况下回复',
    },
  ];

  // Use configurable keybinding for ESC to cancel/go back
  useKeybinding(
    'confirm:no',
    () => {
      if (confirmationPending !== null) {
        setConfirmationPending(null);
      } else {
        onCancel?.();
      }
    },
    { context: 'Confirmation' },
  );

  // Use configurable keybinding for Enter to confirm in confirmation mode
  useKeybinding(
    'confirm:yes',
    () => {
      if (confirmationPending !== null) {
        onSelect(confirmationPending);
      }
    },
    { context: 'Confirmation', isActive: confirmationPending !== null },
  );

  function handleSelectChange(value: string): void {
    const selected = value === 'true';
    if (isMidConversation && selected !== currentValue) {
      setConfirmationPending(selected);
    } else {
      onSelect(selected);
    }
  }

  return (
    <Pane color="permission">
      <Box flexDirection="column">
        <Box marginBottom={1} flexDirection="column">
          <Text color="remember" bold>
            切换思考模式
          </Text>
          <Text dimColor>为本会话启用或禁用思考。</Text>
        </Box>

        {confirmationPending !== null ? (
          <Box flexDirection="column" marginBottom={1} gap={1}>
            <Text color="warning">
              在对话中途更改思考模式会增加延迟，并可能降低质量。为获得最佳效果，请在会话开始时设置。
            </Text>
            <Text color="warning">是否继续？</Text>
          </Box>
        ) : (
          <Box flexDirection="column" marginBottom={1}>
            <Select
              defaultValue={currentValue ? 'true' : 'false'}
              defaultFocusValue={currentValue ? 'true' : 'false'}
              options={options}
              onChange={handleSelectChange}
              onCancel={onCancel ?? (() => {})}
              visibleOptionCount={2}
            />
          </Box>
        )}
      </Box>
      <Text dimColor italic>
        {exitState.pending ? (
          <>再按一次 {exitState.keyName} 退出</>
        ) : confirmationPending !== null ? (
          <Byline>
            <KeyboardShortcutHint shortcut="Enter" action="确认" />
            <ConfigurableShortcutHint action="confirm:no" context="Confirmation" fallback="Esc" description="取消" />
          </Byline>
        ) : (
          <Byline>
            <KeyboardShortcutHint shortcut="Enter" action="确认" />
            <ConfigurableShortcutHint action="confirm:no" context="Confirmation" fallback="Esc" description="退出" />
          </Byline>
        )}
      </Text>
    </Pane>
  );
}
