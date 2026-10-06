import type { Command } from '../../commands.js'

const pipes = {
  type: 'local',
  name: 'pipes',
  description: '查看管道注册表状态并切换管道选择器',
  supportsNonInteractive: true,
  load: () => import('./pipes.js'),
} satisfies Command

export default pipes
