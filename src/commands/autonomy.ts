import type { Command } from '../types/command.js'

const autonomy = {
  type: 'local-jsx',
  name: 'autonomy',
  description:
    '查看主动运行与定时任务的自动执行记录',
  argumentHint:
    '[status [--deep]|runs [limit]|flows [limit]|flow <id>|flow cancel <id>|flow resume <id>]',
  load: () => import('./autonomyPanel.js'),
} satisfies Command

export default autonomy
