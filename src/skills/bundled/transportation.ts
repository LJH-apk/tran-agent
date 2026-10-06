import { parseFrontmatter } from '../../utils/frontmatterParser.js'
import { registerBundledSkill } from '../bundledSkills.js'
import skillMd from './transportation/SKILL.md' with { type: 'text' }
import { TRANSPORTATION_RESOURCES } from './transportationResources.js'

const { content } = parseFrontmatter(skillMd)

export function registerTransportationSkill(): void {
  registerBundledSkill({
    name: 'transportation',
    aliases: ['traffic-congestion-governance'],
    description:
      '交通工程分析与拥堵治理知识库：教材理论、机理诊断、策略比较、仿真评价和文献证据。',
    whenToUse:
      '当用户讨论、分析、解释、计算或研究交通工程问题时使用，包括交通流、排队回溢、信号配时、交通规划、公交、道路设计、拥堵治理与交通仿真。Use for transportation engineering analysis, congestion governance, traffic simulation, and literature-backed strategy selection. Ordinary commuting advice or software/network traffic alone does not require this skill.',
    argumentHint: '[交通工程问题、治理方案或文献主题]',
    userInvocable: true,
    files: TRANSPORTATION_RESOURCES,
    async getPromptForCommand(args) {
      const request = args ? `\n\n## User request\n\n${args}` : ''
      return [{ type: 'text', text: content.trim() + request }]
    },
  })
}
