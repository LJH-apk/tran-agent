import { parseFrontmatter } from '../../utils/frontmatterParser.js'
import { registerBundledSkill } from '../bundledSkills.js'
import skillMd from './traffic-congestion-governance/SKILL.md' with {
  type: 'text',
}
import references from './trafficCongestionGovernanceContent.json'

const { content } = parseFrontmatter(skillMd)

export function registerTrafficCongestionGovernanceSkill(): void {
  registerBundledSkill({
    name: 'traffic-congestion-governance',
    description:
      '交通拥堵治理知识库：拥堵诊断、策略选择、信号与区域控制、仿真评价及文献证据。',
    whenToUse:
      'Use for congestion diagnosis and governance, pricing, signals, perimeter/freeway/transit control, RL evaluation, and literature-backed strategy comparisons.',
    argumentHint: '[拥堵问题、治理方案或文献主题]',
    userInvocable: true,
    files: references,
    async getPromptForCommand(args) {
      const request = args ? `\n\n## User request\n\n${args}` : ''
      const access =
        'Read references relative to the base directory above. If no base directory is provided or files cannot be read, report that local extraction failed. This collection contains supplied literature notes and metadata, not paper full texts or independently verified citations. Consult references/23_source_provenance.md and original papers for precise claims.\n\n'
      return [{ type: 'text', text: access + content.trim() + request }]
    },
  })
}
