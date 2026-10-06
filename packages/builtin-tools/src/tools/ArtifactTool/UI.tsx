import * as React from 'react';
import { Box, Link, Text } from '@anthropic/ink';
import type { ToolProgressData } from 'src/Tool.js';
import type { ProgressMessage } from 'src/types/message.js';
import type { ArtifactOutput } from './ArtifactTool.js';

export function renderToolResultMessage(
  content: ArtifactOutput,
  _progressMessagesForMessage: ProgressMessage<ToolProgressData>[],
  _options: { verbose: boolean; theme?: string },
): React.ReactNode {
  if (content.error) {
    return (
      <Box>
        <Text color="error">⚠ 产物上传失败： {content.error}</Text>
      </Box>
    );
  }
  if (!content.url) return null;
  return (
    <Box flexDirection="column">
      <Box>
        <Text>
          <Text color="success">↑</Text> 产物已上传：{' '}
          <Link url={content.url}>
            <Text color="warning">{content.url}</Text>
          </Link>
        </Text>
      </Box>
      {content.expiresAt ? (
        <Box>
          <Text dimColor>过期时间： {content.expiresAt}</Text>
        </Box>
      ) : null}
    </Box>
  );
}
