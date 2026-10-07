import type { NativeCall } from './evaluate'
import type { TokenBreakdown } from './types'

export function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}
export function parseStream(raw: string) {
  const calls = new Map<string, NativeCall>()
  let result: Record<string, unknown> | null = null
  let invalidLines = 0
  let externalBlock: string | null = null
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    let event: Record<string, unknown> | null
    try {
      event = record(JSON.parse(line))
    } catch {
      invalidLines++
      continue
    }
    if (!event) continue
    if (event.error === 'authentication_failed')
      externalBlock = 'API authentication_failed'
    if (event.type === 'result') result = event
    const message = record(event.message)
    if (!Array.isArray(message?.content)) continue
    for (const rawBlock of message.content) {
      const block = record(rawBlock)
      if (!block) continue
      if (
        block.type === 'tool_use' &&
        typeof block.id === 'string' &&
        typeof block.name === 'string'
      ) {
        const existing = calls.get(block.id)
        calls.set(block.id, {
          id: block.id,
          name: block.name,
          input: record(block.input) ?? {},
          ok: existing?.ok ?? null,
        })
      }
      if (
        block.type === 'tool_result' &&
        typeof block.tool_use_id === 'string'
      ) {
        const call = calls.get(block.tool_use_id)
        if (call) call.ok = block.is_error !== true
      }
    }
  }
  let tokens: number | null = null
  let tokenBreakdown: TokenBreakdown | null = null
  const usage = record(result?.modelUsage)
  if (usage && Object.keys(usage).length > 0) {
    let sum = 0
    const breakdown: TokenBreakdown = {
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheCreation: 0,
    }
    let complete = true
    for (const item of Object.values(usage)) {
      const model = record(item)
      for (const [key, target] of [
        ['inputTokens', 'input'],
        ['outputTokens', 'output'],
        ['cacheReadInputTokens', 'cacheRead'],
        ['cacheCreationInputTokens', 'cacheCreation'],
      ] as const) {
        const count = model?.[key]
        if (typeof count !== 'number' || !Number.isInteger(count) || count < 0)
          complete = false
        else {
          sum += count
          breakdown[target] += count
        }
      }
    }
    if (complete) {
      tokens = sum
      tokenBreakdown = breakdown
    }
  }
  return {
    calls: [...calls.values()],
    result,
    tokens,
    tokenBreakdown,
    invalidLines,
    externalBlock,
  }
}
