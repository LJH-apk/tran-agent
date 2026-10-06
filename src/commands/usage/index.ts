import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'usage',
  aliases: ['cost', 'stats'],
  description: '显示会话花费、套餐用量与活动统计',
  load: () => import('./usage.js'),
} satisfies Command
