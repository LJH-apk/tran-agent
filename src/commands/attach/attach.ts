import { feature } from 'bun:bundle'
import type { LocalCommandCall } from '../../types/command.js'
import {
  connectToPipe,
  getPipeIpc,
  isPipeControlled,
  type PipeClient,
  type PipeMessage,
  type TcpEndpoint,
} from '../../utils/pipeTransport.js'
import { addSlaveClient } from '../../hooks/useMasterMonitor.js'

export const call: LocalCommandCall = async (args, context) => {
  const targetName = args.trim()
  if (!targetName) {
    return {
      type: 'text',
      value: 'Usage: /attach <pipe-name>\nUse /pipes to list available pipes.',
    }
  }

  const currentState = context.getAppState()

  // Check if already attached to this slave
  if (getPipeIpc(currentState).slaves[targetName]) {
    return {
      type: 'text',
      value: `已连接到“${targetName}”。`,
    }
  }

  // Controlled sub sessions cannot attach to other sub sessions.
  if (isPipeControlled(getPipeIpc(currentState))) {
    return {
      type: 'text',
      value:
        'Cannot attach: this sub is currently controlled by a master. Detach it from the master first.',
    }
  }

  // Resolve TCP endpoint for LAN peers
  let tcpEndpoint: TcpEndpoint | undefined
  if (feature('LAN_PIPES')) {
    const pipeState = getPipeIpc(currentState)
    const discoveredPeer = pipeState.discoveredPipes.find(
      (p: { pipeName: string }) => p.pipeName === targetName,
    )
    if (discoveredPeer) {
      // Check if this is a LAN peer by looking up beacon data
      const { getLanBeacon } =
        require('../../utils/lanBeacon.js') as typeof import('../../utils/lanBeacon.js')
      const beaconRef = getLanBeacon()
      if (beaconRef) {
        const lanPeers = beaconRef.getPeers()
        const lanPeer = lanPeers.get(targetName)
        if (lanPeer) {
          tcpEndpoint = { host: lanPeer.ip, port: lanPeer.tcpPort }
        }
      }
    }
  }

  // Connect to the target pipe server (UDS or TCP)
  let client: PipeClient
  try {
    const myName =
      getPipeIpc(currentState).serverName ?? `master-${process.pid}`
    client = await connectToPipe(targetName, myName, undefined, tcpEndpoint)
  } catch (err) {
    return {
      type: 'text',
      value: `Failed to connect to "${targetName}"${tcpEndpoint ? ` (TCP ${tcpEndpoint.host}:${tcpEndpoint.port})` : ''}: ${err instanceof Error ? err.message : String(err)}`,
    }
  }

  // Send attach request and wait for response
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      client.disconnect()
      resolve({
        type: 'text',
        value: `连接“${targetName}”超时（5 秒内无响应）。`,
      })
    }, 5000)

    client.onMessage((msg: PipeMessage) => {
      if (msg.type === 'attach_accept') {
        clearTimeout(timeout)

        // Register the slave client in the module-level registry
        addSlaveClient(targetName, client)

        // Update AppState: add slave and switch to master role
        context.setAppState(prev => ({
          ...prev,
          pipeIpc: {
            ...getPipeIpc(prev),
            role: 'master',
            displayRole: 'master',
            slaves: {
              ...getPipeIpc(prev).slaves,
              [targetName]: {
                name: targetName,
                connectedAt: new Date().toISOString(),
                status: 'idle' as const,
                unreadCount: 0,
                history: [],
              },
            },
          },
        }))

        const slaveCount =
          Object.keys(getPipeIpc(currentState).slaves).length + 1
        resolve({
          type: 'text',
          value: `已作为主会话连接到“${targetName}”，正在监控 ${slaveCount} 个子会话。\n用 /send ${targetName} <消息> 发送任务。\n用 /status 查看所有已连接的子会话。\n用 /detach ${targetName} 断开连接。`,
        })
      } else if (msg.type === 'attach_reject') {
        clearTimeout(timeout)
        client.disconnect()

        resolve({
          type: 'text',
          value: `连接被“${targetName}”拒绝：${msg.data ?? 'unknown reason'}`,
        })
      }
    })

    // Include machineId so remote can distinguish LAN peers from local peers
    const pipeState = getPipeIpc(currentState)
    client.send({
      type: 'attach_request',
      meta: { machineId: pipeState.machineId },
    })
  })
}
