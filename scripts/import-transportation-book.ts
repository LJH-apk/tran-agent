/** Refresh the openly licensed LibreTexts edition; runtime requires no network. */
import { createHash } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import TurndownService from 'turndown'

const root =
  'https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation'
const output = fileURLToPath(
  new URL('../src/skills/bundled/transportation/', import.meta.url),
)
const license = 'https://creativecommons.org/licenses/by-sa/4.0/'
const authors =
  'David Levinson, Henry Liu, William Garrison, Mark Hickman, Adam Danczyk, Michael Corbett, Brendan Nee, Karen Dixon and her students; Wikibooks contributors; adapted/curated by LibreTexts.'
// Platform-generated contents page has no independent license tag or textbook
// prose. INDEX.md is generated from the licensed chapter listings instead.
const omittedPages = [
  {
    url: root + '/00%3A_Front_Matter/03%3A_Table_of_Contents',
    reason:
      'Platform-generated contents page without a license tag; replaced by local INDEX.md.',
  },
]
const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('hex')

export function articleHtml(html: string): string {
  const start = html.match(/<section\b[^>]*class="mt-content-container"[^>]*>/)
  if (!start || start.index === undefined)
    throw new Error('Missing article container')
  const end = html.indexOf('<footer class="mt-content-footer">', start.index)
  if (end < 0) throw new Error('Missing article footer')
  return html.slice(start.index + start[0].length, end)
}

export async function convertArticle(
  html: string,
  url: string,
): Promise<{ markdown: string; children: string[] }> {
  const children: string[] = []
  const cleaned = await new HTMLRewriter()
    .on('script, style, iframe, .mt-icon-article-topic-guide', {
      element(e) {
        e.remove()
      },
    })
    .on('a', {
      element(e) {
        const href = e.getAttribute('href')
        if (href) e.setAttribute('href', new URL(href, url).href)
        if (
          e
            .getAttribute('class')
            ?.split(' ')
            .includes('mt-sortable-listing-link') &&
          href
        ) {
          const child = new URL(href, url).href
          if (child.startsWith(root + '/')) children.push(child)
        }
      },
    })
    .on('.mt-listing-detailed-title a', {
      element(e) {
        const href = e.getAttribute('href')
        if (href) {
          const child = new URL(href, url).href
          if (child.startsWith(root + '/')) children.push(child)
        }
      },
    })
    .on('img', {
      element(e) {
        const src = e.getAttribute('src')
        if (src) e.setAttribute('src', new URL(src, url).href)
      },
    })
    .transform(new Response(articleHtml(html)))
    .text()
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  })
  // LibreTexts stores TeX as text (\[...\], \(...\)); preserve backslashes.
  service.escape = (text: string) => text
  service.addRule('table', {
    filter: 'table',
    replacement(_content, node) {
      const rows = Array.from(node.querySelectorAll('tr')).map(row =>
        Array.from(row.querySelectorAll('th, td')).map(cell =>
          service
            .turndown(cell.innerHTML)
            .replace(/\n+/g, '<br>')
            .replace(/\|/g, '&#124;'),
        ),
      )
      const width = Math.max(0, ...rows.map(row => row.length))
      if (!width) return ''
      const lines = rows.map(
        row =>
          '| ' +
          Array.from({ length: width }, (_, i) => row[i] ?? '').join(' | ') +
          ' |',
      )
      lines.splice(1, 0, '| ' + Array(width).fill('---').join(' | ') + ' |')
      return '\n\n' + lines.join('\n') + '\n\n'
    },
  })
  return {
    markdown: service.turndown(cleaned),
    children: [...new Set(children)],
  }
}

async function main(): Promise<void> {
  await mkdir(resolve(output, 'references'), { recursive: true })
  const pending = [root]
  const seen = new Set<string>()
  const pages: {
    title: string
    url: string
    file: string
    sourceSha256: string
    sha256: string
    characters: number
    sourceModified: string | null
  }[] = []
  const retrievedAt = new Date().toISOString()
  while (pending.length) {
    const url = pending.shift()!
    if (seen.has(url)) continue
    seen.add(url)
    if (omittedPages.some(page => page.url === url)) continue
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) })
    if (!response.ok) throw new Error(`${response.status} fetching ${url}`)
    const html = await response.text()
    if (
      !html.includes('licenseversion:40') ||
      !html.includes('license:ccbysa')
    ) {
      throw new Error(`Unverified CC BY-SA 4.0 license: ${url}`)
    }
    const title = /<title>([\s\S]*?)<\/title>/
      .exec(html)?.[1]
      ?.replace(/ - Engineering LibreTexts$/, '')
      .trim()
    if (!title) throw new Error(`Missing title: ${url}`)
    const { markdown, children } = await convertArticle(html, url)
    pending.push(...children.filter(child => !seen.has(child)))
    if (!markdown.trim()) {
      omittedPages.push({
        url,
        reason: 'No static article text after removing platform scripts.',
      })
      continue
    }
    const slug =
      url === root
        ? '00-book-overview'
        : decodeURIComponent(url.slice(root.length + 1))
            .replace(/[^a-zA-Z0-9/]+/g, '-')
            .toLowerCase()
            .replace(/\//g, '--')
            .replace(/-+$/g, '')
    const file = `references/${slug}.md`
    const text = `# ${title}\n\nSource: ${url}\n\nAuthors/contributors: ${authors}\n\nLicense: [CC BY-SA 4.0](${license})\n\nRetrieved: ${retrievedAt}\n\nAdaptation: HTML converted to Markdown; navigation/scripts removed; tables normalized; TeX retained. Figure files remain external links and may have separate licenses.\n\n---\n\n${markdown}\n`
    await Bun.write(resolve(output, file), text)
    pages.push({
      title,
      url,
      file,
      sourceSha256: sha256(html),
      sha256: sha256(text),
      characters: markdown.length,
      sourceModified:
        /class="mt-last-updated" data-timestamp="([^"]+)"/.exec(html)?.[1] ??
        null,
    })
    console.log(`${pages.length}: ${title} (${markdown.length} characters)`)
  }
  pages.sort((a, b) => a.file.localeCompare(b.file))
  await Bun.write(
    resolve(output, 'references/manifest.json'),
    JSON.stringify(
      {
        title: 'Fundamentals of Transportation',
        source: root,
        authors,
        license: 'CC BY-SA 4.0',
        licenseUrl: license,
        retrievedAt,
        omittedPages,
        pages,
      },
      null,
      2,
    ) + '\n',
  )
  const index = `# Fundamentals of Transportation — chapter index\n\nThis is a snapshot of the LibreTexts edition, including licensed front/back matter and chapter content. Platform-only pages are listed under omittedPages in the manifest. Some source pages are short outlines. Images are linked, not stored offline. See ATTRIBUTION.md for reuse terms.\n\n## Topic routing (中文 → source terminology)\n\n| 中文主题 | English search terms | Chapter |\n| --- | --- | --- |\n| 交通规划、决策、项目评价 | introduction, decision making, evaluation | 1 |\n| 模型、数据、网络、交通方式 | modeling, data, networks, modes | 2 |\n| 智能体建模、离散选择、土地利用、出行生成与分布、交通分配 | agent-based modeling, choice modeling, land use, trip generation, destination choice, route choice, equilibrium | 3 |\n| 公共交通、运力、发车频率、时刻表 | transit demand, operations, capacity, frequency, scheduling | 4 |\n| 排队、交通流、基本图 | queueing, traffic flow, density, fundamental diagram | 5 |\n| 激波、信号、交叉口、配时、匝道控制 | shockwaves, traffic control, signals, intersection, timing, metering | 6 |\n| 道路几何、视距、平曲线、竖曲线 | geometric design, sight distance, horizontal, vertical | 7 |\n\n## Local reference files\n\n| Title | Local file | Source |\n| --- | --- | --- |\n${pages.map(p => `| ${p.title} | [${p.file}](${p.file}) | [original](${p.url}) |`).join('\n')}\n`
  await Bun.write(resolve(output, 'INDEX.md'), index)
  const assets = [
    'INDEX.md',
    'ATTRIBUTION.md',
    'references/manifest.json',
    ...pages.map(p => p.file),
  ]
  const imports = assets.map((file, i) =>
    file.endsWith('.json')
      ? `import manifest from './transportation/${file}'`
      : `import file${i} from './transportation/${file}' with { type: 'text' }`,
  )
  const entries = assets.map(
    (file, i) =>
      `  ${JSON.stringify(file)}: ${file.endsWith('.json') ? "JSON.stringify(manifest, null, 2) + '\\n'" : `file${i}`},`,
  )
  await Bun.write(
    resolve(output, '../transportationContent.ts'),
    `// Generated by scripts/import-transportation-book.ts. Do not edit.\n${imports.join('\n')}\n\nexport const TRANSPORTATION_FILES: Record<string, string> = {\n${entries.join('\n')}\n}\n`,
  )
  console.log(`Saved ${pages.length} pages.`)
}

if (import.meta.main) await main()
