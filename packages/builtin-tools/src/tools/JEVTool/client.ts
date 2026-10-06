import type {
  JEVClientConfig,
  EvaluateParams,
  DecisionResult,
  TypeSafeQuestion,
  TypeSafeResponse,
  TypeSafeAnswer,
} from './types.js'
import { DecisionType, ConfidenceLevel } from './types.js'

const DEFAULT_BASE_URL = 'https://api.typesafe.ai/v1'
const DEFAULT_MODEL = 'jev-latest'
const DEFAULT_TIMEOUT = 30000 // 30 seconds

export class JEVClient {
  private apiKey: string
  private baseURL: string
  private model: string
  private timeout: number

  constructor(config?: JEVClientConfig) {
    this.apiKey = config?.apiKey || process.env.TYPESAFE_API_KEY || ''
    this.baseURL =
      config?.baseURL || process.env.JEV_BASE_URL || DEFAULT_BASE_URL
    this.model = config?.model || process.env.JEV_MODEL || DEFAULT_MODEL
    this.timeout = config?.timeout || DEFAULT_TIMEOUT

    if (!this.apiKey) {
      throw new Error(
        'JEV API key is required. Set TYPESAFE_API_KEY environment variable or pass apiKey in config.',
      )
    }
  }

  async evaluate(params: EvaluateParams): Promise<DecisionResult> {
    const { decisionType, context, candidates } = params

    // Build state description from context
    const state = this.buildStateDescription(context)

    // Generate questions based on decision type
    const questions = this.buildQuestions(decisionType, candidates)

    // Call TypeSafe AI API
    const response = await this.callTypeSafeAPI(state, questions)

    // Parse response and calculate confidence
    return this.parseResponse(response, decisionType, candidates)
  }

  private buildStateDescription(context: Record<string, unknown>): string {
    const parts: string[] = []

    for (const [key, value] of Object.entries(context)) {
      const formattedKey = key.replace(/_/g, ' ')
      parts.push(`${formattedKey}: ${JSON.stringify(value)}`)
    }

    return parts.join('\n')
  }

  private buildQuestions(
    decisionType: DecisionType,
    candidates?: string[],
  ): TypeSafeQuestion[] {
    switch (decisionType) {
      case DecisionType.CAUSE_IDENTIFICATION:
        return [
          {
            id: 'cause_confidence',
            question:
              'How confident are you in diagnosing the root cause of this congestion?',
            type: 'score',
            range: [1, 4],
          },
          ...(candidates && candidates.length > 0
            ? [
                {
                  id: 'primary_cause',
                  question: 'What is the primary cause of congestion?',
                  type: 'choice' as const,
                  options: candidates,
                },
              ]
            : []),
        ]

      case DecisionType.MEASURE_SELECTION:
        return [
          {
            id: 'measure_suitability',
            question:
              'How suitable is the proposed measure for addressing this traffic problem?',
            type: 'score',
            range: [1, 4],
          },
          {
            id: 'implementation_feasibility',
            question:
              'How feasible is it to implement this measure given the current conditions?',
            type: 'score',
            range: [1, 4],
          },
        ]

      case DecisionType.SOLUTION_RECOMMENDATION:
        return [
          ...(candidates && candidates.length > 0
            ? [
                {
                  id: 'recommended_solution',
                  question:
                    'Which solution do you recommend for this traffic problem?',
                  type: 'choice' as const,
                  options: candidates.map((c, i) => `solution_${i}`),
                },
              ]
            : []),
          {
            id: 'recommendation_confidence',
            question: 'How confident are you in this solution recommendation?',
            type: 'score',
            range: [1, 4],
          },
        ]

      default:
        return [
          {
            id: 'general_confidence',
            question: 'How confident are you in this decision?',
            type: 'score',
            range: [1, 4],
          },
        ]
    }
  }

  private async callTypeSafeAPI(
    state: string,
    questions: TypeSafeQuestion[],
  ): Promise<TypeSafeResponse> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseURL}/generate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          state,
          questions,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `TypeSafe AI API error (${response.status}): ${errorText}`,
        )
      }

      return (await response.json()) as TypeSafeResponse
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`JEV API request timeout after ${this.timeout}ms`)
      }
      throw error
    }
  }

  private parseResponse(
    response: TypeSafeResponse,
    decisionType: DecisionType,
    candidates?: string[],
  ): DecisionResult {
    const { answers } = response

    // Extract confidence from all answers
    const confidenceScores: number[] = []
    let selectedOption: string | undefined

    for (const [key, answer] of Object.entries(answers)) {
      confidenceScores.push(answer.confidence)

      // Extract selected option for choice questions
      if (answer.type === 'choice' && answer.choice) {
        if (key === 'primary_cause') {
          selectedOption = answer.choice
        } else if (key === 'recommended_solution' && candidates) {
          // Map solution_N back to actual candidate
          const match = answer.choice.match(/solution_(\d+)/)
          if (match) {
            const index = parseInt(match[1], 10)
            selectedOption = candidates[index]
          }
        }
      }
    }

    // Calculate overall confidence (average of all confidence scores)
    const confidence =
      confidenceScores.length > 0
        ? confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length
        : 0

    // Determine confidence level
    let level: ConfidenceLevel
    if (confidence >= 0.8) {
      level = ConfidenceLevel.HIGH
    } else if (confidence >= 0.4) {
      level = ConfidenceLevel.MEDIUM
    } else {
      level = ConfidenceLevel.LOW
    }

    // Generate recommendation
    const recommendation = this.generateRecommendation(
      level,
      decisionType,
      selectedOption,
    )

    // Generate reasoning
    const reasoning = this.generateReasoning(answers, selectedOption)

    return {
      confidence,
      level,
      recommendation,
      reasoning,
      selectedOption,
    }
  }

  private generateRecommendation(
    level: ConfidenceLevel,
    decisionType: DecisionType,
    selectedOption?: string,
  ): string {
    const typeStr = decisionType.replace(/_/g, ' ')
    const optionStr = selectedOption ? ` (${selectedOption})` : ''

    switch (level) {
      case ConfidenceLevel.HIGH:
        return `High confidence in ${typeStr}${optionStr}. Auto-approve and proceed with implementation.`
      case ConfidenceLevel.MEDIUM:
        return `Moderate confidence in ${typeStr}${optionStr}. Recommend simulation validation before proceeding.`
      case ConfidenceLevel.LOW:
        return `Low confidence in ${typeStr}${optionStr}. Escalate to human expert for review.`
    }
  }

  private generateReasoning(
    answers: Record<string, TypeSafeAnswer>,
    selectedOption?: string,
  ): string {
    const parts: string[] = []

    for (const [key, answer] of Object.entries(answers)) {
      if (answer.type === 'score' && answer.score !== undefined) {
        parts.push(`${key}: ${answer.score}/4`)
      } else if (answer.type === 'choice' && answer.choice) {
        parts.push(`${key}: ${answer.choice}`)
      }
      parts[parts.length - 1] +=
        ` (confidence: ${Math.round(answer.confidence * 100)}%)`
    }

    if (selectedOption) {
      parts.unshift(`recommended_option: ${selectedOption}`)
    }

    return parts.join(', ')
  }
}
