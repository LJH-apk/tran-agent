/**
 * Parse the args string for the /local-memory command.
 *
 * Supported sub-commands:
 *   list                           → { action: 'list' }
 *   create <store>                 → { action: 'create', store }
 *   store <store> <key> <value>    → { action: 'store', store, key, value }
 *   fetch <store> <key>            → { action: 'fetch', store, key }
 *   entries <store>                → { action: 'entries', store }
 *   archive <store>                → { action: 'archive', store }
 *   (empty)                        → { action: 'list' }
 *   anything else                  → { action: 'invalid', reason }
 */

export type LocalMemoryArgs =
  | { action: 'list' }
  | { action: 'create'; store: string }
  | { action: 'store'; store: string; key: string; value: string }
  | { action: 'fetch'; store: string; key: string }
  | { action: 'entries'; store: string }
  | { action: 'archive'; store: string }
  | { action: 'invalid'; reason: string }

// Markdown renderer in REPL eats `<store>` / `<key>` / `<value>` as if
// they were HTML tags. Use uppercase placeholders so users see the
// full usage line. (Same fix as src/commands/local-vault/parseArgs.ts.)
const USAGE =
  '用法：/local-memory list | create STORE | store STORE KEY VALUE | fetch STORE KEY | entries STORE | archive STORE'

export function parseLocalMemoryArgs(args: string): LocalMemoryArgs {
  const trimmed = args.trim()

  if (trimmed === '' || trimmed === 'list') {
    return { action: 'list' }
  }

  const tokens = trimmed.split(/\s+/)
  const subCmd = tokens[0]

  // ── list ──────────────────────────────────────────────────────────────────
  if (subCmd === 'list') {
    return { action: 'list' }
  }

  // ── create ────────────────────────────────────────────────────────────────
  if (subCmd === 'create') {
    const store = tokens[1]
    if (!store) {
      return {
        action: 'invalid',
        reason: `create 需要一个存储名称。${USAGE}`,
      }
    }
    return { action: 'create', store }
  }

  // ── store ─────────────────────────────────────────────────────────────────
  if (subCmd === 'store') {
    const store = tokens[1]
    const key = tokens[2]
    if (!store) {
      return {
        action: 'invalid',
        reason: `store 需要一个存储名称。${USAGE}`,
      }
    }
    if (!key) {
      return { action: 'invalid', reason: `store 需要一个键名。${USAGE}` }
    }
    // D6: value is tokens[3..] joined, not substring math (handles store/key with repeated substrings)
    const rest = tokens.slice(3).join(' ')
    if (!rest) {
      return { action: 'invalid', reason: `store 需要一个值。${USAGE}` }
    }
    return { action: 'store', store, key, value: rest }
  }

  // ── fetch ─────────────────────────────────────────────────────────────────
  if (subCmd === 'fetch') {
    const store = tokens[1]
    const key = tokens[2]
    if (!store) {
      return {
        action: 'invalid',
        reason: `fetch 需要一个存储名称。${USAGE}`,
      }
    }
    if (!key) {
      return { action: 'invalid', reason: `fetch 需要一个键名。${USAGE}` }
    }
    return { action: 'fetch', store, key }
  }

  // ── entries ───────────────────────────────────────────────────────────────
  if (subCmd === 'entries') {
    const store = tokens[1]
    if (!store) {
      return {
        action: 'invalid',
        reason: `entries 需要一个存储名称。${USAGE}`,
      }
    }
    return { action: 'entries', store }
  }

  // ── archive ───────────────────────────────────────────────────────────────
  if (subCmd === 'archive') {
    const store = tokens[1]
    if (!store) {
      return {
        action: 'invalid',
        reason: `archive 需要一个存储名称。${USAGE}`,
      }
    }
    return { action: 'archive', store }
  }

  return {
    action: 'invalid',
    reason: `未知子命令“${subCmd}”。${USAGE}`,
  }
}
