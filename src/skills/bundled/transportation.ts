import { parseFrontmatter } from '../../utils/frontmatterParser.js'
import { registerBundledSkill } from '../bundledSkills.js'
import skillMd from './transportation/SKILL.md' with { type: 'text' }
import { TRANSPORTATION_FILES } from './transportationContent.js'

const { content } = parseFrontmatter(skillMd)

export function registerTransportationSkill(): void {
  registerBundledSkill({
    name: 'transportation',
    description:
      '交通工程内置知识库：David Levinson 等人的 Fundamentals of Transportation。',
    whenToUse:
      'Use for transportation planning, traffic flow, queueing, transit, signals, geometric design, and traffic simulation theory.',
    argumentHint: '[交通问题或教材章节]',
    userInvocable: true,
    files: TRANSPORTATION_FILES,
    async getPromptForCommand(args) {
      const request = args ? `\n\n## User request\n\n${args}` : ''
      return [{ type: 'text', text: content.trim() + request }]
    },
  })
}
