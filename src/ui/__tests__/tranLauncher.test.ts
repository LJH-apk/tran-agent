import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildTranLauncher } from '../../../scripts/build-tran-launcher.js'
import { getChafaEmblem } from '../chafaEmblem.js'

describe('compiled Tran launcher', () => {
  let directory: string
  beforeAll(async () => {
    directory = await realpath(await mkdtemp(join(tmpdir(), 'tran-launcher-test-')))
    await buildTranLauncher(directory)
    await writeFile(join(directory, 'cli.js'), 'console.log(process.cwd())')
  })
  afterAll(async () => {
    await rm(directory, { recursive: true, force: true })
  })

  async function launch(preview: boolean) {
    const launcher = pathToFileURL(join(directory, 'tran.js')).href
    const script = `
      Object.defineProperty(process.stdin, 'isTTY', { value: true });
      Object.defineProperty(process.stdout, 'isTTY', { value: true });
      Object.defineProperty(process.stdout, 'columns', { value: 82 });
      Object.defineProperty(process.stdout, 'rows', { value: 47 });
      process.argv = ['bun', ${JSON.stringify(launcher)}, ...${JSON.stringify(preview ? ['--splash-only'] : [])}];
      await import(${JSON.stringify(launcher)});
    `
    const child = Bun.spawn([process.execPath, '-e', script], {
      cwd: directory,
      env: {
        ...process.env,
        CLAUDE_CONFIG_DIR: directory,
        CI: '',
        TERM: 'xterm-256color',
        TRAN_NO_SPLASH: '',
        TRAN_REDUCED_MOTION: '',
        TRAN_PNG_SPLASH: '',
        NO_COLOR: undefined,
      },
      stdout: 'pipe',
      stderr: 'pipe',
    })
    const output = await new Response(child.stdout).text()
    const error = await new Response(child.stderr).text()
    expect(await child.exited).toBe(0)
    expect(error).toBe('')
    return output
  }

  test('preserves exact chafa Unicode and ordinary Chinese labels after bundling', async () => {
    await writeFile(
      join(directory, '.claude.json'),
      '{"skipStartupAnimation":true}',
    )
    // Explicit preview still works with the preference enabled.
    const output = await launch(true)
    expect(output).toContain(getChafaEmblem(82, 47).rows[10]!)
    expect(output).toContain('兰州交通大学')
    expect(output).toContain('交通运输学院')
    expect(output).not.toContain('â\u0096')
    expect(output.endsWith('\x1b[0m\x1b[?25h\x1b[?1049l')).toBe(true)
    expect(await readFile(join(directory, 'tran.js'), 'utf8')).not.toContain(
      '// @bun\n',
    )
  })

  test('reads the global preference and loads the bundled CLI from another directory', async () => {
    const config = join(directory, '.claude.json')
    await writeFile(config, '{"skipStartupAnimation":true}')
    expect(await launch(false)).toBe(`${directory}\n`)
    await writeFile(config, '{"skipStartupAnimation":false}')
    expect(await launch(false)).toContain('\x1b[?1049h')
    // Legacy global config wins, matching the Agent config reader.
    await writeFile(
      join(directory, '.config.json'),
      '{"skipStartupAnimation":true}',
    )
    expect(await launch(false)).toBe(`${directory}\n`)
  })
})
