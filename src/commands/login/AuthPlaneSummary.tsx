/**
 * AuthPlaneSummary — pure presentational Ink component.
 *
 * Renders the three auth plane status table shown when the user runs /login
 * without arguments:
 *
 *   Anthropic auth status:
 *     ☑ Subscription (claude.ai)         pro plan
 *     ☐ Workspace API key                not set
 *          To enable /vault /agents-platform /memory-stores:
 *          1. Open https://console.anthropic.com/settings/keys
 *          ...
 *
 *   Third-party providers:
 *     ✓ Cerebras   (CEREBRAS_API_KEY set)
 *     ☐ Groq       (GROQ_API_KEY not set)
 *     ...
 *
 * Security: never renders raw API key values. All output uses masked previews.
 */
import * as React from 'react';
import { Box, Text } from '@anthropic/ink';
import type { AuthStatus } from './getAuthStatus.js';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SubscriptionRow({ subscription }: { subscription: AuthStatus['subscription'] }): React.ReactNode {
  const icon = subscription.active ? '☑' : '☐';
  const planLabel = subscription.active && subscription.plan ? ` ${subscription.plan} 套餐` : '';
  const statusText = subscription.active ? `已登录${planLabel}` : '未登录';

  return (
    <Box>
      <Text color={subscription.active ? 'success' : undefined}>
        {icon} 订阅（claude.ai）{'  '}
      </Text>
      <Text dimColor={!subscription.active}>{statusText}</Text>
    </Box>
  );
}

function WorkspaceKeyRow({ workspaceKey }: { workspaceKey: AuthStatus['workspaceKey'] }): React.ReactNode {
  if (!workspaceKey.set) {
    return (
      <Box>
        <Text>{'☐ 工作区 API 密钥                '}</Text>
        <Text dimColor>未设置</Text>
      </Box>
    );
  }

  if (!workspaceKey.prefixValid) {
    return (
      <Box>
        <Text color="warning">{'⚠ 工作区 API 密钥                '}</Text>
        <Text>{workspaceKey.keyPreview}</Text>
        <Text color="warning">{'  （需要 sk-ant-api03-*）'}</Text>
      </Box>
    );
  }

  // Source label: distinguish env var from saved settings
  const sourceLabel =
    workspaceKey.source === 'settings'
      ? '  （已保存到设置）'
      : workspaceKey.source === 'env'
        ? '  （来自 ANTHROPIC_API_KEY 环境变量）'
        : '';

  return (
    <Box>
      <Text color="success">{'☑ 工作区 API 密钥                '}</Text>
      <Text>{workspaceKey.keyPreview}</Text>
      {sourceLabel ? <Text dimColor>{sourceLabel}</Text> : null}
    </Box>
  );
}

function WorkspaceKeyInstructions({
  subscription,
  workspaceKey,
}: {
  subscription: AuthStatus['subscription'];
  workspaceKey: AuthStatus['workspaceKey'];
}): React.ReactNode {
  // Show setup guide when workspace key is missing and subscription is active (user is logged in)
  if (!workspaceKey.set && subscription.active) {
    return (
      <Box flexDirection="column" marginLeft={5} marginTop={0}>
        <Text dimColor>要启用 /vault /agents-platform /memory-stores：</Text>
        <Text dimColor>{'按 W 立即设置（保存到 settings.json，无需重启）'}</Text>
        <Text dimColor>{'  —— 或 ——'}</Text>
        <Text dimColor>{'1. 打开 https://console.anthropic.com/settings/keys'}</Text>
        <Text dimColor>{'2. 创建一个密钥（sk-ant-api03-*）'}</Text>
        <Text dimColor>{'3. 设置 ANTHROPIC_API_KEY=<key> 并重启'}</Text>
      </Box>
    );
  }
  return null;
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------
//
// Third-party providers were previously listed here with their own status rows
// (Cerebras / Groq / Qwen / DeepSeek). Removed 2026-05-06 because the fork's
// existing `<Login>` "Anthropic Compatible Setup" form already configures the
// same Base URL + API key, and showing two parallel UIs for the same goal
// confused users. Subscription + Workspace key remain — those are distinct
// Anthropic-side auth planes the fork form doesn't surface.

export interface AuthPlaneSummaryProps {
  status: AuthStatus;
}

export function AuthPlaneSummary({ status }: AuthPlaneSummaryProps): React.ReactNode {
  return (
    <Box flexDirection="column" marginBottom={1}>
      {/* Section: Anthropic auth status */}
      <Box marginBottom={0}>
        <Text bold>Anthropic 身份验证状态：</Text>
      </Box>

      <Box marginLeft={2} flexDirection="column">
        <SubscriptionRow subscription={status.subscription} />
        <WorkspaceKeyRow workspaceKey={status.workspaceKey} />
        <WorkspaceKeyInstructions subscription={status.subscription} workspaceKey={status.workspaceKey} />
      </Box>
    </Box>
  );
}
