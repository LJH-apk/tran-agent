import { basename, sep } from 'path';
import { type ReactNode } from 'react';
import { getOriginalCwd } from '../../bootstrap/state.js';
import { Text } from '@anthropic/ink';
import type { PermissionUpdate } from '../../utils/permissions/PermissionUpdateSchema.js';
import { permissionRuleExtractPrefix } from '../../utils/permissions/shellRuleMatching.js';

function commandListDisplay(commands: string[]): ReactNode {
  switch (commands.length) {
    case 0:
      return '';
    case 1:
      return <Text bold>{commands[0]}</Text>;
    case 2:
      return (
        <Text>
          <Text bold>{commands[0]}</Text> 和 <Text bold>{commands[1]}</Text>
        </Text>
      );
    default:
      return (
        <Text>
          <Text bold>{commands.slice(0, -1).join(', ')}</Text>、以及 <Text bold>{commands.slice(-1)[0]}</Text>
        </Text>
      );
  }
}

function commandListDisplayTruncated(commands: string[]): ReactNode {
  // Check if the plain text representation would be too long
  const plainText = commands.join(', ');
  if (plainText.length > 50) {
    return '类似命令';
  }
  return commandListDisplay(commands);
}

function formatPathList(paths: string[]): ReactNode {
  if (paths.length === 0) return '';

  // Extract directory names from paths
  const names = paths.map(p => basename(p) || p);

  if (names.length === 1) {
    return (
      <Text>
        <Text bold>{names[0]}</Text>
        {sep}
      </Text>
    );
  }
  if (names.length === 2) {
    return (
      <Text>
        <Text bold>{names[0]}</Text>
        {sep} 和 <Text bold>{names[1]}</Text>
        {sep}
      </Text>
    );
  }

  // For 3+, show first two with "and N more"
  return (
    <Text>
      <Text bold>{names[0]}</Text>
      {sep}, <Text bold>{names[1]}</Text>
      {sep} 和 {paths.length - 2} 更多
    </Text>
  );
}

/**
 * Generate the label for the "Yes, and apply suggestions" option in shell
 * permission dialogs (Bash, PowerShell). Parametrized by the shell tool name
 * and an optional command transform (e.g., Bash strips output redirections so
 * filenames don't show as commands).
 */
export function generateShellSuggestionsLabel(
  suggestions: PermissionUpdate[],
  shellToolName: string,
  commandTransform?: (command: string) => string,
): ReactNode | null {
  // Collect all rules for display
  const allRules = suggestions.filter(s => s.type === 'addRules').flatMap(s => s.rules || []);

  // Separate Read rules from shell rules
  const readRules = allRules.filter(r => r.toolName === 'Read');
  const shellRules = allRules.filter(r => r.toolName === shellToolName);

  // Get directory info
  const directories = suggestions.filter(s => s.type === 'addDirectories').flatMap(s => s.directories || []);

  // Extract paths from Read rules (keep separate from directories)
  const readPaths = readRules.map(r => r.ruleContent?.replace('/**', '') || '').filter(p => p);

  // Extract shell command prefixes, optionally transforming for display
  const shellCommands = [
    ...new Set(
      shellRules.flatMap(rule => {
        if (!rule.ruleContent) return [];
        const command = permissionRuleExtractPrefix(rule.ruleContent) ?? rule.ruleContent;
        return commandTransform ? commandTransform(command) : command;
      }),
    ),
  ];

  // Check what we have
  const hasDirectories = directories.length > 0;
  const hasReadPaths = readPaths.length > 0;
  const hasCommands = shellCommands.length > 0;

  // Handle single type cases
  if (hasReadPaths && !hasDirectories && !hasCommands) {
    // Only Read rules - use "reading from" language
    if (readPaths.length === 1) {
      const firstPath = readPaths[0]!;
      const dirName = basename(firstPath) || firstPath;
      return (
        <Text>
          是，允许读取 <Text bold>{dirName}</Text>
          {sep} （本项目内）
        </Text>
      );
    }

    // Multiple read paths
    return <Text>是，允许本项目内读取 {formatPathList(readPaths)}</Text>;
  }

  if (hasDirectories && !hasReadPaths && !hasCommands) {
    // Only directory permissions - use "access to" language
    if (directories.length === 1) {
      const firstDir = directories[0]!;
      const dirName = basename(firstDir) || firstDir;
      return (
        <Text>
          是，并始终允许访问 <Text bold>{dirName}</Text>
          {sep} （本项目内）
        </Text>
      );
    }

    // Multiple directories
    return <Text>是，并始终允许本项目内访问 {formatPathList(directories)}</Text>;
  }

  if (hasCommands && !hasDirectories && !hasReadPaths) {
    // Only shell command permissions
    return (
      <Text>
        {"是，且不再询问以下内容 "}
        {commandListDisplayTruncated(shellCommands)} 命令，位于 <Text bold>{getOriginalCwd()}</Text>
      </Text>
    );
  }

  // Handle mixed cases
  if ((hasDirectories || hasReadPaths) && !hasCommands) {
    // Combine directories and read paths since they're both path access
    const allPaths = [...directories, ...readPaths];
    if (hasDirectories && hasReadPaths) {
      // Mixed - use generic "access to"
      return <Text>是，并始终允许本项目内访问 {formatPathList(allPaths)}</Text>;
    }
  }

  if ((hasDirectories || hasReadPaths) && hasCommands) {
    // Build descriptive message for both types
    const allPaths = [...directories, ...readPaths];

    // Keep it concise but informative
    if (allPaths.length === 1 && shellCommands.length === 1) {
      return (
        <Text>
          是，并允许访问 {formatPathList(allPaths)}，以及执行 {commandListDisplayTruncated(shellCommands)} 命令
        </Text>
      );
    }

    return (
      <Text>
        是，并允许访问 {formatPathList(allPaths)}，以及执行 {commandListDisplayTruncated(shellCommands)} 命令
      </Text>
    );
  }

  return null;
}
