import React from 'react';
import { Text } from '@anthropic/ink';
import { Select } from './CustomSelect/index.js';
import { Dialog } from '@anthropic/ink';

export type ChannelDowngradeChoice = 'downgrade' | 'stay' | 'cancel';

type Props = {
  currentVersion: string;
  onChoice: (choice: ChannelDowngradeChoice) => void;
};

/**
 * Dialog shown when switching from latest to stable channel.
 * Allows user to choose whether to downgrade or stay on current version.
 */
export function ChannelDowngradeDialog({ currentVersion, onChoice }: Props): React.ReactNode {
  function handleSelect(value: ChannelDowngradeChoice): void {
    onChoice(value);
  }

  function handleCancel(): void {
    onChoice('cancel');
  }

  return (
    <Dialog title="切换到稳定版通道" onCancel={handleCancel} color="permission" hideBorder hideInputGuide>
      <Text>
        The stable channel may have an older version than what you&apos;re currently running ({currentVersion}).
      </Text>
      <Text dimColor>你想如何处理？</Text>
      <Select
        options={[
          {
            label: '允许可能降级到稳定版',
            value: 'downgrade' as ChannelDowngradeChoice,
          },
          {
            label: `保留当前版本（${currentVersion}），直到稳定版追上`,
            value: 'stay' as ChannelDowngradeChoice,
          },
        ]}
        onChange={handleSelect}
      />
    </Dialog>
  );
}
