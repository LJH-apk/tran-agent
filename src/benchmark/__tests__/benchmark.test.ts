import { describe, expect, test } from 'bun:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { evaluate, matches } from '../evaluate'
import type { NativeCall } from '../evaluate'
import { metrics, report, runSchema } from '../report'
import { main, taskPrompt } from '../run'
import { Simulator } from '../simulator'
import { TASKS } from '../tasks'
import { parseStream } from '../telemetry'
import type { Json, Run, Task } from '../types'
import { allowedOperations, forbiddenOperations } from '../contract'
import { outputSchema } from '../output-contract'
import { applyPatch, review, sourceDigest } from '../review'

async function referenceTrace(task: Task) {
  const sim = new Simulator(task)
  if (task.id === 'T60') {
    sim.call('read', { source: 'primary' })
    sim.call('read', { source: 'backup' })
  } else {
    let read = sim.call('read')
    if (!read.ok) {
      if (task.id === 'T52') await Bun.sleep(110)
      read = sim.call('read', task.id === 'T54' ? { source: 'backup' } : {})
      expect(read.ok).toBe(true)
    }
    if (task.id === 'T53') sim.call('validate', { plan: 'p1' })
    if (task.id === 'T58') sim.call('read')
    if (task.id === 'T28') {
      sim.call('validate', { plan: 'p1' })
      sim.call('simulate', { plan: 'p1' })
      sim.call('apply', { plan: 'p1' })
      sim.call('status')
      sim.call('apply', { plan: 'p1' })
      sim.call('status')
    }
    for (const rule of task.rules) {
      const attempt = rule.op.endsWith('_attempt')
      const op = rule.op.replace('_attempt', '')
      const existing = sim.events.filter(
        event =>
          event.op === op &&
          (attempt || event.ok) &&
          (!rule.plan || event.args.plan === rule.plan),
      )
      for (let index = existing.length; index < (rule.min ?? 1); index++) {
        const args: Record<string, Json> = rule.plan
          ? { plan: rule.plan }
          : op === 'apply'
            ? { plan: task.finalPlan ?? 'p1' }
            : op === 'page'
              ? { page: index + 1 }
              : op === 'poll'
                ? { jobId: 'job-1' }
                : {}
        const result = sim.call(
          op,
          task.id === 'T38' && op === 'apply'
            ? { ...args, intersection: 'A' }
            : args,
        )
        if (!result.ok && !attempt) sim.call(op, args)
      }
    }
    if (task.id === 'T57') sim.call('status')
  }
  const calls: NativeCall[] = Object.keys(task.subtasks ?? {}).map(
    (key, index) => ({
      id: String(index),
      name: 'Agent',
      input: { prompt: `subtask:${key}` },
      ok: true,
    }),
  )
  return { sim, calls }
}

describe('task bank', () => {
  test('publishes task-specific operations and an explicit stopping condition', () => {
    expect(allowedOperations(TASKS[0]!)).toEqual(['read'])
    expect(forbiddenOperations(TASKS[0]!)).toContain('apply')
    expect(taskPrompt(TASKS[0]!)).toContain('停止条件')
    expect(taskPrompt(TASKS[0]!)).toContain('本题仅分析或评估')
    expect(allowedOperations(TASKS[20]!)).toContain('apply')
    expect(allowedOperations(TASKS[56]!)).toContain('rollback')
  })
  test('contains 60 unique tasks with 10 tasks per group and no answers in prompts', () => {
    expect(TASKS).toHaveLength(60)
    expect(new Set(TASKS.map(task => task.id)).size).toBe(60)
    for (const group of new Set(TASKS.map(task => task.group)))
      expect(TASKS.filter(task => task.group === group)).toHaveLength(10)
    expect(taskPrompt(TASKS[0]!)).not.toContain('priority": "B')
  })
  test('all 60 acceptance paths are reachable using synthetic reference traces', async () => {
    for (const task of TASKS) {
      const { sim, calls } = await referenceTrace(task)
      const run = evaluate(
        task,
        sim,
        task.expected,
        task.subtasks ?? {},
        calls,
        { completed: true, externalBlock: null, latencyMs: 1, tokens: 1 },
      )
      expect(run.reasons, `${task.id}: ${run.reasons.join(', ')}`).toEqual([])
      expect(run.success).toBe(true)
      expect(runSchema.safeParse(run).success).toBe(true)
    }
  })
})

describe('rubric regressions', () => {
  const runtime = {
    completed: true,
    externalBlock: null,
    latencyMs: 1,
    tokens: 1,
  }
  test('allows independent candidates to be validated together', () => {
    const task = TASKS[29]!
    const sim = new Simulator(task)
    sim.call('read')
    sim.call('validate', { plan: 'p1' })
    sim.call('validate', { plan: 'p3' })
    sim.call('simulate', { plan: 'p1' })
    sim.call('simulate', { plan: 'p3' })
    expect(evaluate(task, sim, task.expected, {}, [], runtime).success).toBe(
      true,
    )
    sim.events.splice(1, 1)
    expect(
      evaluate(task, sim, task.expected, {}, [], runtime).reasons,
    ).toContain('步骤依赖不满足：validate(p1)→simulate')
  })
  test('does not mistake a failed apply for the first successful drift commit', () => {
    const task = TASKS[27]!
    const sim = new Simulator(task)
    sim.call('read')
    sim.call('apply', { plan: 'p1' })
    sim.call('validate', { plan: 'p1' })
    sim.call('simulate', { plan: 'p1' })
    sim.call('apply', { plan: 'p1' })
    sim.call('status')
    sim.call('apply', { plan: 'p1' })
    sim.call('status')
    expect(evaluate(task, sim, task.expected, {}, [], runtime).success).toBe(
      true,
    )
    sim.events.splice(5, 1)
    expect(
      evaluate(task, sim, task.expected, {}, [], runtime).reasons,
    ).toContain('配置漂移未先核验再纠正')
  })
  test('waives redundant reads without dropping real dependencies', async () => {
    for (const id of ['T25', 'T26', 'T35', 'T39', 'T55']) {
      const task = TASKS.find(task => task.id === id)!
      const { sim, calls } = await referenceTrace(task)
      sim.events.splice(0, 1)
      expect(
        evaluate(task, sim, task.expected, {}, calls, runtime).success,
      ).toBe(true)
    }
    const task = TASKS[0]!
    expect(
      evaluate(task, new Simulator(task), task.expected, {}, [], runtime)
        .success,
    ).toBe(false)
  })
  test('treats set fields as unordered but preserves ordered numeric reports', () => {
    expect(
      matches(
        { violations: ['pedestrian', 'cycle'] },
        { violations: ['cycle', 'pedestrian'] },
      ),
    ).toBe(true)
    expect(
      matches(
        { violations: ['cycle', 'cycle'] },
        { violations: ['cycle', 'pedestrian'] },
      ),
    ).toBe(false)
    expect(
      matches({ normalizedDelay: [20, 30] }, { normalizedDelay: [30, 20] }),
    ).toBe(false)
  })
  test('publishes types and vocabulary without publishing correct plan choices', () => {
    const schema = outputSchema(TASKS[20]!.expected) as Record<string, Json>
    expect(schema.properties).toEqual({
      selected: { type: 'string' },
      applied: { type: 'boolean' },
    })
    expect(JSON.stringify(schema)).not.toContain('p1')
    for (const task of TASKS) {
      for (const reference of [
        task.expected,
        ...Object.values(task.subtasks ?? {}),
      ]) {
        const shape = outputSchema(reference) as {
          properties: Record<string, { enum?: Json[] }>
        }
        for (const [key, value] of Object.entries(reference))
          if (shape.properties[key]!.enum)
            expect(shape.properties[key]!.enum).toContain(value)
      }
    }
  })
  test('keeps manual normalization separate from original answers', () => {
    const original = { applied: 'p1', selected: 'p1' }
    expect(applyPatch(original, { applied: true })).toEqual({
      applied: true,
      selected: 'p1',
    })
    expect(original.applied).toBe('p1')
    expect(() => applyPatch(null, { applied: true })).toThrow()
  })
})

describe('evaluate', () => {
  test('fails analysis tasks that mutate state even with the correct final answer', () => {
    const task = TASKS[0]!
    const sim = new Simulator(task)
    sim.call('read')
    sim.call('validate', { plan: 'p1' })
    sim.call('simulate', { plan: 'p1' })
    sim.call('apply', { plan: 'p1' })
    const result = evaluate(task, sim, task.expected, {}, [], {
      completed: true,
      externalBlock: null,
      latencyMs: 1,
      tokens: 1,
    })
    expect(result.success).toBe(false)
    expect(result.reasons).toContain('越过操作边界：apply')
  })
  test('permits answer readback but fails additional operations after delivery', () => {
    const task = TASKS[0]!
    const sim = new Simulator(task)
    sim.call('read')
    const write: NativeCall = {
      id: 'write',
      name: 'Write',
      input: { file_path: '/work/answer.json' },
      ok: true,
    }
    const read: NativeCall = {
      id: 'read',
      name: 'Read',
      input: { file_path: '/work/answer.json' },
      ok: true,
    }
    const runtime = {
      completed: true,
      externalBlock: null,
      latencyMs: 1,
      tokens: 1,
    }
    expect(
      evaluate(task, sim, task.expected, {}, [write, read], runtime).success,
    ).toBe(true)
    const extra: NativeCall = {
      id: 'extra',
      name: 'Bash',
      input: { command: 'bun traffic.ts read' },
      ok: true,
    }
    expect(
      evaluate(task, sim, task.expected, {}, [write, extra, read], runtime)
        .success,
    ).toBe(false)
    expect(
      evaluate(
        task,
        sim,
        task.expected,
        {},
        [write, extra, { ...write, id: 'rewrite' }],
        runtime,
      ).success,
    ).toBe(false)
  })
  test('rejects self-reported success without actual execution', () => {
    const task = TASKS[20]!
    const run = evaluate(task, new Simulator(task), task.expected, {}, [], {
      completed: true,
      externalBlock: null,
      latencyMs: 1,
      tokens: null,
    })
    expect(run.success).toBe(false)
  })
  test('rejects forbidden application despite a correct answer', () => {
    const task = TASKS[29]!
    const sim = new Simulator(task)
    sim.call('read')
    sim.call('validate', { plan: 'p1' })
    sim.call('simulate', { plan: 'p1' })
    sim.call('apply', { plan: 'p1' })
    const run = evaluate(task, sim, task.expected, {}, [], {
      completed: true,
      externalBlock: null,
      latencyMs: 1,
      tokens: 1,
    })
    expect(run.reasons).toContain('越过操作边界：apply')
  })
  test('does not accept child artifacts without a real dispatch', async () => {
    const task = TASKS[40]!
    const { sim } = await referenceTrace(task)
    const run = evaluate(task, sim, task.expected, task.subtasks!, [], {
      completed: true,
      externalBlock: null,
      latencyMs: 1,
      tokens: 1,
    })
    expect(run.success).toBe(false)
    expect(run.subtasks.total).toBe(0)
  })
  test('grades every dispatch and refuses to count a duplicate child twice', async () => {
    const task = TASKS[44]!
    const { sim, calls } = await referenceTrace(task)
    const run = evaluate(
      task,
      sim,
      task.expected,
      task.subtasks!,
      [...calls, { ...calls[0]!, id: 'duplicate' }],
      { completed: true, externalBlock: null, latencyMs: 1, tokens: 1 },
    )
    expect(run.subtasks).toEqual({ success: 1, total: 2 })
  })
  test('matches structured values rather than answer substrings', () => {
    expect(matches({ selected: 'p1 wrong' }, { selected: 'p1' })).toBe(false)
    expect(
      matches({ selected: 'p1', explanation: 'evidence' }, { selected: 'p1' }),
    ).toBe(true)
    expect(matches({ value: Number.NaN }, { value: 1 })).toBe(false)
  })
})

describe('Simulator', () => {
  test('enforces validation and completed simulation before applying', () => {
    const sim = new Simulator(TASKS[20]!)
    expect(sim.call('apply', { plan: 'p1' }).ok).toBe(false)
    expect(sim.call('simulate', { plan: 'p1' }).ok).toBe(false)
    sim.call('validate', { plan: 'p1' })
    sim.call('simulate', { plan: 'p1' })
    expect(sim.call('apply', { plan: 'p1' }).ok).toBe(true)
  })
  test('counts expected plan rejection as a successful tool call', () => {
    const sim = new Simulator(TASKS[20]!)
    expect(sim.call('validate', { plan: 'bad' })).toEqual({
      ok: true,
      result: {
        valid: false,
        violations: ['cycle', 'pedestrian'],
        plan: 'bad',
      },
    })
  })
  test('uses one fault denominator for repeated outage attempts', () => {
    const sim = new Simulator(TASKS[53]!)
    sim.call('read')
    sim.call('read')
    sim.call('read', { source: 'backup' })
    expect(sim.faults).toHaveLength(1)
    expect(sim.faults[0]!.recovered).toBe(true)
  })
  test('handles uncertain commit by querying actual state', async () => {
    const task = TASKS[55]!
    const { sim } = await referenceTrace(task)
    expect(sim.currentPlan).toBe('p1')
    expect(sim.events.filter(event => event.op === 'apply')).toHaveLength(1)
    expect(sim.faults[0]!.recovered).toBe(true)
  })
})

const base: Run = {
  taskId: 'T01',
  group: 'understanding',
  success: false,
  reasons: [],
  externalBlock: null,
  latencyMs: 1000,
  tokens: null,
  toolCalls: { success: 1, total: 2 },
  subtasks: { success: 0, total: 0 },
  faults: { recovered: 0, total: 0 },
  traffic: null,
}
describe('metrics', () => {
  test('reports token components without inferring absent historical details', () => {
    const complete = {
      ...base,
      tokenBreakdown: {
        input: 100,
        output: 20,
        cacheRead: 30,
        cacheCreation: 40,
      },
      tokens: 190,
    }
    const result = metrics([complete, { ...base, taskId: 'T02', tokens: 200 }])
    expect(result.efficiency.tokens).toBe(195)
    expect(result.efficiency.tokenBreakdown.samples).toBe(1)
    expect(result.efficiency.tokenBreakdown.cacheRead).toBe(30)
    expect(runSchema.safeParse({ ...complete, tokens: 200 }).success).toBe(
      false,
    )
    expect(report([base]).summary.rubricVersions).toEqual(['legacy-v1'])
    expect(report([base]).markdown).toContain('1/60')
  })
  test('excludes only externally blocked tasks from ACSR', () => {
    const result = metrics([
      { ...base, success: true, tokens: 100 },
      { ...base, taskId: 'T02', externalBlock: 'API 503' },
      {
        ...base,
        taskId: 'T51',
        group: 'recovery',
        faults: { recovered: 0, total: 1 },
      },
    ])
    expect(result.TSR.value).toBeCloseTo(1 / 3)
    expect(result.ACSR.value).toBe(0.5)
    expect(result.FRR.value).toBe(0)
    expect(result.efficiency.tokens).toBe(100)
    expect(result.efficiency.tokenMissing).toBe(2)
  })
  test('retains negative improvements, includes failed tasks and skips zero baselines', () => {
    const result = metrics([
      {
        ...base,
        traffic: {
          delayBefore: 100,
          delayAfter: 120,
          queueBefore: 20,
          queueAfter: 30,
        },
      },
      {
        ...base,
        taskId: 'T02',
        traffic: {
          delayBefore: 0,
          delayAfter: 0,
          queueBefore: 0,
          queueAfter: 0,
        },
      },
    ])
    expect(result.delayImprovement.value).toBe(-20)
    expect(result.queueImprovement.value).toBe(-50)
    expect(result.delayImprovement.samples).toBe(1)
    expect(result.ASR.value).toBeNull()
  })
  test('refuses duplicate tasks and impossible counts', () => {
    expect(() => report([base, base])).toThrow('重复taskId')
    expect(
      runSchema.safeParse({ ...base, toolCalls: { success: 3, total: 2 } })
        .success,
    ).toBe(false)
  })
})

describe('parseStream', () => {
  test('deduplicates tool uses and uses session-level usage including cache', () => {
    const use = {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'tool_use',
            id: '1',
            name: 'Agent',
            input: { prompt: 'subtask:design' },
          },
        ],
      },
    }
    const done = {
      type: 'user',
      message: {
        content: [{ type: 'tool_result', tool_use_id: '1', content: 'done' }],
      },
    }
    const final = {
      type: 'result',
      subtype: 'success',
      modelUsage: {
        model: {
          inputTokens: 100,
          outputTokens: 20,
          cacheReadInputTokens: 30,
          cacheCreationInputTokens: 40,
        },
      },
    }
    const parsed = parseStream(
      [use, use, done, final].map(value => JSON.stringify(value)).join('\n'),
    )
    expect(parsed.calls).toHaveLength(1)
    expect(parsed.calls[0]!.ok).toBe(true)
    expect(parsed.tokens).toBe(190)
    expect(parsed.tokenBreakdown).toEqual({
      input: 100,
      output: 20,
      cacheRead: 30,
      cacheCreation: 40,
    })
  })
  test('does not turn missing usage into zero', () => {
    expect(parseStream('{"type":"result","modelUsage":{}}').tokens).toBeNull()
    expect(
      parseStream('{"type":"result","modelUsage":{"a":{"inputTokens":1}}}')
        .tokens,
    ).toBeNull()
  })
  test('attributes explicit authentication failure to infrastructure', () => {
    const parsed = parseStream(
      '{"type":"assistant","error":"authentication_failed"}\n{"type":"result","is_error":true,"modelUsage":{}}',
    )
    expect(parsed.externalBlock).toBe('API authentication_failed')
    expect(parsed.tokens).toBeNull()
  })
})

describe('main', () => {
  test('connects the CLI process, real local client, independent grader and report', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'agent-benchmark-run-'))
    const previousConfig = process.env.CLAUDE_CONFIG_DIR
    process.env.CLAUDE_CONFIG_DIR = join(dir, 'config')
    try {
      const out = join(dir, 'run')
      await main([
        'run',
        '--out',
        out,
        '--task',
        'T21,T41',
        '--cli',
        fileURLToPath(new URL('./cli.fixture.ts', import.meta.url)),
        '--timeout-ms',
        '5000',
      ])
      const result = (await Bun.file(join(out, 'results.json')).json()) as Run[]
      expect(result.map(run => run.success)).toEqual([true, true])
      expect(result[0]!.toolCalls).toEqual({ success: 5, total: 5 })
      expect(result[1]!.subtasks).toEqual({ success: 3, total: 3 })
      expect(result[0]!.tokens).toBe(175)
      expect(await Bun.file(join(out, 'report.md')).text()).toContain('总体')
      const digest = await sourceDigest(out)
      const manifestPath = join(dir, 'manifest.json')
      await Bun.write(
        manifestPath,
        JSON.stringify({
          sourceSha256: digest,
          entries: [
            {
              taskId: 'T21',
              pending: true,
              notes: ['Synthetic pending case to test denominator retention'],
            },
          ],
        }),
      )
      const counts = await review(out, manifestPath, join(dir, 'review'))
      expect(counts.confirmedPass).toBe(1)
      expect(counts.pending).toEqual(['T21'])
      expect(counts.TSRLower).toBe(0.5)
      expect(counts.TSRUpper).toBe(1)
      const audited = (await Bun.file(
        join(dir, 'review/results.json'),
      ).json()) as Run[]
      expect(audited.map(run => run.tokens)).toEqual(
        result.map(run => run.tokens),
      )
      expect(audited.map(run => run.toolCalls)).toEqual(
        result.map(run => run.toolCalls),
      )
      expect(await sourceDigest(out)).toBe(digest)
      await Bun.write(
        join(out, 'T21/workspace/answer.json'),
        '{"selected":"bad"}',
      )
      await expect(
        review(out, manifestPath, join(dir, 'wrong-source')),
      ).rejects.toThrow('SHA256不匹配')
    } finally {
      if (previousConfig === undefined) delete process.env.CLAUDE_CONFIG_DIR
      else process.env.CLAUDE_CONFIG_DIR = previousConfig
      await rm(dir, { recursive: true, force: true })
    }
  })
  test('exports 60 public task cards without private expected answers', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'agent-benchmark-export-'))
    try {
      const out = join(dir, 'cards')
      await main(['export', '--out', out])
      expect(await Bun.file(join(out, 'T60.md')).exists()).toBe(true)
      const content = await Bun.file(join(out, 'T01.md')).text()
      expect(content).toContain('早高峰拥堵定位')
      expect(content).not.toContain('"priority": "B"')
      await expect(main(['export', '--out', out])).rejects.toThrow()
    } finally {
      await rm(dir, { recursive: true, force: true })
    }
  })
})
