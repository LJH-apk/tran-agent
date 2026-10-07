import type { Command } from '../../types/command.js';

const localMemoryCommand: Command = {
  type: 'local-jsx',
  name: 'local-memory',
  aliases: ['lm'],
  description:
    '管理本地笔记与上下文记忆库，保存在 ~/.claude/local-memory/，无需 API 密钥。',
  // Avoid `<store>` / `<key>` / `<value>` in hint — REPL markdown renderer
  // strips angle-bracketed words as HTML tags. Uppercase placeholders are
  // visible. Same fix as /local-vault.
  argumentHint: 'list | create STORE | store STORE KEY VALUE | fetch STORE KEY | entries STORE | archive STORE',
  isHidden: false,
  isEnabled: () => true,
  bridgeSafe: true,
  load: async () => {
    const m = await import('./launchLocalMemory.js');
    return { call: m.callLocalMemory };
  },
};

export default localMemoryCommand;
