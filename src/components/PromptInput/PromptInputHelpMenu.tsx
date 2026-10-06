import { feature } from 'bun:bundle';
import * as React from 'react';
import { Box, Text } from '@anthropic/ink';
import { getPlatform } from 'src/utils/platform.js';
import { isKeybindingCustomizationEnabled } from '../../keybindings/loadUserBindings.js';
import { useShortcutDisplay } from '../../keybindings/useShortcutDisplay.js';
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js';
import { isFastModeAvailable, isFastModeEnabled } from '../../utils/fastMode.js';
import { getNewlineInstructions } from './utils.js';

/** Format a shortcut for display in the help menu (e.g., "ctrl+o" → "ctrl + o") */
function formatShortcut(shortcut: string): string {
  return shortcut.replace(/\+/g, ' + ');
}

type Props = {
  dimColor?: boolean;
  fixedWidth?: boolean;
  gap?: number;
  paddingX?: number;
};

export function PromptInputHelpMenu(props: Props): React.ReactNode {
  const { dimColor, fixedWidth, gap, paddingX } = props;

  // Get configured shortcuts from keybinding system
  const transcriptShortcut = formatShortcut(useShortcutDisplay('app:toggleTranscript', 'Global', 'ctrl+o'));
  const todosShortcut = formatShortcut(useShortcutDisplay('app:toggleTodos', 'Global', 'ctrl+t'));
  const undoShortcut = formatShortcut(useShortcutDisplay('chat:undo', 'Chat', 'ctrl+_'));
  const stashShortcut = formatShortcut(useShortcutDisplay('chat:stash', 'Chat', 'ctrl+s'));
  const cycleModeShortcut = formatShortcut(useShortcutDisplay('chat:cycleMode', 'Chat', 'shift+tab'));
  const modelPickerShortcut = formatShortcut(useShortcutDisplay('chat:modelPicker', 'Chat', 'alt+p'));
  const fastModeShortcut = formatShortcut(useShortcutDisplay('chat:fastMode', 'Chat', 'alt+o'));
  const externalEditorShortcut = formatShortcut(useShortcutDisplay('chat:externalEditor', 'Chat', 'ctrl+g'));
  const terminalShortcut = formatShortcut(useShortcutDisplay('app:toggleTerminal', 'Global', 'meta+j'));
  const imagePasteShortcut = formatShortcut(useShortcutDisplay('chat:imagePaste', 'Chat', 'ctrl+v'));

  // Compute terminal shortcut element outside JSX to satisfy feature() constraint
  const terminalShortcutElement = feature('TERMINAL_PANEL') ? (
    getFeatureValue_CACHED_MAY_BE_STALE('tengu_terminal_panel', false) ? (
      <Box>
        <Text dimColor={dimColor}>{terminalShortcut} for terminal</Text>
      </Box>
    ) : null
  ) : null;

  return (
    <Box paddingX={paddingX} flexDirection="row" gap={gap}>
      <Box flexDirection="column" width={fixedWidth ? 24 : undefined}>
        <Box>
          <Text dimColor={dimColor}>! 进入 bash 模式</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>/ 查看命令</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>@ 引用文件路径</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>& 后台运行</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>/btw 追问一句</Text>
        </Box>
      </Box>
      <Box flexDirection="column" width={fixedWidth ? 35 : undefined}>
        <Box>
          <Text dimColor={dimColor}>连按两次 esc 清空输入</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>
            {cycleModeShortcut} {process.env.USER_TYPE === 'ant' ? 'to cycle modes' : '自动接受编辑'}
          </Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>{transcriptShortcut} for verbose output</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>{todosShortcut} to toggle tasks</Text>
        </Box>
        {terminalShortcutElement}
        <Box>
          <Text dimColor={dimColor}>{getNewlineInstructions()}</Text>
        </Box>
      </Box>
      <Box flexDirection="column">
        <Box>
          <Text dimColor={dimColor}>{undoShortcut} to undo</Text>
        </Box>
        {getPlatform() !== 'windows' && (
          <Box>
            <Text dimColor={dimColor}>ctrl + z 挂起</Text>
          </Box>
        )}
        <Box>
          <Text dimColor={dimColor}>{imagePasteShortcut} to paste images</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>{modelPickerShortcut} to switch model</Text>
        </Box>
        {isFastModeEnabled() && isFastModeAvailable() && (
          <Box>
            <Text dimColor={dimColor}>{fastModeShortcut} to toggle fast mode</Text>
          </Box>
        )}
        <Box>
          <Text dimColor={dimColor}>{stashShortcut} to stash prompt</Text>
        </Box>
        <Box>
          <Text dimColor={dimColor}>{externalEditorShortcut} to edit in $EDITOR</Text>
        </Box>
        {isKeybindingCustomizationEnabled() && (
          <Box>
            <Text dimColor={dimColor}>/keybindings 自定义快捷键</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
