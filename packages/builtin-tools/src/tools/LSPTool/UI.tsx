import type { ToolResultBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import React from 'react';
import { CtrlOToExpand } from 'src/components/CtrlOToExpand.js';
import { FallbackToolUseErrorMessage } from 'src/components/FallbackToolUseErrorMessage.js';
import { MessageResponse } from 'src/components/MessageResponse.js';
import { Box, Text } from '@anthropic/ink';
import { getDisplayPath } from 'src/utils/file.js';
import { extractTag } from 'src/utils/messages.js';
import type { Input, Output } from './LSPTool.js';
import { getSymbolAtPosition } from './symbolContext.js';

// Lookup map for operation-specific labels
const OPERATION_LABELS: Record<Input['operation'], { singular: string; plural: string; special?: string }> = {
  goToDefinition: { singular: '处定义', plural: '处定义' },
  findReferences: { singular: '处引用', plural: '处引用' },
  documentSymbol: { singular: '个符号', plural: '个符号' },
  workspaceSymbol: { singular: '个符号', plural: '个符号' },
  hover: { singular: '悬停信息', plural: '悬停信息', special: '已获取' },
  goToImplementation: { singular: '处实现', plural: '处实现' },
  prepareCallHierarchy: { singular: '调用项', plural: '调用项' },
  incomingCalls: { singular: '个调用者', plural: '个调用者' },
  outgoingCalls: { singular: '个被调用者', plural: '个被调用者' },
};

/**
 * Reusable component for LSP result summaries with collapsed/expanded views
 */
function LSPResultSummary({
  operation,
  resultCount,
  fileCount,
  content,
  verbose,
}: {
  operation: Input['operation'];
  resultCount: number;
  fileCount: number;
  content: string;
  verbose: boolean;
}): React.ReactNode {
  // Get label configuration for this operation
  const labelConfig = OPERATION_LABELS[operation] || {
    singular: '项结果',
    plural: '项结果',
  };
  const countLabel = resultCount === 1 ? labelConfig.singular : labelConfig.plural;

  const primaryText =
    operation === 'hover' && resultCount > 0 && labelConfig.special ? (
      <Text>悬停信息 {labelConfig.special}</Text>
    ) : (
      <Text>
        找到 <Text bold>{resultCount} </Text>
        {countLabel}
      </Text>
    );

  const secondaryText =
    fileCount > 1 ? (
      <Text>
        {' '}
        ，涉及 <Text bold>{fileCount} </Text>
        个文件
      </Text>
    ) : null;

  if (verbose) {
    return (
      <Box flexDirection="column">
        <Box flexDirection="row">
          <Text>
            <Text dimColor>&nbsp;&nbsp;⎿ &nbsp;</Text>
            {primaryText}
            {secondaryText}
          </Text>
        </Box>
        <Box marginLeft={5}>
          <Text>{content}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <MessageResponse height={1}>
      <Text>
        {primaryText}
        {secondaryText} {resultCount > 0 && <CtrlOToExpand />}
      </Text>
    </MessageResponse>
  );
}

export function userFacingName(): string {
  return 'LSP';
}

export function renderToolUseMessage(input: Partial<Input>, { verbose }: { verbose: boolean }): React.ReactNode {
  if (!input.operation) {
    return null;
  }

  const parts: string[] = [];

  // For position-based operations (goToDefinition, findReferences, hover, goToImplementation),
  // show the symbol at the position for better context
  if (
    (input.operation === 'goToDefinition' ||
      input.operation === 'findReferences' ||
      input.operation === 'hover' ||
      input.operation === 'goToImplementation') &&
    input.filePath &&
    input.line !== undefined &&
    input.character !== undefined
  ) {
    // Convert from 1-based (user input) to 0-based (internal file reading)
    const symbol = getSymbolAtPosition(input.filePath, input.line - 1, input.character - 1);
    const displayPath = verbose ? input.filePath : getDisplayPath(input.filePath);

    if (symbol) {
      parts.push(`operation: "${input.operation}"`);
      parts.push(`symbol: "${symbol}"`);
      parts.push(`in: "${displayPath}"`);
    } else {
      parts.push(`operation: "${input.operation}"`);
      parts.push(`file: "${displayPath}"`);
      parts.push(`position: ${input.line}:${input.character}`);
    }

    return parts.join(', ');
  }

  // For other operations (documentSymbol, workspaceSymbol),
  // show operation and file without position details
  parts.push(`operation: "${input.operation}"`);

  if (input.filePath) {
    const displayPath = verbose ? input.filePath : getDisplayPath(input.filePath);
    parts.push(`file: "${displayPath}"`);
  }

  return parts.join(', ');
}

export function renderToolUseErrorMessage(
  result: ToolResultBlockParam['content'],
  { verbose }: { verbose: boolean },
): React.ReactNode {
  if (!verbose && typeof result === 'string' && extractTag(result, 'tool_use_error')) {
    return (
      <MessageResponse>
        <Text color="error">LSP 操作失败</Text>
      </MessageResponse>
    );
  }
  return <FallbackToolUseErrorMessage result={result} verbose={verbose} />;
}

export function renderToolResultMessage(
  output: Output,
  _progressMessages: unknown[],
  { verbose }: { verbose: boolean },
): React.ReactNode {
  // Use collapsed/expanded view if we have count information
  if (output.resultCount !== undefined && output.fileCount !== undefined) {
    return (
      <LSPResultSummary
        operation={output.operation}
        resultCount={output.resultCount}
        fileCount={output.fileCount}
        content={output.result}
        verbose={verbose}
      />
    );
  }

  // Fallback for error cases where counts aren't available
  // (e.g., LSP server initialization failures, request errors)
  return (
    <MessageResponse>
      <Text>{output.result}</Text>
    </MessageResponse>
  );
}
