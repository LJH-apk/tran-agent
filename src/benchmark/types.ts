export type Group =
  | 'understanding'
  | 'reasoning'
  | 'tools'
  | 'planning'
  | 'delegation'
  | 'recovery'
export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json }
export interface Plan {
  cycle: number
  green: number
  pedestrian: number
  delay: number
  queue: number
  downstreamBlocked?: boolean
}
export interface Rule {
  op: string
  plan?: string
  min?: number
  optional?: boolean
  after?: { op: string; plan?: string }[]
}
export interface Fault {
  op: string
  code: string
  recoverable: boolean
  recoveryOp: string
  recoveryPlan?: string
  permanent?: boolean
  after?: boolean
}
export interface Task {
  id: string
  group: Group
  title: string
  prompt: string
  data: Record<string, Json>
  expected: Record<string, Json>
  rules: Rule[]
  forbidden?: string[]
  finalPlan?: string
  optimize?: boolean
  plans: Record<string, Plan>
  subtasks?: Record<string, Record<string, Json>>
  fault?: Fault
  maxCalls: number
}
export interface ToolEvent {
  id: number
  op: string
  args: Record<string, Json>
  ok: boolean
  result: Json
}
export interface FaultEvent {
  id: string
  recoverable: boolean
  recovered: boolean
  code: string
}
export interface Run {
  reviewStatus?: 'pass' | 'fail' | 'pending'
  reviewNotes?: string[]
  rubricVersion?: string
  taskId: string
  group: Group
  success: boolean
  reasons: string[]
  externalBlock: string | null
  latencyMs: number
  tokens: number | null
  tokenBreakdown?: TokenBreakdown | null
  toolCalls: { success: number; total: number }
  subtasks: { success: number; total: number }
  faults: { recovered: number; total: number }
  traffic: {
    delayBefore: number
    delayAfter: number
    queueBefore: number
    queueAfter: number
  } | null
}

export interface TokenBreakdown {
  input: number
  output: number
  cacheRead: number
  cacheCreation: number
}
