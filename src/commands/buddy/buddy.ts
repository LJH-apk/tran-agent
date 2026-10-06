import React from 'react'
import {
  getCompanion,
  rollWithSeed,
  generateSeed,
} from '../../buddy/companion.js'
import { type StoredCompanion, RARITY_STARS } from '../../buddy/types.js'
import { renderSprite } from '../../buddy/sprites.js'
import { CompanionCard } from '../../buddy/CompanionCard.js'
import { getGlobalConfig, saveGlobalConfig } from '../../utils/config.js'
import { triggerCompanionReaction } from '../../buddy/companionReact.js'
import type { ToolUseContext } from '../../Tool.js'
import type {
  LocalJSXCommandContext,
  LocalJSXCommandOnDone,
} from '../../types/command.js'

// Species → default name fragments for hatch (no API needed)
const SPECIES_NAMES: Record<string, string> = {
  duck: 'Waddles',
  goose: 'Goosberry',
  blob: 'Gooey',
  cat: 'Whiskers',
  dragon: 'Ember',
  octopus: 'Inky',
  owl: 'Hoots',
  penguin: 'Waddleford',
  turtle: 'Shelly',
  snail: 'Trailblazer',
  ghost: 'Casper',
  axolotl: 'Axie',
  capybara: 'Chill',
  cactus: 'Spike',
  robot: 'Byte',
  rabbit: 'Flops',
  mushroom: 'Spore',
  chonk: 'Chonk',
}

const SPECIES_PERSONALITY: Record<string, string> = {
  duck: '古灵精怪，很容易被逗乐。到处留下橡皮鸭调试小贴士。',
  goose: '强势，见到烂代码就嚷嚷。代码评审时绝不留情面。',
  blob: '适应力强，随遇而安。困惑时偶尔会分裂成两个。',
  cat: '独立又挑剔。带着几分不屑看你敲代码。',
  dragon:
    '热情似火，痴迷架构设计。喜欢囤积好变量名。',
  octopus:
    '多任务大师。同时用触手缠住所有问题。',
  owl: '睿智但啰嗦。每次说"让我想想"都恰好用 3 秒。',
  penguin: '压力之下依然沉着。优雅地滑过合并冲突。',
  turtle: '耐心细致。相信稳扎稳打才能顺利部署。',
  snail: '有条不紊，一路留下有用的注释。从不着急。',
  ghost:
    '飘忽不定，总在最糟糕的时刻带着诡异的洞见现身。',
  axolotl: '能自我再生，性格开朗。笑着从任何 bug 中恢复过来。',
  capybara: '禅修大师。周围天塌地陷也依旧淡定。',
  cactus:
    '外表带刺，内心善良。越是没人管越活得好。',
  robot: '高效又较真。用二进制处理反馈。',
  rabbit: '精力充沛，在任务间跳来跳去。你还没开始它就已经做完。',
  mushroom: '默默洞察一切。时间越久越让人喜欢。',
  chonk:
    '又大又暖，占满整张沙发。舒适比优雅更重要。',
}

function speciesLabel(species: string): string {
  return species.charAt(0).toUpperCase() + species.slice(1)
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  context: ToolUseContext & LocalJSXCommandContext,
  args: string,
): Promise<React.ReactNode> {
  const sub = args?.trim().toLowerCase() ?? ''
  const setState = context.setAppState

  // ── /buddy off — mute companion ──
  if (sub === 'off') {
    saveGlobalConfig(cfg => ({ ...cfg, companionMuted: true }))
    onDone('伙伴已静音', { display: 'system' })
    return null
  }

  // ── /buddy on — unmute companion ──
  if (sub === 'on') {
    saveGlobalConfig(cfg => ({ ...cfg, companionMuted: false }))
    onDone('伙伴已取消静音', { display: 'system' })
    return null
  }

  // ── /buddy pet — trigger heart animation + auto unmute ──
  if (sub === 'pet') {
    const companion = getCompanion()
    if (!companion) {
      onDone('no companion yet \u00b7 run /buddy first', { display: 'system' })
      return null
    }

    // Auto-unmute on pet + trigger heart animation
    saveGlobalConfig(cfg => ({ ...cfg, companionMuted: false }))
    setState?.(prev => ({ ...prev, companionPetAt: Date.now() }))

    // Trigger a post-pet reaction
    triggerCompanionReaction(context.messages ?? [], reaction =>
      setState?.(prev =>
        prev.companionReaction === reaction
          ? prev
          : { ...prev, companionReaction: reaction },
      ),
    )

    onDone(`摸了摸 ${companion.name}`, { display: 'system' })
    return null
  }

  // ── /buddy (no args) — show existing or hatch ──
  const companion = getCompanion()

  // Auto-unmute when viewing
  if (companion && getGlobalConfig().companionMuted) {
    saveGlobalConfig(cfg => ({ ...cfg, companionMuted: false }))
  }

  if (companion) {
    // Return JSX card — matches official vc8 component
    const lastReaction = context.getAppState?.()?.companionReaction
    return React.createElement(CompanionCard, {
      companion,
      lastReaction,
      onDone: onDone as unknown as Parameters<
        typeof CompanionCard
      >[0]['onDone'],
    })
  }

  // ── No companion → hatch ──
  const seed = generateSeed()
  const r = rollWithSeed(seed)
  const name = SPECIES_NAMES[r.bones.species] ?? 'Buddy'
  const personality =
    SPECIES_PERSONALITY[r.bones.species] ?? '神秘莫测，精通代码。'

  const stored: StoredCompanion = {
    name,
    personality,
    seed,
    hatchedAt: Date.now(),
  }

  saveGlobalConfig(cfg => ({ ...cfg, companion: stored }))

  const stars = RARITY_STARS[r.bones.rarity]
  const sprite = renderSprite(r.bones, 0)
  const shiny = r.bones.shiny ? ' \u2728 Shiny!' : ''

  const lines = [
    '一只野生伙伴出现了！',
    '',
    ...sprite,
    '',
    `${name}，一只 ${speciesLabel(r.bones.species)}${shiny}`,
    `稀有度：${stars}（${r.bones.rarity}）`,
    `"${personality}"`,
    '',
    '你的伙伴现在会出现在输入框旁边！',
    'Say its name to get its take \u00b7 /buddy pet \u00b7 /buddy off',
  ]
  onDone(lines.join('\n'), { display: 'system' })
  return null
}
