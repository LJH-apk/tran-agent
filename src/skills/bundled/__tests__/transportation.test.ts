import { describe, expect, test } from 'bun:test'
import { createHash } from 'node:crypto'
import { convertArticle } from '../../../../scripts/import-transportation-book.js'
import manifest from '../transportation/references/manifest.json'
import { TRANSPORTATION_FILES } from '../transportationContent.js'

const source = manifest.source

describe('transportation textbook snapshot', () => {
  test('bundles every indexed page with verifiable content and attribution', () => {
    expect(manifest.pages.length).toBeGreaterThan(35)
    for (const page of manifest.pages) {
      const text = TRANSPORTATION_FILES[page.file]
      expect(text).toBeDefined()
      expect(createHash('sha256').update(text!).digest('hex')).toBe(page.sha256)
      expect(text).toContain(page.url)
      expect(text).toContain('CC BY-SA 4.0')
      expect(TRANSPORTATION_FILES['INDEX.md']).toContain(page.file)
    }
  })

  test('includes substantive traffic flow and queueing references with TeX', () => {
    const flow = manifest.pages.find(
      page => page.title === '5.2: Traffic Flow',
    )!
    const queue = manifest.pages.find(page => page.title === '5.1: Queueing')!
    expect(flow.characters).toBeGreaterThan(5000)
    expect(queue.characters).toBeGreaterThan(5000)
    expect(TRANSPORTATION_FILES[flow.file]).toContain('\\[')
    expect(TRANSPORTATION_FILES[flow.file]).toMatch(/density/i)
  })
})

describe('convertArticle', () => {
  test('discovers both directory layouts and preserves formulas and tables', async () => {
    const html = `<html><section class="mt-content-container">
      <a class="mt-sortable-listing-link" href="${source}/05%3A_Traffic">Traffic</a>
      <dt class="mt-listing-detailed-title"><a href="${source}/05%3A_Traffic/5.02%3A_Traffic_Flow">Flow</a></dt>
      <p>\\[q = k \\times v\\]</p>
      <table><tr><th>Density</th><th>Flow</th></tr><tr><td>20</td><td>1200</td></tr></table>
      <script>doNotInclude()</script><footer class="mt-content-footer">Site footer</footer>
      </section></html>`
    const result = await convertArticle(html, source)
    expect(result.children).toHaveLength(2)
    expect(result.markdown).toContain('\\[q = k \\times v\\]')
    expect(result.markdown).toContain('| 20 | 1200 |')
    expect(result.markdown).not.toContain('doNotInclude')
    expect(result.markdown).not.toContain('Site footer')
  })

  test('rejects changed source markup rather than ingesting website chrome', async () => {
    await expect(
      convertArticle('<html>No article</html>', source),
    ).rejects.toThrow('Missing article container')
  })
})
