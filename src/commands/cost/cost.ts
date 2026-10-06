import { formatTotalCost } from '../../cost-tracker.js'
import { currentLimits } from '../../services/claudeAiLimits.js'
import type { LocalCommandCall } from '../../types/command.js'
import { isClaudeAISubscriber } from '../../utils/auth.js'

export const call: LocalCommandCall = async () => {
  if (isClaudeAISubscriber()) {
    let value: string

    if (currentLimits.isUsingOverage) {
      value =
        '您当前正在使用超额用量支撑 Tran Agent。额度重置后，我们会自动切换回您的订阅额度。'
    } else {
      value =
        '您当前正在使用订阅额度支撑 Tran Agent。'
    }

    if (process.env.USER_TYPE === 'ant') {
      value += `\n\n[仅内部] 仍显示费用：\n ${formatTotalCost()}`
    }
    return { type: 'text', value }
  }
  return { type: 'text', value: formatTotalCost() }
}
