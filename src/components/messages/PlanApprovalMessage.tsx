import * as React from 'react';
import { Markdown } from '../../components/Markdown.js';
import { Box, Text } from '@anthropic/ink';
import { jsonParse } from '../../utils/slowOperations.js';
import {
  type IdleNotificationMessage,
  isIdleNotification,
  isPlanApprovalRequest,
  isPlanApprovalResponse,
  type PlanApprovalRequestMessage,
  type PlanApprovalResponseMessage,
} from '../../utils/teammateMailbox.js';
import { getShutdownMessageSummary } from './ShutdownMessage.js';
import { getTaskAssignmentSummary } from './TaskAssignmentMessage.js';

type PlanApprovalRequestProps = {
  request: PlanApprovalRequestMessage;
};

/**
 * Renders a plan approval request with a planMode-colored border,
 * showing the plan content and instructions for approving/rejecting.
 */
export function PlanApprovalRequestDisplay({ request }: PlanApprovalRequestProps): React.ReactNode {
  return (
    <Box flexDirection="column" marginY={1}>
      <Box borderStyle="round" borderColor="planMode" flexDirection="column" paddingX={1}>
        <Box marginBottom={1}>
          <Text color="planMode" bold>
            Plan Approval Request from {request.from}
          </Text>
        </Box>
        <Box
          borderStyle="dashed"
          borderColor="subtle"
          borderLeft={false}
          borderRight={false}
          flexDirection="column"
          paddingX={1}
          marginBottom={1}
        >
          <Markdown>{request.planContent}</Markdown>
        </Box>
        <Text dimColor>Plan file: {request.planFilePath}</Text>
      </Box>
    </Box>
  );
}

type PlanApprovalResponseProps = {
  response: PlanApprovalResponseMessage;
  senderName: string;
};

/**
 * Renders a plan approval response with a success (green) or error (red) border.
 */
export function PlanApprovalResponseDisplay({ response, senderName }: PlanApprovalResponseProps): React.ReactNode {
  if (response.approved) {
    return (
      <Box flexDirection="column" marginY={1}>
        <Box borderStyle="round" borderColor="success" flexDirection="column" paddingX={1} paddingY={1}>
          <Box>
            <Text color="success" bold>
              ✓ 方案已获 {senderName} 批准
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text>现在可以开始实施了。计划模式限制已解除。</Text>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginY={1}>
      <Box borderStyle="round" borderColor="error" flexDirection="column" paddingX={1} paddingY={1}>
        <Box>
          <Text color="error" bold>
            ✗ Plan Rejected by {senderName}
          </Text>
        </Box>
        {response.feedback && (
          <Box
            marginTop={1}
            borderStyle="dashed"
            borderColor="subtle"
            borderLeft={false}
            borderRight={false}
            paddingX={1}
          >
            <Text>Feedback: {response.feedback}</Text>
          </Box>
        )}
        <Box marginTop={1}>
          <Text dimColor>请根据反馈修改计划，并再次调用 ExitPlanMode。</Text>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Try to parse and render a plan approval message from raw content.
 * Returns the rendered component if it's a plan approval message, null otherwise.
 */
export function tryRenderPlanApprovalMessage(content: string, senderName: string): React.ReactNode | null {
  const request = isPlanApprovalRequest(content);
  if (request) {
    return <PlanApprovalRequestDisplay request={request} />;
  }

  const response = isPlanApprovalResponse(content);
  if (response) {
    return <PlanApprovalResponseDisplay response={response} senderName={senderName} />;
  }

  return null;
}

/**
 * Get a brief summary text for a plan approval message.
 * Used in places like the inbox queue where we want a short description.
 * Returns null if the content is not a plan approval message.
 */
function getPlanApprovalSummary(content: string): string | null {
  const request = isPlanApprovalRequest(content);
  if (request) {
    return `[计划审批请求：来自 ${request.from}]`;
  }

  const response = isPlanApprovalResponse(content);
  if (response) {
    if (response.approved) {
      return '[计划已批准] 现在可以开始实施';
    } else {
      return `[计划被拒绝] ${response.feedback || '请修改你的计划'}`;
    }
  }

  return null;
}

/**
 * Get a brief summary text for an idle notification.
 */
function getIdleNotificationSummary(msg: IdleNotificationMessage): string {
  const parts: string[] = ['智能体空闲'];
  if (msg.completedTaskId) {
    const status = msg.completedStatus || 'completed';
    parts.push(`任务 ${msg.completedTaskId} ${status}`);
  }
  if (msg.summary) {
    parts.push(`最近私信：${msg.summary}`);
  }
  return parts.join(' · ');
}

/**
 * Format teammate message content for display.
 * If it's a structured message (plan approval, shutdown, or idle), returns a formatted summary.
 * Otherwise returns the original content.
 */
export function formatTeammateMessageContent(content: string): string {
  const planSummary = getPlanApprovalSummary(content);
  if (planSummary) {
    return planSummary;
  }

  const shutdownSummary = getShutdownMessageSummary(content);
  if (shutdownSummary) {
    return shutdownSummary;
  }

  const idleMsg = isIdleNotification(content);
  if (idleMsg) {
    return getIdleNotificationSummary(idleMsg);
  }

  const taskAssignmentSummary = getTaskAssignmentSummary(content);
  if (taskAssignmentSummary) {
    return taskAssignmentSummary;
  }

  // Check for teammate_terminated message
  try {
    const parsed = jsonParse(content) as { type?: string; message?: string };
    if (parsed?.type === 'teammate_terminated' && parsed.message) {
      return parsed.message;
    }
  } catch {
    // Not JSON
  }

  return content;
}
