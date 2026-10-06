import type { Command } from '../../commands.js'

const fork = {
  type: 'local-jsx',
  name: 'fork',
  description: '把当前会话派生为一个新的子智能体',
  argumentHint: '<prompt>',
  load: () => import('./fork.js'),
} satisfies Command

export default fork
