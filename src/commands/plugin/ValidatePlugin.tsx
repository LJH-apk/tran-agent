import figures from 'figures';
import * as React from 'react';
import { useEffect } from 'react';
import { Box, Text } from '@anthropic/ink';
import { errorMessage } from '../../utils/errors.js';
import { logError } from '../../utils/log.js';
import { validateManifest } from '../../utils/plugins/validatePlugin.js';

type Props = {
  onComplete: (result?: string) => void;
  path?: string;
};

export function ValidatePlugin({ onComplete, path }: Props): React.ReactNode {
  useEffect(() => {
    async function runValidation() {
      // If no path provided, show usage
      if (!path) {
        onComplete(
          '用法：/plugin validate <路径>\n\n' +
            '校验插件或插件市场的清单文件或目录。\n\n' +
            '示例：\n' +
            '  /plugin validate .claude-plugin/plugin.json\n' +
            '  /plugin validate /path/to/plugin-directory\n' +
            '  /plugin validate .\n\n' +
            '给定目录时，会自动校验 .claude-plugin/marketplace.json\n' +
            '或 .claude-plugin/plugin.json（两者都存在时优先 marketplace）。\n\n' +
            '或在命令行中执行：\n' +
            '  claude plugin validate <路径>',
        );
        return;
      }

      try {
        const result = await validateManifest(path);

        let output = '';

        // Add header
        output += `正在校验 ${result.fileType} 清单：${result.filePath}\n\n`;

        // Show errors
        if (result.errors.length > 0) {
          output += `${figures.cross} 发现 ${result.errors.length} 个错误：\n\n`;

          result.errors.forEach(error => {
            output += `  ${figures.pointer} ${error.path}: ${error.message}\n`;
          });

          output += '\n';
        }

        // Show warnings
        if (result.warnings.length > 0) {
          output += `${figures.warning} 发现 ${result.warnings.length} 个警告：\n\n`;

          result.warnings.forEach(warning => {
            output += `  ${figures.pointer} ${warning.path}: ${warning.message}\n`;
          });

          output += '\n';
        }

        // Show success or failure
        if (result.success) {
          if (result.warnings.length > 0) {
            output += `${figures.tick} 校验通过，但有警告\n`;
          } else {
            output += `${figures.tick} 校验通过\n`;
          }

          // Exit with code 0 (success)
          process.exitCode = 0;
        } else {
          output += `${figures.cross} 校验失败\n`;

          // Exit with code 1 (validation failure)
          process.exitCode = 1;
        }

        onComplete(output);
      } catch (error) {
        // Exit with code 2 (unexpected error)
        process.exitCode = 2;

        logError(error);

        onComplete(`${figures.cross} 校验过程中出现意外错误：${errorMessage(error)}`);
      }
    }

    void runValidation();
  }, [onComplete, path]);

  return (
    <Box flexDirection="column">
      <Text>正在执行校验…</Text>
    </Box>
  );
}
