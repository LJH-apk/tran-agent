import type { Command } from '../../commands.js'

const attach = {
  type: 'local',
  name: 'attach',
  description: '通过命名管道接入一个子 CLI 实例',
  supportsNonInteractive: false,
  load: () => import('./attach.js'),
} satisfies Command

export default attach
