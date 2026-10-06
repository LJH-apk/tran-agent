import type { Command, LocalJSXCommandOnDone } from '../types/command.js'
import type { ReactNode } from 'react'

const call = async (onDone: LocalJSXCommandOnDone): Promise<ReactNode> => {
  onDone(
    'torch：保留的内部调试命令。当前版本中无可用实现。',
    { display: 'system' },
  )
  return null
}

export default {
  type: 'local-jsx',
  name: 'torch',
  description: '[INTERNAL] Development debug command (reserved)',
  isEnabled: () => true,
  isHidden: true,
  load: () => Promise.resolve({ call }),
} satisfies Command
