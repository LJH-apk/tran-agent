import { feature } from 'bun:bundle';
import chalk from 'chalk';
import React from 'react';
import { Ansi, Box, Text } from '@anthropic/ink';
import ThemedText from '../design-system/ThemedText.js';
import { useAppState } from '../../state/AppState.js';
import type { PermissionDecision, PermissionDecisionReason } from '../../utils/permissions/PermissionResult.js';
import { permissionRuleValueToString } from '../../utils/permissions/permissionRuleParser.js';
import type { Theme } from '../../utils/theme.js';
import { permissionReasonDisplay } from '../../utils/permissions/permissionReasonDisplay.js';

export type PermissionRuleExplanationProps = {
  permissionResult: PermissionDecision;
  toolType: 'tool' | 'command' | 'edit' | 'read';
};

type DecisionReasonStrings = {
  reasonString: string;
  configString?: string;
  /** When set, reasonString is plain text rendered with this theme color instead of <Ansi>. */
  themeColor?: keyof Theme;
};

function stringsForDecisionReason(
  reason: PermissionDecisionReason | undefined,
  toolType: 'tool' | 'command' | 'edit' | 'read',
): DecisionReasonStrings | null {
  if (!reason) {
    return null;
  }
  const typeLabel = { tool: '工具调用', command: '命令', edit: '文件修改', read: '文件读取' }[toolType];
  if ((feature('BASH_CLASSIFIER') || feature('TRANSCRIPT_CLASSIFIER')) && reason.type === 'classifier') {
    if (reason.classifier === 'auto-mode') {
      return {
        reasonString: `自动模式分类器要求对本次${typeLabel}进行确认。\n${permissionReasonDisplay(reason.reason)}`,
        configString: undefined,
        themeColor: 'error',
      };
    }
    return {
      reasonString: `分类器 ${chalk.bold(reason.classifier)} 要求对本次${typeLabel}进行确认。\n${permissionReasonDisplay(reason.reason)}`,
      configString: undefined,
    };
  }
  switch (reason.type) {
    case 'rule':
      return {
        reasonString: `权限规则 ${chalk.bold(
          permissionRuleValueToString(reason.rule.ruleValue),
        )} 要求对本次${typeLabel}进行确认。`,
        configString: reason.rule.source === 'policySettings' ? undefined : '用 /permissions 更新规则',
      };
    case 'hook': {
      const hookReasonString = reason.reason ? `：\n${permissionReasonDisplay(reason.reason)}` : '。';
      const sourceLabel = reason.hookSource ? ` ${chalk.dim(`[${reason.hookSource}]`)}` : '';
      return {
        reasonString: `钩子 ${chalk.bold(reason.hookName)} 要求对本次${typeLabel}进行确认${hookReasonString}${sourceLabel}`,
        configString: '用 /hooks 更新',
      };
    }
    case 'safetyCheck':
    case 'other':
      return {
        reasonString: permissionReasonDisplay(reason.reason),
        configString: undefined,
      };
    case 'workingDir':
      return {
        reasonString: permissionReasonDisplay(reason.reason),
        configString: '用 /permissions 更新规则',
      };
    default:
      return null;
  }
}

export function PermissionRuleExplanation({
  permissionResult,
  toolType,
}: PermissionRuleExplanationProps): React.ReactNode {
  const permissionMode = useAppState(s => s.toolPermissionContext.mode);
  const strings = stringsForDecisionReason(permissionResult?.decisionReason, toolType);
  if (!strings) {
    return null;
  }

  const themeColor =
    strings.themeColor ??
    (permissionResult?.decisionReason?.type === 'hook' && permissionMode === 'auto' ? 'warning' : undefined);

  return (
    <Box marginBottom={1} flexDirection="column">
      {themeColor ? (
        <ThemedText color={themeColor}>{strings.reasonString}</ThemedText>
      ) : (
        <Text>
          <Ansi>{strings.reasonString}</Ansi>
        </Text>
      )}
      {strings.configString && <Text dimColor>{strings.configString}</Text>}
    </Box>
  );
}
