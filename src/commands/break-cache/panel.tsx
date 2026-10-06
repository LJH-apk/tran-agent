import React, { useMemo, useState } from 'react';
import { Box, Dialog, Text, useInput } from '@anthropic/ink';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { callBreakCache } from './index.js';
import { padEndWidth } from '../../utils/truncate.js';

type BreakCacheAction = {
  label: string;
  description: string;
  run: () => void;
};

const ACTION_LABEL_COLUMN_WIDTH = 28;

async function runBreakCacheAction(scope: string, onDone: LocalJSXCommandOnDone): Promise<void> {
  const result = await callBreakCache(scope);
  if (result.type === 'text') {
    onDone(result.value, { display: 'system' });
  }
}

function BreakCachePanel({ onDone }: { onDone: LocalJSXCommandOnDone }): React.ReactNode {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = useMemo<BreakCacheAction[]>(
    () => [
      {
        label: '状态',
        description: '显示待生效标记、always 模式与已破坏次数',
        run: () => void runBreakCacheAction('status', onDone),
      },
      {
        label: '仅一次',
        description: '仅在下次 API 调用时破坏提示词缓存',
        run: () => void runBreakCacheAction('once', onDone),
      },
      {
        label: '始终',
        description: '每次 API 调用都破坏提示词缓存',
        run: () => void runBreakCacheAction('always', onDone),
      },
      {
        label: '关闭',
        description: '关闭 always 模式并清除待生效的一次性标记',
        run: () => void runBreakCacheAction('off', onDone),
      },
      {
        label: '清除一次性标记',
        description: '取消待生效的一次性缓存破坏',
        run: () => void runBreakCacheAction('--clear', onDone),
      },
    ],
    [onDone],
  );

  const selectCurrent = () => {
    const action = actions[selectedIndex];
    if (!action) return;
    action.run();
  };

  useInput((_input, key) => {
    if (key.upArrow) {
      setSelectedIndex(index => Math.max(0, index - 1));
      return;
    }
    if (key.downArrow) {
      setSelectedIndex(index => Math.min(actions.length - 1, index + 1));
      return;
    }
    if (key.return) {
      selectCurrent();
    }
  });

  return (
    <Dialog
      title="破坏缓存"
      subtitle={`${actions.length} 个操作`}
      onCancel={() => onDone('已关闭破坏缓存面板', { display: 'system' })}
      color="background"
      hideInputGuide
    >
      <Box flexDirection="column">
        {actions.map((action, index) => (
          <Box key={action.label} flexDirection="row">
            <Text>{padEndWidth(`${index === selectedIndex ? '›' : ' '} ${action.label}`, ACTION_LABEL_COLUMN_WIDTH)}</Text>
            <Text dimColor>{action.description}</Text>
          </Box>
        ))}
        <Box marginTop={1}>
          <Text dimColor>↑/↓ 选择 · Enter 执行 · Esc 关闭</Text>
        </Box>
      </Box>
    </Dialog>
  );
}

export async function call(onDone: LocalJSXCommandOnDone, _context: unknown, args?: string): Promise<React.ReactNode> {
  const trimmed = args?.trim() ?? '';
  if (trimmed) {
    await runBreakCacheAction(trimmed, onDone);
    return null;
  }
  return <BreakCachePanel onDone={onDone} />;
}
