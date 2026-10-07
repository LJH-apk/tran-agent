/** Translate task status for display, leaving stored status values unchanged. */
export function getTaskStatusLabel(status: string): string {
  switch (status) {
    case 'pending':
      return '等待中'
    case 'running':
    case 'in_progress':
      return '运行中'
    case 'completed':
      return '已完成'
    case 'failed':
      return '失败'
    case 'killed':
      return '已停止'
    default:
      return status
  }
}
