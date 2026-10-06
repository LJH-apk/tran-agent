/**
 * Parse the args string for the /schedule command.
 *
 * Supported sub-commands:
 *   list                                    → { action: 'list' }
 *   get <id>                                → { action: 'get', id }
 *   create <cron-expr> <prompt>             → { action: 'create', cron, prompt }
 *   update <id> <field> <value>             → { action: 'update', id, field, value }
 *   delete <id>                             → { action: 'delete', id }
 *   run <id>                                → { action: 'run', id }
 *   enable <id>                             → { action: 'enable', id }
 *   disable <id>                            → { action: 'disable', id }
 *   (empty)                                 → { action: 'list' }
 *   anything else                           → { action: 'invalid', reason }
 */

export type ScheduleArgs =
  | { action: 'list' }
  | { action: 'get'; id: string }
  | { action: 'create'; cron: string; prompt: string }
  | { action: 'update'; id: string; field: string; value: string }
  | { action: 'delete'; id: string }
  | { action: 'run'; id: string }
  | { action: 'enable'; id: string }
  | { action: 'disable'; id: string }
  | { action: 'invalid'; reason: string }

const USAGE =
  '用法：/schedule list | get ID | create CRON PROMPT | update ID FIELD VALUE | delete ID | run ID | enable ID | disable ID'

/**
 * Extract the first 5 whitespace-separated tokens as a cron expression;
 * the remainder is the prompt. Returns null if fewer than 6 tokens are present.
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

/**
 * Validate a 5-field cron expression (minute hour day month weekday).
 * Returns true if the expression has exactly 5 fields; false otherwise.
 * This is a lightweight structural check — the server validates semantics.
 */
export function isValidCronExpression(cron: string): boolean {
  const fields = cron.trim().split(/\s+/)
  return fields.length === 5
}

export function parseScheduleArgs(args: string): ScheduleArgs {
  const trimmed = args.trim()

  if (trimmed === '' || trimmed === 'list') {
    return { action: 'list' }
  }

  const spaceIdx = trimmed.indexOf(' ')
  const subCmd = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)
  const rest = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1).trim()

  // ── get ───────────────────────────────────────────────────────────────────
  if (subCmd === 'get') {
    if (!rest) {
      return { action: 'invalid', reason: 'get 需要一个触发器 id' }
    }
    const id = rest.split(/\s+/)[0]
    /* istanbul ignore next */
    if (!id) {
      return { action: 'invalid', reason: 'get 需要一个触发器 id' }
    }
    return { action: 'get', id }
  }

  // ── create ────────────────────────────────────────────────────────────────
  if (subCmd === 'create') {
    if (!rest) {
      return {
        action: 'invalid',
        reason:
          'create 需要 cron 表达式和提示词，例如 create "0 9 * * 1" Run weekly standup',
      }
    }
    const parsed = splitCronAndPrompt(rest)
    if (!parsed) {
      return {
        action: 'invalid',
        reason:
          'create 需要 5 个 cron 字段后跟提示词，例如 create "0 9 * * 1" Run weekly standup',
      }
    }
    const { cron, prompt } = parsed
    if (!isValidCronExpression(cron)) {
      return {
        action: 'invalid',
        reason: `cron 表达式无效：“${cron}”。应为 5 个字段（分 时 日 月 星期）。`,
      }
    }
    /* istanbul ignore next -- prompt is non-empty by construction from splitCronAndPrompt */
    if (!prompt.trim()) {
      return { action: 'invalid', reason: '提示词不能为空' }
    }
    return { action: 'create', cron, prompt: prompt.trim() }
  }

  // ── update ────────────────────────────────────────────────────────────────
  if (subCmd === 'update') {
    const parts = rest.split(/\s+/)
    if (parts.length < 3 || !parts[0]) {
      return {
        action: 'invalid',
        reason:
          'update 需要 id、字段和值，例如 update trg_123 enabled false',
      }
    }
    const id = parts[0]
    const field = parts[1] ?? ''
    const value = parts.slice(2).join(' ')
    if (!field) {
      return { action: 'invalid', reason: 'update 需要一个字段名' }
    }
    if (!value) {
      return { action: 'invalid', reason: 'update 需要一个值' }
    }
    return { action: 'update', id, field, value }
  }

  // ── delete ────────────────────────────────────────────────────────────────
  if (subCmd === 'delete') {
    if (!rest) {
      return { action: 'invalid', reason: 'delete 需要一个触发器 id' }
    }
    const id = rest.split(/\s+/)[0]
    /* istanbul ignore next */
    if (!id) {
      return { action: 'invalid', reason: 'delete 需要一个触发器 id' }
    }
    return { action: 'delete', id }
  }

  // ── run ───────────────────────────────────────────────────────────────────
  if (subCmd === 'run') {
    if (!rest) {
      return { action: 'invalid', reason: 'run 需要一个触发器 id' }
    }
    const id = rest.split(/\s+/)[0]
    /* istanbul ignore next */
    if (!id) {
      return { action: 'invalid', reason: 'run 需要一个触发器 id' }
    }
    return { action: 'run', id }
  }

  // ── enable / disable ──────────────────────────────────────────────────────
  if (subCmd === 'enable' || subCmd === 'disable') {
    if (!rest) {
      return {
        action: 'invalid',
        reason: `${subCmd} 需要一个触发器 id`,
      }
    }
    const id = rest.split(/\s+/)[0]
    /* istanbul ignore next */
    if (!id) {
      return {
        action: 'invalid',
        reason: `${subCmd} 需要一个触发器 id`,
      }
    }
    return { action: subCmd as 'enable' | 'disable', id }
  }

  return {
    action: 'invalid',
    reason: `未知子命令“${subCmd}”。${USAGE}`,
  }
}
