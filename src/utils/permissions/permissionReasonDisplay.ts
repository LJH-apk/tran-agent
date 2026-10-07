// Translate built-in diagnostic text at the display boundary. Keep unknown
// server/hook/model messages and command fragments intact.
const builtInReasons: Record<string, string> = {
  'This command requires approval': '此命令需要你确认后才能执行',
  'This command contains patterns that could pose security risks and requires approval': '此命令包含可能带来安全风险的操作，需要你确认',
  'Read-only command is allowed': '已允许执行只读命令',
  'Run outside of the sandbox': '在沙箱外运行',
  'sed command requires approval (contains potentially dangerous operations)': '此 sed 命令包含可能有危险的操作，需要你确认',
}

export function permissionReasonDisplay(reason: string): string {
  if (Object.hasOwn(builtInReasons, reason)) return builtInReasons[reason]!
  const prefixes = [
    ['Command contains malformed syntax that cannot be parsed: ', '命令语法有误，无法解析：'],
    ['Denied by Bash prompt rule: ', 'Bash 提示规则拒绝了此命令：'],
    ['Required by Bash prompt rule: ', 'Bash 提示规则要求确认此命令：'],
    ['Allowed by prompt rule: ', '提示规则已允许此命令：'],
  ] as const
  for (const [prefix, translation] of prefixes) {
    if (reason.startsWith(prefix)) return translation + reason.slice(prefix.length)
  }
  return reason
}
