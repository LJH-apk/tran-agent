import React from 'react';
import { Box, Text } from '@anthropic/ink';
import type { Theme } from '../../utils/theme.js';

export type AutofixPhase =
  | 'detecting'
  | 'checking_eligibility'
  | 'acquiring_lock'
  | 'launching'
  | 'registered'
  | 'done'
  | 'error';

interface AutofixProgressProps {
  phase: AutofixPhase;
  target: string;
  sessionUrl?: string;
  errorMessage?: string;
}

const PHASE_LABELS: Record<AutofixPhase, string> = {
  detecting: '正在检测代码仓库…',
  checking_eligibility: '正在检查远程智能体使用资格…',
  acquiring_lock: '正在获取监控锁…',
  launching: '正在启动远程会话…',
  registered: '会话已注册',
  done: '自动修复已启动',
  error: '错误',
};

const PHASE_ORDER: AutofixPhase[] = [
  'detecting',
  'checking_eligibility',
  'acquiring_lock',
  'launching',
  'registered',
  'done',
];

function phaseIndex(phase: AutofixPhase): number {
  return PHASE_ORDER.indexOf(phase);
}

/**
 * Inline progress component for /autofix-pr.
 * Rendered by the REPL alongside the onDone text message.
 */
export function AutofixProgress({ phase, target, sessionUrl, errorMessage }: AutofixProgressProps): React.ReactElement {
  const currentIdx = phaseIndex(phase);
  const isError = phase === 'error';

  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      <Box>
        <Text bold>自动修复 PR </Text>
        <Text color={'claude' as keyof Theme}>{target}</Text>
      </Box>
      {PHASE_ORDER.map((p, i) => {
        const isDone = currentIdx > i;
        const isActive = currentIdx === i && !isError;
        const symbol = isDone ? '✓' : isActive ? '→' : '·';
        const color: keyof Theme = isDone ? 'success' : isActive ? 'warning' : 'subtle';
        return (
          <Box key={p} marginLeft={2}>
            <Text color={color}>
              {symbol} {PHASE_LABELS[p]}
            </Text>
          </Box>
        );
      })}
      {isError && errorMessage && (
        <Box marginLeft={2} marginTop={1}>
          <Text color={'error' as keyof Theme}>✗ {errorMessage}</Text>
        </Box>
      )}
      {sessionUrl && (
        <Box marginTop={1} marginLeft={2}>
          <Text color={'subtle' as keyof Theme}>跟踪：</Text>
          <Text color={'claude' as keyof Theme}>{sessionUrl}</Text>
        </Box>
      )}
    </Box>
  );
}
