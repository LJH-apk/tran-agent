import type { FaultEvent, Json, Task, ToolEvent } from './types'

export class Simulator {
  readonly events: ToolEvent[] = []
  readonly faults: FaultEvent[] = []
  currentPlan = 'p0'
  private validated = new Set<string>()
  private simulated = new Set<string>()
  private faultTriggered = false
  private retryAt = 0
  private polls = 0
  private applies = 0
  private minPedestrian: number

  constructor(readonly task: Task) {
    this.minPedestrian =
      typeof task.data.minPedestrian === 'number' ? task.data.minPedestrian : 20
    if (Array.isArray(task.data.history)) {
      for (const item of task.data.history) {
        if (
          item &&
          typeof item === 'object' &&
          !Array.isArray(item) &&
          typeof item.plan === 'string'
        ) {
          if (item.op === 'validate') this.validated.add(item.plan)
          if (item.op === 'simulate') this.simulated.add(item.plan)
        }
      }
    }
  }

  call(
    op: string,
    args: Record<string, Json> = {},
  ): { ok: boolean; result: Json } {
    const fault = this.task.fault
    const backup = args.source === 'backup'
    const shouldFault =
      fault?.op === op &&
      (!this.faultTriggered || fault.permanent) &&
      !(fault.code === 'source_unavailable' && backup)
    let output: { ok: boolean; result: Json }
    if (this.events.length >= this.task.maxCalls) {
      output = { ok: false, result: { code: 'call_budget_exhausted' } }
    } else if (Date.now() < this.retryAt && op === 'read') {
      output = {
        ok: false,
        result: {
          code: 'rate_limited',
          retryAfterMs: this.retryAt - Date.now(),
        },
      }
    } else if (shouldFault && fault) {
      if (!this.faultTriggered) {
        this.faults.push({
          id: `${this.task.id}:fault`,
          code: fault.code,
          recoverable: fault.recoverable,
          recovered: false,
        })
      }
      this.faultTriggered = true
      if (fault.code === 'rate_limited') this.retryAt = Date.now() + 100
      if (fault.code === 'constraint_changed') this.minPedestrian = 25
      if (fault.after) {
        output = this.execute(op, args)
        if (fault.code === 'invalid_data')
          output = {
            ok: true,
            result: {
              delay: 100,
              queue: -10,
              warning: '数据可能异常，正常读取应包含plans和data',
            },
          }
        if (fault.code === 'timeout_after_commit')
          output = {
            ok: false,
            result: {
              code: fault.code,
              message: '提交结果未知，请查询实际状态',
            },
          }
      } else {
        output = {
          ok: false,
          result: {
            code: fault.code,
            ...(fault.code === 'rate_limited' ? { retryAfterMs: 100 } : {}),
            ...(fault.code === 'constraint_changed'
              ? { minPedestrian: 25 }
              : {}),
          },
        }
        if (fault.code === 'constraint_changed')
          output = {
            ok: true,
            result: {
              valid: false,
              violations: ['pedestrian'],
              minPedestrian: 25,
              code: fault.code,
            },
          }
      }
    } else {
      output = this.execute(op, args)
      if (
        output.ok &&
        fault &&
        this.faultTriggered &&
        op === fault.recoveryOp &&
        (!fault.recoveryPlan || args.plan === fault.recoveryPlan)
      ) {
        for (const event of this.faults)
          if (event.recoverable) event.recovered = true
      }
    }
    this.events.push({ id: this.events.length + 1, op, args, ...output })
    return output
  }

  private execute(
    op: string,
    args: Record<string, Json>,
  ): { ok: boolean; result: Json } {
    const planId = typeof args.plan === 'string' ? args.plan : ''
    const plan = this.task.plans[planId]
    const good = (result: Json) => ({ ok: true, result })
    const bad = (code: string) => ({ ok: false, result: { code } })
    switch (op) {
      case 'read':
        return good({
          data: this.task.data,
          plans: this.task.plans as unknown as Json,
          currentPlan: this.currentPlan,
          source: args.source ?? 'primary',
          constraints: {
            cycleRange: [60, 120],
            minGreen: 15,
            minPedestrian: this.minPedestrian,
          },
        })
      case 'lookup':
        return good(this.task.data.aliases ?? {})
      case 'page': {
        const pages = this.task.data.pages
        const page = args.page
        if (
          !Array.isArray(pages) ||
          typeof page !== 'number' ||
          !Number.isInteger(page) ||
          page < 1 ||
          page > pages.length
        )
          return bad('invalid_page')
        return good({
          rows: pages[page - 1]!,
          nextPage: page < pages.length ? page + 1 : null,
          totalPages: pages.length,
        })
      }
      case 'diagnose':
        return good({ cause: 'green_shortage', recommended: 'p1' })
      case 'validate': {
        if (!plan) return bad('unknown_plan')
        const violations: string[] = []
        if (plan.cycle < 60 || plan.cycle > 120) violations.push('cycle')
        if (plan.green < 15) violations.push('green')
        if (plan.pedestrian < this.minPedestrian) violations.push('pedestrian')
        if (plan.green + plan.pedestrian > plan.cycle)
          violations.push('phase_sum')
        if (violations.length === 0) this.validated.add(planId)
        // A valid rejection is a successful tool call, even though the plan is invalid.
        return good({
          valid: violations.length === 0,
          violations,
          plan: planId,
        })
      }
      case 'simulate': {
        if (!plan || !this.validated.has(planId))
          return bad('validation_required')
        if (this.task.data.asynchronous)
          return good({ jobId: 'job-1', status: 'running' })
        this.simulated.add(planId)
        const update = this.task.data.updateAfterSimulation
        if (
          update &&
          typeof update === 'object' &&
          !Array.isArray(update) &&
          typeof update.minPedestrian === 'number'
        ) {
          this.minPedestrian = update.minPedestrian
          for (const id of this.validated)
            if (this.task.plans[id]!.pedestrian < this.minPedestrian)
              this.validated.delete(id)
        }
        return good({
          plan: planId,
          status: 'completed',
          delay: plan.delay,
          queue: plan.queue,
          downstreamBlocked: plan.downstreamBlocked ?? false,
          userUpdate: update ?? null,
          completionEvents: this.task.data.duplicateCompletion
            ? ['event-1', 'event-1']
            : ['event-1'],
        })
      }
      case 'poll': {
        if (
          args.jobId !== 'job-1' ||
          !this.events.some(event => event.op === 'simulate' && event.ok)
        )
          return bad('unknown_job')
        this.polls++
        if (this.polls < 2) return good({ jobId: 'job-1', status: 'running' })
        this.simulated.add('p1')
        return good({
          jobId: 'job-1',
          status: 'completed',
          plan: 'p1',
          delay: this.task.plans.p1!.delay,
          queue: this.task.plans.p1!.queue,
        })
      }
      case 'apply': {
        if (!plan || !this.validated.has(planId) || !this.simulated.has(planId))
          return bad('completed_simulation_required')
        if (this.task.data.applicationPermission === 'revoked')
          return bad('permission_revoked')
        if (
          Array.isArray(this.task.data.allowedIntersections) &&
          !this.task.data.allowedIntersections.includes(
            args.intersection ?? null,
          )
        )
          return bad('intersection_not_allowed')
        this.applies++
        this.currentPlan =
          this.task.data.driftOnce && this.applies === 1 ? 'p0' : planId
        return good({ acknowledged: true, plan: planId })
      }
      case 'status':
        return good({
          currentPlan: this.currentPlan,
          delay: this.task.plans[this.currentPlan]!.delay,
          queue: this.task.plans[this.currentPlan]!.queue,
        })
      case 'rollback':
        this.currentPlan = 'p0'
        return good({ restored: 'p0' })
      default:
        return bad('unknown_operation')
    }
  }
}
