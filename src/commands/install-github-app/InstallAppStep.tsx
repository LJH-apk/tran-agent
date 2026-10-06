import figures from 'figures';
import { GITHUB_ACTION_SETUP_DOCS_URL } from '../../constants/github-app.js';
import { Box, Text } from '@anthropic/ink';
import { useKeybinding } from '../../keybindings/useKeybinding.js';

interface InstallAppStepProps {
  repoUrl: string;
  onSubmit: () => void;
}

export function InstallAppStep({ repoUrl, onSubmit }: InstallAppStepProps) {
  // Enter to submit
  useKeybinding('confirm:yes', onSubmit, { context: 'Confirmation' });

  return (
    <Box flexDirection="column" borderStyle="round" borderDimColor paddingX={1}>
      <Box flexDirection="column" marginBottom={1}>
        <Text bold>安装 Tran Agent GitHub App</Text>
      </Box>
      <Box marginBottom={1}>
        <Text>正在打开浏览器以安装 Tran Agent GitHub App…</Text>
      </Box>
      <Box marginBottom={1}>
        <Text>如果浏览器没有自动打开，请访问：</Text>
      </Box>
      <Box marginBottom={1}>
        <Text underline>https://github.com/apps/claude</Text>
      </Box>
      <Box marginBottom={1}>
        <Text>
          请为以下仓库安装该 App：<Text bold>{repoUrl}</Text>
        </Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>重要：请务必授予对该特定仓库的访问权限</Text>
      </Box>
      <Box>
        <Text bold color="permission">
          Press Enter once you&apos;ve installed the app{figures.ellipsis}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          遇到问题？请查看手动设置说明： <Text color="claude">{GITHUB_ACTION_SETUP_DOCS_URL}</Text>
        </Text>
      </Box>
    </Box>
  );
}
