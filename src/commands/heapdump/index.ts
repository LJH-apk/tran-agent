import type { Command } from '../../commands.js'

const heapDump = {
  type: 'local',
  name: 'heapdump',
  description: '把 JS 堆转储到 ~/Desktop',
  isHidden: true,
  supportsNonInteractive: true,
  load: () => import('./heapdump.js'),
} satisfies Command

export default heapDump
