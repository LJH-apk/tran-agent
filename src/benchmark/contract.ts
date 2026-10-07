import type { Task } from './types'

export const OPERATIONS = [
  'read',
  'lookup',
  'page',
  'diagnose',
  'validate',
  'simulate',
  'apply',
  'status',
  'rollback',
] as const
export const RUBRIC_VERSION = 'agent-core-v3'

export function allowedOperations(task: Task): string[] {
  return [...new Set(task.rules.map(rule => rule.op.replace('_attempt', '')))]
}

export function forbiddenOperations(task: Task): string[] {
  const allowed = allowedOperations(task)
  return [
    ...new Set([
      ...OPERATIONS.filter(op => !allowed.includes(op)),
      ...(task.forbidden ?? []),
    ]),
  ]
}
