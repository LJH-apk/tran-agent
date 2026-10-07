export const CLEAR_EXIT_SCREEN = '\x1b[0m\x1b[2J\x1b[3J\x1b[H'

/** Called only after Ink has detached and session cleanup has completed. */
export async function playExitSplash({
  enabled,
  write,
  wait,
}: {
  enabled: boolean
  write: (text: string) => void
  wait: (milliseconds: number) => Promise<unknown>
}): Promise<void> {
  if (!enabled) return
  try {
    write(CLEAR_EXIT_SCREEN + '\x1b[?25l')
    for (const dots of ['·', '··', '···', '··']) {
      write(`\r\x1b[2K\x1b[38;2;126;153;222m  TA  正在退出${dots}\x1b[0m`)
      await wait(100)
    }
  } finally {
    write('\x1b[0m\x1b[?25h')
  }
}
