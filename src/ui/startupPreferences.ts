import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileSuffixForOauthConfig } from '../constants/oauth.js'
import { getClaudeConfigHomeDir } from '../utils/envUtils.js'

/** Read the same global config as /config, without loading CLI initialization. */
export function shouldSkipStartupAnimation(): boolean {
  const legacy = join(getClaudeConfigHomeDir(), '.config.json')
  const path = existsSync(legacy)
    ? legacy
    : join(
        process.env.CLAUDE_CONFIG_DIR || homedir(),
        `.claude${fileSuffixForOauthConfig()}.json`,
      )
  try {
    const config: unknown = JSON.parse(readFileSync(path, 'utf8'))
    return (
      typeof config === 'object' &&
      config !== null &&
      'skipStartupAnimation' in config &&
      config.skipStartupAnimation === true
    )
  } catch {
    return false
  }
}
