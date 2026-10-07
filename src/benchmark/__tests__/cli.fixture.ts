// Explicit CLI test double. These events test plumbing, not Agent capability.
import { basename } from 'node:path'

function emit(value: unknown) {
  console.log(JSON.stringify(value))
}
async function invoke(op: string, args: Record<string, unknown> = {}) {
  const id = crypto.randomUUID()
  const command = `bun traffic.ts ${op}`
  emit({
    type: 'assistant',
    message: {
      content: [{ type: 'tool_use', id, name: 'Bash', input: { command } }],
    },
  })
  const child = Bun.spawn(
    [process.execPath, 'traffic.ts', op, JSON.stringify(args)],
    { stdout: 'pipe', stderr: 'pipe' },
  )
  const [raw, stderr, exit] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ])
  if (exit !== 0) throw new Error(`local client failed: ${stderr}`)
  emit({
    type: 'user',
    message: {
      content: [
        { type: 'tool_result', tool_use_id: id, content: raw, is_error: false },
      ],
    },
  })
}

if (import.meta.main) {
  const id = basename(process.cwd().replace(/\/workspace$/, ''))
  await invoke('read')
  if (id === 'T21') {
    await invoke('validate', { plan: 'p1' })
    await invoke('simulate', { plan: 'p1' })
    await invoke('apply', { plan: 'p1' })
    await invoke('status')
    await Bun.write(
      'answer.json',
      JSON.stringify({ selected: 'p1', applied: true }),
    )
  } else if (id === 'T41') {
    const values = { a: 40, b: 90, c: 60 }
    for (const [key, delay] of Object.entries(values)) {
      emit({
        type: 'assistant',
        message: {
          content: [
            {
              type: 'tool_use',
              id: key,
              name: 'Task',
              input: { prompt: `subtask:${key}` },
            },
          ],
        },
      })
      await Bun.write(`subtasks/${key}.json`, JSON.stringify({ delay }))
      emit({
        type: 'user',
        message: {
          content: [
            { type: 'tool_result', tool_use_id: key, content: 'completed' },
          ],
        },
      })
    }
    await Bun.write('answer.json', JSON.stringify({ priority: 'B' }))
  } else throw new Error('unsupported test fixture task')
  emit({
    type: 'result',
    subtype: 'success',
    is_error: false,
    modelUsage: {
      model: {
        inputTokens: 100,
        outputTokens: 25,
        cacheReadInputTokens: 30,
        cacheCreationInputTokens: 20,
      },
    },
  })
}
