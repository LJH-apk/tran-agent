import { setTimeout as delay } from 'node:timers/promises'
import { readFile } from 'node:fs/promises'
import { PRODUCT_NAME } from '../constants/product.js'
import { getChafaEmblem, renderChafaRow } from './chafaEmblem.js'
import {
  getImageProtocol,
  getImageLayout,
  encodeTerminalImage,
  clearTerminalImage,
  type ImageProtocol,
} from './terminalEmblem.js'

export type SplashTerminal = {
  inputTTY: boolean
  outputTTY: boolean
  columns: number
  rows: number
  env: NodeJS.ProcessEnv
}

function isInteractiveStartup(args: readonly string[]): boolean {
  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!
    if (arg === '-c' || arg === '--continue') continue
    if (arg === '-r' || arg === '--resume') {
      // Resume accepts an optional session ID/name; it is part of this flag.
      const value = args[index + 1]
      if (value !== undefined && !value.startsWith('-')) index++
      continue
    }
    if (arg.startsWith('--resume=') && arg.length > '--resume='.length) continue
    return false
  }
  return true
}

export function shouldShowStartupSplash(
  args: readonly string[],
  terminal: SplashTerminal,
): boolean {
  return (
    terminal.inputTTY &&
    terminal.outputTTY &&
    terminal.columns >= 30 &&
    terminal.rows >= 18 &&
    terminal.env.TERM !== 'dumb' &&
    terminal.env.CI !== '1' &&
    terminal.env.CI !== 'true' &&
    terminal.env.TRAN_NO_SPLASH !== '1' &&
    terminal.env.TRAN_REDUCED_MOTION !== '1' &&
    isInteractiveStartup(args)
  )
}

// This bar is an animation timeline, not a measurement of CLI initialization.
export function renderStartupFrame(
  columns: number,
  rows: number,
  progress: number,
  useColor: boolean,
  imageHeight?: number,
): string {
  const emblem = getChafaEmblem(columns, rows)
  const art = emblem.rows
  const fraction = Math.max(0, Math.min(1, progress))
  const visibleRows = Math.ceil(art.length * Math.min(1, fraction * 2))
  const brightness = Math.round(85 + fraction * 95)
  const blue = useColor ? `\x1b[38;2;${brightness};${brightness + 20};225m` : ''
  const reset = useColor ? '\x1b[0m' : ''
  const center = (line: string, width = line.length) =>
    `${' '.repeat(Math.max(0, Math.floor((columns - width) / 2)))}${line}`
  const barWidth = 20
  const filled = Math.round(fraction * barWidth)
  const content = [
    ...art.map((line, i) =>
      center(
        i < visibleRows
          ? renderChafaRow(line, useColor)
          : ' '.repeat(emblem.width),
        emblem.width,
      ),
    ),
    '',
    center(
      `${useColor ? '\x1b[1m' : ''}${PRODUCT_NAME}${reset}`,
      PRODUCT_NAME.length,
    ),
    center('兰州交通大学', 12),
    center('交通运输学院', 12),
    '',
    center(
      `${blue}${'━'.repeat(filled)}${'─'.repeat(barWidth - filled)}${reset}`,
      barWidth,
    ),
  ]
  if (imageHeight !== undefined) {
    const footer = content.slice(art.length)
    const top = Math.max(
      0,
      Math.floor((rows - imageHeight - footer.length) / 2),
    )
    return `\x1b[${top + imageHeight + 1};1H${footer.join('\r\n')}`
  }
  const top = Math.max(0, Math.floor((rows - content.length) / 2))
  return `\x1b[H${'\r\n'.repeat(top)}${content.join('\r\n')}`
}

/** Returns a shell exit code; always restores the original screen and cursor. */
export async function showStartupSplash(
  options: {
    holdScreen?: boolean
    onHold?: (release: () => void, protocol: ImageProtocol | undefined) => void
  } = {},
): Promise<number> {
  let protocol =
    process.env.TRAN_PNG_SPLASH === '1'
      ? getImageProtocol(process.env)
      : undefined
  let png: Buffer | undefined
  if (protocol) {
    try {
      png = await readFile(
        new URL('./assets/lzjtu-emblem-transparent.png', import.meta.url),
      ).catch(() =>
        readFile(
          new URL(
            '../../docs/images/lzjtu-emblem-transparent.png',
            import.meta.url,
          ),
        ),
      )
    } catch {
      protocol = undefined
    }
  }
  const controller = new AbortController()
  let exitCode = 0
  const onInterrupt = () => {
    exitCode = 130
    controller.abort()
  }
  const onTerminate = () => {
    exitCode = 143
    controller.abort()
  }
  process.on('SIGINT', onInterrupt)
  process.on('SIGTERM', onTerminate)
  let restored = false
  const restore = () => {
    if (restored) return
    restored = true
    process.removeListener('exit', restore)
    process.stdout.write(
      `${clearTerminalImage(protocol)}\x1b[0m\x1b[?25h\x1b[?1049l`,
    )
  }
  process.once('exit', restore)
  try {
    process.stdout.write('\x1b[?1049h\x1b[?25l\x1b[2J')
    const columns = process.stdout.columns || 80
    const rows = process.stdout.rows || 24
    const imageLayout = getImageLayout(columns, rows)
    if (protocol && png) {
      process.stdout.write(
        `\x1b[${imageLayout.top + 1};${imageLayout.left + 1}H${encodeTerminalImage(protocol, png, imageLayout.width, imageLayout.height)}`,
      )
    }
    for (let frame = 0; frame <= 20; frame++) {
      if (controller.signal.aborted) break
      process.stdout.write(
        renderStartupFrame(
          columns,
          rows,
          frame / 20,
          process.env.NO_COLOR === undefined,
          protocol ? imageLayout.height : undefined,
        ),
      )
      await delay(45, undefined, { signal: controller.signal })
    }
    if (!controller.signal.aborted)
      await delay(150, undefined, { signal: controller.signal })
  } catch (error) {
    restore()
    if (!controller.signal.aborted) throw error
  } finally {
    if (options.holdScreen && exitCode === 0 && !restored) {
      options.onHold?.(restore, protocol)
    } else {
      restore()
    }
    process.removeListener('SIGINT', onInterrupt)
    process.removeListener('SIGTERM', onTerminate)
  }
  return exitCode
}
