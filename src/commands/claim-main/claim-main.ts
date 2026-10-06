import type { LocalCommandCall } from '../../types/command.js'
import { getPipeIpc } from '../../utils/pipeTransport.js'
import {
  getMachineId,
  getMacAddress,
  claimMain,
  readRegistry,
} from '../../utils/pipeRegistry.js'
import { getLocalIp } from '../../utils/pipeTransport.js'

export const call: LocalCommandCall = async (_args, context) => {
  const currentState = context.getAppState()
  const pipeState = getPipeIpc(currentState)
  const myName = pipeState.serverName

  if (!myName) {
    return {
      type: 'text',
      value: 'Pipe server not started. Cannot claim main.',
    }
  }

  const machineId = await getMachineId()
  const registry = await readRegistry()

  // Already main machine?
  if (registry.mainMachineId === machineId && registry.main?.id === myName) {
    return {
      type: 'text',
      value: 'This instance is already the main. No change needed.',
    }
  }

  const { hostname } = require('os') as typeof import('os')

  const entry = {
    id: myName,
    pid: process.pid,
    machineId,
    startedAt: Date.now(),
    ip: getLocalIp(),
    mac: getMacAddress(),
    hostname: hostname(),
    pipeName: myName,
  }

  await claimMain(machineId, entry)

  // Update local state
  context.setAppState(prev => ({
    ...prev,
    pipeIpc: {
      ...getPipeIpc(prev),
      role: 'main',
      subIndex: null,
      displayRole: 'main',
      machineId,
      attachedBy: null,
    },
  }))

  const lines: string[] = []
  lines.push('已成功认领主角色。')
  lines.push(`机器 ID：${machineId.slice(0, 8)}...`)
  lines.push(`管道：      ${myName}`)
  if (registry.mainMachineId && registry.mainMachineId !== machineId) {
    lines.push(
      `原主机器：${registry.mainMachineId.slice(0, 8)}...`,
    )
  }
  lines.push('')
  lines.push('所有已有的子实例现已绑定到本实例。')
  lines.push('用 /pipes 验证。')

  return { type: 'text', value: lines.join('\n') }
}
