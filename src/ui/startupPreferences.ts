import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileSuffixForOauthConfig } from '../constants/oauth.js'
import { getClaudeConfigHomeDir } from '../utils/envUtils.js'

/** Read the same global config as /config, without loading CLI initialization. */
function readStartupConfig(): Record<string, unknown> | undefined {
  const legacy = join(getClaudeConfigHomeDir(), '.config.json')
  const path = existsSync(legacy)
    ? legacy
    : join(
        process.env.CLAUDE_CONFIG_DIR || homedir(),
        `.claude${fileSuffixForOauthConfig()}.json`,
      )
  try {
    const config: unknown = JSON.parse(readFileSync(path, 'utf8'))
    return typeof config === 'object' &&
      config !== null &&
      !Array.isArray(config)
      ? (config as Record<string, unknown>)
      : undefined
  } catch {
    return undefined
  }
}

export function shouldSkipStartupAnimation(): boolean {
  return readStartupConfig()?.skipStartupAnimation === true
}

/** Matches the account name used by the Agent welcome screen. */
export function getStartupDisplayName(): string | undefined {
  const account = readStartupConfig()?.oauthAccount
  if (
    typeof account !== 'object' ||
    account === null ||
    !('displayName' in account)
  )
    return undefined
  return typeof account.displayName === 'string'
    ? account.displayName
    : undefined
}
