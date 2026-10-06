import type { Command } from '../../commands.js'

const plan = {
  bridgeSafe: true,
  getBridgeInvocationError(args: string) {
    const subcommand = args.trim().split(/\s+/)[0]
    if (subcommand === 'open') {
      return "通过 /plan open 打开本地编辑器在远程控制模式下不可用。"
    }
    return undefined
  },
  type: 'local-jsx',
  name: 'plan',
  description: '开启计划模式，或查看当前会话的方案',
  argumentHint: '[open|<description>]',
  load: () => import('./plan.js'),
} satisfies Command

export default plan
