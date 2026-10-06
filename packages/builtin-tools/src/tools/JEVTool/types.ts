// JEV Tool Types
// Based on TypeSafe AI System One API

export enum DecisionType {
  CAUSE_IDENTIFICATION = 'cause_identification',
  MEASURE_SELECTION = 'measure_selection',
  SOLUTION_RECOMMENDATION = 'solution_recommendation',
}

export enum ConfidenceLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface DecisionResult {
  confidence: number
  level: ConfidenceLevel
  recommendation: string
  reasoning?: string
  selectedOption?: string
}

// TypeSafe AI API Types
export interface TypeSafeQuestion {
  id: string
  question: string
  type: 'choice' | 'score' | 'noul'
  options?: string[]
  range?: [number, number]
}

export interface TypeSafeAnswer {
  type: 'choice' | 'score' | 'noul'
  choice?: string
  score?: number
  confidence: number
}

export interface TypeSafeResponse {
  model: string
  answers: Record<string, TypeSafeAnswer>
  usage?: {
    input_tokens: number
    output_tokens: number
  }
}

export interface JEVClientConfig {
  apiKey?: string
  baseURL?: string
  model?: string
  timeout?: number
}

export interface EvaluateParams {
  decisionType: DecisionType
  context: Record<string, unknown>
  candidates?: string[]
}
