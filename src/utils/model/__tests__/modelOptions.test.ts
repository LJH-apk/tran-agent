import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { resetModelStringsForTestingOnly } from '../../../bootstrap/state.js'
import {
  resetSettingsCache,
  setSessionSettingsCache,
} from '../../settings/settingsCache.js'
import { getModelOptions } from '../modelOptions.js'
import { parseUserSpecifiedModel } from '../model.js'

const keys = [
  'USER_TYPE',
  'ANTHROPIC_API_KEY',
  'ANTHROPIC_BASE_URL',
  'ANTHROPIC_MODEL',
  'ANTHROPIC_DEFAULT_OPUS_MODEL',
  'ANTHROPIC_DEFAULT_SONNET_MODEL',
  'ANTHROPIC_DEFAULT_HAIKU_MODEL',
  'ANTHROPIC_DEFAULT_OPUS_MODEL_NAME',
  'ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION',
  'CLAUDE_CODE_USE_OPENAI',
  'CLAUDE_CODE_USE_GEMINI',
  'CLAUDE_CODE_USE_GROK',
  'CLAUDE_CODE_USE_BEDROCK',
  'CLAUDE_CODE_USE_VERTEX',
  'CLAUDE_CODE_USE_FOUNDRY',
  'OPENAI_MODEL',
  'OPENAI_AUTH_MODE',
  'OPENAI_DEFAULT_OPUS_MODEL',
  'OPENAI_DEFAULT_SONNET_MODEL',
  'OPENAI_DEFAULT_HAIKU_MODEL',
  'GEMINI_MODEL',
  'GEMINI_DEFAULT_OPUS_MODEL',
  'GEMINI_DEFAULT_SONNET_MODEL',
  'GEMINI_DEFAULT_HAIKU_MODEL',
  'GROK_MODEL',
] as const

describe('configured model picker options', () => {
  const saved: Record<string, string | undefined> = {}
  beforeEach(() => {
    for (const key of keys) {
      saved[key] = process.env[key]
      delete process.env[key]
    }
    process.env.ANTHROPIC_API_KEY = 'test-model-options-key'
    resetSettingsCache()
    setSessionSettingsCache({ settings: {}, errors: [] })
    resetModelStringsForTestingOnly()
  })
  afterEach(() => {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key]
      else process.env[key] = saved[key]
    }
    resetSettingsCache()
    setSessionSettingsCache({ settings: {}, errors: [] })
    resetModelStringsForTestingOnly()
  })

  test('shows configured Anthropic model names for compatible and official endpoints', () => {
    for (const url of [
      'https://relay.example.com/anthropic',
      'https://api.anthropic.com',
    ]) {
      process.env.ANTHROPIC_BASE_URL = url
      process.env.ANTHROPIC_DEFAULT_OPUS_MODEL = 'claude-opus-5[1m]'
      process.env.ANTHROPIC_DEFAULT_SONNET_MODEL = 'claude-sonnet-5-5'
      process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL = 'claude-haiku-4-5-20251001'
      const options = getModelOptions()
      for (const family of ['opus', 'sonnet', 'haiku']) {
        const option = options.find(option => option.value === family)
        expect(option).toBeDefined()
        expect(option!.label).toBe(parseUserSpecifiedModel(family))
      }
      expect(options.some(option => option.label === 'Opus 4.7')).toBe(false)
    }
  })

  test('honors custom labels and keeps unconfigured families available', () => {
    process.env.ANTHROPIC_DEFAULT_OPUS_MODEL = 'custom-opus'
    process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME = '团队模型'
    process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION = '团队配置的 Opus'
    const options = getModelOptions()
    expect(options.find(option => option.value === 'opus')).toMatchObject({
      label: '团队模型',
      description: '团队配置的 Opus',
    })
    expect(options.some(option => option.value === null)).toBe(true)
    expect(options.some(option => option.label.includes('Sonnet'))).toBe(true)
    expect(options.some(option => option.label === 'Haiku')).toBe(true)
  })

  test('shows the primary model on an Anthropic-compatible endpoint without built-in Claude choices', () => {
    process.env.ANTHROPIC_BASE_URL = 'https://deepseek.example.com/anthropic'
    process.env.ANTHROPIC_MODEL = 'deepseek-chat'
    const options = getModelOptions()
    expect(options.filter(option => option.value !== null)).toEqual([
      expect.objectContaining({
        value: 'deepseek-chat',
        label: 'deepseek-chat',
      }),
    ])
  })

  test('reads primary models and family mappings on Anthropic-compatible endpoints', () => {
    process.env.ANTHROPIC_BASE_URL = 'https://deepseek.example.com/anthropic'
    process.env.ANTHROPIC_DEFAULT_OPUS_MODEL = 'deepseek-reasoner'
    process.env.ANTHROPIC_DEFAULT_SONNET_MODEL = 'deepseek-chat'
    setSessionSettingsCache({
      settings: { model: 'deepseek-chat' },
      errors: [],
    })
    const options = getModelOptions().filter(option => option.value !== null)
    expect(options.map(option => option.label)).toEqual([
      'deepseek-reasoner',
      'deepseek-chat',
    ])
    expect(
      options.map(option => parseUserSpecifiedModel(option.value!)),
    ).toEqual(['deepseek-reasoner', 'deepseek-chat'])
  })

  test('shows the OpenAI-compatible primary model once instead of built-in Claude choices', () => {
    process.env.CLAUDE_CODE_USE_OPENAI = '1'
    process.env.OPENAI_MODEL = 'deepseek-v4-flash'
    const options = getModelOptions()
    expect(
      options.filter(option => option.label === 'deepseek-v4-flash'),
    ).toHaveLength(1)
    expect(
      options.some(option =>
        /Opus 4|Sonnet 4|Haiku 4/.test(option.description),
      ),
    ).toBe(false)
    const option = options.find(option => option.label === 'deepseek-v4-flash')!
    expect(parseUserSpecifiedModel(option.value!)).toBe('deepseek-v4-flash')
  })

  test('uses provider tier overrides before primary models and honors Anthropic fallback mappings', () => {
    process.env.CLAUDE_CODE_USE_OPENAI = '1'
    process.env.OPENAI_MODEL = 'deepseek-v4-flash'
    process.env.OPENAI_DEFAULT_OPUS_MODEL = 'deepseek-v4-pro'
    process.env.ANTHROPIC_DEFAULT_SONNET_MODEL = 'team-sonnet'
    const options = getModelOptions()
    for (const name of [
      'deepseek-v4-flash',
      'deepseek-v4-pro',
      'team-sonnet',
    ]) {
      const option = options.find(option => option.label === name)
      expect(option).toBeDefined()
      expect(parseUserSpecifiedModel(option!.value!)).toBe(name)
    }
  })

  test('shows primary models for Gemini and Grok without duplicate family aliases', () => {
    for (const provider of ['gemini', 'grok'] as const) {
      delete process.env.CLAUDE_CODE_USE_GEMINI
      delete process.env.CLAUDE_CODE_USE_GROK
      process.env[`CLAUDE_CODE_USE_${provider.toUpperCase()}`] = '1'
      process.env.GEMINI_MODEL = 'team-gemini'
      process.env.GROK_MODEL = 'team-grok'
      const options = getModelOptions()
      const model = `team-${provider}`
      expect(options.filter(option => option.label === model)).toHaveLength(1)
      const option = options.find(option => option.label === model)!
      expect(parseUserSpecifiedModel(option.value!)).toBe(model)
    }
  })
})
