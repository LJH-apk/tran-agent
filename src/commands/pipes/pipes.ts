import { feature } from 'bun:bundle'
import type { LocalCommandCall } from '../../types/command.js'
import {
  isPipeAlive,
  getPipeIpc,
  getPipeDisplayRole,
  isPipeControlled,
} from '../../utils/pipeTransport.js'
import {
  cleanupStaleEntries,
  readRegistry,
  isMainMachine,
  mergeWithLanPeers,
} from '../../utils/pipeRegistry.js'

export const call: LocalCommandCall = async (_args, context) => {
  const args = _args.trim()

  // Enable status line + toggle selector open
  context.setAppState(prev => {
    const pipeIpc = getPipeIpc(prev)
    return {
      ...prev,
      pipeIpc: {
        ...pipeIpc,
        statusVisible: true,
        selectorOpen: !pipeIpc.selectorOpen,
      },
    }
  })

  // Handle select/deselect subcommands
  if (args.startsWith('select ') || args.startsWith('sel ')) {
    const pipeName = args.replace(/^(select|sel)\s+/, '').trim()
    if (!pipeName)
      return { type: 'text', value: 'Usage: /pipes select <pipe-name>' }
    context.setAppState(prev => {
      const pipeIpc = getPipeIpc(prev)
      const selected = pipeIpc.selectedPipes ?? []
      if (selected.includes(pipeName)) return prev
      return {
        ...prev,
        pipeIpc: { ...pipeIpc, selectedPipes: [...selected, pipeName] },
      }
    })
    return {
      type: 'text',
      value: `已选择 ${pipeName} —— 消息将广播到该管道。`,
    }
  }

  if (
    args.startsWith('deselect ') ||
    args.startsWith('desel ') ||
    args.startsWith('unsel ')
  ) {
    const pipeName = args.replace(/^(deselect|desel|unsel)\s+/, '').trim()
    if (!pipeName)
      return { type: 'text', value: 'Usage: /pipes deselect <pipe-name>' }
    context.setAppState(prev => {
      const pipeIpc = getPipeIpc(prev)
      const selected = (pipeIpc.selectedPipes ?? []).filter(
        (n: string) => n !== pipeName,
      )
      return { ...prev, pipeIpc: { ...pipeIpc, selectedPipes: selected } }
    })
    return { type: 'text', value: `已取消选择 ${pipeName}。` }
  }

  if (args === 'select-all' || args === 'all') {
    const currentState = context.getAppState()
    const pipeState = getPipeIpc(currentState)
    const slaveNames = Object.keys(pipeState.slaves)
    context.setAppState(prev => ({
      ...prev,
      pipeIpc: { ...getPipeIpc(prev), selectedPipes: slaveNames },
    }))
    return {
      type: 'text',
      value: `已选择全部 ${slaveNames.length} 个已连接管道。`,
    }
  }

  if (args === 'deselect-all' || args === 'none') {
    context.setAppState(prev => ({
      ...prev,
      pipeIpc: { ...getPipeIpc(prev), selectedPipes: [] },
    }))
    return {
      type: 'text',
      value: 'Deselected all pipes. Messages will only run locally.',
    }
  }

  const currentState = context.getAppState()
  const pipeState = getPipeIpc(currentState)
  const myName = pipeState.serverName
  const displayRole = getPipeDisplayRole(pipeState)
  const selected: string[] = pipeState.selectedPipes ?? []

  await cleanupStaleEntries()
  const registry = await readRegistry()

  const lines: string[] = []

  lines.push(`你的管道：   ${myName ?? '(not started)'}`)
  lines.push(`角色：       ${displayRole}`)
  if (pipeState.machineId)
    lines.push(`机器 ID：    ${pipeState.machineId.slice(0, 8)}...`)
  if (pipeState.localIp) lines.push(`IP：         ${pipeState.localIp}`)
  if (pipeState.hostname) lines.push(`主机：       ${pipeState.hostname}`)

  if (isPipeControlled(pipeState)) {
    lines.push(`控制方：${pipeState.attachedBy}`)
  }

  lines.push('')

  if (registry.mainMachineId) {
    const isMyMachine = isMainMachine(pipeState.machineId ?? '', registry)
    lines.push(
      `主机器：${registry.mainMachineId.slice(0, 8)}...${isMyMachine ? ' (this machine)' : ''}`,
    )
  }

  // Show main from registry
  if (registry.main) {
    const m = registry.main
    const alive = await isPipeAlive(m.pipeName, 1000)
    const isSelf = m.pipeName === myName
    lines.push(
      `  [主] ${m.pipeName}  ${m.hostname}/${m.ip}  [${alive ? 'alive' : 'stale'}]${isSelf ? ' (you)' : ''}`,
    )
  }

  // Show subs from registry with selection status
  const discoveredPipes: Array<{
    id: string
    pipeName: string
    role: string
    machineId: string
    ip: string
    hostname: string
    alive: boolean
  }> = []

  for (const sub of registry.subs) {
    const alive = await isPipeAlive(sub.pipeName, 1000)
    const isSelf = sub.pipeName === myName
    const isSelected = selected.includes(sub.pipeName)
    const checkbox = isSelected ? '☑' : '☐'
    const isAttached = pipeState.slaves[sub.pipeName] ? ' [已连接]' : ''
    lines.push(
      `  ${checkbox} [子-${sub.subIndex}] ${sub.pipeName}  ${sub.hostname}/${sub.ip}  [${alive ? 'alive' : 'stale'}]${isAttached}${isSelf ? ' (you)' : ''}`,
    )
    if (alive) {
      discoveredPipes.push({
        id: sub.id,
        pipeName: sub.pipeName,
        role: `sub-${sub.subIndex}`,
        machineId: sub.machineId,
        ip: sub.ip,
        hostname: sub.hostname,
        alive,
      })
    }
  }

  if (!registry.main && registry.subs.length === 0) {
    lines.push('注册表中没有其他管道。')
  }

  // Show LAN peers (if LAN_PIPES enabled)
  if (feature('LAN_PIPES')) {
    const { getLanBeacon } =
      require('../../utils/lanBeacon.js') as typeof import('../../utils/lanBeacon.js')
    const lanBeaconRef = getLanBeacon()
    if (lanBeaconRef) {
      const lanPeers = lanBeaconRef.getPeers()
      const merged = mergeWithLanPeers(registry, lanPeers)
      const lanOnly = merged.filter(e => e.source === 'lan')
      if (lanOnly.length > 0) {
        lines.push('')
        lines.push('局域网对等节点：')
        for (const peer of lanOnly) {
          const isSelected = selected.includes(peer.pipeName)
          const checkbox = isSelected ? '☑' : '☐'
          const ep = peer.tcpEndpoint
            ? `tcp:${peer.tcpEndpoint.host}:${peer.tcpEndpoint.port}`
            : ''
          lines.push(
            `  ${checkbox} [${peer.role}] ${peer.pipeName}  ${peer.hostname}/${peer.ip}  ${ep}  [局域网]`,
          )
          discoveredPipes.push({
            id: peer.id,
            pipeName: peer.pipeName,
            role: peer.role,
            machineId: peer.machineId,
            ip: peer.ip,
            hostname: peer.hostname,
            alive: true,
          })
        }
      } else {
        lines.push('')
        lines.push('局域网对等节点：（未发现）')
      }
    }
  }

  // Update state
  context.setAppState(prev => ({
    ...prev,
    pipeIpc: { ...getPipeIpc(prev), discoveredPipes },
  }))

  lines.push('')
  lines.push(
    `已选择：${selected.length > 0 ? selected.join(', ') : '(none — messages run locally only)'}`,
  )
  lines.push('')
  lines.push('命令：')
  lines.push('  /pipes select <name>    — 选择要广播的管道')
  lines.push('  /pipes deselect <name>  — 取消选择管道')
  lines.push('  /pipes all              — 选择所有已连接的管道')
  lines.push('  /pipes none             — 取消选择全部')
  lines.push('  /send <name> <msg>      — 发送到指定管道')
  lines.push('  /claim-main             — 将本机设为主机')

  return { type: 'text', value: lines.join('\n') }
}
