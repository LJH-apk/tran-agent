import type { LocalCommandCall } from '../../types/command.js'
import { getSlaveClient } from '../../hooks/useMasterMonitor.js'
import { getPipeIpc } from '../../utils/pipeTransport.js'
import {
  addSendOverride,
  removeSendOverride,
  removeMasterPipeMute,
} from '../../utils/pipeMuteState.js'

export const call: LocalCommandCall = async (args, context) => {
  const currentState = context.getAppState()

  if (getPipeIpc(currentState).role !== 'master') {
    return {
      type: 'text',
      value: 'Not in master mode. Use /attach <pipe-name> first.',
    }
  }

  // Parse: first word is pipe name, rest is the message
  const trimmed = args.trim()
  const spaceIdx = trimmed.indexOf(' ')
  if (spaceIdx === -1) {
    return {
      type: 'text',
      value: 'Usage: /send <pipe-name> <message>',
    }
  }

  const targetName = trimmed.slice(0, spaceIdx)
  const message = trimmed.slice(spaceIdx + 1).trim()

  if (!message) {
    return {
      type: 'text',
      value: 'Usage: /send <pipe-name> <message>',
    }
  }

  const client = getSlaveClient(targetName)
  if (!client) {
    return {
      type: 'text',
      value: `未连接到 "${targetName}"。使用 /status 查看已连接的子会话。`,
    }
  }

  if (!client.connected) {
    return {
      type: 'text',
      value: `与 "${targetName}" 的连接已关闭。请使用 /detach ${targetName} 后重新连接。`,
    }
  }

  try {
    // Temporarily override mute for this slave so its response is visible.
    // Override lasts until the slave emits 'done' or 'error' (cleared by
    // useMasterMonitor's attachPipeEntryEmitter handler).
    addSendOverride(targetName)
    removeMasterPipeMute(targetName)
    client.send({ type: 'relay_unmute' })
    client.send({
      type: 'prompt',
      data: message,
    })

    // Record the sent prompt in history
    context.setAppState(prev => {
      const slave = getPipeIpc(prev).slaves[targetName]
      if (!slave) return prev
      return {
        ...prev,
        pipeIpc: {
          ...getPipeIpc(prev),
          slaves: {
            ...getPipeIpc(prev).slaves,
            [targetName]: {
              ...slave,
              status: 'busy' as const,
              lastActivityAt: new Date().toISOString(),
              lastSummary: `已排队：${message}`,
              lastEventType: 'prompt',
              history: [
                ...slave.history,
                {
                  type: 'prompt' as const,
                  content: message,
                  from: getPipeIpc(currentState).serverName ?? 'master',
                  timestamp: new Date().toISOString(),
                },
              ],
            },
          },
        },
      }
    })

    return {
      type: 'text',
      value: `已发送到 "${targetName}"：${message.slice(0, 100)}${message.length > 100 ? '...' : ''}`,
    }
  } catch (err) {
    // Roll back override on send failure to prevent permanent unmute
    removeSendOverride(targetName)
    return {
      type: 'text',
      value: `发送到 "${targetName}" 失败：${err instanceof Error ? err.message : String(err)}`,
    }
  }
}
