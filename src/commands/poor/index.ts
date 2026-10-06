import type { Command } from '../../commands.js'

const poor = {
  type: 'local',
  name: 'poor',
  description:
    '切换省流模式——关闭 extract_memories 与 prompt_suggestion 以节省 token',
  supportsNonInteractive: false,
  load: () => import('./poor.js'),
} satisfies Command

export default poor
