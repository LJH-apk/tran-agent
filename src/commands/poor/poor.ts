import type { LocalCommandCall } from '../../types/command.js'
import { isPoorModeActive, setPoorMode } from './poorMode.js'

export const call: LocalCommandCall = async (_, context) => {
  const currentlyActive = isPoorModeActive()
  const newState = !currentlyActive
  setPoorMode(newState)

  if (newState) {
    // Disable prompt suggestion in AppState
    context.setAppState(prev => ({
      ...prev,
      promptSuggestionEnabled: false,
    }))
  } else {
    // Re-enable prompt suggestion
    context.setAppState(prev => ({
      ...prev,
      promptSuggestionEnabled: true,
    }))
  }

  const status = newState ? 'ON' : 'OFF'
  const details = newState
    ? 'extract_memories 与 prompt_suggestion 已禁用'
    : 'extract_memories 与 prompt_suggestion 已恢复'
  return { type: 'text', value: `省电模式 ${status} —— ${details}` }
}
