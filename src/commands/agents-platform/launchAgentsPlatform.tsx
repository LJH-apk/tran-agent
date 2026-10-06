import React from 'react';
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../../services/analytics/index.js';
import { parseCronExpression } from '../../utils/cron.js';
import type { LocalJSXCommandCall, LocalJSXCommandOnDone } from '../../types/command.js';
import { createAgent, deleteAgent, listAgents, runAgent } from './agentsApi.js';
import { AgentsPlatformView } from './AgentsPlatformView.js';
import { parseAgentsPlatformArgs } from './parseArgs.js';
import { launchCommand } from '../_shared/launchCommand.js';

type AgentsPlatformViewProps = React.ComponentProps<typeof AgentsPlatformView>;

async function dispatchAgentsPlatform(
  parsed: ReturnType<typeof parseAgentsPlatformArgs>,
  onDone: LocalJSXCommandOnDone,
): Promise<AgentsPlatformViewProps | null> {
  if (parsed.action === 'list') {
    logEvent('tengu_agents_platform_list', {});
    try {
      const agents = await listAgents();
      onDone(agents.length === 0 ? '未找到定时智能体。' : `共 ${agents.length} 个定时智能体。`, {
        display: 'system',
      });
      return { mode: 'list', agents };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_agents_platform_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`获取智能体列表失败：${msg}`, { display: 'system' });
      return { mode: 'error', message: msg };
    }
  }

  if (parsed.action === 'create') {
    const { cron, prompt } = parsed;

    // Validate cron expression client-side before hitting the network
    const cronFields = parseCronExpression(cron);
    if (!cronFields) {
      const reason = `cron 表达式无效："${cron}"。应为 5 个字段（分 时 日 月 周）。`;
      logEvent('tengu_agents_platform_failed', {
        reason: reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(reason, { display: 'system' });
      return null;
    }

    logEvent('tengu_agents_platform_create', {
      cron: cron as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      const agent = await createAgent(cron, prompt);
      onDone(`智能体已创建：${agent.id}`, { display: 'system' });
      return { mode: 'created', agent };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_agents_platform_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`创建智能体失败：${msg}`, { display: 'system' });
      return { mode: 'error', message: msg };
    }
  }

  if (parsed.action === 'delete') {
    const { id } = parsed;
    logEvent('tengu_agents_platform_delete', {
      id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      await deleteAgent(id);
      onDone(`智能体 ${id} 已删除。`, { display: 'system' });
      return { mode: 'deleted', id };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_agents_platform_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`删除智能体 ${id} 失败：${msg}`, { display: 'system' });
      return { mode: 'error', message: msg };
    }
  }

  // parsed.action === 'run' (all other actions handled above)
  const runParsed = parsed as { action: 'run'; id: string };
  const { id } = runParsed;
  logEvent('tengu_agents_platform_run', {
    id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  });
  try {
    const result = await runAgent(id);
    onDone(`已触发智能体 ${id}。运行 ID：${result.run_id}`, { display: 'system' });
    return { mode: 'ran', id, runId: result.run_id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logEvent('tengu_agents_platform_failed', {
      reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    onDone(`运行智能体 ${id} 失败：${msg}`, { display: 'system' });
    return { mode: 'error', message: msg };
  }
}

export const callAgentsPlatform: LocalJSXCommandCall = launchCommand<
  ReturnType<typeof parseAgentsPlatformArgs>,
  AgentsPlatformViewProps
>({
  commandName: 'agents-platform',
  parseArgs: (raw: string) => {
    logEvent('tengu_agents_platform_started', {
      args: raw as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    const result = parseAgentsPlatformArgs(raw);
    if (result.action === 'invalid') {
      logEvent('tengu_agents_platform_failed', {
        reason: result.reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      return {
        action: 'invalid' as const,
        reason: `用法：/agents-platform list | create CRON PROMPT | delete ID | run ID\n${result.reason}`,
      };
    }
    return result;
  },
  dispatch: dispatchAgentsPlatform,
  View: AgentsPlatformView,
  // Invalid args returns null to match original behaviour (error already surfaced via onDone)
  errorView: (_msg: string) => null,
});
