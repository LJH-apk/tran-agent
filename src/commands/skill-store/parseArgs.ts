/**
 * Parse the args string for the /skill-store command.
 *
 * Supported sub-commands:
 *   list                               → { action: 'list' }
 *   get <id>                           → { action: 'get', id }
 *   versions <id>                      → { action: 'versions', id }
 *   version <id> <version>             → { action: 'version', id, version }
 *   create <name> <markdown>           → { action: 'create', name, markdown }
 *   delete <id>                        → { action: 'delete', id }
 *   install <id>                       → { action: 'install', id, version: undefined }
 *   install <id>@<version>             → { action: 'install', id, version }
 *   (empty)                            → { action: 'list' }
 *   anything else                      → { action: 'invalid', reason }
 */

export type SkillStoreArgs =
  | { action: 'list' }
  | { action: 'get'; id: string }
  | { action: 'versions'; id: string }
  | { action: 'version'; id: string; version: string }
  | { action: 'create'; name: string; markdown: string }
  | { action: 'delete'; id: string }
  | { action: 'install'; id: string; version: string | undefined }
  | { action: 'invalid'; reason: string }

const USAGE =
  '用法：/skill-store list | get ID | versions ID | version ID VER | create NAME MARKDOWN | delete ID | install ID[@VERSION]'

export function parseSkillStoreArgs(args: string): SkillStoreArgs {
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
      return { action: 'invalid', reason: 'get 需要提供技能 ID' }
    }
    const id = rest.split(/\s+/)[0]
    if (!id) {
      return { action: 'invalid', reason: 'get 需要提供技能 ID' }
    }
    return { action: 'get', id }
  }

  // ── versions ──────────────────────────────────────────────────────────────
  if (subCmd === 'versions') {
    if (!rest) {
      return { action: 'invalid', reason: 'versions 需要提供技能 ID' }
    }
    const id = rest.split(/\s+/)[0]
    if (!id) {
      return { action: 'invalid', reason: 'versions 需要提供技能 ID' }
    }
    return { action: 'versions', id }
  }

  // ── version ───────────────────────────────────────────────────────────────
  if (subCmd === 'version') {
    const parts = rest.split(/\s+/)
    if (parts.length < 2 || !parts[0] || !parts[1]) {
      return {
        action: 'invalid',
        reason:
          'version 需要提供技能 ID 和版本号，例如 version sk_123 v1',
      }
    }
    return { action: 'version', id: parts[0], version: parts[1] }
  }

  // ── create ────────────────────────────────────────────────────────────────
  if (subCmd === 'create') {
    const spaceInRest = rest.indexOf(' ')
    if (!rest || spaceInRest === -1) {
      return {
        action: 'invalid',
        reason:
          'create 需要提供技能名称和 Markdown 内容，例如 create my-skill "# My Skill\\nContent"',
      }
    }
    const name = rest.slice(0, spaceInRest).trim()
    const markdown = rest.slice(spaceInRest + 1).trim()
    if (!name) {
      return {
        action: 'invalid',
        reason: 'create 需要提供非空的技能名称',
      }
    }
    if (!markdown) {
      return {
        action: 'invalid',
        reason: 'create 需要提供非空的 Markdown 内容',
      }
    }
    return { action: 'create', name, markdown }
  }

  // ── delete ────────────────────────────────────────────────────────────────
  if (subCmd === 'delete') {
    if (!rest) {
      return { action: 'invalid', reason: 'delete 需要提供技能 ID' }
    }
    const id = rest.split(/\s+/)[0]
    if (!id) {
      return { action: 'invalid', reason: 'delete 需要提供技能 ID' }
    }
    return { action: 'delete', id }
  }

  // ── install ───────────────────────────────────────────────────────────────
  if (subCmd === 'install') {
    if (!rest) {
      return {
        action: 'invalid',
        reason:
          'install 需要提供技能 ID（可选 @version），例如 install sk_123 或 install sk_123@v2',
      }
    }
    const token = rest.split(/\s+/)[0]
    if (!token) {
      return { action: 'invalid', reason: 'install 需要提供技能 ID' }
    }
    const atIdx = token.indexOf('@')
    if (atIdx === -1) {
      return { action: 'install', id: token, version: undefined }
    }
    const id = token.slice(0, atIdx)
    const version = token.slice(atIdx + 1)
    if (!id) {
      return {
        action: 'invalid',
        reason: 'install 需要在 @ 前提供非空的技能 ID',
      }
    }
    if (!version) {
      return {
        action: 'invalid',
        reason: 'install 需要在 @ 后提供非空的版本号',
      }
    }
    return { action: 'install', id, version }
  }

  return {
    action: 'invalid',
    reason: `未知子命令 "${subCmd}"。${USAGE}`,
  }
}
