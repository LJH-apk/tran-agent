import { z } from 'zod'
import { GROUPS } from './tasks'
import type { Run } from './types'

const count = z.number().int().nonnegative()
const ratioSchema = z
  .object({ success: count, total: count })
  .refine(value => value.success <= value.total)
export const runSchema = z
  .object({
    taskId: z.string().regex(/^T\d{2}$/),
    rubricVersion: z.string().optional(),
    reviewStatus: z.enum(['pass', 'fail', 'pending']).optional(),
    reviewNotes: z.array(z.string()).optional(),
    group: z.enum(
      GROUPS as [
        'understanding',
        'reasoning',
        'tools',
        'planning',
        'delegation',
        'recovery',
      ],
    ),
    success: z.boolean(),
    reasons: z.array(z.string()),
    externalBlock: z.string().nullable(),
    latencyMs: z.number().nonnegative().finite(),
    tokens: count.nullable(),
    tokenBreakdown: z
      .object({
        input: count,
        output: count,
        cacheRead: count,
        cacheCreation: count,
      })
      .nullable()
      .optional(),
    toolCalls: ratioSchema,
    subtasks: ratioSchema,
    faults: z
      .object({ recovered: count, total: count })
      .refine(value => value.recovered <= value.total),
    traffic: z
      .object({
        delayBefore: z.number().nonnegative().finite(),
        delayAfter: z.number().nonnegative().finite(),
        queueBefore: z.number().nonnegative().finite(),
        queueAfter: z.number().nonnegative().finite(),
      })
      .nullable(),
  })
  .refine(
    value => !(value.success && value.externalBlock !== null),
    'Externally blocked tasks cannot pass',
  )
  .refine(
    value =>
      !value.tokenBreakdown ||
      value.tokens ===
        Object.values(value.tokenBreakdown).reduce(
          (sum, count) => sum + count,
          0,
        ),
    'Token breakdown must add up to total',
  )

function average(values: number[]): number | null {
  return values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : null
}
const ratio = (success: number, total: number) => ({
  success,
  total,
  value: total ? success / total : null,
})
export function metrics(runs: Run[]) {
  const eligible = runs.filter(run => run.externalBlock === null)
  const traffic = runs.flatMap(run => (run.traffic ? [run.traffic] : []))
  const delays = traffic
    .filter(value => value.delayBefore > 0)
    .map(
      value =>
        ((value.delayBefore - value.delayAfter) / value.delayBefore) * 100,
    )
  const queues = traffic
    .filter(value => value.queueBefore > 0)
    .map(
      value =>
        ((value.queueBefore - value.queueAfter) / value.queueBefore) * 100,
    )
  const tokens = runs.flatMap(run => (run.tokens === null ? [] : [run.tokens]))
  const details = runs.flatMap(run =>
    run.tokenBreakdown ? [run.tokenBreakdown] : [],
  )
  const sum = (fn: (run: Run) => number) =>
    runs.reduce((total, run) => total + fn(run), 0)
  return {
    TSR: ratio(runs.filter(run => run.success).length, runs.length),
    ACSR: {
      ...ratio(eligible.filter(run => run.success).length, eligible.length),
      excluded: runs.length - eligible.length,
    },
    TCSR: ratio(
      sum(run => run.toolCalls.success),
      sum(run => run.toolCalls.total),
    ),
    ASR: ratio(
      sum(run => run.subtasks.success),
      sum(run => run.subtasks.total),
    ),
    FRR: {
      recovered: sum(run => run.faults.recovered),
      total: sum(run => run.faults.total),
      value: sum(run => run.faults.total)
        ? sum(run => run.faults.recovered) / sum(run => run.faults.total)
        : null,
    },
    delayImprovement: { value: average(delays), samples: delays.length },
    queueImprovement: { value: average(queues), samples: queues.length },
    efficiency: {
      latencyMs: average(runs.map(run => run.latencyMs)),
      tokens: average(tokens),
      tokenSamples: tokens.length,
      tokenMissing: runs.length - tokens.length,
      tokenBreakdown: {
        input: average(details.map(value => value.input)),
        output: average(details.map(value => value.output)),
        cacheRead: average(details.map(value => value.cacheRead)),
        cacheCreation: average(details.map(value => value.cacheCreation)),
        samples: details.length,
        missing: runs.length - details.length,
      },
    },
  }
}

export function report(
  runs: Run[],
  mode: 'live' | 'offline' | 'replay' = 'live',
) {
  const unique = new Set(runs.map(run => run.taskId))
  if (unique.size !== runs.length)
    throw new Error(
      '同一报告不能包含重复taskId；每题默认一次，不允许静默覆盖或重复加权',
    )
  const summary = {
    mode,
    rubricVersions: [
      ...new Set(runs.map(run => run.rubricVersion ?? 'legacy-v1')),
    ],
    trafficEngine: 'synthetic-fixture-v1',
    total: metrics(runs),
    groups: Object.fromEntries(
      GROUPS.map(group => [
        group,
        metrics(runs.filter(run => run.group === group)),
      ]),
    ),
    runs,
  }
  const pct = (value: number | null, scale = 100) =>
    value === null ? 'N/A' : `${(value * scale).toFixed(2)}%`
  const cell = (value: {
    value: number | null
    success: number
    total: number
  }) => `${pct(value.value)} (${value.success}/${value.total})`
  const row = (name: string, result: ReturnType<typeof metrics>) =>
    `| ${name} | ${cell(result.TSR)} | ${cell(result.ACSR)}；排除${result.ACSR.excluded} | ${cell(result.TCSR)} | ${cell(result.ASR)} | ${pct(result.FRR.value)} (${result.FRR.recovered}/${result.FRR.total}) | ${pct(result.delayImprovement.value, 1)} (n=${result.delayImprovement.samples}) | ${pct(result.queueImprovement.value, 1)} (n=${result.queueImprovement.samples}) | ${result.efficiency.latencyMs === null ? 'N/A' : `${(result.efficiency.latencyMs / 1000).toFixed(2)}s`} | ${result.efficiency.tokens?.toFixed(0) ?? 'N/A'} (n=${result.efficiency.tokenSamples}，缺失${result.efficiency.tokenMissing}) |`
  const markdown = [
    '# Agent benchmark 报告',
    '',
    `运行模式：${mode}。交通数值来自合成夹具，不代表真实TranStar收益。`,
    `验收规则：${summary.rubricVersions.join('、')}。已统计 ${runs.length}/60 题。${runs.length < 60 ? '当前为部分任务结果，不能解释为60题总体成绩。' : '结果覆盖本次60题任务集。'}`,
    '',
    '| 任务组 | TSR | ACSR | TCSR | ASR | FRR | 延误改善 | 排队改善 | 耗时/任务 | Token/任务 |',
    '|---|---|---|---|---|---|---|---|---|---|',
    ...GROUPS.map(group => row(group, summary.groups[group]!)),
    row('总体', summary.total),
    '',
    'Token使用CLI的全会话modelUsage，包含输入、输出、缓存读取和缓存创建；不累加重复的流式usage。缺失值不按0计算。工具统计覆盖原生可观察调用与本地工具服务记录，Bash传输包装不重复计数。',
    '',
    '## 第8项：Token用量拆分',
    '',
    '以下均为每任务平均值。缓存读取属于重复提供给模型的上下文，不是模型生成的文字。拆分缺失时记N/A，不从总量推算。',
    '',
    '| 任务组 | 非缓存输入 | 输出 | 缓存读取 | 缓存创建 | 拆分样本/缺失 |',
    '|---|---|---|---|---|---|',
    ...[...GROUPS, '总体'].map(group => {
      const result = group === '总体' ? summary.total : summary.groups[group]!
      const part = result.efficiency.tokenBreakdown
      const value = (number: number | null) => number?.toFixed(0) ?? 'N/A'
      return `| ${group} | ${value(part.input)} | ${value(part.output)} | ${value(part.cacheRead)} | ${value(part.cacheCreation)} | ${part.samples}/${part.missing} |`
    }),
    '',
    '## 失败与阻塞',
    '',
    ...runs
      .filter(run => !run.success)
      .map(
        run =>
          `- ${run.taskId}：${[...run.reasons, ...(run.externalBlock ? [`外部阻断：${run.externalBlock}`] : [])].join('；')}`,
      ),
    '',
  ].join('\n')
  return { summary, markdown }
}
