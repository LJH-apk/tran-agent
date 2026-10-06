import * as React from 'react';
import { useCallback } from 'react';
import { Select } from '../../../components/CustomSelect/select.js';
import { Box, Dialog, Text } from '@anthropic/ink';
import type { ToolPermissionContext } from '../../../Tool.js';
import type {
  PermissionBehavior,
  PermissionRule,
  PermissionRuleValue,
} from '../../../utils/permissions/PermissionRule.js';
import { applyPermissionUpdate, persistPermissionUpdate } from '../../../utils/permissions/PermissionUpdate.js';
import { permissionRuleValueToString } from '../../../utils/permissions/permissionRuleParser.js';
import { detectUnreachableRules, type UnreachableRule } from '../../../utils/permissions/shadowedRuleDetection.js';
import { SandboxManager } from '../../../utils/sandbox/sandbox-adapter.js';
import { type EditableSettingSource, SOURCES } from '../../../utils/settings/constants.js';
import { getRelativeSettingsFilePathForSource } from '../../../utils/settings/settings.js';
import type { OptionWithDescription } from '../../CustomSelect/select.js';
import { PermissionRuleDescription } from './PermissionRuleDescription.js';

export function optionForPermissionSaveDestination(saveDestination: EditableSettingSource): OptionWithDescription {
  switch (saveDestination) {
    case 'localSettings':
      return {
        label: '项目设置（本地）',
        description: `保存于 ${getRelativeSettingsFilePathForSource('localSettings')}`,
        value: saveDestination,
      };
    case 'projectSettings':
      return {
        label: '项目设置',
        description: `已提交至 ${getRelativeSettingsFilePathForSource('projectSettings')}`,
        value: saveDestination,
      };
    case 'userSettings':
      return {
        label: '用户设置',
        description: `保存于 ~/.claude/settings.json`,
        value: saveDestination,
      };
  }
}

type Props = {
  onAddRules: (rules: PermissionRule[], unreachable?: UnreachableRule[]) => void;
  onCancel: () => void;
  ruleValues: PermissionRuleValue[];
  ruleBehavior: PermissionBehavior;
  initialContext: ToolPermissionContext;
  setToolPermissionContext: (newContext: ToolPermissionContext) => void;
};

export function AddPermissionRules({
  onAddRules,
  onCancel,
  ruleValues,
  ruleBehavior,
  initialContext,
  setToolPermissionContext,
}: Props): React.ReactNode {
  const allOptions = SOURCES.map(optionForPermissionSaveDestination);

  const onSelect = useCallback(
    (selectedValue: string) => {
      if (selectedValue === 'cancel') {
        onCancel();
        return;
      } else if ((SOURCES as readonly string[]).includes(selectedValue)) {
        const destination = selectedValue as EditableSettingSource;

        const updatedContext = applyPermissionUpdate(initialContext, {
          type: 'addRules',
          rules: ruleValues,
          behavior: ruleBehavior,
          destination,
        });

        // Persist to settings
        persistPermissionUpdate({
          type: 'addRules',
          rules: ruleValues,
          behavior: ruleBehavior,
          destination,
        });

        setToolPermissionContext(updatedContext);

        const rules: PermissionRule[] = ruleValues.map(ruleValue => ({
          ruleValue,
          ruleBehavior,
          source: destination,
        }));

        // Check for unreachable rules among the ones we just added
        const sandboxAutoAllowEnabled =
          SandboxManager.isSandboxingEnabled() && SandboxManager.isAutoAllowBashIfSandboxedEnabled();
        const allUnreachable = detectUnreachableRules(updatedContext, {
          sandboxAutoAllowEnabled,
        });

        // Filter to only rules we just added
        const newUnreachable = allUnreachable.filter(u =>
          ruleValues.some(
            rv => rv.toolName === u.rule.ruleValue.toolName && rv.ruleContent === u.rule.ruleValue.ruleContent,
          ),
        );

        onAddRules(rules, newUnreachable.length > 0 ? newUnreachable : undefined);
      }
    },
    [onAddRules, onCancel, ruleValues, ruleBehavior, initialContext, setToolPermissionContext],
  );

  const title = `添加 ${ruleValues.length} 条 ${ruleBehavior} 权限规则`;

  return (
    <Dialog title={title} onCancel={onCancel} color="permission">
      <Box flexDirection="column" paddingX={2}>
        {ruleValues.map(ruleValue => (
          <Box flexDirection="column" key={permissionRuleValueToString(ruleValue)}>
            <Text bold>{permissionRuleValueToString(ruleValue)}</Text>
            <PermissionRuleDescription ruleValue={ruleValue} />
          </Box>
        ))}
      </Box>

      <Box flexDirection="column" marginY={1}>
        <Text>
          {ruleValues.length === 1 ? '此规则应保存到哪里？' : '这些规则应保存到哪里？'}
        </Text>
        <Select options={allOptions} onChange={onSelect} />
      </Box>
    </Dialog>
  );
}
