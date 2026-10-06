import { describe, expect, test } from 'bun:test'

import plan from './index.js'

describe('plan bridge invocation safety', () => {
  test('allows headless plan mode operations over Remote Control', () => {
    expect(plan.getBridgeInvocationError?.('')).toBeUndefined()
    expect(
      plan.getBridgeInvocationError?.('write a migration plan'),
    ).toBeUndefined()
  })

  test('blocks /plan open over Remote Control', () => {
    expect(plan.getBridgeInvocationError?.('open')).toBe(
      "通过 /plan open 打开本地编辑器在远程控制模式下不可用。",
    )
  })
})
