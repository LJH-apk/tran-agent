import React from 'react';
import { Box, Text } from '@anthropic/ink';
import type { Theme } from '@anthropic/ink';

export type LocalVaultViewProps =
  | { mode: 'list'; keys: string[] }
  | { mode: 'set-ok'; key: string }
  | { mode: 'get-masked'; key: string; masked: string }
  | { mode: 'get-revealed'; key: string; value: string }
  | { mode: 'not-found'; key: string }
  | { mode: 'deleted'; key: string }
  | { mode: 'error'; message: string };

export function LocalVaultView(props: LocalVaultViewProps): React.ReactNode {
  if (props.mode === 'list') {
    if (props.keys.length === 0) {
      return (
        <Box>
          <Text dimColor>尚未存储任何密钥。用 /local-vault set &lt;key&gt; &lt;value&gt; 添加。</Text>
        </Box>
      );
    }
    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text bold>Local Vault Keys ({props.keys.length})</Text>
        </Box>
        {props.keys.map(k => (
          <Box key={k}>
            <Text> </Text>
            <Text color={'success' as keyof Theme}>●</Text>
            <Text> {k}</Text>
          </Box>
        ))}
      </Box>
    );
  }

  if (props.mode === 'set-ok') {
    return (
      <Box>
        <Text color={'success' as keyof Theme}>✓</Text>
        <Text> 密钥已存储：</Text>
        <Text bold>{props.key}</Text>
        <Text dimColor>  = [已遮蔽]</Text>
      </Box>
    );
  }

  if (props.mode === 'get-masked') {
    return (
      <Box flexDirection="column">
        <Box>
          <Text bold>{props.key}</Text>
          <Text dimColor>: </Text>
          <Text>{props.masked}</Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>Use /local-vault get {props.key} --reveal to see the full value.</Text>
        </Box>
      </Box>
    );
  }

  if (props.mode === 'get-revealed') {
    return (
      <Box flexDirection="column">
        <Box>
          <Text bold>{props.key}</Text>
          <Text dimColor>: </Text>
          <Text color={'warning' as keyof Theme}>{props.value}</Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor color={'warning' as keyof Theme}>
            ⚠ 密钥已在终端中明文显示 —— 如果本次会话是共享的，请清除回滚缓冲区。
          </Text>
        </Box>
      </Box>
    );
  }

  if (props.mode === 'not-found') {
    return (
      <Box>
        <Text color={'error' as keyof Theme}>未找到密钥：</Text>
        <Text bold>{props.key}</Text>
      </Box>
    );
  }

  if (props.mode === 'deleted') {
    return (
      <Box>
        <Text color={'success' as keyof Theme}>✓</Text>
        <Text>  已删除：</Text>
        <Text bold>{props.key}</Text>
      </Box>
    );
  }

  // mode === 'error'
  return (
    <Box>
      <Text color={'error' as keyof Theme}>Error: {props.message}</Text>
    </Box>
  );
}
