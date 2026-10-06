import React from 'react';
import { Text, Dialog } from '@anthropic/ink';
import type { ValidationError } from '../utils/settings/validation.js';
import { Select } from './CustomSelect/index.js';
import { ValidationErrorsList } from './ValidationErrorsList.js';

type Props = {
  settingsErrors: ValidationError[];
  onContinue: () => void;
  onExit: () => void;
};

/**
 * Dialog shown when settings files have validation errors.
 * User must choose to continue (skipping invalid files) or exit to fix them.
 */
export function InvalidSettingsDialog({ settingsErrors, onContinue, onExit }: Props): React.ReactNode {
  function handleSelect(value: string): void {
    if (value === 'exit') {
      onExit();
    } else {
      onContinue();
    }
  }

  return (
    <Dialog title="设置错误" onCancel={onExit} color="warning">
      <ValidationErrorsList errors={settingsErrors} />
      <Text dimColor>含错误的文件会被整体跳过，而不只是跳过无效的设置项。</Text>
      <Select
        options={[
          { label: '退出并手动修复', value: 'exit' },
          {
            label: '忽略这些设置并继续',
            value: 'continue',
          },
        ]}
        onChange={handleSelect}
      />
    </Dialog>
  );
}
