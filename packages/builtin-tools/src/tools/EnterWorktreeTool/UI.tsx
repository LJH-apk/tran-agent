import * as React from 'react';
import { Box, Text } from '@anthropic/ink';
import type { ToolProgressData } from 'src/Tool.js';
import type { ProgressMessage } from 'src/types/message.js';
import type { ThemeName } from 'src/utils/theme.js';
import type { Output } from './EnterWorktreeTool.js';

export function renderToolUseMessage(): React.ReactNode {
  return '正在创建工作树…';
}

export function renderToolResultMessage(
  output: Output,
  _progressMessagesForMessage: ProgressMessage<ToolProgressData>[],
  _options: { theme: ThemeName },
): React.ReactNode {
  if (!output) return null;
  return (
    <Box flexDirection="column">
      <Text>
        已切换至工作树
        {output.worktreeBranch ? (
          <>
            {' '}
            分支： <Text bold>{output.worktreeBranch}</Text>
          </>
        ) : null}
      </Text>
      <Text dimColor>{output.worktreePath}</Text>
    </Box>
  );
}
