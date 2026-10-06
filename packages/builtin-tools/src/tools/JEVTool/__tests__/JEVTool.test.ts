import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test'
import { JEVTool } from '../JEVTool.js'
import { DecisionType } from '../types.js'
import { mockToolContext } from '../../../../../../tests/mocks/toolContext.js'

describe('JEVTool', () => {
  test('should have correct name', () => {
    expect(JEVTool.name).toBe('JEVEvaluate')
  })

  test('should be read-only', () => {
    expect(JEVTool.isReadOnly()).toBe(true)
  })

  test('should be concurrency-safe', () => {
    expect(JEVTool.isConcurrencySafe()).toBe(true)
  })

  test('should have description', async () => {
    const desc = await JEVTool.description({})
    expect(desc).toBeDefined()
    expect(desc.length).toBeGreaterThan(0)
  })

  test('should have prompt', async () => {
    const prompt = await JEVTool.prompt()
    expect(prompt).toBeDefined()
    expect(prompt.length).toBeGreaterThan(0)
  })

  describe('input schema', () => {
    test('should validate valid input', () => {
      const validInput = {
        decision_type: 'cause_identification',
        context: {
          road_id: 'R001',
          saturation: 0.95,
        },
      }

      const result = JEVTool.inputSchema.safeParse(validInput)
      expect(result.success).toBe(true)
    })

    test('should reject invalid decision type', () => {
      const invalidInput = {
        decision_type: 'invalid_type',
        context: {},
      }

      const result = JEVTool.inputSchema.safeParse(invalidInput)
      expect(result.success).toBe(false)
    })

    test('should require context', () => {
      const invalidInput = {
        decision_type: 'cause_identification',
      }

      const result = JEVTool.inputSchema.safeParse(invalidInput)
      expect(result.success).toBe(false)
    })
  })

  describe('rendering', () => {
    test('should render tool use message', () => {
      const input = {
        decision_type: 'cause_identification' as const,
        context: { test: true },
      }

      const message = JEVTool.renderToolUseMessage(input)

      expect(message).toBeDefined()
      expect(typeof message).toBe('string')
      expect(message).toContain('cause identification')
    })

    test('should render result via mapToolResultToToolResultBlockParam', () => {
      const content = {
        confidence: 0.85,
        level: 'high' as const,
        recommendation: 'Proceed with solution',
      }

      const result = JEVTool.mapToolResultToToolResultBlockParam(
        content,
        'test-tool-use-id',
      )

      expect(result).toBeDefined()
      expect(result.tool_use_id).toBe('test-tool-use-id')
      expect(result.type).toBe('tool_result')
      expect(result.content).toContain('85.0%')
      expect(result.content).toContain('HIGH')
    })
  })

  describe('call method', () => {
    let originalFetch: typeof global.fetch
    let mockApiKey: string | undefined

    beforeEach(() => {
      // Save original fetch
      originalFetch = global.fetch

      // Save and set API key
      mockApiKey = process.env.TYPESAFE_API_KEY
      process.env.TYPESAFE_API_KEY = 'test-api-key'

      // Mock fetch
      ;(global.fetch as any) = mock(async () => {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            model: 'jev-1.13.0',
            answers: {
              cause_confidence: {
                type: 'score',
                score: 3.4,
                confidence: 0.89,
              },
            },
            usage: {
              input_tokens: 100,
              output_tokens: 20,
            },
          }),
        } as Response
      })
    })

    afterEach(() => {
      // Restore
      global.fetch = originalFetch
      if (mockApiKey !== undefined) {
        process.env.TYPESAFE_API_KEY = mockApiKey
      } else {
        delete process.env.TYPESAFE_API_KEY
      }
    })

    test('should call JEV API and return result', async () => {
      const input = {
        decision_type: 'cause_identification' as const,
        context: {
          road_id: 'R001',
          saturation: 0.95,
        },
      }

      const result = await JEVTool.call(input, mockToolContext())

      expect(result.data).toBeDefined()
      expect(result.data.confidence).toBeGreaterThan(0)
      expect(result.data.level).toBeDefined()
      expect(result.data.recommendation).toBeDefined()
    })
  })
})
