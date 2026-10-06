import { feature } from 'bun:bundle';
import React from 'react';
import { AgentTool } from '@claude-code-best/builtin-tools/tools/AgentTool/AgentTool.js';
import { isInForkChild } from '@claude-code-best/builtin-tools/tools/AgentTool/forkSubagent.js';
import { logForDebugging } from '../../utils/debug.js';
import type { LocalJSXCommandOnDone, LocalJSXCommandContext } from '../../types/command.js';

export async function call(
  onDone: LocalJSXCommandOnDone,
  context: LocalJSXCommandContext,
  args: string,
): Promise<React.ReactNode> {
  // Check feature flag
  if (!feature('FORK_SUBAGENT')) {
    onDone('Fork 子智能体功能未启用。设置 FEATURE_FORK_SUBAGENT=1 以启用。', { display: 'system' });
    return null;
  }

  // Recursive fork guard
  if (isInForkChild(context.messages)) {
    onDone('在 fork 出的工作进程中无法使用 Fork。请直接用您的工具完成任务。', {
      display: 'system',
    });
    return null;
  }

  const directive = args.trim();
  if (!directive) {
    onDone('用法：/fork <指令>\n示例：/fork 修复 validate.ts 中的空值检查', { display: 'system' });
    return null;
  }

  // Find the last assistant message to fork from
  const lastAssistantMessage = [...context.messages].reverse().find(m => m.type === 'assistant') as any; // Type assertion to avoid complex type import

  if (!lastAssistantMessage) {
    onDone('Cannot fork: no assistant response in conversation history.', { display: 'system' });
    return null;
  }

  try {
    // Reuse AgentTool logic for fork path.
    // Omitting subagent_type triggers implicit fork.
    const input = {
      prompt: directive,
      fork: true, // 触发 AgentTool 的 fork 路径：继承父会话上下文 + system prompt + 模型
      run_in_background: true, // fork always runs async
      // description 只显示在底部 selector / BackgroundTasksDialog，保持简短标签
      // 即可；用户输入的 prompt 会作为第一条用户消息呈现在主视图里，这里不要
      // 重复显示。
      description: '派生自主会话',
    };

    // Call AgentTool with proper parameters:
    // - input: the agent parameters (no subagent_type => fork path)
    // - toolUseContext: the current context (ToolUseContext)
    // - canUseTool: permission-check function from context
    // - assistantMessage: the last assistant message to fork from
    AgentTool.call(input, context, context.canUseTool!, lastAssistantMessage).catch(error => {
      logForDebugging(`Fork subagent async error: ${error}`, { level: 'error' });
    });

    // Notify user that fork has been started
    onDone(`已启动 Fork 子智能体，指令："${directive}"`, { display: 'system' });
    return null;
  } catch (error) {
    // Catches synchronous setup errors only
    logForDebugging(`Fork command setup error: ${error}`, { level: 'error' });
    onDone(`Fork 失败：${error instanceof Error ? error.message : String(error)}`, { display: 'system' });
    return null;
  }
}
