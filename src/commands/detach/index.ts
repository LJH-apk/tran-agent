import type { Command } from '../../commands.js'

const detach = {
  type: 'local',
  name: 'detach',
  description: '断开与某个子 CLI 的连接（或断开全部已连接子实例）',
  supportsNonInteractive: false,
  load: () => import('./detach.js'),
} satisfies Command

export default detach
