#!/usr/bin/env bun
import { fileURLToPath } from 'node:url'
import { shouldSkipStartupAnimation } from '../src/ui/startupPreferences.js'
import {
  shouldShowStartupSplash,
  showStartupSplash,
} from '../src/ui/startupSplash.js'

const rawArgs = process.argv.slice(2)
const previewOnly = rawArgs.includes('--splash-only')
const skipSplash =
  rawArgs.includes('--no-splash') ||
  (!previewOnly && shouldSkipStartupAnimation())
const args = rawArgs.filter(
  arg => arg !== '--splash-only' && arg !== '--no-splash',
)

const canAnimate = shouldShowStartupSplash(previewOnly ? [] : args, {
  inputTTY: Boolean(process.stdin.isTTY),
  outputTTY: Boolean(process.stdout.isTTY),
  columns: process.stdout.columns || 80,
  rows: process.stdout.rows || 24,
  env: process.env,
})

let releaseSplash: (() => void) | undefined
let startupScreen: string | undefined
if (!skipSplash && canAnimate) {
  const exitCode = await showStartupSplash({
    holdScreen: !previewOnly,
    onHold(release, protocol) {
      releaseSplash = release
      startupScreen = protocol ?? 'text'
    },
  })
  if (exitCode !== 0) process.exit(exitCode)
}

if (!previewOnly) {
  const child = Bun.spawn(
    [
      process.execPath,
      'run',
      fileURLToPath(new URL('./dev.ts', import.meta.url)),
      ...args,
    ],
    {
      stdio: ['inherit', 'inherit', 'inherit'],
      env: { ...process.env, TRAN_STARTUP_SCREEN: startupScreen },
    },
  )
  const onInterrupt = () => child.kill('SIGINT')
  const onTerminate = () => child.kill('SIGTERM')
  process.on('SIGINT', onInterrupt)
  process.on('SIGTERM', onTerminate)
  try {
    process.exitCode = await child.exited
  } finally {
    process.removeListener('SIGINT', onInterrupt)
    process.removeListener('SIGTERM', onTerminate)
    releaseSplash?.()
  }
}
