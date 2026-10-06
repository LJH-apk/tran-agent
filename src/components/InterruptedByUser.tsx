import * as React from 'react';
import { Text } from '@anthropic/ink';

export function InterruptedByUser(): React.ReactNode {
  return (
    <>
      <Text dimColor>已中断 </Text>
      {process.env.USER_TYPE === 'ant' ? (
        <Text dimColor>· [仅 ANTHROPIC 内部] 用 /issue 反馈模型问题</Text>
      ) : (
        <Text dimColor>· 你希望 Tran Agent 改怎么做？</Text>
      )}
    </>
  );
}
