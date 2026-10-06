/**
 * Confirmation dialog shown when the user runs `/goal <objective>`
 * while a non-complete goal is already active.
 */
import * as React from 'react';

import { Box, Text } from '@anthropic/ink';

import type { GoalState } from 'src/types/logs.js';
import { Select } from 'src/components/CustomSelect/index.js';
import { PermissionDialog } from 'src/components/permissions/PermissionDialog.js';
import { formatGoalElapsed, formatGoalStatusLabel } from 'src/services/goal/goalState.js';

type Props = {
  currentGoal: GoalState;
  newObjective: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function GoalReplaceConfirmDialog({ currentGoal, newObjective, onConfirm, onCancel }: Props): React.ReactNode {
  function handleResponse(value: 'yes' | 'no'): void {
    if (value === 'yes') onConfirm();
    else onCancel();
  }

  const tokensDisplay =
    currentGoal.tokenBudget !== null
      ? `${currentGoal.tokensUsed} / ${currentGoal.tokenBudget}`
      : `${currentGoal.tokensUsed}`;

  return (
    <PermissionDialog color="warning" title="替换当前目标？">
      <Box flexDirection="column" marginTop={1} paddingX={1}>
        <Text>已有目标正在进行中。替换它会重置所有进度和计数器。</Text>

        <Box marginTop={1} flexDirection="column">
          <Text dimColor>当前目标：</Text>
          <Text>
            <Text dimColor>· 目标： </Text>
            {currentGoal.objective}
          </Text>
          <Text>
            <Text dimColor>· 状态： </Text>
            {formatGoalStatusLabel(currentGoal.status)}
          </Text>
          <Text>
            <Text dimColor>· 用时： </Text>
            {formatGoalElapsed(currentGoal)}
          </Text>
          <Text>
            <Text dimColor>· Token： </Text>
            {tokensDisplay}
          </Text>
        </Box>

        <Box marginTop={1} flexDirection="column">
          <Text dimColor>新目标：</Text>
          <Text>{newObjective}</Text>
        </Box>

        <Box marginTop={1}>
          <Select
            options={[
              { label: '是，替换目标', value: 'yes' as const },
              { label: '否，保留当前目标', value: 'no' as const },
            ]}
            onChange={handleResponse}
            onCancel={onCancel}
          />
        </Box>
      </Box>
    </PermissionDialog>
  );
}
