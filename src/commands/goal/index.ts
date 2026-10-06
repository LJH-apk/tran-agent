import type { Command } from 'src/commands.js'

const goal = {
  type: 'local-jsx',
  name: 'goal',
  description:
    '设置或查看一个持久目标，用于驱动跨轮次的自动续跑',
  argumentHint: '[<objective> | status | clear | pause | resume | complete]',
  bridgeSafe: false,
  load: () => import('./goal.js'),
} satisfies Command

export default goal
