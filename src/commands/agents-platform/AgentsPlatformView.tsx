import React from 'react';
import { Box, Text } from '@anthropic/ink';
import type { Theme } from '@anthropic/ink';
import type { AgentTrigger } from './agentsApi.js';
import { cronToHuman } from '../../utils/cron.js';

type Props =
  | { mode: 'list'; agents: AgentTrigger[] }
  | { mode: 'created'; agent: AgentTrigger }
  | { mode: 'deleted'; id: string }
  | { mode: 'ran'; id: string; runId: string }
  | { mode: 'error'; message: string };

function AgentRow({ agent }: { agent: AgentTrigger }): React.ReactNode {
  const schedule = cronToHuman(agent.cron_expr, { utc: true });
  const nextRun = agent.next_run ? new Date(agent.next_run).toLocaleString() : '—';
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box>
        <Text bold>{agent.id}</Text>
        <Text dimColor> · </Text>
        <Text color={'suggestion' as keyof Theme}>{agent.status}</Text>
      </Box>
      <Text>调度：{schedule}</Text>
      <Text dimColor>提示词：{agent.prompt}</Text>
      <Text dimColor>下次运行：{nextRun}</Text>
    </Box>
  );
}

export function AgentsPlatformView(props: Props): React.ReactNode {
  if (props.mode === 'list') {
    if (props.agents.length === 0) {
      return (
        <Box>
          <Text dimColor>
            No scheduled agents. Use /agents-platform create &lt;cron&gt; &lt;prompt&gt; to create one.
          </Text>
        </Box>
      );
    }
    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text bold>Scheduled Agents ({props.agents.length})</Text>
        </Box>
        {props.agents.map(agent => (
          <AgentRow key={agent.id} agent={agent} />
        ))}
      </Box>
    );
  }

  if (props.mode === 'created') {
    const schedule = cronToHuman(props.agent.cron_expr, { utc: true });
    return (
      <Box flexDirection="column">
        <Box>
          <Text bold color={'success' as keyof Theme}>
            智能体已创建
          </Text>
        </Box>
        <Text>ID：{props.agent.id}</Text>
        <Text>调度：{schedule}</Text>
        <Text>提示词：{props.agent.prompt}</Text>
        <Text dimColor>状态：{props.agent.status}</Text>
      </Box>
    );
  }

  if (props.mode === 'deleted') {
    return (
      <Box>
        <Text color={'success' as keyof Theme}>Agent {props.id} deleted.</Text>
      </Box>
    );
  }

  if (props.mode === 'ran') {
    return (
      <Box flexDirection="column">
        <Box>
          <Text color={'success' as keyof Theme}>Agent {props.id} triggered.</Text>
        </Box>
        <Text dimColor>运行 ID：{props.runId}</Text>
      </Box>
    );
  }

  // error mode
  return (
    <Box>
      <Text color={'error' as keyof Theme}>{props.message}</Text>
    </Box>
  );
}
