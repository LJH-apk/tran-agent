import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getIsNonInteractiveSession } from '../../bootstrap/state.js'
import { getClaudeConfigHomeDir } from '../../utils/envUtils.js'
import type { Command, LocalCommandResult } from '../../types/command.js'

/**
 * Path to the TUI-mode marker file.
 *
 * When this file exists, the user has opted in to flicker-free TUI mode
 * (alternate screen buffer via CLAUDE_CODE_NO_FLICKER=1). The marker is
 * session-independent: it persists across restarts so the user only needs to
 * run `/tui on` once.
 *
 * Shell-profile integration: add the following to ~/.bashrc / ~/.zshrc to
 * auto-enable TUI mode when the marker is present:
 *
 *   [ -f "$HOME/.claude/.tui-mode" ] && export CLAUDE_CODE_NO_FLICKER=1
 *
 * Note: setting CLAUDE_CODE_NO_FLICKER at runtime cannot retroactively enter
 * the alternate screen buffer — the Ink render tree is already mounted. The
 * change takes effect on the NEXT session start.
 */
export function getTuiMarkerPath(): string {
  return join(getClaudeConfigHomeDir(), '.tui-mode')
}

/**
 * Returns true when the TUI-mode marker file is present, meaning the user has
 * opted in to flicker-free alternate-screen rendering.
 */
export function isTuiModeEnabled(): boolean {
  return existsSync(getTuiMarkerPath())
}

const USAGE_TEXT = [
  '用法：/tui [子命令]',
  '',
  '  （无参数）   切换无闪烁 TUI 模式（备用屏幕缓冲区）',
  '  on          启用 TUI 模式',
  '  off         禁用 TUI 模式',
  '  status      显示当前 TUI 模式状态',
  '',
  'TUI 模式使用 ANSI 备用屏幕缓冲区（\\x1b[?1049h），使',
  'Tran Agent 界面占据干净的全屏区域，没有回滚',
  '闪烁。该设置保存在 ~/.claude/.tui-mode 中，并在',
  '下次会话启动时生效。',
  '',
  'Shell 配置集成（每次启动时自动启用）：',
  '  [ -f "$HOME/.claude/.tui-mode" ] && export CLAUDE_CODE_NO_FLICKER=1',
  '',
  '环境变量覆盖：',
  '  CLAUDE_CODE_NO_FLICKER=1   强制开启（覆盖标记文件）',
  '  CLAUDE_CODE_NO_FLICKER=0   强制关闭（覆盖标记文件）',
].join('\n')

function enableTui(): LocalCommandResult {
  const markerPath = getTuiMarkerPath()
  mkdirSync(getClaudeConfigHomeDir(), { recursive: true })
  writeFileSync(markerPath, new Date().toISOString(), 'utf8')
  return {
    type: 'text',
    value: [
      '## TUI mode enabled',
      '',
      `Marker written: \`${markerPath}\``,
      '',
      '无闪烁的备用屏幕渲染将在下次',
      '会话启动时生效。将其添加到 Shell 配置中即可永久生效：',
      '',
      '  [ -f "$HOME/.claude/.tui-mode" ] && export CLAUDE_CODE_NO_FLICKER=1',
      '',
      '要禁用：`/tui off`',
    ].join('\n'),
  }
}

function disableTui(): LocalCommandResult {
  const markerPath = getTuiMarkerPath()
  if (!existsSync(markerPath)) {
    return {
      type: 'text',
      value: 'TUI mode was not active.',
    }
  }
  unlinkSync(markerPath)
  return {
    type: 'text',
    value: [
      '## TUI mode disabled',
      '',
      `Marker removed: \`${markerPath}\``,
      '',
      '标准（非备用屏幕）渲染将在下次',
      '会话启动时使用。',
      '',
      '要重新启用：`/tui on`',
    ].join('\n'),
  }
}

export async function callTui(args: string): Promise<LocalCommandResult> {
  const sub = args.trim().toLowerCase()

  // ── status ──────────────────────────────────────────────────────────
  if (sub === 'status') {
    const enabled = isTuiModeEnabled()
    const markerPath = getTuiMarkerPath()
    const envVal = process.env.CLAUDE_CODE_NO_FLICKER
    let envLine: string
    if (envVal === '1' || envVal === 'true') {
      envLine = 'CLAUDE_CODE_NO_FLICKER=1（通过环境变量强制开启）'
    } else if (envVal === '0' || envVal === 'false') {
      envLine = 'CLAUDE_CODE_NO_FLICKER=0（通过环境变量强制关闭）'
    } else {
      envLine = 'CLAUDE_CODE_NO_FLICKER 未设置'
    }
    return {
      type: 'text',
      value: [
        '## TUI Mode Status',
        '',
        `  Marker file:  ${enabled ? 'present' : 'absent'} (\`${markerPath}\`)`,
        `  模式：        ${enabled ? 'enabled' : 'disabled'}`,
        `  Env var:      ${envLine}`,
        '',
        '注意：更改将在下次会话启动时生效。',
      ].join('\n'),
    }
  }

  // ── on ───────────────────────────────────────────────────────────────
  if (sub === 'on') {
    return enableTui()
  }

  // ── off ──────────────────────────────────────────────────────────────
  if (sub === 'off') {
    return disableTui()
  }

  // ── toggle (legacy default) ──────────────────────────────────────────
  if (sub === '' || sub === 'toggle') {
    return isTuiModeEnabled() ? disableTui() : enableTui()
  }

  // ── unknown subcommand ───────────────────────────────────────────────
  return {
    type: 'text',
    value: [`未知子命令："${sub}"`, '', USAGE_TEXT].join('\n'),
  }
}

const tuiCommand: Command = {
  type: 'local-jsx',
  name: 'tui',
  description:
    '管理无闪烁 TUI 模式。打开操作面板，或直接执行：status、on、off、toggle',
  isHidden: false,
  isEnabled: () => !getIsNonInteractiveSession(),
  argumentHint: '[status|on|off|toggle]',
  bridgeSafe: true,
  getBridgeInvocationError: args =>
    args.trim()
      ? undefined
      : '通过远程控制时请使用 /tui status/on/off/toggle。',
  load: () => import('./panel.js'),
}

export const tuiNonInteractive: Command = {
  type: 'local',
  name: 'tui',
  description:
    '切换无闪烁 TUI 模式（备用屏幕缓冲区）。子命令：on、off、status',
  isHidden: false,
  isEnabled: () => getIsNonInteractiveSession(),
  supportsNonInteractive: true,
  bridgeSafe: true,
  load: async () => ({
    call: callTui,
  }),
}

export default tuiCommand
