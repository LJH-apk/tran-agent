import { describe, expect, test } from 'bun:test'
import { classifyMcpToolForCollapse } from '@claude-code-best/builtin-tools/tools/MCPTool/classifyForCollapse.js'
import type { Tools } from '../../Tool.js'
import type { CollapsibleMessage, RenderableMessage } from '../../types/message.js'
import { collapseReadSearchGroups } from '../collapseReadSearch.js'

const names = [
  'zotero_get_recent',
  'zotero_get_collection_items',
  'zotero_get_tags',
]
const tools = names.map(name => ({
  name: `mcp__zotero__${name}`,
  isMcp: true,
  mcpInfo: { serverName: 'zotero', toolName: name },
  isSearchOrReadCommand: () => classifyMcpToolForCollapse('zotero', name),
})) as unknown as Tools

function calls(): CollapsibleMessage[] {
  return names.flatMap((name, index) => [
    {
      type: 'assistant',
      uuid: `call-${index}`,
      message: {
        id: 'response',
        content: [
          {
            type: 'tool_use',
            name: `mcp__zotero__${name}`,
            id: `tool-${index}`,
            input: {},
          },
        ],
      },
    },
    {
      type: 'user',
      uuid: `result-${index}`,
      message: {
        content: [
          {
            type: 'tool_result',
            tool_use_id: `tool-${index}`,
            content: 'ok',
            is_error: index === 1,
          },
        ],
      },
    },
  ]) as unknown as CollapsibleMessage[]
}

describe('collapsed MCP calls', () => {
  test('summarizes different Zotero reads and retains results for expansion', () => {
    const messages = calls()
    const output = collapseReadSearchGroups(messages, tools)
    expect(output).toHaveLength(1)
    const group = output[0]!
    expect(group.type).toBe('collapsed_read_search')
    if (group.type !== 'collapsed_read_search')
      throw new Error('Expected collapsed group')
    expect(group.mcpCallCount).toBe(3)
    expect(group.mcpServerNames).toEqual(['zotero'])
    expect(group.messages).toEqual(messages)
    expect(group.readCount).toBe(0)
  })

  test('keeps separate summaries when assistant text separates calls', () => {
    const messages = calls()
    const text = {
      type: 'assistant',
      uuid: 'text',
      message: { id: 'text', content: [{ type: 'text', text: '下一步' }] },
    } as unknown as RenderableMessage
    const output = collapseReadSearchGroups(
      [...messages.slice(0, 2), text, ...messages.slice(2)],
      tools,
    )
    expect(output.map(message => message.type)).toEqual([
      'collapsed_read_search',
      'assistant',
      'collapsed_read_search',
    ])
    expect(output[1]).toBe(text)
  })
})
