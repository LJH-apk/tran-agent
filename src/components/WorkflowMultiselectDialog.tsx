import React, { useCallback, useState } from 'react';
import type { Workflow } from '../commands/install-github-app/types.js';
import type { ExitState } from '../hooks/useExitOnCtrlCDWithKeybindings.js';
import { Box, Link, Text, Byline, Dialog, KeyboardShortcutHint } from '@anthropic/ink';
import { ConfigurableShortcutHint } from './ConfigurableShortcutHint.js';
import { SelectMulti } from './CustomSelect/SelectMulti.js';

type WorkflowOption = {
  value: Workflow;
  label: string;
};

type Props = {
  onSubmit: (selectedWorkflows: Workflow[]) => void;
  defaultSelections: Workflow[];
};

const WORKFLOWS: WorkflowOption[] = [
  {
    value: 'claude' as const,
    label: '@Tran Agent - 在 issue 和 PR 评论中 @claude',
  },
  {
    value: 'claude-review' as const,
    label: 'Tran Agent Review - 对新的 PR 自动进行代码审查',
  },
];

function renderInputGuide(exitState: ExitState): React.ReactNode {
  if (exitState.pending) {
    return <Text>再按一次 {exitState.keyName} 退出</Text>;
  }
  return (
    <Byline>
      <KeyboardShortcutHint shortcut="↑↓" action="导航" />
      <KeyboardShortcutHint shortcut="Space" action="切换" />
      <KeyboardShortcutHint shortcut="Enter" action="确认" />
      <ConfigurableShortcutHint action="confirm:no" context="Confirmation" fallback="Esc" description="取消" />
    </Byline>
  );
}

export function WorkflowMultiselectDialog({ onSubmit, defaultSelections }: Props): React.ReactNode {
  const [showError, setShowError] = useState(false);

  const handleSubmit = useCallback(
    (selectedValues: Workflow[]) => {
      if (selectedValues.length === 0) {
        setShowError(true);
        return;
      }
      setShowError(false);
      onSubmit(selectedValues);
    },
    [onSubmit],
  );

  const handleChange = useCallback(() => {
    setShowError(false);
  }, []);

  // Cancel just shows the error - user must select at least one workflow
  const handleCancel = useCallback(() => {
    setShowError(true);
  }, []);

  return (
    <Dialog
      title="选择要安装的 GitHub workflow"
      subtitle="我们会为你选择的每个 workflow 在仓库中创建一个 workflow 文件。"
      onCancel={handleCancel}
      inputGuide={renderInputGuide}
    >
      <Box>
        <Text dimColor>
          更多 workflow 示例（issue 分类、CI 修复等）见：{' '}
          <Link url="https://github.com/anthropics/claude-code-action/blob/main/examples/">
            https://github.com/anthropics/claude-code-action/blob/main/examples/
          </Link>
        </Text>
      </Box>

      <SelectMulti
        options={WORKFLOWS.map(workflow => ({
          label: workflow.label,
          value: workflow.value,
        }))}
        defaultValue={defaultSelections}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onCancel={handleCancel}
        hideIndexes
      />

      {showError && (
        <Box>
          <Text color="error">必须至少选择一个 workflow 才能继续</Text>
        </Box>
      )}
    </Dialog>
  );
}
