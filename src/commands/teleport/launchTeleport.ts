import type { UUID } from 'node:crypto'
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../../services/analytics/index.js'
import type { LocalJSXCommandCall } from '../../types/command.js'
import type { LogOption } from '../../types/logs.js'
import { getLastSessionLog } from '../../utils/sessionStorage.js'
import {
  teleportResumeCodeSession,
  validateGitState,
} from '../../utils/teleport.js'
import { fetchCodeSessionsFromSessionsAPI } from '../../utils/teleport/api.js'

// Minimum length for a UUID-like session ID (8 hex chars with dashes allowed)
const SESSION_ID_MIN_LENGTH = 8

// Maximum sessions to display in the interactive picker
const PICKER_PAGE_CAP = 20

function meta(
  s: string,
): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
  return s as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS
}

export type TeleportProgressStep =
  | 'fetch'
  | 'validate'
  | 'resume'
  | 'ready'
  | 'error'

/**
 * Formats a sessions list as a text picker (no interactive UI in headless mode).
 * Returns a prompt the user can copy a session ID from.
 */
function formatSessionsPicker(
  sessions: Array<{
    id: string
    title: string
    status: string
    created_at: string
  }>,
): string {
  const rows = sessions.slice(0, PICKER_PAGE_CAP).map((s, i) => {
    const idx = String(i + 1).padStart(2)
    const title = s.title.slice(0, 50).padEnd(50)
    const status = s.status.padEnd(14)
    const created = s.created_at.slice(0, 10)
    return `  ${idx}. ${title}  ${status}  ${created}  id=${s.id}`
  })
  return [
    '## 可用会话（最新在前）',
    '',
    ...rows,
    '',
    '运行 `/teleport <session-id>` 恢复某个会话。',
  ].join('\n')
}

/**
 * /teleport [session-id]
 *
 * Without session-id: fetches the user's session list from the Sessions API
 * and renders an interactive picker (or text list in headless mode).
 *
 * With session-id:
 * 1. Validates local git state (must be clean)
 * 2. Fetches session logs + branch via teleportResumeCodeSession()
 * 3. Looks up the session LogOption by ID
 * 4. Hands off to the REPL via context.resume()
 *
 * Telemetry coverage:
 * - tengu_teleport_started
 * - tengu_teleport_events_fetch_fail
 * - tengu_teleport_page_cap
 * - tengu_teleport_source_decision
 * - tengu_teleport_resume_session
 * - tengu_teleport_first_message_success
 * - tengu_teleport_first_message_error
 * - tengu_teleport_failed
 * - tengu_teleport_cancelled
 * - tengu_teleport_null
 * - tengu_teleport_errors_detected
 * - tengu_teleport_errors_resolved
 * - tengu_teleport_error_session_not_found_
 * - tengu_teleport_error_repo_mismatch_sessions_api
 * - tengu_teleport_error_repo_not_in_git_dir_sessions_api
 * - tengu_teleport_error_bad_token
 * - tengu_teleport_error_bad_status
 */
export const callTeleport: LocalJSXCommandCall = async (
  onDone,
  context,
  args,
) => {
  const rawArgs = args.trim()
  // --print flag: headless / non-interactive output
  const isPrintMode = rawArgs === '--print' || rawArgs.startsWith('--print ')
  const sessionId = isPrintMode
    ? rawArgs.replace(/^--print\s*/, '').trim()
    : rawArgs

  logEvent('tengu_teleport_started', {
    has_session_id: meta(sessionId ? 'true' : 'false'),
  })

  // ── No session ID: interactive picker ──
  if (!sessionId) {
    logEvent('tengu_teleport_source_decision', {
      source: meta('sessions_api'),
    })

    let sessions: Array<{
      id: string
      title: string
      status: string
      created_at: string
    }>
    try {
      const raw = await fetchCodeSessionsFromSessionsAPI()
      sessions = raw.map(s => ({
        id: s.id,
        title: s.title ?? '未命名',
        status: (s.status ?? 'unknown') as string,
        created_at: s.created_at ?? '',
      }))
    } catch (fetchErr: unknown) {
      const msg =
        fetchErr instanceof Error ? fetchErr.message : String(fetchErr)

      if (/forbidden|401|403/i.test(msg)) {
        logEvent('tengu_teleport_events_fetch_forbidden', {
          error: meta(msg.slice(0, 200)),
        })
        onDone(
          'Teleport：获取会话被拒绝。请检查你的 OAuth 令牌（`claude auth status`）。',
          { display: 'system' },
        )
        return null
      }
      if (/not found|404/i.test(msg)) {
        logEvent('tengu_teleport_events_fetch_not_found', {
          error: meta(msg.slice(0, 200)),
        })
        onDone(
          'Teleport：会话接口返回 404。你的账号可能无法使用 Sessions API。',
          { display: 'system' },
        )
        return null
      }
      if (/token|unauthorized/i.test(msg)) {
        logEvent('tengu_teleport_error_bad_token', {
          error: meta(msg.slice(0, 200)),
        })
        onDone(
          `Teleport: authentication error — ${msg}. Try \`claude auth login\`.`,
          { display: 'system' },
        )
        return null
      }

      logEvent('tengu_teleport_events_fetch_fail', {
        error: meta(msg.slice(0, 200)),
      })
      onDone(
        `Teleport：获取会话失败 —— ${msg}。\n用法：/teleport SESSION_ID`,
        { display: 'system' },
      )
      return null
    }

    if (sessions.length === 0) {
      logEvent('tengu_teleport_null', {})
      onDone(
        '在 claude.ai/code 上未找到活跃会话。\n在 https://claude.ai/code 开始一个新会话',
        { display: 'system' },
      )
      return null
    }

    if (sessions.length >= PICKER_PAGE_CAP) {
      logEvent('tengu_teleport_page_cap', {
        count: meta(String(sessions.length)),
      })
    }

    const pickerText = formatSessionsPicker(sessions)

    if (isPrintMode) {
      onDone(pickerText, { display: 'system' })
      return null
    }

    // Interactive context: display the list and prompt user to run with an ID.
    // A full Ink <SelectInput> picker requires an event loop that isn't safely
    // available from all command contexts; text list is the portable fallback.
    onDone(pickerText, { display: 'system' })
    return null
  }

  // ── Basic format guard ──
  if (
    sessionId.length < SESSION_ID_MIN_LENGTH ||
    !/^[0-9a-f-]{8,}$/i.test(sessionId)
  ) {
    logEvent('tengu_teleport_error_bad_status', {
      error: meta(`invalid_session_id: ${sessionId.slice(0, 40)}`),
    })
    onDone(
      `会话 ID "${sessionId}" 无效。应为类似 UUID 的字符串（例如 12345678-abcd-...）。`,
      { display: 'system' },
    )
    return null
  }

  logEvent('tengu_teleport_source_decision', { source: meta('explicit_id') })

  // ── Progress tracker (internal, no Ink rendering needed) ──
  const steps: TeleportProgressStep[] = []
  const recordStep = (step: TeleportProgressStep) => {
    steps.push(step)
  }

  // ── Git state validation ──
  recordStep('validate')
  try {
    await validateGitState()
  } catch (gErr: unknown) {
    const msg = gErr instanceof Error ? gErr.message : String(gErr)
    logEvent('tengu_teleport_errors_detected', {
      error: meta(msg.slice(0, 200)),
    })
    onDone(`无法 teleport：${msg}`, { display: 'system' })
    return null
  }

  // ── Resume session ──
  recordStep('resume')
  try {
    let lastProgress = ''

    await teleportResumeCodeSession(sessionId, stage => {
      lastProgress = String(stage)
    })

    logEvent('tengu_teleport_resume_session', {
      stage: meta(lastProgress),
    })

    recordStep('ready')

    if (!context.resume) {
      logEvent('tengu_teleport_null', {})
      // resume callback unavailable (e.g. non-interactive context)
      if (isPrintMode) {
        onDone(`已成功获取会话 ${sessionId}。`, {
          display: 'system',
        })
        return null
      }
      onDone(
        `${sessionId} 的 Teleport 恢复成功，但 REPL 未提供恢复回调。`,
        { display: 'system' },
      )
      return null
    }

    // Look up the session log so we can pass it to context.resume().
    recordStep('fetch')
    const log: LogOption | null = await getLastSessionLog(sessionId as UUID)
    if (!log) {
      logEvent('tengu_teleport_errors_detected', {
        error: meta('log_not_found_after_resume'),
      })
      onDone(
        `Teleport 已获取会话 ${sessionId}，但未找到本地日志。请手动运行 /resume ${sessionId}。`,
        { display: 'system' },
      )
      return null
    }

    logEvent('tengu_teleport_errors_resolved', {})
    await context.resume(sessionId as UUID, log, 'slash_command_session_id')
    logEvent('tengu_teleport_first_message_success', {})
    return null
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)

    // Map error message content to specific telemetry event names
    let evt = 'tengu_teleport_failed'
    if (/not found/i.test(msg)) {
      evt = 'tengu_teleport_error_session_not_found_'
    } else if (/repo.*mismatch/i.test(msg)) {
      evt = 'tengu_teleport_error_repo_mismatch_sessions_api'
    } else if (/not in.*git|git.*dir/i.test(msg)) {
      evt = 'tengu_teleport_error_repo_not_in_git_dir_sessions_api'
    } else if (/cancelled|aborted/i.test(msg)) {
      evt = 'tengu_teleport_cancelled'
    } else if (/token|unauthorized|401/i.test(msg)) {
      evt = 'tengu_teleport_error_bad_token'
    } else if (/status|4\d\d|5\d\d/i.test(msg)) {
      evt = 'tengu_teleport_error_bad_status'
    }

    logEvent(evt, { error: meta(msg.slice(0, 200)) })
    logEvent('tengu_teleport_first_message_error', {
      error: meta(msg.slice(0, 200)),
    })
    onDone(`Teleport 失败：${msg}`, { display: 'system' })
    return null
  }
}
