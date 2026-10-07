import { createHash } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { z } from 'zod'
import { evaluate } from './evaluate'
import { report, runSchema } from './report'
import { Simulator } from './simulator'
import { TASKS } from './tasks'
import { parseStream } from './telemetry'
import type { FaultEvent, Json, Run, ToolEvent } from './types'

const patch = z.record(z.string(), z.json())
export const manifestSchema = z.object({
  sourceSha256: z.string().regex(/^[a-f0-9]{64}$/),
  entries: z.array(
    z.object({
      taskId: z.string(),
      notes: z.array(z.string()).min(1),
      answerPatch: patch.optional(),
      childrenPatch: z.record(z.string(), patch).optional(),
      pending: z.boolean().optional(),
      pendingChildren: z.array(z.string()).optional(),
    }),
  ),
})
const eventSchema = z.object({
  id: z.number().int().positive(),
  op: z.string(),
  args: patch,
  ok: z.boolean(),
  result: z.json(),
})
const faultSchema = z.object({
  id: z.string(),
  code: z.string(),
  recoverable: z.boolean(),
  recovered: z.boolean(),
})
const REVIEW_VERSION = 'agent-core-v2-reviewed-20261007'

export async function sourceDigest(directory: string): Promise<string> {
  const runs = z
    .array(runSchema)
    .parse(await Bun.file(join(directory, 'results.json')).json())
  const files = [
    'results.json',
    ...runs
      .toSorted((a, b) => a.taskId.localeCompare(b.taskId))
      .flatMap(run => {
        const task = TASKS.find(task => task.id === run.taskId)
        if (!task) throw new Error(`未知任务：${run.taskId}`)
        return [
          `${run.taskId}/stream.jsonl`,
          `${run.taskId}/tools.json`,
          `${run.taskId}/workspace/task.md`,
          `${run.taskId}/workspace/answer.json`,
          ...Object.keys(task.subtasks ?? {}).map(
            key => `${run.taskId}/workspace/subtasks/${key}.json`,
          ),
        ]
      }),
  ]
  const hash = createHash('sha256')
  for (const name of files) {
    const file = Bun.file(join(directory, name))
    hash.update(name)
    hash.update('\0')
    if (await file.exists())
      hash.update(new Uint8Array(await file.arrayBuffer()))
    else hash.update('<missing>')
    hash.update('\0')
  }
  return hash.digest('hex')
}

async function readAnswer(path: string): Promise<unknown> {
  try {
    return (await Bun.file(path).json()) as unknown
  } catch {
    return null
  }
}
export function applyPatch(
  original: unknown,
  changes?: Record<string, Json>,
): unknown {
  if (!changes) return original
  if (
    original === null ||
    typeof original !== 'object' ||
    Array.isArray(original)
  )
    throw new Error('不能修补缺失或非对象答案')
  return { ...original, ...changes }
}

// Read authoritative recorded outputs. Do not rerun the simulator: rate-limit
// clocks and failure injection are historical events, not current wall time.
export function restoreSimulator(
  taskId: string,
  events: ToolEvent[],
  faults: FaultEvent[],
): Simulator {
  const task = TASKS.find(task => task.id === taskId)
  if (!task) throw new Error(`未知任务：${taskId}`)
  const sim = new Simulator(task)
  sim.events.push(...events)
  sim.faults.push(...faults)
  for (const event of events) {
    if (!event.ok) continue
    if (event.op === 'apply' && typeof event.args.plan === 'string')
      sim.currentPlan = event.args.plan
    if (event.op === 'rollback') sim.currentPlan = 'p0'
    if (
      ['read', 'status'].includes(event.op) &&
      event.result &&
      typeof event.result === 'object' &&
      !Array.isArray(event.result) &&
      typeof event.result.currentPlan === 'string'
    )
      sim.currentPlan = event.result.currentPlan
  }
  if (!task.plans[sim.currentPlan]) throw new Error('记录中的最终方案无效')
  return sim
}

export async function review(
  directory: string,
  manifestPath: string,
  destination: string,
) {
  const source = resolve(directory)
  const manifest = manifestSchema.parse(await Bun.file(manifestPath).json())
  const digest = await sourceDigest(source)
  if (digest !== manifest.sourceSha256)
    throw new Error(
      '原始证据SHA256不匹配，禁止把此人工复核规则用于其他运行或修改后的日志',
    )
  const previous = z
    .array(runSchema)
    .parse(await Bun.file(join(source, 'results.json')).json())
  if (
    new Set(manifest.entries.map(entry => entry.taskId)).size !==
      manifest.entries.length ||
    manifest.entries.some(
      entry => !previous.some(run => run.taskId === entry.taskId),
    )
  )
    throw new Error('复核条目重复或不存在于原运行')
  const strict: Run[] = []
  const reviewed: Run[] = []
  const audits: Record<string, unknown>[] = []
  let pendingSubtasks = 0
  for (const old of previous) {
    const task = TASKS.find(task => task.id === old.taskId)!
    const entry = manifest.entries.find(entry => entry.taskId === old.taskId)
    const trace = z
      .object({ events: z.array(eventSchema), faults: z.array(faultSchema) })
      .parse(await Bun.file(join(source, old.taskId, 'tools.json')).json())
    const sim = restoreSimulator(task.id, trace.events, trace.faults)
    const telemetry = parseStream(
      await Bun.file(join(source, old.taskId, 'stream.jsonl')).text(),
    )
    const answer = await readAnswer(
      join(source, old.taskId, 'workspace/answer.json'),
    )
    const children: Record<string, unknown> = {}
    for (const key of Object.keys(task.subtasks ?? {}))
      children[key] = await readAnswer(
        join(source, old.taskId, `workspace/subtasks/${key}.json`),
      )
    const runtime = {
      completed:
        telemetry.result?.subtype === 'success' &&
        telemetry.result?.is_error === false,
      latencyMs: old.latencyMs,
      tokens: telemetry.tokens,
      tokenBreakdown: telemetry.tokenBreakdown,
      externalBlock: old.externalBlock,
    }
    const strictResult = evaluate(
      task,
      sim,
      answer,
      children,
      telemetry.calls,
      runtime,
    )
    strict.push(strictResult)
    const normalizedChildren: Record<string, unknown> = { ...children }
    for (const [key, changes] of Object.entries(entry?.childrenPatch ?? {})) {
      if (!task.subtasks?.[key])
        throw new Error(`非法子任务修补：${task.id}/${key}`)
      normalizedChildren[key] = applyPatch(children[key], changes)
    }
    const result = evaluate(
      task,
      sim,
      applyPatch(answer, entry?.answerPatch),
      normalizedChildren,
      telemetry.calls,
      runtime,
    )
    result.rubricVersion = REVIEW_VERSION
    result.reviewStatus = entry?.pending
      ? 'pending'
      : result.success
        ? 'pass'
        : 'fail'
    result.reviewNotes =
      entry?.notes ??
      (old.success
        ? ['原判通过；重新核对答案、工具状态、操作范围和完成记录仍通过。']
        : ['未找到足以撤销失败的证据。'])
    if (entry?.pending) {
      result.success = false
      result.reasons = ['题意或模拟夹具有歧义，待定；仍保留在TSR/ACSR分母中']
    }
    for (const key of entry?.pendingChildren ?? []) {
      if (!task.subtasks?.[key])
        throw new Error(`非法待定子任务：${task.id}/${key}`)
      pendingSubtasks += telemetry.calls.filter(
        call =>
          ['Agent', 'Task'].includes(call.name) &&
          typeof call.input.prompt === 'string' &&
          call.input.prompt.includes(`subtask:${key}`),
      ).length
    }
    runSchema.parse(result)
    // This review may change success judgments, never historical usage or tool counts.
    if (
      JSON.stringify(result.toolCalls) !== JSON.stringify(old.toolCalls) ||
      result.tokens !== old.tokens ||
      JSON.stringify(result.traffic) !== JSON.stringify(old.traffic)
    )
      throw new Error(`历史客观计数不一致：${task.id}`)
    reviewed.push(result)
    audits.push({
      taskId: task.id,
      originalSuccess: old.success,
      correctedStrictSuccess: strictResult.success,
      reviewedStatus: result.reviewStatus,
      notes: result.reviewNotes,
      originalReasons: old.reasons,
      correctedStrictReasons: strictResult.reasons,
      reviewedReasons: result.reasons,
      normalizations: {
        answer: entry?.answerPatch ?? {},
        children: entry?.childrenPatch ?? {},
      },
      evidence: [
        `${task.id}/workspace/task.md`,
        `${task.id}/workspace/answer.json`,
        `${task.id}/tools.json`,
        `${task.id}/stream.jsonl`,
        ...Object.keys(task.subtasks ?? {}).map(
          key => `${task.id}/workspace/subtasks/${key}.json`,
        ),
      ],
    })
  }
  const output = report(reviewed, 'replay')
  const pending = reviewed.filter(run => run.reviewStatus === 'pending')
  const passed = reviewed.filter(run => run.success).length
  const counts = {
    originalPass: previous.filter(run => run.success).length,
    correctedStrictPass: strict.filter(run => run.success).length,
    confirmedPass: passed,
    confirmedFail: reviewed.filter(run => run.reviewStatus === 'fail').length,
    pending: pending.map(run => run.taskId),
    TSRLower: passed / reviewed.length,
    TSRUpper: (passed + pending.length) / reviewed.length,
    pendingSubtasks,
    ASRLower: output.summary.total.ASR.value,
    ASRUpper: output.summary.total.ASR.total
      ? (output.summary.total.ASR.success + pendingSubtasks) /
        output.summary.total.ASR.total
      : null,
  }
  const markdown = `${output.markdown}\n## 复核依据与待定项\n\n这是对旧提示下已有轨迹的人工语义复核，不是按v3新题卡重新测试。格式归一仅适用于SHA256绑定的这次运行；没有改写任何原始答案或日志。\n\n原自动判定${counts.originalPass}/${reviewed.length}；仅修复程序错误、保留字段严格比较后${counts.correctedStrictPass}/${reviewed.length}；再对未公开类型和枚举的历史答案作逐题人工语义复核，得到下列确认结果。\n\n确认通过${counts.confirmedPass}题，确认失败${counts.confirmedFail}题，待定${counts.pending.length}题。待定项不作为外部故障排除，主表TSR/ACSR采用确认成功数，属于保守下界。TSR可能范围${(counts.TSRLower * 100).toFixed(2)}%–${(counts.TSRUpper * 100).toFixed(2)}%；ASR待定${pendingSubtasks}次，可能范围${((counts.ASRLower ?? 0) * 100).toFixed(2)}%–${((counts.ASRUpper ?? 0) * 100).toFixed(2)}%。\n\n${audits.map(audit => `- ${audit.taskId}（${audit.reviewedStatus}）：${(audit.notes as string[]).join('；')}`).join('\n')}\n\n完整字段归一和逐题证据路径见audit.json；原始结果：${source}。\n`
  await mkdir(destination, { recursive: false })
  await Bun.write(
    join(destination, 'results.json'),
    JSON.stringify(reviewed, null, 2),
  )
  await Bun.write(
    join(destination, 'corrected-strict-results.json'),
    JSON.stringify(strict, null, 2),
  )
  await Bun.write(
    join(destination, 'audit.json'),
    JSON.stringify({ source, sourceSha256: digest, counts, audits }, null, 2),
  )
  await Bun.write(
    join(destination, 'report.json'),
    JSON.stringify(
      { ...output.summary, review: counts, source, sourceSha256: digest },
      null,
      2,
    ),
  )
  await Bun.write(join(destination, 'report.md'), markdown)
  return counts
}

if (import.meta.main) {
  const [directory, manifest, destination] = process.argv.slice(2)
  if (!directory || !manifest || !destination)
    throw new Error(
      '用法：bun src/benchmark/review.ts <原始运行目录> <人工复核JSON> <尚不存在的输出目录>',
    )
  console.log(JSON.stringify(await review(directory, manifest, destination)))
}
