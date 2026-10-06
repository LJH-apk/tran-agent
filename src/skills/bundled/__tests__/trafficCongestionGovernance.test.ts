import { describe, expect, test } from 'bun:test'
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import references from '../trafficCongestionGovernanceContent.json'
import manifest from '../trafficCongestionGovernanceManifest.json'

const files: Record<string, string> = references
const hash = (value: string) => createHash('sha256').update(value).digest('hex')

describe('traffic congestion governance knowledge base', () => {
  test('preserves all supplied source files and bundles every reference exactly', async () => {
    expect(manifest.files).toHaveLength(50)
    expect(Object.keys(files)).toHaveLength(47)
    for (const item of manifest.files) {
      const path = new URL(
        `../traffic-congestion-governance/${item.path}`,
        import.meta.url,
      )
      const source = await readFile(path, 'utf8')
      expect(hash(source)).toBe(item.sha256)
      if (item.bundled) expect(files[item.path]).toBe(source)
    }
    expect(files['references/paper_catalog.csv']).toBeDefined()
    expect(files['references/paper_evidence_matrix.csv']).toBeDefined()
  })

  test('all concrete local Markdown and CSV reference routes exist', async () => {
    const skill = await readFile(
      new URL('../traffic-congestion-governance/SKILL.md', import.meta.url),
      'utf8',
    )
    const documents = [skill, ...Object.values(files)]
    let routes = 0
    for (const text of documents) {
      for (const match of text.matchAll(
        /`((?:references\/)?[a-zA-Z0-9_]+\.(?:md|csv))`/g,
      )) {
        const path = match[1]!.startsWith('references/')
          ? match[1]!
          : `references/${match[1]}`
        expect(files[path]).toBeDefined()
        routes++
      }
    }
    expect(routes).toBeGreaterThan(35)
  })

  test('compiled skill registers and extracts readable Markdown and CSV offline', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'tran-congestion-test-'))
    try {
      const registration = fileURLToPath(
        new URL('../transportation.ts', import.meta.url),
      )
      const registry = fileURLToPath(
        new URL('../../bundledSkills.ts', import.meta.url),
      )
      const entry = join(directory, 'smoke.ts')
      await writeFile(
        entry,
        `
import { registerTransportationSkill } from ${JSON.stringify(registration)}
import { getBundledSkills } from ${JSON.stringify(registry)}
import { readFile, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
registerTransportationSkill()
const command = getBundledSkills().find(c => c.name === 'transportation')
if (!command || command.type !== 'prompt' || command.disableModelInvocation) throw new Error('Skill unavailable')
if (!command.aliases?.includes('traffic-congestion-governance') || getBundledSkills().length !== 1) throw new Error('Duplicate skill or missing alias')
if (!command.whenToUse?.includes('交通工程') || !command.whenToUse?.includes('congestion')) throw new Error('Missing intent discovery description')
const blocks = await command.getPromptForCommand('诊断排队回溢', {} as never)
const text = blocks[0]?.type === 'text' ? blocks[0].text : ''
const base = /^Base directory for this skill: (.+)/m.exec(text)?.[1]
if (!base || !text.includes('诊断排队回溢') || !text.includes('governance/SKILL.md')) throw new Error('Invalid prompt or extraction')
try {
  const textbook = await readFile(base + '/INDEX.md', 'utf8')
  const governance = await readFile(base + '/governance/SKILL.md', 'utf8')
  if (!textbook.includes('Fundamentals of Transportation') || !governance.includes('# Traffic Congestion Governance')) throw new Error('Missing merged collection')
  const manifest = ${JSON.stringify(manifest.files.filter(item => item.bundled))}
  for (const file of manifest) {
    const content = await readFile(base + '/governance/' + file.path, 'utf8')
    if (createHash('sha256').update(content).digest('hex') !== file.sha256) throw new Error('Extracted content differs: ' + file.path)
  }
  console.log('extracted 47 references')
} finally { await rm(base, { recursive: true, force: true }) }
`,
      )
      // Build in a fresh process: bun:test's module mocks/resolver state must
      // not affect the production dependency graph being verified.
      const defines = fileURLToPath(
        new URL('../../../../scripts/defines.ts', import.meta.url),
      )
      const builder = join(directory, 'build.ts')
      await writeFile(
        builder,
        `
import { getMacroDefines, DEFAULT_BUILD_FEATURES } from ${JSON.stringify(defines)}
const result = await Bun.build({
  entrypoints: [${JSON.stringify(entry)}],
  outdir: ${JSON.stringify(join(directory, 'dist'))},
  target: 'bun', features: DEFAULT_BUILD_FEATURES, define: getMacroDefines(),
})
if (!result.success) throw new Error(result.logs.map(log => log.message).join('\\n'))
await import(${JSON.stringify(join(directory, 'dist/smoke.js'))})
`,
      )
      const process = Bun.spawn([Bun.which('bun')!, builder], {
        stdout: 'pipe',
        stderr: 'pipe',
      })
      const [stdout, stderr, code] = await Promise.all([
        new Response(process.stdout).text(),
        new Response(process.stderr).text(),
        process.exited,
      ])
      if (code !== 0) throw new Error(stderr)
      expect(code).toBe(0)
      expect(stdout).toContain('extracted 47 references')
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  }, 30000)
})
