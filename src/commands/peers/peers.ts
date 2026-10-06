import type { LocalCommandCall } from '../../types/command.js'
import { listPeers, isPeerAlive } from '../../utils/udsClient.js'
import {
  formatUdsAddress,
  getUdsMessagingSocketPath,
} from '../../utils/udsMessaging.js'

export const call: LocalCommandCall = async (_args, _context) => {
  const mySocket = getUdsMessagingSocketPath()
  const peers = await listPeers()

  const lines: string[] = []

  // Show own socket
  lines.push(`你的 socket：${mySocket ?? '(not started)'}`)
  lines.push('')

  if (peers.length === 0) {
    lines.push('未发现其他 Tran Agent 对等实例。')
  } else {
    lines.push(`对等实例（${peers.length}）：`)
    lines.push('')

    for (const peer of peers) {
      const alive = peer.messagingSocketPath
        ? await isPeerAlive(peer.messagingSocketPath)
        : false
      const status = alive ? '可达' : '不可达'
      const label = peer.name ?? peer.kind ?? '交互式'
      const cwd = peer.cwd ? `  cwd: ${peer.cwd}` : ''
      const age = peer.startedAt
        ? `  started: ${formatAge(peer.startedAt)}`
        : ''

      lines.push(`  [${status}] PID ${peer.pid}（${label}）${cwd}${age}`)
      if (peer.messagingSocketPath) {
        lines.push(
          `           socket: ${formatUdsAddress(peer.messagingSocketPath)}`,
        )
      }
      if (peer.sessionId) {
        lines.push(`           session: ${peer.sessionId}`)
      }
    }
  }

  lines.push('')
  lines.push(
    '要给对等实例发消息：使用 SendMessage，并传入上面显示的 uds:<socket-path> 地址',
  )

  return { type: 'text', value: lines.join('\n') }
}

function formatAge(startedAt: number): string {
  const elapsed = Date.now() - startedAt
  const seconds = Math.floor(elapsed / 1000)
  if (seconds < 60) return `${seconds} 秒前`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} 小时 ${remainingMinutes} 分钟前`
}
