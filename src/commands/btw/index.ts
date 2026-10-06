import type { Command } from '../../commands.js'

const btw = {
  type: 'local-jsx',
  name: 'btw',
  description:
    '问个顺带的小问题，不打断主对话',
  immediate: true,
  argumentHint: '<问题>',
  load: () => import('./btw.js'),
} satisfies Command

export default btw
