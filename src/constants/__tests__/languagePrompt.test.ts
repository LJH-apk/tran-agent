import { describe, expect, test } from 'bun:test'
import { getLanguageSection } from '../languagePrompt.js'

describe('getLanguageSection', () => {
  test('defaults to Simplified Chinese and preserves explicit user requests', () => {
    const prompt = getLanguageSection()
    expect(prompt).toContain('默认使用简体中文回复用户')
    expect(prompt).toContain('若用户明确要求使用其他语言')
    expect(prompt).toContain('工具调用中面向用户的说明')
    expect(prompt).toContain('保留原样')
    expect(getLanguageSection('   ')).toBe(prompt)
  })
  test('honors an explicitly configured response language', () => {
    expect(getLanguageSection('Japanese')).toContain('Always respond in Japanese')
    expect(getLanguageSection('Japanese')).not.toContain('默认使用简体中文')
  })
})
