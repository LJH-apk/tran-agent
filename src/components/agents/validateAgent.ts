import type { Tools } from '../../Tool.js'
import { resolveAgentTools } from '@claude-code-best/builtin-tools/tools/AgentTool/agentToolUtils.js'
import type {
  AgentDefinition,
  CustomAgentDefinition,
} from '@claude-code-best/builtin-tools/tools/AgentTool/loadAgentsDir.js'
import { getAgentSourceDisplayName } from './utils.js'

export type AgentValidationResult = {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateAgentType(agentType: string): string | null {
  if (!agentType) {
    return '必须填写智能体类型'
  }

  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(agentType)) {
    return '智能体类型必须以字母或数字开头和结尾，且只能包含字母、数字和连字符'
  }

  if (agentType.length < 3) {
    return '智能体类型至少需要 3 个字符'
  }

  if (agentType.length > 50) {
    return '智能体类型不能超过 50 个字符'
  }

  return null
}

export function validateAgent(
  agent: Omit<CustomAgentDefinition, 'location'>,
  availableTools: Tools,
  existingAgents: AgentDefinition[],
): AgentValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate agent type
  if (!agent.agentType) {
    errors.push('Agent type is required')
  } else {
    const typeError = validateAgentType(agent.agentType)
    if (typeError) {
      errors.push(typeError)
    }

    // Check for duplicates (excluding self for editing)
    const duplicate = existingAgents.find(
      a => a.agentType === agent.agentType && a.source !== agent.source,
    )
    if (duplicate) {
      errors.push(
        `智能体类型“${agent.agentType}”已存在于 ${getAgentSourceDisplayName(duplicate.source)}`,
      )
    }
  }

  // Validate description
  if (!agent.whenToUse) {
    errors.push('必须填写描述（description）')
  } else if (agent.whenToUse.length < 10) {
    warnings.push(
      '描述应更详细（至少 10 个字符）',
    )
  } else if (agent.whenToUse.length > 5000) {
    warnings.push('描述过长（超过 5000 个字符）')
  }

  // Validate tools
  if (agent.tools !== undefined && !Array.isArray(agent.tools)) {
    errors.push('工具必须为数组')
  } else {
    if (agent.tools === undefined) {
      warnings.push('智能体可使用全部工具')
    } else if (agent.tools.length === 0) {
      warnings.push(
        '未选择任何工具——智能体的能力将非常有限',
      )
    }

    // Check for invalid tools
    const resolvedTools = resolveAgentTools(agent, availableTools, false)

    if (resolvedTools.invalidTools.length > 0) {
      errors.push(`无效工具：${resolvedTools.invalidTools.join(', ')}`)
    }
  }

  // Validate system prompt
  const systemPrompt = agent.getSystemPrompt()
  if (!systemPrompt) {
    errors.push('必须填写系统提示词')
  } else if (systemPrompt.length < 20) {
    errors.push('系统提示词过短（至少 20 个字符）')
  } else if (systemPrompt.length > 10000) {
    warnings.push('系统提示词过长（超过 10,000 个字符）')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}
