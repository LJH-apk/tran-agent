import type { Json, Task } from './types'

const enums: Record<string, string[]> = {
  reasonCode: [
    'spillback',
    'delay',
    'flow',
    'downstream_spillback',
    'queue_limit',
    'permission_revoked',
    'insufficient_data',
  ],
  objective: ['delay', 'queue', 'bus_delay'],
  oldDataRole: ['reference', 'decision', 'discard'],
  cause: [
    'green_shortage',
    'downstream_blockage',
    'sensor_error',
    'insufficient_data',
  ],
  action: [
    'clear_downstream',
    'increase_green',
    'switch_plan',
    'hold',
    'collect_data',
  ],
  nextCheck: [
    'matched_demand',
    'downstream_capacity',
    'green_allocation',
    'sensor_quality',
  ],
  classification: ['transient', 'persistent', 'sensor_error'],
  jobStatus: ['running', 'completed', 'failed'],
  blockedBy: [
    'permission_revoked',
    'all_sources_unavailable',
    'insufficient_data',
    'none',
  ],
  stopReason: [
    'insufficient_gain',
    'budget_exhausted',
    'target_met',
    'no_feasible_plan',
  ],
  source: ['primary', 'backup'],
  status: ['blocked', 'completed', 'failed'],
  needs: ['restore_data_source', 'provide_more_data', 'await_job', 'none'],
}

function field(key: string, reference: Json): Json {
  if (typeof reference === 'number') return { type: 'number' }
  if (typeof reference === 'boolean') return { type: 'boolean' }
  if (typeof reference === 'string')
    return { type: 'string', ...(enums[key] ? { enum: enums[key]! } : {}) }
  if (Array.isArray(reference))
    return {
      type: 'array',
      items: reference.length ? field(key, reference[0]!) : {},
      ...(key === 'normalizedDelay'
        ? {
            minItems: 2,
            maxItems: 2,
            description: '依次为报表A和报表B的每车平均延误秒',
          }
        : {}),
      ...(key === 'violations'
        ? {
            items: {
              type: 'string',
              enum: ['cycle', 'green', 'pedestrian', 'phase_sum'],
            },
          }
        : {}),
    }
  return { type: 'object' }
}

// Only shape and vocabulary are published, never correct numbers or choices.
export function outputSchema(reference: Record<string, Json>): Json {
  return {
    type: 'object',
    properties: Object.fromEntries(
      Object.entries(reference).map(([key, value]) => [key, field(key, value)]),
    ),
    required: Object.keys(reference),
    additionalProperties: true,
  }
}
export function publicOutputContracts(task: Task): string[] {
  return [
    `answer.json的JSON Schema（类型、数组顺序和枚举必须遵守）：${JSON.stringify(outputSchema(task.expected))}`,
    ...Object.entries(task.subtasks ?? {}).map(
      ([key, expected]) =>
        `subtasks/${key}.json的JSON Schema：${JSON.stringify(outputSchema(expected))}`,
    ),
    `必要步骤：${[...new Set(task.rules.filter(rule => !rule.optional).map(rule => rule.op.replace('_attempt', '')))].join('、')}，具体候选及次数按题目要求。这是一组验收条件，不是要求所有不同方案串行验证；每个方案仍须先合法验证、再仿真、再应用。`,
    ...task.rules.flatMap(rule =>
      (rule.after ?? []).map(
        previous =>
          `步骤依赖：${previous.op.replace('_attempt', '')}（题目前序步骤）必须先于${rule.op.replace('_attempt', '')}（对应后续步骤）。`,
      ),
    ),
  ]
}
