import { describe, expect, test } from 'bun:test'
import {
  renderStartupFrame,
  shouldShowStartupSplash,
  type SplashTerminal,
} from '../startupSplash.js'
import { getChafaEmblem, renderChafaRow } from '../chafaEmblem.js'

const terminal: SplashTerminal = {
  inputTTY: true,
  outputTTY: true,
  columns: 80,
  rows: 30,
  env: {},
}

describe('shouldShowStartupSplash', () => {
  test('allows interactive launch and resume selectors', () => {
    for (const args of [[], ['--continue'], ['-c'], ['--resume'], ['-r']]) {
      expect(shouldShowStartupSplash(args, terminal)).toBe(true)
    }
  })

  test('passes through print, protocol, help and management commands', () => {
    for (const args of [
      ['-p'],
      ['--print=hello'],
      ['--version'],
      ['--help'],
      ['--acp'],
      ['mcp', 'list'],
      ['auth', 'login'],
      ['hello'],
    ]) {
      expect(shouldShowStartupSplash(args, terminal)).toBe(false)
    }
  })

  test('skips redirected streams, small terminals and disabled animation', () => {
    for (const patch of [
      { inputTTY: false },
      { outputTTY: false },
      { columns: 29 },
      { rows: 17 },
      { env: { TERM: 'dumb' } },
      { env: { CI: 'true' } },
      { env: { TRAN_NO_SPLASH: '1' } },
      { env: { TRAN_REDUCED_MOTION: '1' } },
    ]) {
      expect(shouldShowStartupSplash([], { ...terminal, ...patch })).toBe(false)
    }
  })
})

describe('renderStartupFrame', () => {
  test('fits both large and compact terminals without scrolling', () => {
    for (const [columns, rows] of [
      [80, 30],
      [80, 40],
      [120, 50],
      [82, 47],
      [52, 24],
      [30, 18],
    ]) {
      const frame = renderStartupFrame(columns, rows, 1, false).replace(
        '\x1b[H',
        '',
      )
      const lines = frame.split('\r\n')
      expect(lines.length).toBeLessThan(rows)
      for (const line of lines) {
        const width = [...line].reduce(
          (sum, char) => sum + (/\p{Script=Han}/u.test(char) ? 2 : 1),
          0,
        )
        expect(width).toBeLessThan(columns)
      }
      expect(frame).toContain('Tran Agent')
      expect(frame).toContain('兰州交通大学')
    }
  })

  test('reveals the emblem and finishes the animation bar', () => {
    const start = renderStartupFrame(80, 30, 0, false)
    const end = renderStartupFrame(80, 30, 1, false)
    expect(start).not.toMatch(/[\u2801-\u28ff]/u)
    const art = getChafaEmblem(80, 30)
    expect(end).toContain(
      renderChafaRow(
        art.rows.find(row => renderChafaRow(row, false).trim())!,
        false,
      ),
    )
    expect(end).toContain('━'.repeat(20))
    expect(end).not.toContain('\x1b[38;')
  })

  test('uses the requested chafa 80x40 art with its full colors', () => {
    const art = getChafaEmblem(82, 47)
    expect(art.size).toBe('80x40')
    expect(art.width).toBe(80)
    expect(renderStartupFrame(82, 47, 1, true)).toContain(art.rows[10]!)
    expect(renderStartupFrame(82, 47, 1, true)).toContain('\x1b[38;2;')
    expect(getChafaEmblem(30, 18).size).toBe('20x10')
  })
})
