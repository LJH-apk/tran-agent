/** A launcher can leave its splash visible until Ink's first non-empty paint. */
export function hasStartupScreen(): boolean {
  return ['text', 'iterm', 'kitty'].includes(
    process.env.TRAN_STARTUP_SCREEN ?? '',
  )
}

export function takeStartupScreenPrefix(altScreenActive: boolean): string {
  if (!hasStartupScreen()) return ''
  const protocol = process.env.TRAN_STARTUP_SCREEN
  delete process.env.TRAN_STARTUP_SCREEN
  const clearImage =
    protocol === 'kitty' ? '\x1b_Ga=d,d=I,i=197903,q=2\x1b\\' : ''
  // Fullscreen reuses the splash buffer. Normal Ink returns to the main buffer.
  // The caller batches this prefix with the first frame, inside synchronized output.
  return `${clearImage}\x1b[0m${altScreenActive ? '' : '\x1b[?1049l'}\x1b[2J\x1b[H`
}
