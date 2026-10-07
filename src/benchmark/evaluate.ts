import type { Json, Run, Task, TokenBreakdown } from './types'
import type { Simulator } from './simulator'
import { forbiddenOperations, RUBRIC_VERSION } from './contract'

export interface NativeCall {
  id: string
  name: string
  input: Record<string, unknown>
  ok: boolean | null
}
export function matches(
  actual: unknown,
  expected: Json,
  key?: string,
): boolean {
  if (typeof expected === 'number')
    return (
      typeof actual === 'number' &&
      Number.isFinite(actual) &&
      Math.abs(actual - expected) < 0.0001
    )
  if (expected === null || typeof expected !== 'object')
    return actual === expected
  if (
    Array.isArray(expected) &&
    key &&
    [
      'scope',
      'coverage',
      'confirmed',
      'hypothesis',
      'violations',
      'changedIntersections',
    ].includes(key)
  ) {
    if (!Array.isArray(actual) || actual.length !== expected.length)
      return false
    const unused = [...actual]
    return expected.every(value => {
      const index = unused.findIndex(item => matches(item, value))
      if (index < 0) return false
      unused.splice(index, 1)
      return true
    })
  }
  if (Array.isArray(expected))
    return (
      Array.isArray(actual) &&
      actual.length === expected.length &&
      expected.every((value, i) => matches(actual[i], value))
    )
  return (
    actual !== null &&
    typeof actual === 'object' &&
    !Array.isArray(actual) &&
    Object.entries(expected).every(([key, value]) =>
      matches((actual as Record<string, unknown>)[key], value, key),
    )
  )
}

export function evaluate(
  task: Task,
  sim: Simulator,
  answer: unknown,
  children: Record<string, unknown>,
  nativeCalls: NativeCall[],
  runtime: {
    latencyMs: number
    tokens: number | null
    tokenBreakdown?: TokenBreakdown | null
    externalBlock: string | null
    completed: boolean
  },
): Run {
  const reasons: string[] = []
  if (!runtime.completed) reasons.push('Agent运行未正常完成')
  if (!matches(answer, task.expected)) reasons.push('结构化答案未通过验收')
  if (task.fault && sim.faults.length === 0) reasons.push('未覆盖预设故障路径')
  const ruleEvents = (op: string, plan?: string) => {
    const attempt = op.endsWith('_attempt')
    return sim.events.filter(
      event =>
        event.op === op.replace('_attempt', '') &&
        (attempt || event.ok) &&
        (!plan || event.args.plan === plan) &&
        !(
          op === 'validate' &&
          event.result &&
          typeof event.result === 'object' &&
          !Array.isArray(event.result) &&
          event.result.valid === false
        ),
    )
  }
  for (const rule of task.rules) {
    const events = ruleEvents(rule.op, rule.plan)
    if (!rule.optional && events.length < (rule.min ?? 1))
      reasons.push(`缺少步骤：${rule.op}${rule.plan ? `(${rule.plan})` : ''}`)
    for (const dependency of rule.after ?? []) {
      const predecessors = ruleEvents(dependency.op, dependency.plan)
      if (
        !events.some(event =>
          predecessors.some(previous => previous.id < event.id),
        )
      )
        reasons.push(`步骤依赖不满足：${dependency.op}→${rule.op}`)
    }
  }
  // Only real dependencies are ordered. Different plans may all be validated
  // before any simulation; the list of acceptance rules is not an execution script.
  for (const event of sim.events.filter(
    event => event.ok && ['simulate', 'apply'].includes(event.op),
  )) {
    const plan = event.args.plan
    const predecessor = event.op === 'simulate' ? 'validate' : 'simulate'
    const history =
      Array.isArray(task.data.history) &&
      task.data.history.some(
        item =>
          item &&
          typeof item === 'object' &&
          !Array.isArray(item) &&
          item.op === predecessor &&
          item.plan === plan &&
          (predecessor === 'validate'
            ? item.valid === true
            : item.completed === true),
      )
    const prior = sim.events.some(
      previous =>
        previous.id < event.id &&
        previous.op === predecessor &&
        previous.args.plan === plan &&
        previous.ok &&
        previous.result &&
        typeof previous.result === 'object' &&
        !Array.isArray(previous.result) &&
        (predecessor === 'validate'
          ? previous.result.valid === true
          : previous.result.status === 'completed'),
    )
    const asyncDone =
      predecessor === 'simulate' &&
      sim.events.some(
        previous =>
          previous.id < event.id &&
          previous.op === 'poll' &&
          previous.ok &&
          previous.result &&
          typeof previous.result === 'object' &&
          !Array.isArray(previous.result) &&
          previous.result.status === 'completed' &&
          previous.result.plan === plan,
      )
    if (!history && !prior && !asyncDone)
      reasons.push(
        `步骤依赖不满足：${predecessor}(${String(plan)})→${event.op}`,
      )
  }
  for (const op of forbiddenOperations(task))
    if (sim.events.some(event => event.op === op))
      reasons.push(`越过操作边界：${op}`)
  const isAnswer = (call: NativeCall) =>
    typeof call.input.file_path === 'string' &&
    call.input.file_path.replace(/\\/g, '/').split('/').at(-1) === 'answer.json'
  const delivery = nativeCalls.findIndex(
    call => call.name === 'Write' && call.ok === true && isAnswer(call),
  )
  if (
    delivery >= 0 &&
    nativeCalls
      .slice(delivery + 1)
      .some(call => !(call.name === 'Read' && isAnswer(call)))
  )
    reasons.push('提交答案后继续执行非核验工具，未按完成条件停止')
  if (task.finalPlan && sim.currentPlan !== task.finalPlan)
    reasons.push('最终生效方案不正确')
  if (task.finalPlan) {
    const lastMutation = sim.events.findLast(event =>
      ['apply', 'rollback'].includes(event.op),
    )
    if (
      !sim.events.some(
        event =>
          event.op === 'status' &&
          event.ok &&
          event.id > (lastMutation?.id ?? 0),
      )
    )
      reasons.push('最终配置未读回核验')
  }
  if (
    ['T29', 'T56'].includes(task.id) &&
    sim.events.filter(event => event.op === 'apply').length !== 1
  )
    reasons.push('重复应用或未应用')
  if (task.id === 'T28') {
    const applies = sim.events.filter(event => event.op === 'apply' && event.ok)
    if (
      !sim.events.some(
        event =>
          event.op === 'status' &&
          event.id > (applies[0]?.id ?? 0) &&
          event.id < (applies[1]?.id ?? 0),
      )
    )
      reasons.push('配置漂移未先核验再纠正')
  }
  if (task.id === 'T57') {
    const rollback = sim.events.find(event => event.op === 'rollback')
    if (
      !sim.events.some(
        event => event.op === 'status' && event.id < (rollback?.id ?? 0),
      )
    )
      reasons.push('未监测实际恶化就回滚')
  }
  if (task.id === 'T24') {
    const pages = new Set(
      sim.events
        .filter(event => event.op === 'page' && event.ok)
        .map(event => event.args.page),
    )
    if (pages.size !== 3) reasons.push('分页未完整覆盖')
  }
  const dispatched = nativeCalls.filter(
    call => call.name === 'Agent' || call.name === 'Task',
  )
  const required = task.subtasks ?? {}
  const passedKeys = new Set<string>()
  let subSuccess = 0
  for (const call of dispatched) {
    const prompt =
      typeof call.input.prompt === 'string' ? call.input.prompt : ''
    const key = /subtask:([a-z]+)/.exec(prompt)?.[1]
    if (
      key &&
      required[key] &&
      !passedKeys.has(key) &&
      call.ok === true &&
      matches(children[key], required[key])
    ) {
      passedKeys.add(key)
      subSuccess++
    }
  }
  for (const key of Object.keys(required))
    if (!passedKeys.has(key)) reasons.push(`子任务未通过独立验收：${key}`)
  if (task.id === 'T48') {
    const diagnosis = dispatched.findIndex(
      call =>
        typeof call.input.prompt === 'string' &&
        call.input.prompt.includes('subtask:diagnosis'),
    )
    const design = dispatched.findIndex(
      call =>
        typeof call.input.prompt === 'string' &&
        call.input.prompt.includes('subtask:design'),
    )
    if (diagnosis < 0 || design <= diagnosis) reasons.push('子任务依赖顺序错误')
  }
  const localSuccess = sim.events.filter(event => event.ok).length
  // Native Bash wrappers that reached the simulator are transport, not a second tool call.
  // Count native read/write/agent calls, plus Bash calls unrelated to the local client.
  const native = nativeCalls.filter(
    call =>
      !(
        call.name === 'Bash' &&
        typeof call.input.command === 'string' &&
        call.input.command.includes('traffic.ts') &&
        call.ok === true
      ),
  )
  const traffic = task.optimize
    ? {
        delayBefore: task.plans.p0!.delay,
        delayAfter: task.plans[sim.currentPlan]!.delay,
        queueBefore: task.plans.p0!.queue,
        queueAfter: task.plans[sim.currentPlan]!.queue,
      }
    : null
  const recoverable = sim.faults.filter(event => event.recoverable)
  const recovered = recoverable.filter(
    event =>
      event.recovered && (task.id !== 'T59' || passedKeys.has('replacement')),
  ).length
  return {
    rubricVersion: RUBRIC_VERSION,
    taskId: task.id,
    group: task.group,
    success: reasons.length === 0 && runtime.externalBlock === null,
    reasons,
    externalBlock: runtime.externalBlock,
    latencyMs: runtime.latencyMs,
    tokens: runtime.tokens,
    tokenBreakdown: runtime.tokenBreakdown ?? null,
    toolCalls: {
      success: localSuccess + native.filter(call => call.ok === true).length,
      total: sim.events.length + native.length,
    },
    subtasks: { success: subSuccess, total: dispatched.length },
    faults: { recovered, total: recoverable.length },
    traffic,
  }
}
