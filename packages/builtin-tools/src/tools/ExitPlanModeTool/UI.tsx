import * as React from 'react';
import { Markdown } from 'src/components/Markdown.js';
import { MessageResponse } from 'src/components/MessageResponse.js';
import { RejectedPlanMessage } from 'src/components/messages/UserToolResultMessage/RejectedPlanMessage.js';
import { BLACK_CIRCLE } from 'src/constants/figures.js';
import { getModeColor } from 'src/utils/permissions/PermissionMode.js';
import { Box, Text } from '@anthropic/ink';
import type { ToolProgressData } from 'src/Tool.js';
import type { ProgressMessage } from 'src/types/message.js';
import { getDisplayPath } from 'src/utils/file.js';
import { getPlan } from 'src/utils/plans.js';
import type { ThemeName } from 'src/utils/theme.js';
import type { Output } from './ExitPlanModeV2Tool.js';

export function renderToolUseMessage(): React.ReactNode {
  return null;
}

export function renderToolResultMessage(
  output: Output,
  _progressMessagesForMessage: ProgressMessage<ToolProgressData>[],
  { theme: _theme }: { theme: ThemeName },
): React.ReactNode {
  const { plan, filePath } = output;
  const isEmpty = !plan || plan.trim() === '';
  const displayPath = filePath ? getDisplayPath(filePath) : '';
  const awaitingLeaderApproval = output.awaitingLeaderApproval;

  // Simplified message for empty plans
  if (isEmpty) {
    return (
      <Box flexDirection="column" marginTop={1}>
        <Box flexDirection="row">
          <Text color={getModeColor('plan')}>{BLACK_CIRCLE}</Text>
          <Text> 已退出计划模式</Text>
        </Box>
      </Box>
    );
  }

  // When awaiting leader approval, show a different message
  if (awaitingLeaderApproval) {
    return (
      <Box flexDirection="column" marginTop={1}>
        <Box flexDirection="row">
          <Text color={getModeColor('plan')}>{BLACK_CIRCLE}</Text>
          <Text> 计划已提交给团队负责人审批</Text>
        </Box>
        <MessageResponse>
          <Box flexDirection="column">
            {filePath && <Text dimColor>计划文件： {displayPath}</Text>}
            <Text dimColor>等待团队负责人审查并批准…</Text>
          </Box>
        </MessageResponse>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginTop={1}>
      <Box flexDirection="row">
        <Text color={getModeColor('plan')}>{BLACK_CIRCLE}</Text>
        <Text> 用户已批准 Tran Agent 的计划</Text>
      </Box>
      <MessageResponse>
        <Box flexDirection="column">
          {filePath && <Text dimColor>计划已保存至： {displayPath} · 输入 /plan 编辑</Text>}
          <Markdown>{plan}</Markdown>
        </Box>
      </MessageResponse>
    </Box>
  );
}

export function renderToolUseRejectedMessage(
  { plan }: { plan?: string },
  { theme: _theme }: { theme: ThemeName },
): React.ReactNode {
  const planContent = plan ?? getPlan() ?? '没有找到计划';

  return (
    <Box flexDirection="column">
      <RejectedPlanMessage plan={planContent} />
    </Box>
  );
}
