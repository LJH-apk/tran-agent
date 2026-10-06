import { type ReactNode, useCallback, useState } from 'react';
import { Box, Byline, KeyboardShortcutHint, Text } from '@anthropic/ink';
import { useKeybinding } from '../../../../keybindings/useKeybinding.js';
import { editPromptInEditor } from '../../../../utils/promptEditor.js';
import { ConfigurableShortcutHint } from '../../../ConfigurableShortcutHint.js';
import TextInput from '../../../TextInput.js';
import { useWizard } from '../../../wizard/index.js';
import { WizardDialogLayout } from '../../../wizard/WizardDialogLayout.js';
import type { AgentWizardData } from '../types.js';

export function PromptStep(): ReactNode {
  const { goNext, goBack, updateWizardData, wizardData } = useWizard<AgentWizardData>();
  const [systemPrompt, setSystemPrompt] = useState(wizardData.systemPrompt || '');
  const [cursorOffset, setCursorOffset] = useState(systemPrompt.length);
  const [error, setError] = useState<string | null>(null);

  // Handle escape key - use Settings context so 'n' key doesn't cancel (allows typing 'n' in input)
  useKeybinding('confirm:no', goBack, { context: 'Settings' });

  const handleExternalEditor = useCallback(async () => {
    const result = await editPromptInEditor(systemPrompt);
    if (result.content !== null) {
      setSystemPrompt(result.content);
      setCursorOffset(result.content.length);
    }
  }, [systemPrompt]);

  useKeybinding('chat:externalEditor', handleExternalEditor, {
    context: 'Chat',
  });

  const handleSubmit = (): void => {
    const trimmedPrompt = systemPrompt.trim();
    if (!trimmedPrompt) {
      setError('必须填写系统提示词');
      return;
    }

    setError(null);
    updateWizardData({ systemPrompt: trimmedPrompt });
    goNext();
  };

  return (
    <WizardDialogLayout
      subtitle="系统提示词"
      footerText={
        <Byline>
          <KeyboardShortcutHint shortcut="Type" action="输入文本" />
          <KeyboardShortcutHint shortcut="Enter" action="继续" />
          <ConfigurableShortcutHint
            action="chat:externalEditor"
            context="Chat"
            fallback="ctrl+g"
            description="在编辑器中打开"
          />
          <ConfigurableShortcutHint action="confirm:no" context="Settings" fallback="Esc" description="返回" />
        </Byline>
      }
    >
      <Box flexDirection="column">
        <Text>输入你的智能体的系统提示词：</Text>
        <Text dimColor>内容越全面效果越好</Text>

        <Box marginTop={1}>
          <TextInput
            value={systemPrompt}
            onChange={setSystemPrompt}
            onSubmit={handleSubmit}
            placeholder="你是一位乐于助人的代码审查员……"
            columns={80}
            cursorOffset={cursorOffset}
            onChangeCursorOffset={setCursorOffset}
            focus
            showCursor
          />
        </Box>

        {error && (
          <Box marginTop={1}>
            <Text color="error">{error}</Text>
          </Box>
        )}
      </Box>
    </WizardDialogLayout>
  );
}
