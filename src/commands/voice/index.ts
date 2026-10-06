import type { Command } from '../../commands.js'
import { isVoiceAvailable } from '../../voice/voiceModeEnabled.js'

const voice = {
  type: 'local',
  name: 'voice',
  description: '切换语音模式。用 /voice doubao 使用豆包 ASR 后端',
  isEnabled: () => isVoiceAvailable(),
  get isHidden() {
    return !isVoiceAvailable()
  },
  supportsNonInteractive: false,
  load: () => import('./voice.js'),
} satisfies Command

export default voice
