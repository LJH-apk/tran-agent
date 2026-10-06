import React, { useCallback } from 'react';
import { logEvent } from 'src/services/analytics/index.js';
import { Box, Link, Newline, Text } from '@anthropic/ink';
import { gracefulShutdownSync } from '../utils/gracefulShutdown.js';
import { updateSettingsForSource } from '../utils/settings/settings.js';
import { Select } from './CustomSelect/index.js';
import { Dialog } from '@anthropic/ink';

type Props = {
  onAccept(): void;
};

export function BypassPermissionsModeDialog({ onAccept }: Props): React.ReactNode {
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

  React.useEffect(() => {
    logEvent('tengu_bypass_permissions_mode_dialog_shown', {});
  }, []);

  function onChange(value: 'accept' | 'decline') {
    switch (value) {
      case 'accept': {
        logEvent('tengu_bypass_permissions_mode_dialog_accept', {});

        updateSettingsForSource('userSettings', {
          skipDangerousModePermissionPrompt: true,
        });
        onAccept();
        break;
      }
      case 'decline': {
        setPendingExitCode(1);
        break;
      }
    }
  }

  const handleEscape = useCallback(() => {
    setPendingExitCode(0);
  }, []);

  if (pendingExitCode !== null) {
    return null;
  }

  return (
    <Dialog title="警告：Tran Agent 正在以「绕过权限」模式运行" color="error" onCancel={handleEscape}>
      <Box flexDirection="column" gap={1}>
        <Text>
          在绕过权限模式下，Tran Agent 执行有潜在危险的命令前不会再征求你的同意。
          <Newline />
          该模式只应在沙箱容器或虚拟机中使用，且需限制外网访问、损坏后能快速恢复。
        </Text>
        <Text>
          继续即表示你接受在绕过权限模式下运行的所有操作责任。
        </Text>

        <Link url="https://code.claude.com/docs/en/security" />
      </Box>

      <Select
        options={[
          { label: '否，退出', value: 'decline' },
          { label: '是，我接受', value: 'accept' },
        ]}
        onChange={value => onChange(value as 'accept' | 'decline')}
      />
    </Dialog>
  );
}
