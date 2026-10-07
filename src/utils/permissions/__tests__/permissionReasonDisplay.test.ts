import { describe, expect, test } from 'bun:test'
import { permissionReasonDisplay } from '../permissionReasonDisplay.js'

describe('permissionReasonDisplay', () => {
  test('localizes the built-in command approval reason', () => {
    expect(permissionReasonDisplay('This command requires approval')).toBe('此命令需要你确认后才能执行')
  })
  test('preserves diagnostic details and arbitrary external messages', () => {
    expect(permissionReasonDisplay('Command contains malformed syntax that cannot be parsed: curl "')).toBe('命令语法有误，无法解析：curl "')
    expect(permissionReasonDisplay('Server error: missing field')).toBe('Server error: missing field')
    expect(permissionReasonDisplay('toString')).toBe('toString')
  })
})
