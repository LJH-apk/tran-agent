import { relative } from 'path';
import * as React from 'react';
import { getCwd } from 'src/utils/cwd.js';
import { Box, Text } from '@anthropic/ink';
import { HighlightedCode } from './HighlightedCode.js';
import { MessageResponse } from './MessageResponse.js';

type Props = {
  notebook_path: string;
  cell_id: string | undefined;
  new_source: string;
  cell_type?: 'code' | 'markdown';
  edit_mode?: 'replace' | 'insert' | 'delete';
  verbose: boolean;
};

export function NotebookEditToolUseRejectedMessage({
  notebook_path,
  cell_id,
  new_source,
  cell_type,
  edit_mode = 'replace',
  verbose,
}: Props): React.ReactNode {
  const operation = edit_mode === 'delete' ? 'delete' : `在 ${edit_mode} 单元格中`;

  return (
    <MessageResponse>
      <Box flexDirection="column">
        <Box flexDirection="row">
          <Text color="subtle">User rejected {operation} </Text>
          <Text bold color="subtle">
            {verbose ? notebook_path : relative(getCwd(), notebook_path)}
          </Text>
          <Text color="subtle"> at cell {cell_id}</Text>
        </Box>
        {edit_mode !== 'delete' && (
          <Box marginTop={1} flexDirection="column">
            <HighlightedCode code={new_source} filePath={cell_type === 'markdown' ? 'file.md' : 'file.py'} dim />
          </Box>
        )}
      </Box>
    </MessageResponse>
  );
}
