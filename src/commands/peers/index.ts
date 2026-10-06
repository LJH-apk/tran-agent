import type { Command } from '../../commands.js'

const peers = {
  type: 'local',
  name: 'peers',
  aliases: ['who'],
  description: '列出已连接的 Tran Agent 对等实例',
  supportsNonInteractive: true,
  load: () => import('./peers.js'),
} satisfies Command

export default peers
