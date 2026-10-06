import { afterEach, describe, expect, test } from 'bun:test'
import { hasStartupScreen, takeStartupScreenPrefix } from '../startup-screen.js'
import { writeDiffToTerminal } from '../terminal.js'

const original = process.env.TRAN_STARTUP_SCREEN
afterEach(() => {
  if (original === undefined) delete process.env.TRAN_STARTUP_SCREEN
  else process.env.TRAN_STARTUP_SCREEN = original
})

describe('startup screen handoff', () => {
  test('waits for visible UI and batches the handoff with that first paint', () => {
    process.env.TRAN_STARTUP_SCREEN = 'text'
    const writes: string[] = []
    const originalWrite = process.stdout.write
    process.stdout.write = ((chunk: string) => {
      writes.push(chunk)
      return true
    }) as typeof process.stdout.write
    try {
      const terminal = { stdout: process.stdout, stderr: process.stderr }
      writeDiffToTerminal(terminal, [])
      writeDiffToTerminal(terminal, [{ type: 'cursorHide' }])
      writeDiffToTerminal(terminal, [{ type: 'stdout', content: '\x1b[H' }])
      expect(hasStartupScreen()).toBe(true)
      expect(writes.join('')).not.toContain('\x1b[?1049l')
      writeDiffToTerminal(terminal, [{ type: 'stdout', content: 'TA welcome' }])
      expect(writes.at(-1)).toBe(
        '\x1b[?2026h\x1b[0m\x1b[?1049l\x1b[2J\x1b[HTA welcome\x1b[?2026l',
      )
      expect(hasStartupScreen()).toBe(false)
    } finally {
      process.stdout.write = originalWrite
    }
  })
  test('normal mode clears and paints the main screen in one handoff', () => {
    process.env.TRAN_STARTUP_SCREEN = 'text'
    expect(hasStartupScreen()).toBe(true)
    expect(takeStartupScreenPrefix(false)).toBe(
      '\x1b[0m\x1b[?1049l\x1b[2J\x1b[H',
    )
    expect(hasStartupScreen()).toBe(false)
    expect(takeStartupScreenPrefix(false)).toBe('')
  })
  test('fullscreen reuses the splash buffer without exposing the shell', () => {
    process.env.TRAN_STARTUP_SCREEN = 'iterm'
    const prefix = takeStartupScreenPrefix(true)
    expect(prefix).not.toContain('\x1b[?1049l')
    expect(prefix).not.toContain('\x1b[?1049h')
    expect(prefix).toContain('\x1b[2J\x1b[H')
  })
  test('releases only the startup kitty image before painting', () => {
    process.env.TRAN_STARTUP_SCREEN = 'kitty'
    expect(takeStartupScreenPrefix(true)).toContain('a=d,d=I,i=197903,q=2')
  })
  test('ordinary launches do not change the terminal', () => {
    delete process.env.TRAN_STARTUP_SCREEN
    expect(hasStartupScreen()).toBe(false)
    expect(takeStartupScreenPrefix(false)).toBe('')
  })
})
