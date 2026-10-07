// This file is copied into each task workspace. No private answers are copied.
const [op, raw = '{}'] = process.argv.slice(2)
if (!op) throw new Error('用法：bun traffic.ts <操作> \'{"plan":"p1"}\'')
const connection = (await Bun.file(
  new URL('./connection.json', import.meta.url),
).json()) as { url: string; token: string; socketPath?: string }
const response = await fetch(connection.url, {
  // Local IPC is independent of the user's HTTP proxy configuration.
  ...(connection.socketPath ? { unix: connection.socketPath } : {}),
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${connection.token}`,
  },
  body: JSON.stringify({ op, args: JSON.parse(raw) as unknown }),
})
if (!response.ok) throw new Error(`本地工具连接失败：${response.status}`)
console.log(JSON.stringify(await response.json()))
export {}
