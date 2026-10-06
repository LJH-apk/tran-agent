import { describe, expect, test } from 'bun:test'
import { readFile } from 'node:fs/promises'
import {
  getImageProtocol,
  getImageLayout,
  encodeTerminalImage,
  clearTerminalImage,
} from '../terminalEmblem.js'
import { renderStartupFrame } from '../startupSplash.js'

describe('terminal PNG display', () => {
  test('only chooses graphics for supported direct terminals', () => {
    expect(getImageProtocol({ TERM_PROGRAM: 'iTerm.app' })).toBe('iterm')
    expect(getImageProtocol({ TERM: 'xterm-kitty' })).toBe('kitty')
    expect(getImageProtocol({ TERM_PROGRAM: 'Apple_Terminal' })).toBeUndefined()
    expect(
      getImageProtocol({ TERM_PROGRAM: 'iTerm.app', TMUX: '/tmp/tmux' }),
    ).toBeUndefined()
    expect(
      getImageProtocol({ TERM_PROGRAM: 'iTerm.app', TRAN_TEXT_SPLASH: '1' }),
    ).toBeUndefined()
    expect(
      getImageProtocol({ TERM_PROGRAM: 'iTerm.app', NO_COLOR: '1' }),
    ).toBeUndefined()
  })

  test('transmits the original PNG unchanged, in bounded kitty chunks', async () => {
    const png = await readFile(
      new URL(
        '../../../docs/images/lzjtu-emblem-transparent.png',
        import.meta.url,
      ),
    )
    const kitty = encodeTerminalImage('kitty', png, 32, 16)
    const payloads = kitty
      .split('\x1b\\')
      .slice(0, -1)
      .map(chunk => chunk.slice(chunk.indexOf(';') + 1))
    expect(payloads.length).toBeGreaterThan(1)
    expect(payloads.every(payload => payload.length <= 4096)).toBe(true)
    expect(Buffer.from(payloads.join(''), 'base64').equals(png)).toBe(true)
    expect(kitty).toContain('C=1,q=2')
    expect(kitty).toContain('m=0;')
    const iterm = encodeTerminalImage('iterm', png, 32, 16)
    expect(iterm).toContain('inline=1;')
    expect(iterm).toContain('preserveAspectRatio=1:')
    expect(
      Buffer.from(iterm.slice(iterm.indexOf(':') + 1, -1), 'base64').equals(
        png,
      ),
    ).toBe(true)
    expect(clearTerminalImage('kitty')).toContain('a=d,d=I')
    expect(clearTerminalImage('iterm')).toBe('')
  })

  test('keeps the animated footer below the PNG without repainting the image', () => {
    for (const [columns, rows] of [
      [30, 18],
      [80, 24],
      [120, 50],
    ]) {
      const layout = getImageLayout(columns, rows)
      expect(layout.left + layout.width).toBeLessThan(columns)
      expect(layout.top + layout.height + 6).toBeLessThan(rows)
      const footer = renderStartupFrame(columns, rows, 1, false, layout.height)
      expect(footer).toStartWith(`\x1b[${layout.top + layout.height + 1};1H`)
      expect(footer).not.toMatch(/[\u2801-\u28ff]/u)
      expect(footer).toContain('Tran Agent')
    }
  })
})
