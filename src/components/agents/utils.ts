import capitalize from 'lodash-es/capitalize.js'
import type { SettingSource } from 'src/utils/settings/constants.js'
import { getSettingSourceName } from 'src/utils/settings/constants.js'

export function getAgentSourceDisplayName(
  source: SettingSource | 'all' | 'built-in' | 'plugin',
): string {
  if (source === 'all') {
    return '智能体'
  }
  if (source === 'built-in') {
    return '内置智能体'
  }
  if (source === 'plugin') {
    return '插件智能体'
  }
  return capitalize(getSettingSourceName(source))
}
