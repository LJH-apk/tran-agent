import * as React from 'react';
import { Markdown } from 'src/components/Markdown.js';
import { MessageResponse } from 'src/components/MessageResponse.js';
import { Box, Text } from '@anthropic/ink';

type Props = {
  plan: string;
};

export function RejectedPlanMessage({ plan }: Props): React.ReactNode {
  return (
    <MessageResponse>
      <Box flexDirection="column">
        <Text color="subtle">用户拒绝了 Claude 的方案：</Text>
        <Box
          borderStyle="round"
          borderColor="planMode"
          paddingX={1}
          // Necessary for Windows Terminal to render properly
          overflow="hidden"
        >
          <Markdown>{plan}</Markdown>
        </Box>
      </Box>
    </MessageResponse>
  );
}
