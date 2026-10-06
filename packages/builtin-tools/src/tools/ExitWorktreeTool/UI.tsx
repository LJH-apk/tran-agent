import * as React from 'react';
import { Box, Text } from '@anthropic/ink';
import type { ToolProgressData } from 'src/Tool.js';
import type { ProgressMessage } from 'src/types/message.js';
import type { ThemeName } from 'src/utils/theme.js';
import type { Output } from './ExitWorktreeTool.js';

export function renderToolUseMessage(): React.ReactNode {
  return '正在退出工作树…';
}

export function renderToolResultMessage(
  output: Output,
  _progressMessagesForMessage: ProgressMessage<ToolProgressData>[],
  _options: { theme: ThemeName },
): React.ReactNode {
  if (!output) return null;
  const actionLabel = output.action === 'keep' ? '已保留工作树' : '已删除工作树';
  return (
    <Box flexDirection="column">
      <Text>
        {actionLabel}
        {output.worktreeBranch ? (
          <>
            {' '}
            （分支： <Text bold>{output.worktreeBranch}</Text>）
          </>
        ) : null}
      </Text>
      <Text dimColor>已返回 {output.originalCwd}</Text>
    </Box>
  );
}
