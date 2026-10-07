import React from 'react';
import { Ansi, Box, Text } from '@anthropic/ink';
import { formatTotalCost } from '../../cost-tracker.js';
import {
  getTotalInputTokens,
  getTotalCacheCreationInputTokens,
  getTotalCacheReadInputTokens,
} from '../../bootstrap/state.js';

export function SessionUsage(): React.ReactNode {
  const cacheRead = getTotalCacheReadInputTokens();
  const input = getTotalInputTokens() + getTotalCacheCreationInputTokens() + cacheRead;
  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>当前会话</Text>
      <Ansi>{formatTotalCost('zh')}</Ansi>
      <Text dimColor>会话缓存命中占比：{input > 0 ? `${Math.round((cacheRead / input) * 100)}%` : '暂无请求数据'}</Text>
    </Box>
  );
}
