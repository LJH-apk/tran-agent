import { chmod, copyFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Used by both build pipelines; all startup art is embedded in tran.js. */
export async function buildTranLauncher(outdir: string): Promise<void> {
  const result = await Bun.build({
    entrypoints: ['src/entrypoints/tran.ts'],
    target: 'node',
    minify: true,
    splitting: false,
  })
  if (!result.success)
    throw new AggregateError(result.logs, 'Tran launcher build failed')
  const bundled = await result.outputs[0]!.text()
  // Bun's pre-transpiled marker can decode UTF-8 literals as Latin-1.
  // Reparse this small launcher normally so chafa glyphs and Chinese stay intact.
  const source = bundled
    .replace(/^#![^\n]*\n/, '')
    .replace(/^\/\/ @bun\r?\n/, '')
  const launcher = join(outdir, 'tran.js')
  await writeFile(launcher, `#!/usr/bin/env bun\n${source}`)
  await chmod(launcher, 0o755)
  await mkdir(join(outdir, 'assets'), { recursive: true })
  await copyFile(
    'docs/images/lzjtu-emblem-transparent.png',
    join(outdir, 'assets', 'lzjtu-emblem-transparent.png'),
  )
  console.log(`Generated ${launcher} with embedded chafa startup art`)
}
