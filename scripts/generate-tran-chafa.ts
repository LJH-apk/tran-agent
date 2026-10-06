#!/usr/bin/env bun
import { fileURLToPath } from 'node:url'

// Runtime startup uses the saved output and does not require chafa installed.
const source = fileURLToPath(
  new URL('../docs/images/lzjtu-emblem-transparent.png', import.meta.url),
)
const sizes = ['80x40', '64x32', '48x24', '32x16', '20x10']
const variants = sizes.map(size => {
  const result = Bun.spawnSync(
    [
      'chafa',
      '-f',
      'symbols',
      '-c',
      'full',
      '-s',
      size,
      '--symbols',
      'block+border+diagonal+half',
      source,
    ],
    { stdout: 'pipe', stderr: 'pipe' },
  )
  if (result.exitCode !== 0)
    throw new Error(result.stderr.toString() || `chafa failed for ${size}`)
  const output = result.stdout
    .toString()
    .replaceAll('\x1b[?25l', '')
    .replaceAll('\x1b[?25h', '')
  const rows = output.trimEnd().split('\n')
  return { size, width: Number(size.split('x')[0]), rows }
})
await Bun.write(
  new URL('../src/ui/tranEmblemChafa.json', import.meta.url),
  `${JSON.stringify(variants, null, 2)}\n`,
)
