import React from 'react';
import { Text, Dialog } from '@anthropic/ink';
import { saveGlobalConfig } from '../utils/config.js';
import { Select } from './CustomSelect/index.js';

type Props = {
  customApiKeyTruncated: string;
  onDone(approved: boolean): void;
};

export function ApproveApiKey({ customApiKeyTruncated, onDone }: Props): React.ReactNode {
  function onChange(value: 'yes' | 'no') {
    switch (value) {
      case 'yes': {
        saveGlobalConfig(current => ({
          ...current,
          customApiKeyResponses: {
            ...current.customApiKeyResponses,
            approved: [...(current.customApiKeyResponses?.approved ?? []), customApiKeyTruncated],
          },
        }));
        onDone(true);
        break;
      }
      case 'no': {
        saveGlobalConfig(current => ({
          ...current,
          customApiKeyResponses: {
            ...current.customApiKeyResponses,
            rejected: [...(current.customApiKeyResponses?.rejected ?? []), customApiKeyTruncated],
          },
        }));
        onDone(false);
        break;
      }
    }
  }

  return (
    <Dialog title="在你的环境中检测到自定义 API 密钥" color="warning" onCancel={() => onChange('no')}>
      <Text>
        <Text bold>ANTHROPIC_API_KEY</Text>
        <Text>: sk-ant-...{customApiKeyTruncated}</Text>
      </Text>
      <Text>是否要使用这个 API 密钥？</Text>
      <Select
        defaultValue="no"
        defaultFocusValue="no"
        options={[
          { label: '是', value: 'yes' },
          {
            label: (
              <Text>
                No (<Text bold>recommended</Text>)
              </Text>
            ),
            value: 'no',
          },
        ]}
        onChange={value => onChange(value as 'yes' | 'no')}
        onCancel={() => onChange('no')}
      />
    </Dialog>
  );
}
