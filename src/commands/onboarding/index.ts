import type { Command } from '../../types/command.js'

// Subcommands supported by `/onboarding`.
// - (no args) | full       — re-run the complete first-run flow
// - theme                  — re-pick the terminal theme
// - trust                  — re-confirm the workspace trust dialog
// - model                  — open the model picker (delegates to /model)
// - mcp                    — show MCP server setup instructions
// - status                 — print current onboarding state
//
// `/onboarding` exists in official v2.1.123 (string + telemetry confirmed:
// `tengu_onboarding_step`, `hasCompletedOnboarding`, `lastOnboardingVersion`).
// We expose the user-facing entry point so subscribers can re-run any step.
const onboarding: Command = {
  type: 'local-jsx',
  name: 'onboarding',
  description: '重新运行首次配置（主题、信任、模型、MCP）',
  argumentHint: '[full|theme|trust|model|mcp|status]',
  isEnabled: () => true,
  isHidden: false,
  bridgeSafe: false,
  getBridgeInvocationError: () =>
    'onboarding 需要本地交互式界面，不支持桥接',
  load: async () => {
    const m = await import('./launchOnboarding.js')
    return { call: m.callOnboarding }
  },
}

export default onboarding
