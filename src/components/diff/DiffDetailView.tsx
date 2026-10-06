import type { StructuredPatchHunk } from 'diff';
import { resolve } from 'path';
import React, { useMemo } from 'react';
import { useTerminalSize } from '../../hooks/useTerminalSize.js';
import { Box, Text } from '@anthropic/ink';
import { getCwd } from '../../utils/cwd.js';
import { readFileSafe } from '../../utils/file.js';
import { Divider } from '@anthropic/ink';
import { StructuredDiff } from '../StructuredDiff.js';

type Props = {
  filePath: string;
  hunks: StructuredPatchHunk[];
  isLargeFile?: boolean;
  isBinary?: boolean;
  isTruncated?: boolean;
  isUntracked?: boolean;
};

/**
 * Displays the diff content for a single file.
 * Uses StructuredDiff for word-level diffing and syntax highlighting.
 * No scrolling - renders all lines (max 400 due to parsing limits).
 */
export function DiffDetailView({
  filePath,
  hunks,
  isLargeFile,
  isBinary,
  isTruncated,
  isUntracked,
}: Props): React.ReactNode {
  const { columns } = useTerminalSize();

  // Read file content for syntax detection and multiline construct handling.
  // Only computed when this component is rendered (detail view mode).
  const { firstLine, fileContent } = useMemo(() => {
    if (!filePath) {
      return { firstLine: null, fileContent: undefined };
    }
    const fullPath = resolve(getCwd(), filePath);
    const content = readFileSafe(fullPath);
    return {
      firstLine: content?.split('\n')[0] ?? null,
      fileContent: content ?? undefined,
    };
  }, [filePath]);

  // Handle untracked files
  if (isUntracked) {
    return (
      <Box flexDirection="column" width="100%">
        <Box>
          <Text bold>{filePath}</Text>
          <Text dimColor> （未跟踪）</Text>
        </Box>
        <Divider padding={4} />
        <Box flexDirection="column">
          <Text dimColor italic>
            新文件尚未暂存。
          </Text>
          <Text dimColor italic>
            Run `git add {filePath}` to see line counts.
          </Text>
        </Box>
      </Box>
    );
  }

  // Handle binary files
  if (isBinary) {
    return (
      <Box flexDirection="column" width="100%">
        <Box>
          <Text bold>{filePath}</Text>
        </Box>
        <Divider padding={4} />
        <Box flexDirection="column">
          <Text dimColor italic>
            二进制文件 —— 无法显示差异
          </Text>
        </Box>
      </Box>
    );
  }

  // Handle large files
  if (isLargeFile) {
    return (
      <Box flexDirection="column" width="100%">
        <Box>
          <Text bold>{filePath}</Text>
        </Box>
        <Divider padding={4} />
        <Box flexDirection="column">
          <Text dimColor italic>
            大文件 —— 差异超过 1 MB 限制
          </Text>
        </Box>
      </Box>
    );
  }

  const outerPaddingX = 1;
  const outerBorderWidth = 1;

  return (
    <Box flexDirection="column" width="100%">
      <Box>
        <Text bold>{filePath}</Text>
        {isTruncated && <Text dimColor> （已截断）</Text>}
      </Box>

      <Divider padding={4} />
      <Box flexDirection="column">
        {hunks.length === 0 ? (
          <Text dimColor>没有差异内容</Text>
        ) : (
          hunks.map((hunk, index) => (
            <StructuredDiff
              key={index}
              patch={hunk}
              filePath={filePath}
              firstLine={firstLine}
              fileContent={fileContent}
              dim={false}
              width={columns - 2 * outerPaddingX - 2 * outerBorderWidth}
            />
          ))
        )}
      </Box>

      {isTruncated && (
        <Text dimColor italic>
          … 差异已截断（超过 400 行限制）
        </Text>
      )}
    </Box>
  );
}
