import type { LocalCommandCall } from '../../types/command.js'
import { getAllSlaveClients } from '../../hooks/useMasterMonitor.js'
import {
  getPipeDisplayRole,
  getPipeIpc,
  isPipeControlled,
} from '../../utils/pipeTransport.js'

export const call: LocalCommandCall = async (_args, context) => {
  const currentState = context.getAppState()

  if (getPipeIpc(currentState).role === 'main') {
    return {
      type: 'text',
      value:
        'Main mode — not connected to any CLIs.\n使用 /attach <管道名> 连接子会话。',
    }
  }

  if (isPipeControlled(getPipeIpc(currentState))) {
    return {
      type: 'text',
      value: `${getPipeDisplayRole(getPipeIpc(currentState))} 模式——由 "${getPipeIpc(currentState).attachedBy}" 控制。\n所有会话数据都会上报给主会话。`,
    }
  }

  // Master mode
  const slaves = getPipeIpc(currentState).slaves
  const slaveNames = Object.keys(slaves)
  const clients = getAllSlaveClients()

  if (slaveNames.length === 0) {
    return {
      type: 'text',
      value:
        'Master mode but no sub sessions connected.\n使用 /attach <管道名> 进行连接。',
    }
  }

  const lines: string[] = [
    `主模式——已连接 ${slaveNames.length} 个子会话：`,
    '',
  ]

  for (const name of slaveNames) {
    const slave = slaves[name]!
    const client = clients.get(name)
    const connected = client?.connected ? '已连接' : '已断开'
    const historyCount = slave.history.length
    const connectedAt = slave.connectedAt.slice(11, 19)

    lines.push(`  ${name}`)
    lines.push(`    状态：    ${slave.status} (${connected})`)
    lines.push(`    连接时间：${connectedAt}`)
    lines.push(`    历史记录：${historyCount} 条`)
    lines.push('')
  }

  lines.push('可用命令：')
  lines.push('  /send <name> <msg>  — 向子会话发送任务')
  lines.push('  /history <name>     — 查看子会话记录')
  lines.push('  /detach [name]      — 断开与某个子会话（或全部）的连接')

  return { type: 'text', value: lines.join('\n') }
}
