import { describe, expect, test } from 'bun:test'
import {
  getInitial1MSelections,
  getModelPickerSelection,
} from '../modelPickerContext.js'

const resolve = (value: string): string => {
  if (value === 'opus') return 'claude-opus-5-5[1m]'
  if (value === 'sonnet') return 'claude-sonnet-5-5[1m]'
  return value
}

describe('model picker context state', () => {
  test('matches a full session model to its menu alias and initializes configured 1M options', () => {
    const marked = getInitial1MSelections(
      [null, 'opus', 'sonnet', 'haiku'],
      'claude-opus-5-5[1m]',
      resolve,
    )
    expect(marked.has('opus')).toBe(true)
    expect(marked.has('claude-opus-5-5')).toBe(true)
    expect(marked.has('sonnet')).toBe(true)
    expect(marked.has('haiku')).toBe(false)
  })

  test('preserves an explicit non-1M session override of a configured alias', () => {
    expect(
      getInitial1MSelections(['opus'], 'claude-opus-5-5', resolve).has('opus'),
    ).toBe(false)
  })

  test('honors a disabled 1M capability check', () => {
    expect(
      getInitial1MSelections(
        ['opus'],
        'claude-opus-5-5[1m]',
        resolve,
        () => false,
      ).size,
    ).toBe(0)
  })

  test('a configured 1M alias can be switched off without being re-enabled on resolution', () => {
    const selection = getModelPickerSelection('opus', false, resolve)
    expect(selection).toBe('claude-opus-5-5')
    expect(resolve(selection)).toBe('claude-opus-5-5')
  })

  test('adds exactly one context suffix and preserves ordinary aliases', () => {
    expect(getModelPickerSelection('opus', true, resolve)).toBe(
      'claude-opus-5-5[1m]',
    )
    expect(getModelPickerSelection('opus[1m]', true, resolve)).toBe(
      'claude-opus-5-5[1m]',
    )
    expect(getModelPickerSelection('haiku', false, resolve)).toBe('haiku')
    expect(getModelPickerSelection('claude-opus-4-7[1m]', true, resolve)).toBe(
      'claude-opus-4-7[1m]',
    )
  })
})
