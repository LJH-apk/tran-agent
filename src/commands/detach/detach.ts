import type { LocalCommandCall } from '../../types/command.js'
import {
  removeSlaveClient,
  getAllSlaveClients,
} from '../../hooks/useMasterMonitor.js'
import { getPipeIpc, isPipeControlled } from '../../utils/pipeTransport.js'

export const call: LocalCommandCall = async (args, context) => {
  const currentState = context.getAppState()

  if (getPipeIpc(currentState).role === 'main') {
    return { type: 'text', value: 'Not attached to any CLI.' }
  }

  if (isPipeControlled(getPipeIpc(currentState))) {
    return {
      type: 'text',
      value:
        'This sub session is controlled by a master. The master must detach.',
    }
  }

  // Master mode
  const targetName = args.trim()

  if (targetName) {
    // Detach from a specific slave
    const client = removeSlaveClient(targetName)
    if (!client) {
      return {
        type: 'text',
        value: `未连接到“${targetName}”。可用 /status 查看已连接的子会话。`,
      }
    }

    try {
      client.send({ type: 'detach' })
    } catch {
      // Socket may already be closed
    }
    client.disconnect()

    // Remove slave from state
    context.setAppState(prev => {
      const { [targetName]: _removed, ...remainingSlaves } =
        getPipeIpc(prev).slaves
      const hasSlaves = Object.keys(remainingSlaves).length > 0
      return {
        ...prev,
        pipeIpc: {
          ...getPipeIpc(prev),
          role: hasSlaves ? 'master' : 'main',
          displayRole: hasSlaves ? 'master' : 'main',
          slaves: remainingSlaves,
        },
      }
    })

    return {
      type: 'text',
      value: `已与“${targetName}”分离。`,
    }
  }

  // No target specified — detach from ALL slaves
  const allClients = getAllSlaveClients()
  const slaveNames = Array.from(allClients.keys())

  for (const name of slaveNames) {
    const client = removeSlaveClient(name)
    if (client) {
      try {
        client.send({ type: 'detach' })
      } catch {
        // Ignore
      }
      client.disconnect()
    }
  }

  context.setAppState(prev => ({
    ...prev,
    pipeIpc: {
      ...getPipeIpc(prev),
      role: 'main',
      displayRole: 'main',
      slaves: {},
    },
  }))

  return {
    type: 'text',
    value: `已与 ${slaveNames.length} 个子会话分离：${slaveNames.join(', ')}。已回到主模式。`,
  }
}
