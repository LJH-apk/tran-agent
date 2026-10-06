import { z } from 'zod/v4'
import type { ToolResultBlockParam } from 'src/Tool.js'
import { buildTool } from 'src/Tool.js'
import { lazySchema } from 'src/utils/lazySchema.js'
import { JEVClient } from './client.js'
import { DecisionType, ConfidenceLevel } from './types.js'
import { JEV_TOOL_NAME, getJEVToolPrompt } from './prompt.js'
import type { ToolUseContext } from 'src/Tool.js'

const inputSchema = lazySchema(() =>
  z.strictObject({
    decision_type: z
      .enum([
        'cause_identification',
        'measure_selection',
        'solution_recommendation',
      ])
      .describe('Type of decision to evaluate'),
    context: z
      .record(z.string(), z.unknown())
      .describe(
        'Context data for the decision (e.g., traffic metrics, road attributes)',
      ),
    candidates: z
      .array(z.string())
      .optional()
      .describe('Optional list of candidate options to evaluate'),
    threshold_high: z
      .number()
      .min(0)
      .max(1)
      .default(0.8)
      .optional()
      .describe('Confidence threshold for auto-approval (default: 0.8)'),
    threshold_low: z
      .number()
      .min(0)
      .max(1)
      .default(0.4)
      .optional()
      .describe('Confidence threshold for escalation (default: 0.4)'),
  }),
)
type InputSchema = ReturnType<typeof inputSchema>
type JEVInput = z.infer<InputSchema>

const outputSchema = lazySchema(() =>
  z.object({
    confidence: z
      .number()
      .min(0)
      .max(1)
      .describe('Confidence score for the decision'),
    level: z
      .enum(['high', 'medium', 'low'])
      .describe('Confidence level based on thresholds'),
    recommendation: z.string().describe('Recommended next action'),
    reasoning: z
      .string()
      .optional()
      .describe('Reasoning for the confidence score'),
    selectedOption: z
      .string()
      .optional()
      .describe('Selected option for choice-type decisions'),
  }),
)
type OutputSchema = ReturnType<typeof outputSchema>
export type Output = z.infer<OutputSchema>

export const JEVTool = buildTool({
  name: JEV_TOOL_NAME,
  searchHint: 'evaluate decision confidence JEV model judgment',
  maxResultSizeChars: 10_000,
  strict: true,

  get inputSchema(): InputSchema {
    return inputSchema()
  },

  get outputSchema(): OutputSchema {
    return outputSchema()
  },

  async description(input: Partial<JEVInput>) {
    const type = input.decision_type || 'decision'
    return `Evaluate ${type} with JEV model for confidence scoring`
  },

  async prompt() {
    return getJEVToolPrompt()
  },

  userFacingName() {
    return 'JEV Evaluate'
  },

  getToolUseSummary(input: Partial<JEVInput>) {
    if (input.decision_type) {
      return input.decision_type.replace(/_/g, ' ')
    }
    return null
  },

  isConcurrencySafe() {
    return true
  },

  isReadOnly() {
    return true
  },

  toAutoClassifierInput(input: JEVInput) {
    return `${input.decision_type}: ${JSON.stringify(input.context)}`
  },

  renderToolUseMessage(input: Partial<JEVInput>) {
    const type = input.decision_type
      ? input.decision_type.replace(/_/g, ' ')
      : 'decision'
    return `JEV: Evaluating ${type}`
  },

  async validateInput(input: Partial<JEVInput>) {
    if (!input.decision_type) {
      return {
        result: false,
        message: 'Error: decision_type is required',
        errorCode: 1,
      }
    }

    if (!input.context || Object.keys(input.context).length === 0) {
      return {
        result: false,
        message: 'Error: context must contain decision data',
        errorCode: 2,
      }
    }

    const thresholdHigh = input.threshold_high ?? 0.8
    const thresholdLow = input.threshold_low ?? 0.4

    if (thresholdLow >= thresholdHigh) {
      return {
        result: false,
        message: 'Error: threshold_low must be less than threshold_high',
        errorCode: 3,
      }
    }

    return { result: true }
  },

  async call(
    input: JEVInput,
    _context: ToolUseContext,
  ): Promise<{ data: Output }> {
    try {
      const client = new JEVClient()

      const result = await client.evaluate({
        decisionType: input.decision_type as DecisionType,
        context: input.context,
        candidates: input.candidates,
      })

      // Determine confidence level based on user-specified thresholds
      const thresholdHigh = input.threshold_high ?? 0.8
      const thresholdLow = input.threshold_low ?? 0.4

      let level: ConfidenceLevel
      if (result.confidence >= thresholdHigh) {
        level = ConfidenceLevel.HIGH
      } else if (result.confidence >= thresholdLow) {
        level = ConfidenceLevel.MEDIUM
      } else {
        level = ConfidenceLevel.LOW
      }

      return {
        data: {
          confidence: result.confidence,
          level,
          recommendation: result.recommendation,
          reasoning: result.reasoning,
          selectedOption: result.selectedOption,
        },
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`JEV evaluation failed: ${errorMessage}`)
    }
  },

  mapToolResultToToolResultBlockParam(
    content: Output,
    toolUseID: string,
  ): ToolResultBlockParam {
    const parts = [
      `Confidence: ${(content.confidence * 100).toFixed(1)}%`,
      `Level: ${content.level.toUpperCase()}`,
      content.selectedOption ? `Selected: ${content.selectedOption}` : null,
      `Recommendation: ${content.recommendation}`,
      content.reasoning ? `Reasoning: ${content.reasoning}` : null,
    ].filter(Boolean)

    return {
      tool_use_id: toolUseID,
      type: 'tool_result',
      content: parts.join('\n'),
    }
  },
})
