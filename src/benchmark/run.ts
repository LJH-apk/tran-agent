import { mkdir, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { evaluate } from './evaluate'
import { report, runSchema } from './report'
import { Simulator } from './simulator'
import { TASKS } from './tasks'
import { parseStream } from './telemetry'
import type { Run, Task } from './types'
import {
  allowedOperations,
  forbiddenOperations,
  RUBRIC_VERSION,
} from './contract'
import { publicOutputContracts } from './output-contract'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const requestSchema = z.object({
  op: z.string(),
  args: z.record(z.string(), z.json()).default({}),
})

export function taskPrompt(task: Task): string {
  return [
    `# ${task.id} ${task.title}`,
    `验收版本：${RUBRIC_VERSION}`,
    '',
    task.prompt,
    '',
    `本题允许的交通操作：${allowedOperations(task).join('、')}。禁止：${forbiddenOperations(task).join('、') || '无'}。调用被禁止的操作即判失败，即使最终答案正确。`,
    allowedOperations(task).includes('apply')
      ? '本题允许按任务要求应用方案；完成最终状态核验后交付。'
      : '本题仅分析或评估，禁止改变当前交通配置。',
    '通过本地工具获取数据。所有交通数值都是合成测试数据。不要读取题库或评测器源码。',
    '调用方法：bun traffic.ts <操作> \'{"参数":"值"}\'。响应中的ok表示调用执行成功；validate的valid表示方案是否合格。',
    '可用操作：read（source为primary或backup）；lookup；page（page从1开始）；diagnose；validate/simulate/apply（plan为方案ID，apply可带intersection）；poll（jobId）；status；rollback。',
    'simulate需要先validate且valid=true；apply需要已完成的simulate。约束变更后需要重新验证。对计划故障应根据工具反馈恢复。',
    `本题本地工具调用上限：${task.maxCalls}次。最终将答案写到当前目录answer.json。不要仅在对话中宣布完成。`,
    `answer.json至少包含字段：${Object.keys(task.expected).join('、')}。可附加explanation说明依据。字段中使用题目给定的英文枚举值。`,
    ...publicOutputContracts(task),
    '停止条件：取得足够证据、完成题目要求的必要步骤和子任务后，写入answer.json并结束。无需遍历所有工具、数据源或候选方案；不要因存在某个接口就试用它。提交答案后只允许用Read核验answer.json，不得继续调用交通工具或执行额外Bash命令。',
    ...(task.subtasks
      ? [
          `必须使用真实Agent工具派发子任务，key列表：${Object.keys(task.subtasks).join('、')}。`,
          '每次派发的prompt必须含subtask:<key>标记，并要求子Agent把结构化结果写到当前工作目录subtasks/<key>.json。主Agent需要核验并整合结果。请使用前台子任务，等交付完成后结束主任务。',
          ...Object.entries(task.subtasks).map(
            ([key, expected]) =>
              `子任务${key}的交付字段：${Object.keys(expected).join('、')}。`,
          ),
        ]
      : []),
  ].join('\n')
}

async function readJson(path: string): Promise<unknown> {
  try {
    return (await Bun.file(path).json()) as unknown
  } catch {
    return null
  }
}

async function runTask(
  task: Task,
  directory: string,
  cli: string,
  model: string | undefined,
  timeoutMs: number,
  maxTurns: number,
): Promise<Run> {
  const work = join(directory, task.id, 'workspace')
  await mkdir(join(work, 'subtasks'), { recursive: true })
  // Fail before calling the model if the CLI cannot create its runtime files.
  const sessionId = randomUUID()
  await mkdir(
    join(
      process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude'),
      'session-env',
      sessionId,
    ),
    { recursive: true },
  )
  const sim = new Simulator(task)
  let externalBlock: string | null = null
  const token = randomUUID()
  const socketPath =
    process.platform === 'win32'
      ? undefined
      : `/tmp/tran-bench-${randomUUID()}.sock`
  const server = Bun.serve({
    ...(socketPath ? { unix: socketPath } : { hostname: '127.0.0.1', port: 0 }),
    async fetch(request) {
      if (request.headers.get('authorization') !== `Bearer ${token}`)
        return new Response('Unauthorized', { status: 401 })
      try {
        const parsed = requestSchema.safeParse(await request.json())
        if (!parsed.success)
          return Response.json({ error: 'invalid_request' }, { status: 400 })
        return Response.json(sim.call(parsed.data.op, parsed.data.args))
      } catch (error) {
        externalBlock = `本地工具服务异常：${error instanceof Error ? error.message : String(error)}`
        return Response.json({ error: 'simulator_failure' }, { status: 500 })
      }
    },
  })
  try {
    await Bun.write(
      join(work, 'traffic.ts'),
      Bun.file(join(root, 'src/benchmark/client.ts')),
    )
    await Bun.write(
      join(work, 'connection.json'),
      JSON.stringify({
        url: socketPath
          ? 'http://localhost'
          : `http://127.0.0.1:${server.port}`,
        token,
        socketPath,
      }),
    )
    await Bun.write(join(work, 'task.md'), taskPrompt(task))
    const command = [
      Bun.which('bun') ?? 'bun',
      cli,
      '-p',
      '请读取task.md，完成该任务并交付answer.json。',
      '--output-format',
      'stream-json',
      '--verbose',
      '--max-turns',
      String(maxTurns),
      '--session-id',
      sessionId,
      '--tools',
      'Read,Write,Bash,Agent',
      '--allowedTools',
      'Read,Write,Agent,Bash(bun traffic.ts:*)',
      '--strict-mcp-config',
      '--mcp-config',
      '{"mcpServers":{}}',
      '--setting-sources',
      'user',
      '--settings',
      '{"disableAllHooks":true,"autoMemoryEnabled":false}',
      '--append-system-prompt',
      '你正在完成独立benchmark。只操作当前任务工作目录，禁止修改traffic.ts、connection.json，禁止读取评测器、题库源码或其他题目的文件。交通工具仅使用bun traffic.ts，不访问真实交通系统。',
      ...(model ? ['--model', model] : []),
    ]
    const start = performance.now()
    const child = Bun.spawn(command, {
      cwd: work,
      env: { ...process.env, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1' },
      stdin: 'ignore',
      stdout: 'pipe',
      stderr: 'pipe',
    })
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      child.kill('SIGKILL')
    }, timeoutMs)
    let stdout: string
    let stderr: string
    let exit: number
    try {
      ;[stdout, stderr, exit] = await Promise.all([
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
        child.exited,
      ])
    } finally {
      clearTimeout(timer)
    }
    const latencyMs = performance.now() - start
    await Bun.write(join(directory, task.id, 'stream.jsonl'), stdout)
    await Bun.write(join(directory, task.id, 'stderr.log'), stderr)
    const telemetry = parseStream(stdout)
    const result = telemetry.result
    externalBlock ??= telemetry.externalBlock
    // Only explicit remote API failures qualify; timeout, tool denial, bad answers and turn limits do not.
    if (
      typeof result?.api_error_status === 'number' &&
      [401, 403, 429, 500, 502, 503, 504].includes(result.api_error_status)
    ) {
      externalBlock = `API ${result.api_error_status}`
    }
    const children: Record<string, unknown> = {}
    for (const key of Object.keys(task.subtasks ?? {}))
      children[key] = await readJson(join(work, 'subtasks', `${key}.json`))
    const graded = evaluate(
      task,
      sim,
      await readJson(join(work, 'answer.json')),
      children,
      telemetry.calls,
      {
        latencyMs,
        tokens: telemetry.tokens,
        tokenBreakdown: telemetry.tokenBreakdown,
        externalBlock,
        completed:
          !timedOut &&
          exit === 0 &&
          result?.subtype === 'success' &&
          result.is_error !== true,
      },
    )
    if (timedOut) graded.reasons.push('超过任务墙钟时间上限')
    if (!result) graded.reasons.push('缺失CLI终态日志')
    await Bun.write(
      join(directory, task.id, 'tools.json'),
      JSON.stringify(
        {
          events: sim.events,
          faults: sim.faults,
          nativeCalls: telemetry.calls,
          invalidStreamLines: telemetry.invalidLines,
        },
        null,
        2,
      ),
    )
    await Bun.write(
      join(directory, task.id, 'result.json'),
      JSON.stringify(graded, null, 2),
    )
    return graded
  } finally {
    server.stop(true)
    if (socketPath) await rm(socketPath, { force: true })
  }
}

function option(args: string[], key: string): string | undefined {
  const index = args.indexOf(key)
  if (index < 0) return undefined
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`${key}缺少参数`)
  return value
}
function positive(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback
  const value = Number(raw)
  if (!Number.isSafeInteger(value) || value <= 0)
    throw new Error('预算与时间必须为正整数')
  return value
}

export async function main(args: string[]) {
  const action = args[0] ?? 'help'
  if (action === 'help' || action === '--help') {
    console.log(
      'bun run benchmark list\nbun run benchmark export --out <目录>\nbun run benchmark run [--task T01,T21] [--out <新目录>] [--model <模型>] [--cli <cli.js>] [--timeout-ms 300000] [--max-turns 40]\nbun run benchmark report --input <results.json> [--out <新目录>]',
    )
    return
  }
  if (action === 'list') {
    for (const task of TASKS)
      console.log(`${task.id}\t${task.group}\t${task.title}`)
    return
  }
  if (!['export', 'report', 'run'].includes(action))
    throw new Error(`未知命令：${action}`)
  const allowedOptions = new Set([
    '--out',
    '--task',
    '--model',
    '--cli',
    '--timeout-ms',
    '--max-turns',
    '--input',
  ])
  for (let index = 1; index < args.length; index += 2)
    if (!allowedOptions.has(args[index]!))
      throw new Error(`未知参数：${args[index]}`)
  const out = resolve(
    option(args, '--out') ??
      join(
        root,
        'benchmark-results',
        `${action}-${new Date().toISOString().replace(/[:.]/g, '-')}`,
      ),
  )
  // Never overwrite a previous run, including its workspace answers.
  await mkdir(dirname(out), { recursive: true })
  await mkdir(out, { recursive: false })
  if (action === 'export') {
    for (const task of TASKS) {
      await Bun.write(
        join(out, `${task.id}.md`),
        `${taskPrompt(task)}\n\n## 输入数据\n\n\`\`\`json\n${JSON.stringify(task.data, null, 2)}\n\`\`\`\n`,
      )
    }
    console.log(`已导出60张任务卡：${out}`)
    return
  }
  if (action === 'report') {
    const input = option(args, '--input')
    if (!input) throw new Error('report需要--input results.json')
    const runs = z.array(runSchema).parse(await readJson(resolve(input)))
    const output = report(runs)
    await Bun.write(
      join(out, 'report.json'),
      JSON.stringify(output.summary, null, 2),
    )
    await Bun.write(join(out, 'report.md'), output.markdown)
    console.log(`报告：${join(out, 'report.md')}`)
    return
  }
  if (action !== 'run') throw new Error(`未知命令：${action}`)
  const ids = option(args, '--task')?.split(',')
  if (
    ids &&
    (new Set(ids).size !== ids.length ||
      ids.some(id => !TASKS.some(task => task.id === id)))
  )
    throw new Error('任务ID无效或重复')
  const selected = TASKS.filter(task => !ids || ids.includes(task.id))
  const cli = resolve(option(args, '--cli') ?? join(root, 'dist/cli.js'))
  if (!(await Bun.file(cli).exists()))
    throw new Error('CLI构建不存在，请先bun run build，或使用--cli指定构建产物')
  const runs: Run[] = []
  for (const task of selected) {
    console.log(`运行 ${task.id} ${task.title}`)
    try {
      runs.push(
        await runTask(
          task,
          out,
          cli,
          option(args, '--model'),
          positive(option(args, '--timeout-ms'), 300000),
          positive(option(args, '--max-turns'), 40),
        ),
      )
    } catch (error) {
      runs.push({
        rubricVersion: RUBRIC_VERSION,
        taskId: task.id,
        group: task.group,
        success: false,
        reasons: ['评测运行器异常'],
        externalBlock: error instanceof Error ? error.message : String(error),
        latencyMs: 0,
        tokens: null,
        toolCalls: { success: 0, total: 0 },
        subtasks: { success: 0, total: 0 },
        faults: { recovered: 0, total: 0 },
        traffic: null,
      })
    }
    await Bun.write(join(out, 'results.json'), JSON.stringify(runs, null, 2))
    const output = report(runs)
    await Bun.write(
      join(out, 'report.json'),
      JSON.stringify(output.summary, null, 2),
    )
    await Bun.write(join(out, 'report.md'), output.markdown)
    console.log(`${task.id}：${runs.at(-1)!.success ? '通过' : '未通过'}`)
  }
  console.log(`完成${runs.length}题。报告：${join(out, 'report.md')}`)
}

if (import.meta.main) await main(process.argv.slice(2))
