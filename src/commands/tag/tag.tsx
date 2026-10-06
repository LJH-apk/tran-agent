import chalk from 'chalk';
import type { UUID } from 'crypto';
import * as React from 'react';
import { getSessionId } from '../../bootstrap/state.js';
import type { CommandResultDisplay } from '../../commands.js';
import { Select } from '../../components/CustomSelect/select.js';
import { Dialog } from '@anthropic/ink';
import { COMMON_HELP_ARGS, COMMON_INFO_ARGS } from '../../constants/xml.js';
import { Box, Text } from '@anthropic/ink';
import { logEvent } from '../../services/analytics/index.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { recursivelySanitizeUnicode } from '../../utils/sanitization.js';
import { getCurrentSessionTag, getTranscriptPath, saveTag } from '../../utils/sessionStorage.js';

function ConfirmRemoveTag({
  tagName,
  onConfirm,
  onCancel,
}: {
  tagName: string;
  onConfirm: () => void;
  onCancel: () => void;
}): React.ReactNode {
  return (
    <Dialog title="移除标签？" subtitle={`当前标签：#${tagName}`} onCancel={onCancel} color="warning">
      <Box flexDirection="column" gap={1}>
        <Text>这将从当前会话中移除该标签。</Text>
        <Select<'yes' | 'no'>
          onChange={value => (value === 'yes' ? onConfirm() : onCancel())}
          options={[
            { label: '是，移除标签', value: 'yes' },
            { label: '否，保留标签', value: 'no' },
          ]}
        />
      </Box>
    </Dialog>
  );
}

function ToggleTagAndClose({
  tagName,
  onDone,
}: {
  tagName: string;
  onDone: (result?: string, options?: { display?: CommandResultDisplay }) => void;
}): React.ReactNode {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<UUID | null>(null);
  // Sanitize unicode to prevent hidden character attacks and normalize
  const normalizedTag = recursivelySanitizeUnicode(tagName).trim();

  React.useEffect(() => {
    const id = getSessionId() as UUID;

    if (!id) {
      onDone('没有可打标签的活动会话', { display: 'system' });
      return;
    }

    if (!normalizedTag) {
      onDone('标签名不能为空', { display: 'system' });
      return;
    }

    setSessionId(id);
    const currentTag = getCurrentSessionTag(id);

    // If same tag exists, show confirmation dialog
    if (currentTag === normalizedTag) {
      logEvent('tengu_tag_command_remove_prompt', {});
      setShowConfirm(true);
    } else {
      // Add the new tag directly
      const isReplacing = !!currentTag;
      logEvent('tengu_tag_command_add', { is_replacing: isReplacing });
      void (async () => {
        const fullPath = getTranscriptPath();
        await saveTag(id, normalizedTag, fullPath);
        onDone(`Tagged session with ${chalk.cyan(`#${normalizedTag}`)}`, {
          display: 'system',
        });
      })();
    }
  }, [normalizedTag, onDone]);

  if (showConfirm && sessionId) {
    return (
      <ConfirmRemoveTag
        tagName={normalizedTag}
        onConfirm={async () => {
          logEvent('tengu_tag_command_remove_confirmed', {});
          const fullPath = getTranscriptPath();
          await saveTag(sessionId, '', fullPath);
          onDone(`Removed tag ${chalk.cyan(`#${normalizedTag}`)}`, {
            display: 'system',
          });
        }}
        onCancel={() => {
          logEvent('tengu_tag_command_remove_cancelled', {});
          onDone(`Kept tag ${chalk.cyan(`#${normalizedTag}`)}`, {
            display: 'system',
          });
        }}
      />
    );
  }

  return null;
}

function ShowHelp({
  onDone,
}: {
  onDone: (result?: string, options?: { display?: CommandResultDisplay }) => void;
}): React.ReactNode {
  React.useEffect(() => {
    onDone(
      `用法：/tag <标签名>

在当前会话上切换一个可搜索的标签。
再次运行同一命令即可移除该标签。
标签会显示在 /resume 中的分支名之后，并可用 / 搜索。

Examples:
  /tag bugfix        # Add tag
  /tag bugfix        # Remove tag (toggle)
  /tag feature-auth
  /tag wip`,
      { display: 'system' },
    );
  }, [onDone]);

  return null;
}

export async function call(onDone: LocalJSXCommandOnDone, _context: unknown, args?: string): Promise<React.ReactNode> {
  args = args?.trim() || '';

  if (COMMON_INFO_ARGS.includes(args) || COMMON_HELP_ARGS.includes(args)) {
    return <ShowHelp onDone={onDone} />;
  }

  if (!args) {
    return <ShowHelp onDone={onDone} />;
  }

  return <ToggleTagAndClose tagName={args} onDone={onDone} />;
}
