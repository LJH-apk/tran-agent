/** Import the supplied skill archive without executing its instructions. */
import { createHash } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { unzipSync } from 'fflate'

const archivePath = process.argv[2]
if (!archivePath) {
  throw new Error(
    'Usage: bun run scripts/import-congestion-skill.ts <skill.zip>',
  )
}
const skillName = 'traffic-congestion-governance'
const prefix = skillName + '/'
const destination = fileURLToPath(
  new URL(
    '../src/skills/bundled/traffic-congestion-governance/',
    import.meta.url,
  ),
)
const archive = new Uint8Array(await Bun.file(archivePath).arrayBuffer())
const entries = unzipSync(archive)
const sourceFiles: Record<string, string> = {}
const references: Record<string, string> = {}
const hash = (value: string | Uint8Array) =>
  createHash('sha256').update(value).digest('hex')
const decoder = new TextDecoder('utf-8', { fatal: true })

// Validate every path before writing any files; preserve supplied UTF-8 text.
for (const [path, bytes] of Object.entries(entries)) {
  if (path.endsWith('/')) continue
  if (!path.startsWith(prefix)) throw new Error(`Unexpected ZIP path: ${path}`)
  const relative = path.slice(prefix.length)
  if (
    relative.includes('\\') ||
    relative.split('/').some(part => !part || part === '..' || part === '.') ||
    !/\.(md|csv|yaml)$/.test(relative)
  ) {
    throw new Error(`Unsafe or unsupported ZIP path: ${path}`)
  }
  const content = decoder.decode(bytes)
  sourceFiles[relative] = content
  if (relative.startsWith('references/')) references[relative] = content
}
if (!sourceFiles['SKILL.md']?.includes(`name: ${skillName}`)) {
  throw new Error('Missing or mismatched SKILL.md')
}
if (!references['references/00_knowledge_map.md']) {
  throw new Error('Missing knowledge map')
}
for (const [path, content] of Object.entries(sourceFiles)) {
  const target = resolve(destination, path)
  await mkdir(dirname(target), { recursive: true })
  await Bun.write(target, content)
}
const files = Object.entries(sourceFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, content]) => ({
    path,
    sha256: hash(content),
    bytes: Buffer.byteLength(content),
    bundled: path.startsWith('references/'),
  }))
await Bun.write(
  resolve(destination, '../trafficCongestionGovernanceContent.json'),
  JSON.stringify(references, null, 2) + '\n',
)
await Bun.write(
  resolve(destination, '../trafficCongestionGovernanceManifest.json'),
  JSON.stringify(
    {
      skillName,
      archive: basename(archivePath),
      archiveSha256: hash(archive),
      files,
    },
    null,
    2,
  ) + '\n',
)
console.log(
  `Imported ${files.length} source files; bundled ${Object.keys(references).length} references.`,
)
