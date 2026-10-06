import React from 'react'
import { Dialog, Text } from '@anthropic/ink'
import type { AgentMemoryScope } from '@claude-code-best/builtin-tools/tools/AgentTool/agentMemory.js'
import { Select } from '../CustomSelect/index.js'

interface SnapshotUpdateDialogProps {
  agentType: string
  scope: AgentMemoryScope
  snapshotTimestamp: string
  onComplete: (choice: 'merge' | 'keep' | 'replace') => void
  onCancel: () => void
}

// Ink uses React.createElement instead of JSX here so the real implementation
// can live in a .ts file (bun's `.js` import resolver picks up .ts before
// .tsx in this repo's layout, so co-locating both extensions would shadow
// this module with an empty stub).
export function SnapshotUpdateDialog({
  agentType,
  scope,
  snapshotTimestamp,
  onComplete,
  onCancel,
}: SnapshotUpdateDialogProps): React.ReactElement {
  const children = [
    React.createElement(
      Text,
      { dimColor: true, key: 'timestamp' },
      `快照时间戳：${snapshotTimestamp}`,
    ),
    React.createElement(Select, {
      key: 'select',
      defaultFocusValue: 'merge',
      options: [
        {
          label: '将快照合并到当前记忆',
          value: 'merge',
          description:
            '保留当前记忆，并请 Tran Agent 合并快照中的变更。',
        },
        {
          label: '保留当前记忆',
          value: 'keep',
          description:
            '忽略本次快照更新，继续使用当前记忆。',
        },
        {
          label: '用快照替换',
          value: 'replace',
          description:
            '用快照内容覆盖当前记忆文件。',
        },
      ],
      onChange: onComplete as (value: unknown) => void,
    }),
  ]
  return React.createElement(Dialog, {
    title: '智能体记忆快照更新',
    subtitle: `有更新的 ${scope} 记忆快照可用于 ${agentType}。`,
    onCancel,
    color: 'warning' as const,
    children,
  })
}

export function buildMergePrompt(
  agentType: string,
  scope: AgentMemoryScope,
): string {
  return `A newer ${scope} persistent memory snapshot is available for the "${agentType}" agent.

Please merge the snapshot update into the current ${scope} agent memory before continuing:
- Preserve useful current memory entries.
- Incorporate newer or more accurate information from the snapshot.
- Resolve duplicates or conflicts in favor of the most current, specific information.
- Keep the memory concise and relevant to future runs of this agent.

After merging, continue with the user's request.`
}
