// https://iterm2.com/documentation-images.html
// https://sw.kovidgoyal.net/kitty/graphics-protocol/
export type ImageProtocol = 'iterm' | 'kitty'
export const EMBLEM_IMAGE_ID = 197903

export function getImageProtocol(
  env: NodeJS.ProcessEnv,
): ImageProtocol | undefined {
  // Multiplexers need passthrough configuration; use text there by default.
  if (
    env.TMUX ||
    env.STY ||
    env.TRAN_TEXT_SPLASH === '1' ||
    env.NO_COLOR !== undefined
  )
    return undefined
  if (env.TERM_PROGRAM === 'iTerm.app') return 'iterm'
  if (env.KITTY_WINDOW_ID || env.TERM === 'xterm-kitty') return 'kitty'
  return undefined
}

export function getImageLayout(columns: number, rows: number) {
  const width = Math.min(columns - 4, (rows - 8) * 2, 72)
  const height = Math.floor(width / 2)
  return {
    width,
    height,
    top: Math.max(0, Math.floor((rows - height - 6) / 2)),
    left: Math.max(0, Math.floor((columns - width) / 2)),
  }
}

export function encodeTerminalImage(
  protocol: ImageProtocol,
  png: Buffer,
  width: number,
  height: number,
): string {
  const data = png.toString('base64')
  if (protocol === 'iterm') {
    return `\x1b]1337;File=inline=1;size=${png.length};width=${width};height=${height};preserveAspectRatio=1:${data}\x07`
  }
  const chunks: string[] = []
  for (let offset = 0; offset < data.length; offset += 4096) {
    const metadata =
      offset === 0
        ? `a=T,f=100,t=d,i=${EMBLEM_IMAGE_ID},c=${width},r=${height},C=1,q=2,`
        : ''
    const more = offset + 4096 < data.length ? 1 : 0
    chunks.push(
      `\x1b_G${metadata}m=${more};${data.slice(offset, offset + 4096)}\x1b\\`,
    )
  }
  return chunks.join('')
}

export function clearTerminalImage(
  protocol: ImageProtocol | undefined,
): string {
  return protocol === 'kitty'
    ? `\x1b_Ga=d,d=I,i=${EMBLEM_IMAGE_ID},q=2\x1b\\`
    : ''
}
