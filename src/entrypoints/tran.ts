#!/usr/bin/env bun
import { fileURLToPath } from 'node:url'
import { shouldSkipStartupAnimation } from '../ui/startupPreferences.js'
import {
  shouldShowStartupSplash,
  showStartupSplash,
} from '../ui/startupSplash.js'

const rawArgs = process.argv.slice(2)
const previewOnly = rawArgs.includes('--splash-only')
const skipSplash =
  rawArgs.includes('--no-splash') ||
  (!previewOnly && shouldSkipStartupAnimation())
const args = rawArgs.filter(
  arg => arg !== '--splash-only' && arg !== '--no-splash',
)
let releaseSplash: (() => void) | undefined

if (
  !skipSplash &&
  shouldShowStartupSplash(previewOnly ? [] : args, {
    inputTTY: Boolean(process.stdin.isTTY),
    outputTTY: Boolean(process.stdout.isTTY),
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
    env: process.env,
  })
) {
  const exitCode = await showStartupSplash({
    holdScreen: !previewOnly,
    onHold(release, protocol) {
      releaseSplash = release
      process.env.TRAN_STARTUP_SCREEN = protocol ?? 'text'
    },
  })
  if (exitCode !== 0) process.exit(exitCode)
}

if (!previewOnly) {
  // Load the compiled CLI inside this process, with no source-tree dependency.
  const cliUrl = new URL('./cli.js', import.meta.url)
  process.argv = [process.argv[0]!, fileURLToPath(cliUrl), ...args]
  try {
    await import(cliUrl.href)
  } catch (error) {
    releaseSplash?.()
    delete process.env.TRAN_STARTUP_SCREEN
    throw error
  }
}
