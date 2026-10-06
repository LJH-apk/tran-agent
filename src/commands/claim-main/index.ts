import type { Command } from '../../commands.js'

const claimMain = {
  type: 'local',
  name: 'claim-main',
  description:
    '把主实例角色抢到本机（覆盖当前主实例）',
  supportsNonInteractive: false,
  load: () => import('./claim-main.js'),
} satisfies Command

export default claimMain
