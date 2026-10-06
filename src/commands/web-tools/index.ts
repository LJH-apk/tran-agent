import type { Command } from '../../commands.js'

const webTools = {
  type: 'local-jsx',
  name: 'web-tools',
  description: '配置网页搜索与网页抓取的后端',
  load: () => import('./web-tools.js'),
} satisfies Command

export default webTools
