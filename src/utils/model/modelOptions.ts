// biome-ignore-all assist/source/organizeImports: ANT-ONLY import markers must not be reordered
import { getInitialMainLoopModel } from '../../bootstrap/state.js'
import {
  isClaudeAISubscriber,
  isMaxSubscriber,
  isTeamPremiumSubscriber,
} from '../auth.js'
import { getModelStrings } from './modelStrings.js'
import { getAntModels } from './antModels.js'
import {
  COST_TIER_3_15,
  COST_HAIKU_35,
  COST_HAIKU_45,
  formatModelPricing,
} from '../modelCost.js'
import { getSettings_DEPRECATED } from '../settings/settings.js'
import { checkOpus1mAccess, checkSonnet1mAccess } from './check1mAccess.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl } from './providers.js'
import { isModelAllowed } from './modelAllowlist.js'
import {
  getCanonicalName,
  getClaudeAiUserDefaultModelDescription,
  getDefaultSonnetModel,
  getDefaultOpusModel,
  getDefaultHaikuModel,
  getDefaultMainLoopModelSetting,
  getMarketingNameForModel,
  getUserSpecifiedModelSetting,
  isOpus1mMergeEnabled,
  getOpusPricingSuffix,
  renderDefaultModelSetting,
  parseUserSpecifiedModel,
  type ModelSetting,
} from './model.js'
import { has1mContext } from '../context.js'
import { getGlobalConfig } from '../config.js'
import {
  CHATGPT_CODEX_DEFAULT_MODEL,
  CHATGPT_CODEX_MODEL_OPTIONS,
  isChatGPTAuthMode,
} from './chatgptModels.js'

// @[MODEL LAUNCH]: Update all the available and default model option strings below.

export type ModelOption = {
  value: ModelSetting
  label: string
  description: string
  descriptionForModel?: string
}

export function getDefaultOptionForUser(fastMode = false): ModelOption {
  if (process.env.USER_TYPE === 'ant') {
    const currentModel = renderDefaultModelSetting(
      getDefaultMainLoopModelSetting(),
    )
    return {
      value: null,
      label: '默认（推荐）',
      description: `使用内部默认模型（当前为 ${currentModel}）`,
      descriptionForModel: `默认模型（当前为 ${currentModel}）`,
    }
  }

  // Subscribers
  if (isClaudeAISubscriber()) {
    return {
      value: null,
      label: '默认（推荐）',
      description: getClaudeAiUserDefaultModelDescription(fastMode),
    }
  }

  // PAYG
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: null,
    label: '默认（推荐）',
    description: `使用默认模型（当前为 ${renderDefaultModelSetting(getDefaultMainLoopModelSetting())}）${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
  }
}

function getConfiguredPickerModel(
  tier: 'OPUS' | 'SONNET' | 'HAIKU',
  resolveDefault: () => string,
): string | undefined {
  const provider = getAPIProvider()
  const prefix =
    provider === 'openai'
      ? 'OPENAI'
      : provider === 'gemini'
        ? 'GEMINI'
        : undefined
  const tierModel =
    (prefix ? process.env[`${prefix}_DEFAULT_${tier}_MODEL`] : undefined) ||
    process.env[`ANTHROPIC_DEFAULT_${tier}_MODEL`]
  const primaryModel =
    provider === 'openai'
      ? process.env.OPENAI_MODEL
      : provider === 'gemini'
        ? process.env.GEMINI_MODEL
        : provider === 'grok'
          ? process.env.GROK_MODEL
          : undefined
  // Use the dispatch resolver for precedence instead of a separate picker policy.
  return tierModel || primaryModel ? resolveDefault() : undefined
}

function getCustomSonnetOption(): ModelOption | undefined {
  const provider = getAPIProvider()
  // Use provider-specific DEFAULT_SONNET_MODEL
  const customSonnetModel = getConfiguredPickerModel(
    'SONNET',
    getDefaultSonnetModel,
  )
  // Explicit model mappings also apply to Anthropic-compatible endpoints.
  if (customSonnetModel) {
    const is1m = has1mContext(customSonnetModel)
    // Use appropriate NAME/DESCRIPTION env vars based on provider
    const nameEnv =
      provider === 'openai'
        ? process.env.OPENAI_DEFAULT_SONNET_MODEL_NAME
        : provider === 'gemini'
          ? process.env.GEMINI_DEFAULT_SONNET_MODEL_NAME
          : process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_NAME
    const descEnv =
      provider === 'openai'
        ? process.env.OPENAI_DEFAULT_SONNET_MODEL_DESCRIPTION
        : provider === 'gemini'
          ? process.env.GEMINI_DEFAULT_SONNET_MODEL_DESCRIPTION
          : process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION
    return {
      value: 'sonnet',
      label: nameEnv ?? customSonnetModel,
      description:
        descEnv ?? `自定义 Sonnet 模型${is1m ? '（1M 上下文）' : ''}`,
      descriptionForModel: `${descEnv ?? `自定义 Sonnet 模型${is1m ? '（1M 上下文）' : ''}`} (${customSonnetModel})`,
    }
  }
}

// @[MODEL LAUNCH]: Update or add model option functions (getSonnetXXOption, getOpusXXOption, etc.)
// with the new model's label and description. These appear in the /model picker.
function getSonnet46Option(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: is3P ? getModelStrings().sonnet46 : 'sonnet',
    label: 'Sonnet',
    description: `Sonnet 4.6 · 适合日常任务${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
    descriptionForModel:
      'Sonnet 4.6 - best for everyday tasks. Generally recommended for most coding tasks',
  }
}

function getCustomOpusOption(): ModelOption | undefined {
  const provider = getAPIProvider()
  // Use provider-specific DEFAULT_OPUS_MODEL
  const customOpusModel = getConfiguredPickerModel('OPUS', getDefaultOpusModel)
  if (customOpusModel) {
    const is1m = has1mContext(customOpusModel)
    // Use appropriate NAME/DESCRIPTION env vars based on provider
    const nameEnv =
      provider === 'openai'
        ? process.env.OPENAI_DEFAULT_OPUS_MODEL_NAME
        : provider === 'gemini'
          ? process.env.GEMINI_DEFAULT_OPUS_MODEL_NAME
          : process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME
    const descEnv =
      provider === 'openai'
        ? process.env.OPENAI_DEFAULT_OPUS_MODEL_DESCRIPTION
        : provider === 'gemini'
          ? process.env.GEMINI_DEFAULT_OPUS_MODEL_DESCRIPTION
          : process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION
    return {
      value: 'opus',
      label: nameEnv ?? customOpusModel,
      description: descEnv ?? `自定义 Opus 模型${is1m ? '（1M 上下文）' : ''}`,
      descriptionForModel: `${descEnv ?? `自定义 Opus 模型${is1m ? '（1M 上下文）' : ''}`} (${customOpusModel})`,
    }
  }
}

function getOpus47Option(fastMode = false): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: is3P ? getModelStrings().opus47 : 'opus',
    label: 'Opus 4.7',
    description: `Opus 4.7 · 擅长复杂任务${getOpusPricingSuffix(fastMode)}`,
    descriptionForModel: 'Opus 4.7 - most capable for complex work',
  }
}

export function getOpus46Option(fastMode = false): ModelOption {
  // Always use the canonical 4.6 model string (not the 'opus' alias, which
  // resolves via getDefaultOpusModel() to opus47 on firstParty). Users
  // selecting "Opus 4.6" must get 4.6 actually dispatched, not alias-routed
  // to 4.7. The same string is correct for 3P (getModelStrings maps per
  // provider).
  return {
    value: getModelStrings().opus46,
    label: 'Opus 4.6',
    description: `Opus 4.6 · 上一代 Opus${getOpusPricingSuffix(fastMode)}`,
    descriptionForModel: 'Opus 4.6 - previous generation Opus model',
  }
}

export function getSonnet46_1MOption(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: is3P ? getModelStrings().sonnet46 + '[1m]' : 'sonnet[1m]',
    label: 'Sonnet（1M 上下文）',
    description: `Sonnet 4.6 适合长会话${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
    descriptionForModel:
      'Sonnet 4.6（1M 上下文） window - 适合长会话 with large codebases',
  }
}

export function getOpus47_1MOption(fastMode = false): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: is3P ? getModelStrings().opus47 + '[1m]' : 'opus[1m]',
    label: 'Opus 4.7（1M 上下文）',
    description: `Opus 4.7（1M 上下文）${getOpusPricingSuffix(fastMode)}`,
    descriptionForModel:
      'Opus 4.7（1M 上下文） window - 适合长会话 with large codebases',
  }
}

export function getOpus46_1MOption(fastMode = false): ModelOption {
  return {
    value: getModelStrings().opus46 + '[1m]',
    label: 'Opus 4.6（1M 上下文）',
    description: `Opus 4.6（1M 上下文）${getOpusPricingSuffix(fastMode)}`,
    descriptionForModel:
      'Opus 4.6（1M 上下文） window - 适合长会话 with large codebases',
  }
}

function getCustomHaikuOption(): ModelOption | undefined {
  const provider = getAPIProvider()
  // Use provider-specific DEFAULT_HAIKU_MODEL
  const customHaikuModel = getConfiguredPickerModel(
    'HAIKU',
    getDefaultHaikuModel,
  )
  if (customHaikuModel) {
    // Use appropriate NAME/DESCRIPTION env vars based on provider
    const nameEnv =
      provider === 'openai'
        ? process.env.OPENAI_DEFAULT_HAIKU_MODEL_NAME
        : provider === 'gemini'
          ? process.env.GEMINI_DEFAULT_HAIKU_MODEL_NAME
          : process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME
    const descEnv =
      provider === 'openai'
        ? process.env.OPENAI_DEFAULT_HAIKU_MODEL_DESCRIPTION
        : provider === 'gemini'
          ? process.env.GEMINI_DEFAULT_HAIKU_MODEL_DESCRIPTION
          : process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION
    return {
      value: 'haiku',
      label: nameEnv ?? customHaikuModel,
      description: descEnv ?? '自定义 Haiku 模型',
      descriptionForModel: `${descEnv ?? '自定义 Haiku 模型'} (${customHaikuModel})`,
    }
  }
}

function getHaiku45Option(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: 'haiku',
    label: 'Haiku',
    description: `Haiku 4.5 · 适合快速回答${is3P ? '' : ` · ${formatModelPricing(COST_HAIKU_45)}`}`,
    descriptionForModel:
      'Haiku 4.5 - fastest for quick answers. Lower cost but less capable than Sonnet 4.6.',
  }
}

function getHaiku35Option(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: 'haiku',
    label: 'Haiku',
    description: `Haiku 3.5 适合简单任务${is3P ? '' : ` · ${formatModelPricing(COST_HAIKU_35)}`}`,
    descriptionForModel:
      'Haiku 3.5 - faster and lower cost, but less capable than Sonnet. Use 适合简单任务.',
  }
}

function getHaikuOption(): ModelOption {
  // Return correct Haiku option based on provider
  const haikuModel = getDefaultHaikuModel()
  return haikuModel === getModelStrings().haiku45
    ? getHaiku45Option()
    : getHaiku35Option()
}

function getMaxOpusOption(fastMode = false): ModelOption {
  return {
    value: 'opus',
    label: 'Opus 4.7',
    description: `Opus 4.7 · 擅长复杂任务${fastMode ? getOpusPricingSuffix(true) : ''}`,
  }
}

export function getMaxSonnet46_1MOption(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const billingInfo = isClaudeAISubscriber() ? ' · 按额外用量计费' : ''
  return {
    value: 'sonnet[1m]',
    label: 'Sonnet（1M 上下文）',
    description: `Sonnet 4.6（1M 上下文）${billingInfo}${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
  }
}

export function getMaxOpus47_1MOption(fastMode = false): ModelOption {
  const billingInfo = isClaudeAISubscriber() ? ' · 按额外用量计费' : ''
  return {
    value: 'opus[1m]',
    label: 'Opus 4.7（1M 上下文）',
    description: `Opus 4.7（1M 上下文）${billingInfo}${getOpusPricingSuffix(fastMode)}`,
  }
}

function getMergedOpus1MOption(fastMode = false): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: is3P ? getModelStrings().opus47 + '[1m]' : 'opus[1m]',
    label: 'Opus 4.7（1M 上下文）',
    description: `Opus 4.7（1M 上下文） · 擅长复杂任务${!is3P && fastMode ? getOpusPricingSuffix(fastMode) : ''}`,
    descriptionForModel:
      'Opus 4.7（1M 上下文） - most capable for complex work',
  }
}

const MaxSonnet46Option: ModelOption = {
  value: 'sonnet',
  label: 'Sonnet',
  description: 'Sonnet 4.6 · 适合日常任务',
}

const MaxHaiku45Option: ModelOption = {
  value: 'haiku',
  label: 'Haiku',
  description: 'Haiku 4.5 · 适合快速回答',
}

function getOpusPlanOption(): ModelOption {
  return {
    value: 'opusplan',
    label: 'Opus 计划模式',
    description: '计划模式使用 Opus 4.7，其余使用 Sonnet 4.6',
  }
}

function getChatGPTCodexModelOptions(): ModelOption[] {
  return [
    {
      value: null,
      label: '默认（推荐）',
      description: `使用默认 ChatGPT Codex 模型（当前为 ${CHATGPT_CODEX_DEFAULT_MODEL}）`,
      descriptionForModel: `默认 ChatGPT Codex 模型（当前为 ${CHATGPT_CODEX_DEFAULT_MODEL}）`,
    },
    ...CHATGPT_CODEX_MODEL_OPTIONS.map(model => ({
      value: model.value,
      label: model.label,
      description: model.description,
      descriptionForModel: `${model.description} (${model.value})`,
    })),
  ]
}

// @[MODEL LAUNCH]: Update the model picker lists below to include/reorder options for the new model.
// Each user tier (ant, Max/Team Premium, Pro/Team Standard/Enterprise, PAYG 1P, PAYG 3P) has its own list.
function getModelOptionsBase(fastMode = false): ModelOption[] {
  if (process.env.USER_TYPE === 'ant') {
    // Build options from antModels config
    const antModelOptions: ModelOption[] = getAntModels().map(m => ({
      value: m.alias,
      label: m.label,
      description: m.description ?? `[ANT-ONLY] ${m.label} (${m.model})`,
    }))

    return [
      getDefaultOptionForUser(),
      ...antModelOptions,
      getMergedOpus1MOption(fastMode),
      getSonnet46Option(),
      getSonnet46_1MOption(),
      getHaiku45Option(),
    ]
  }

  if (getAPIProvider() === 'openai' && isChatGPTAuthMode()) {
    return getChatGPTCodexModelOptions()
  }

  // Show explicit family mappings/primary models before any built-in catalog.
  {
    const opus = getCustomOpusOption()
    const sonnet = getCustomSonnetOption()
    const haiku = getCustomHaikuOption()
    const isCompatibleEndpoint =
      getAPIProvider() === 'firstParty' && !isFirstPartyAnthropicBaseUrl()
    const primaryModel = isCompatibleEndpoint
      ? process.env.ANTHROPIC_MODEL || getSettings_DEPRECATED()?.model
      : undefined
    if (opus || sonnet || haiku || primaryModel) {
      const configuredOptions: ModelOption[] = isCompatibleEndpoint
        ? [
            getDefaultOptionForUser(fastMode),
            ...[opus, sonnet, haiku].filter(
              (option): option is ModelOption => option !== undefined,
            ),
            ...(primaryModel
              ? [
                  {
                    value: primaryModel,
                    label: parseUserSpecifiedModel(primaryModel),
                    description: '自定义模型',
                  },
                ]
              : []),
          ]
        : [
            getDefaultOptionForUser(fastMode),
            ...(opus
              ? [opus]
              : [getOpus47_1MOption(fastMode), getOpus46_1MOption(fastMode)]),
            sonnet ?? getSonnet46_1MOption(),
            haiku ?? getHaikuOption(),
          ]
      const models = new Set<string>()
      return configuredOptions.filter(option => {
        if (option.value === null) return true
        const model = parseUserSpecifiedModel(option.value)
        if (models.has(model)) return false
        models.add(model)
        return true
      })
    }
  }

  if (isClaudeAISubscriber()) {
    if (isMaxSubscriber() || isTeamPremiumSubscriber()) {
      // Max and Team Premium users: Default = Opus 4.7 1M (merged), plus Opus 4.6 1M
      const premiumOptions = [getDefaultOptionForUser(fastMode)]
      premiumOptions.push(getOpus46_1MOption(fastMode))

      premiumOptions.push(MaxSonnet46Option)
      if (checkSonnet1mAccess()) {
        premiumOptions.push(getMaxSonnet46_1MOption())
      }

      premiumOptions.push(MaxHaiku45Option)
      return premiumOptions
    }

    // Pro/Team Standard/Enterprise users: Sonnet is default, show Opus 4.7 1M + Opus 4.6 1M
    const standardOptions = [getDefaultOptionForUser(fastMode)]

    if (isOpus1mMergeEnabled()) {
      standardOptions.push(getMergedOpus1MOption(fastMode))
    } else {
      standardOptions.push(getMaxOpusOption(fastMode))
      if (checkOpus1mAccess()) {
        standardOptions.push(getMaxOpus47_1MOption(fastMode))
      }
    }
    standardOptions.push(getOpus46_1MOption(fastMode))

    if (checkSonnet1mAccess()) {
      standardOptions.push(getMaxSonnet46_1MOption())
    }

    standardOptions.push(MaxHaiku45Option)
    return standardOptions
  }

  // PAYG 1P API: Default (Sonnet) + Opus 4.7 1M + Opus 4.6 1M + Sonnet 1M + Haiku
  if (getAPIProvider() === 'firstParty') {
    const payg1POptions = [getDefaultOptionForUser(fastMode)]
    if (isOpus1mMergeEnabled()) {
      payg1POptions.push(getMergedOpus1MOption(fastMode))
    } else {
      payg1POptions.push(getOpus47Option(fastMode))
      if (checkOpus1mAccess()) {
        payg1POptions.push(getOpus47_1MOption(fastMode))
      }
    }
    payg1POptions.push(getOpus46_1MOption(fastMode))
    if (checkSonnet1mAccess()) {
      payg1POptions.push(getSonnet46_1MOption())
    }
    payg1POptions.push(getHaiku45Option())
    return payg1POptions
  }

  // PAYG 3P: Default (Sonnet 4.5) + Sonnet (3P custom) or Sonnet 4.6/1M + Opus (3P custom) or Opus 4.7/Opus 4.6 Legacy/Opus 4.7 1M + Haiku
  const payg3pOptions = [getDefaultOptionForUser(fastMode)]

  const customSonnet = getCustomSonnetOption()
  if (customSonnet !== undefined) {
    payg3pOptions.push(customSonnet)
  } else {
    // Add Sonnet 4.6 since Sonnet 4.5 is the default
    payg3pOptions.push(getSonnet46Option())
    if (checkSonnet1mAccess()) {
      payg3pOptions.push(getSonnet46_1MOption())
    }
  }

  const customOpus = getCustomOpusOption()
  if (customOpus !== undefined) {
    payg3pOptions.push(customOpus)
  } else {
    // Add Opus 4.7 1M + Opus 4.6 1M (no redundant non-1M entries)
    payg3pOptions.push(getOpus47_1MOption(fastMode))
    payg3pOptions.push(getOpus46_1MOption(fastMode))
  }
  const customHaiku = getCustomHaikuOption()
  if (customHaiku !== undefined) {
    payg3pOptions.push(customHaiku)
  } else {
    payg3pOptions.push(getHaikuOption())
  }
  return payg3pOptions
}

// @[MODEL LAUNCH]: Add the new model ID to the appropriate family pattern below
// so the "newer version available" hint works correctly.
/**
 * Map a full model name to its family alias and the marketing name of the
 * version the alias currently resolves to. Used to detect when a user has
 * a specific older version pinned and a newer one is available.
 */
function getModelFamilyInfo(
  model: string,
): { alias: string; currentVersionName: string } | null {
  const canonical = getCanonicalName(model)

  // Sonnet family
  if (
    canonical.includes('claude-sonnet-4-6') ||
    canonical.includes('claude-sonnet-4-5') ||
    canonical.includes('claude-sonnet-4-') ||
    canonical.includes('claude-3-7-sonnet') ||
    canonical.includes('claude-3-5-sonnet')
  ) {
    const currentName = getMarketingNameForModel(getDefaultSonnetModel())
    if (currentName) {
      return { alias: 'Sonnet', currentVersionName: currentName }
    }
  }

  // Opus family
  if (canonical.includes('claude-opus-4')) {
    const currentName = getMarketingNameForModel(getDefaultOpusModel())
    if (currentName) {
      return { alias: 'Opus', currentVersionName: currentName }
    }
  }

  // Haiku family
  if (
    canonical.includes('claude-haiku') ||
    canonical.includes('claude-3-5-haiku')
  ) {
    const currentName = getMarketingNameForModel(getDefaultHaikuModel())
    if (currentName) {
      return { alias: 'Haiku', currentVersionName: currentName }
    }
  }

  return null
}

/**
 * Returns a ModelOption for a known Anthropic model with a human-readable
 * label, and an upgrade hint if a newer version is available via the alias.
 * Returns null if the model is not recognized.
 */
function getKnownModelOption(model: string): ModelOption | null {
  const marketingName = getMarketingNameForModel(model)
  if (!marketingName) return null

  const familyInfo = getModelFamilyInfo(model)
  if (!familyInfo) {
    return {
      value: model,
      label: marketingName,
      description: model,
    }
  }

  // Check if the alias currently resolves to a different (newer) version
  if (marketingName !== familyInfo.currentVersionName) {
    return {
      value: model,
      label: marketingName,
      description: `已有新版本 · 选择 ${familyInfo.alias} 使用 ${familyInfo.currentVersionName}`,
    }
  }

  // Same version as the alias — just show the friendly name
  return {
    value: model,
    label: marketingName,
    description: model,
  }
}

export function getModelOptions(fastMode = false): ModelOption[] {
  const options = getModelOptionsBase(fastMode)

  // Add the custom model from the ANTHROPIC_CUSTOM_MODEL_OPTION env var
  const envCustomModel = process.env.ANTHROPIC_CUSTOM_MODEL_OPTION
  if (
    envCustomModel &&
    !options.some(existing => existing.value === envCustomModel)
  ) {
    options.push({
      value: envCustomModel,
      label: process.env.ANTHROPIC_CUSTOM_MODEL_OPTION_NAME ?? envCustomModel,
      description:
        process.env.ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION ??
        `自定义模型 (${envCustomModel})`,
    })
  }

  // Append additional model options fetched during bootstrap
  for (const opt of getGlobalConfig().additionalModelOptionsCache ?? []) {
    if (
      !options.some(
        existing =>
          existing.value === opt.value ||
          (existing.value !== null &&
            opt.value !== null &&
            parseUserSpecifiedModel(existing.value) ===
              parseUserSpecifiedModel(opt.value)),
      )
    ) {
      options.push(opt)
    }
  }

  // Add custom model from either the current model value or the initial one
  // if it is not already in the options.
  let customModel: ModelSetting = null
  const currentMainLoopModel = getUserSpecifiedModelSetting()
  const initialMainLoopModel = getInitialMainLoopModel()
  if (currentMainLoopModel !== undefined && currentMainLoopModel !== null) {
    customModel = currentMainLoopModel
  } else if (initialMainLoopModel !== null) {
    customModel = initialMainLoopModel
  }
  if (
    customModel === null ||
    options.some(
      opt =>
        opt.value === customModel ||
        (customModel !== 'opusplan' &&
          opt.value !== null &&
          parseUserSpecifiedModel(opt.value) ===
            parseUserSpecifiedModel(customModel)),
    )
  ) {
    return filterModelOptionsByAllowlist(options)
  } else if (customModel === 'opusplan') {
    return filterModelOptionsByAllowlist([...options, getOpusPlanOption()])
  } else if (customModel === 'opus' && getAPIProvider() === 'firstParty') {
    return filterModelOptionsByAllowlist([
      ...options,
      getMaxOpusOption(fastMode),
    ])
  } else if (customModel === 'opus[1m]' && getAPIProvider() === 'firstParty') {
    return filterModelOptionsByAllowlist([
      ...options,
      getMergedOpus1MOption(fastMode),
    ])
  } else {
    // Try to show a human-readable label for known Anthropic models, with an
    // upgrade hint if the alias now resolves to a newer version.
    const knownOption = getKnownModelOption(customModel)
    if (knownOption) {
      options.push(knownOption)
    } else {
      options.push({
        value: customModel,
        label: customModel,
        description: '自定义模型',
      })
    }
    return filterModelOptionsByAllowlist(options)
  }
}

/**
 * Filter model options by the availableModels allowlist.
 * Always preserves the "Default" option (value: null).
 */
function filterModelOptionsByAllowlist(options: ModelOption[]): ModelOption[] {
  const settings = getSettings_DEPRECATED() || {}
  if (!settings.availableModels) {
    return options // No restrictions
  }
  return options.filter(
    opt =>
      opt.value === null || (opt.value !== null && isModelAllowed(opt.value)),
  )
}
