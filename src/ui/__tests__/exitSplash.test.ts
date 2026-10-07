import { describe, expect, test } from 'bun:test'
import { CLEAR_EXIT_SCREEN, playExitSplash } from '../exitSplash.js'

describe('playExitSplash', () => {
  test('does not write or delay when disabled', async () => {
    const writes: string[] = []
    let waits = 0
    await playExitSplash({
      enabled: false,
      write: text => writes.push(text),
      wait: async () => {
        waits++
      },
    })
    expect(writes).toEqual([])
    expect(waits).toBe(0)
  })

  test('renders a short animation and restores the cursor', async () => {
    const writes: string[] = []
    const waits: number[] = []
    await playExitSplash({
      enabled: true,
      write: text => writes.push(text),
      wait: async ms => {
        waits.push(ms)
      },
    })
    expect(writes[0]).toContain(CLEAR_EXIT_SCREEN)
    expect(writes.join('')).toContain('正在退出')
    expect(waits.reduce((sum, value) => sum + value, 0)).toBeLessThanOrEqual(
      500,
    )
    expect(writes.at(-1)).toContain('\x1b[?25h')
  })

  test('restores the cursor when animation waiting fails', async () => {
    const writes: string[] = []
    await expect(
      playExitSplash({
        enabled: true,
        write: text => writes.push(text),
        wait: async () => {
          throw new Error('interrupted')
        },
      }),
    ).rejects.toThrow('interrupted')
    expect(writes.at(-1)).toContain('\x1b[?25h')
  })
})
