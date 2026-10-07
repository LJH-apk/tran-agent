import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { buildSystemPromptBlocks } from '../claude.js'
import { shouldUseGlobalCacheScope } from '../../../utils/betas.js'
import { asSystemPrompt } from '../../../utils/systemPromptType.js'
import { SYSTEM_PROMPT_DYNAMIC_BOUNDARY } from '../../../constants/prompts.js'

describe('prompt cache scope compatibility', () => {
  let previousApiKey: string | undefined
  beforeEach(() => {
    previousApiKey = process.env.ANTHROPIC_API_KEY
    process.env.ANTHROPIC_API_KEY = 'test-cache-scope-key'
  })
  afterEach(() => {
    if (previousApiKey === undefined) delete process.env.ANTHROPIC_API_KEY
    else process.env.ANTHROPIC_API_KEY = previousApiKey
  })

  const prompt = asSystemPrompt([
    'x-anthropic-billing-header: test',
    'Static assistant instructions',
    SYSTEM_PROMPT_DYNAMIC_BOUNDARY,
    'Project-specific instructions',
  ])

  test('does not enable shared global caching for Tran request prefixes', () => {
    expect(shouldUseGlobalCacheScope()).toBe(false)
  })

  test('preserves ordinary caching without a global block after tools or attribution', () => {
    const blocks = buildSystemPromptBlocks(prompt, true)
    expect(
      blocks.some(block => block.cache_control?.type === 'ephemeral'),
    ).toBe(true)
    expect(
      blocks.every(
        block => !block.cache_control || !('scope' in block.cache_control),
      ),
    ).toBe(true)
    expect(blocks.map(block => block.text).join('\n')).toContain(
      'Static assistant instructions',
    )
    expect(blocks.map(block => block.text).join('\n')).toContain(
      'Project-specific instructions',
    )
    expect(blocks.map(block => block.text).join('\n')).not.toContain(
      SYSTEM_PROMPT_DYNAMIC_BOUNDARY,
    )
  })

  test('respects explicitly disabled prompt caching', () => {
    expect(
      buildSystemPromptBlocks(prompt, false).every(
        block => !block.cache_control,
      ),
    ).toBe(true)
  })
})
