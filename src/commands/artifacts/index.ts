import type { Command } from '../../commands.js'

const artifacts = {
  type: 'local-jsx',
  name: 'artifacts',
  description:
    '列出本次会话上传到 cloud-artifacts 的 HTML 制品',
  isEnabled: () => true,
  load: () => import('./artifacts.js'),
} satisfies Command

export default artifacts
