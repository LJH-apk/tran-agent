import type { Command } from '../../commands.js'
import { isEnvTruthy } from '../../utils/envUtils.js'

const compact = {
  type: 'local',
  name: 'compact',
  description:
    '清空对话历史，但在上下文中保留一份摘要。可选：/compact [摘要要求]',
  isEnabled: () => !isEnvTruthy(process.env.DISABLE_COMPACT),
  supportsNonInteractive: true,
  argumentHint: '<可选的自定义摘要指令>',
  load: () => import('./compact.js'),
} satisfies Command

export default compact
