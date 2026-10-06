import * as React from 'react';
import { Text } from '@anthropic/ink';
import { BashTool } from '@claude-code-best/builtin-tools/tools/BashTool/BashTool.js';
import type { PermissionRuleValue } from '../../../utils/permissions/PermissionRule.js';

type RuleSubtitleProps = {
  ruleValue: PermissionRuleValue;
};

export function PermissionRuleDescription({ ruleValue }: RuleSubtitleProps): React.ReactNode {
  switch (ruleValue.toolName) {
    case BashTool.name: {
      if (ruleValue.ruleContent) {
        if (ruleValue.ruleContent.endsWith(':*')) {
          return (
            <Text dimColor>
              任何以此内容开头的 Bash 命令： <Text bold>{ruleValue.ruleContent.slice(0, -2)}</Text>
            </Text>
          );
        } else {
          return (
            <Text dimColor>
              Bash 命令： <Text bold>{ruleValue.ruleContent}</Text>
            </Text>
          );
        }
      } else {
        return <Text dimColor>任何 Bash 命令</Text>;
      }
    }
    default: {
      if (!ruleValue.ruleContent) {
        return (
          <Text dimColor>
            使用工具： <Text bold>{ruleValue.toolName}</Text>
          </Text>
        );
      } else {
        return null;
      }
    }
  }
}
