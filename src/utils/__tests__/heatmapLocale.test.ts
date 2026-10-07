import { describe, expect, test } from 'bun:test'
import stripAnsi from 'strip-ansi'
import { stringWidth } from '@anthropic/ink'
import { generateHeatmap } from '../heatmap.js'

describe('heatmap locale', () => {
  test('keeps Chinese weekday labels aligned with the grid', () => {
    const activity = [
      {
        date: '2026-10-06',
        messageCount: 10,
        sessionCount: 1,
        toolCallCount: 2,
      },
    ]
    const heatmap = stripAnsi(
      generateHeatmap(activity, { locale: 'zh', terminalWidth: 80 }),
    )
    expect(heatmap).toContain('周一')
    expect(heatmap).toContain('少')
    expect(heatmap).not.toContain('Less')
    const rows = heatmap.split('\n').filter(line => /^周[一三五]/.test(line))
    expect(rows).toHaveLength(3)
    expect(new Set(rows.map(line => stringWidth(line))).size).toBe(1)
    expect(rows.every(line => stringWidth(line) <= 80)).toBe(true)
    expect(generateHeatmap(activity)).toContain('Mon')
  })
})
