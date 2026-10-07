import type { Tool } from '../Tool.js'

/** Include resource operations in MCP call labels without changing permissions. */
export function getMcpCallServer(
  tool: Pick<Tool, 'name' | 'isMcp' | 'mcpInfo'>,
  input: unknown,
): string | undefined {
  if (tool.isMcp) return tool.mcpInfo?.serverName ?? 'MCP'
  if (
    tool.name !== 'ListMcpResourcesTool' &&
    tool.name !== 'ReadMcpResourceTool'
  ) {
    return undefined
  }
  if (typeof input === 'object' && input !== null && 'server' in input) {
    if (typeof input.server === 'string' && input.server.trim()) {
      return input.server
    }
  }
  return 'MCP'
}
