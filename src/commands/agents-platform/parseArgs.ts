/**
 * Parse the args string for the /agents-platform command.
 *
 * Supported sub-commands:
 *   list                              → { action: 'list' }
 *   create <cron-expr> <prompt>       → { action: 'create', cron, prompt }
 *   delete <id>                       → { action: 'delete', id }
 *   run <id>                          → { action: 'run', id }
 *   (empty)                           → { action: 'list' }
 *   anything else                     → { action: 'invalid', reason }
 */

export type AgentsPlatformArgs =
  | { action: 'list' }
  | { action: 'create'; cron: string; prompt: string }
  | { action: 'delete'; id: string }
  | { action: 'run'; id: string }
  | { action: 'invalid'; reason: string }

/**
 * Cron expressions are 5 space-separated fields.
 * This helper extracts the first 5 whitespace-separated tokens and joins them.
 * The remainder of the string is the prompt.
 * Returns null if fewer than 5 tokens are present.
 */
export function splitCronAndPrompt(
  rest: string,
): { cron: string; prompt: string } | null {
  const tokens = rest.trim().split(/\s+/)
  if (tokens.length < 6) return null
  const cron = tokens.slice(0, 5).join(' ')
  const prompt = tokens.slice(5).join(' ')
  return { cron, prompt }
}

export function parseAgentsPlatformArgs(args: string): AgentsPlatformArgs {
  const trimmed = args.trim()

  if (trimmed === '' || trimmed === 'list') {
    return { action: 'list' }
  }

  // Extract first token as sub-command
  const spaceIdx = trimmed.indexOf(' ')
  const subCmd = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)
  const rest = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1).trim()

  if (subCmd === 'create') {
    if (!rest) {
      return {
        action: 'invalid',
        reason:
          '创建定时任务需要提供 cron 表达式和提示词，例如：create "0 9 * * 1" Run daily standup',
      }
    }
    const parsed = splitCronAndPrompt(rest)
    if (!parsed) {
      return {
        action: 'invalid',
        reason:
          '创建定时任务至少需要 5 个 cron 字段，其后跟提示词，例如：create "0 9 * * 1" Run daily standup',
      }
    }
    const { cron, prompt } = parsed
    // splitCronAndPrompt joins slice(5) so prompt is non-empty by construction;
    // this guard is a defensive fallback against future refactors.
    /* istanbul ignore next -- prompt is non-empty by construction from splitCronAndPrompt */
    if (!prompt.trim()) {
      return { action: 'invalid', reason: '提示词不能为空' }
    }
    return { action: 'create', cron, prompt: prompt.trim() }
  }

  if (subCmd === 'delete') {
    if (!rest) {
      return { action: 'invalid', reason: '删除操作需要提供智能体 ID' }
    }
    const id = rest.split(/\s+/)[0]
    /* istanbul ignore next -- rest is non-empty; split(/\s+/) always yields a non-empty first token */
    if (!id) {
      return { action: 'invalid', reason: '删除操作需要提供智能体 ID' }
    }
    return { action: 'delete', id }
  }

  if (subCmd === 'run') {
    if (!rest) {
      return { action: 'invalid', reason: '运行操作需要提供智能体 ID' }
    }
    const id = rest.split(/\s+/)[0]
    /* istanbul ignore next -- rest is non-empty; split(/\s+/) always yields a non-empty first token */
    if (!id) {
      return { action: 'invalid', reason: '运行操作需要提供智能体 ID' }
    }
    return { action: 'run', id }
  }

  return {
    action: 'invalid',
    reason: `未知子命令 "${subCmd}"。用法：list | create CRON PROMPT | delete ID | run ID`,
  }
}
