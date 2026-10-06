import React, { useCallback } from 'react';
import type { ChannelEntry } from '../bootstrap/state.js';
import { Box, Text, Dialog } from '@anthropic/ink';
import { gracefulShutdownSync } from '../utils/gracefulShutdown.js';
import { Select } from './CustomSelect/index.js';

type Props = {
  channels: ChannelEntry[];
  onAccept(): void;
};

export function DevChannelsDialog({ channels, onAccept }: Props): React.ReactNode {
  const [pendingExitCode, setPendingExitCode] = React.useState<number | null>(null);

  // Clear screen before shutdown so residual dialog content doesn't leak
  // to the terminal. Deferred to next tick so Ink flushes the null render.
  React.useEffect(() => {
    if (pendingExitCode !== null) {
      const code = pendingExitCode;
      const timer = setTimeout(() => gracefulShutdownSync(code));
      return () => clearTimeout(timer);
    }
  }, [pendingExitCode]);

  function onChange(value: 'accept' | 'exit') {
    switch (value) {
      case 'accept':
        onAccept();
        break;
      case 'exit':
        setPendingExitCode(1);
        break;
    }
  }

  const handleEscape = useCallback(() => {
    setPendingExitCode(0);
  }, []);

  if (pendingExitCode !== null) {
    return null;
  }

  return (
    <Dialog title="警告：正在加载开发通道" color="error" onCancel={handleEscape}>
      <Box flexDirection="column" gap={1}>
        <Text>
          --dangerously-load-development-channels 仅用于本地通道开发。不要用它运行从网上下载的通道。
        </Text>
        <Text>请使用 --channels 运行已批准的通道列表。</Text>
        <Text dimColor>
          Channels:{' '}
          {channels
            .map(c => (c.kind === 'plugin' ? `plugin:${c.name}@${c.marketplace}` : `server:${c.name}`))
            .join(', ')}
        </Text>
      </Box>

      <Select
        options={[
          { label: '我是在做本地开发', value: 'accept' },
          { label: '退出', value: 'exit' },
        ]}
        onChange={value => onChange(value as 'accept' | 'exit')}
      />
    </Dialog>
  );
}
