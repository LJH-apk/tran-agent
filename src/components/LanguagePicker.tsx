import figures from 'figures';
import React, { useState } from 'react';
import { Box, Text } from '@anthropic/ink';
import { useKeybinding } from '../keybindings/useKeybinding.js';
import TextInput from './TextInput.js';

type Props = {
  initialLanguage: string | undefined;
  onComplete: (language: string | undefined) => void;
  onCancel: () => void;
};

export function LanguagePicker({ initialLanguage, onComplete, onCancel }: Props): React.ReactNode {
  const [language, setLanguage] = useState(initialLanguage);
  const [cursorOffset, setCursorOffset] = useState((initialLanguage ?? '').length);

  // Use configurable keybinding for ESC to cancel
  // Use Settings context so 'n' key doesn't trigger cancel (allows typing 'n' in input)
  useKeybinding('confirm:no', onCancel, { context: 'Settings' });

  function handleSubmit(): void {
    const trimmed = language?.trim();
    onComplete(trimmed || undefined);
  }

  return (
    <Box flexDirection="column" gap={1}>
      <Text>请输入你偏好的回复与语音语言：</Text>
      <Box flexDirection="row" gap={1}>
        <Text>{figures.pointer}</Text>
        <TextInput
          value={language ?? ''}
          onChange={setLanguage}
          onSubmit={handleSubmit}
          focus={true}
          showCursor={true}
          placeholder={`e.g., Japanese, 日本語, Español${figures.ellipsis}`}
          columns={60}
          cursorOffset={cursorOffset}
          onChangeCursorOffset={setCursorOffset}
        />
      </Box>
      <Text dimColor>留空则使用默认（English）</Text>
    </Box>
  );
}
