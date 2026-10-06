import { getPluginErrorMessage, type PluginError } from '../../types/plugin.js';

export function formatErrorMessage(error: PluginError): string {
  switch (error.type) {
    case 'path-not-found':
      return `未找到 ${error.component} 路径：${error.path}`;
    case 'git-auth-failed':
      return `Git ${error.authType.toUpperCase()} 身份验证失败：${error.gitUrl}`;
    case 'git-timeout':
      return `Git ${error.operation} 超时：${error.gitUrl}`;
    case 'network-error':
      return `访问 ${error.url} 时发生网络错误${error.details ? `: ${error.details}` : ''}`;
    case 'manifest-parse-error':
      return `解析清单文件失败：${error.manifestPath}：${error.parseError}`;
    case 'manifest-validation-error':
      return `清单文件无效：${error.manifestPath}：${error.validationErrors.join(', ')}`;
    case 'plugin-not-found':
      return `在市场 "${error.pluginId}" 中未找到插件 "${error.marketplace}"`;
    case 'marketplace-not-found':
      return `未找到市场 "${error.marketplace}"`;
    case 'marketplace-load-failed':
      return `加载市场 "${error.marketplace}" 失败：${error.reason}`;
    case 'mcp-config-invalid':
      return `MCP 服务器 "${error.serverName}" 的配置无效：${error.validationError}`;
    case 'mcp-server-suppressed-duplicate': {
      const dup = error.duplicateOf.startsWith('plugin:')
        ? `由插件 "${error.duplicateOf.split(':')[1] ?? '?'}" 提供的服务器`
        : `已配置的 "${error.duplicateOf}"`;
      return `已跳过 MCP 服务器 "${error.serverName}" —— 与 ${dup} 的命令/URL 相同`;
    }
    case 'hook-load-failed':
      return `从 ${error.hookPath} 加载钩子失败：${error.reason}`;
    case 'component-load-failed':
      return `从 ${error.component} 加载 ${error.path} 失败：${error.reason}`;
    case 'mcpb-download-failed':
      return `从 ${error.url} 下载 MCPB 失败：${error.reason}`;
    case 'mcpb-extract-failed':
      return `解压 MCPB ${error.mcpbPath} 失败：${error.reason}`;
    case 'mcpb-invalid-manifest':
      return `MCPB 清单文件无效：${error.mcpbPath}：${error.validationError}`;
    case 'marketplace-blocked-by-policy':
      return error.blockedByBlocklist
        ? `市场 "${error.marketplace}" 已被企业策略屏蔽`
        : `市场 "${error.marketplace}" 不在允许的市场列表中`;
    case 'dependency-unsatisfied':
      return error.reason === 'not-enabled'
        ? `依赖 "${error.dependency}" 已被禁用`
        : `依赖 "${error.dependency}" 尚未安装`;
    case 'lsp-config-invalid':
      return `LSP 服务器 "${error.serverName}" 的配置无效：${error.validationError}`;
    case 'lsp-server-start-failed':
      return `LSP 服务器 "${error.serverName}" 启动失败：${error.reason}`;
    case 'lsp-server-crashed':
      return error.signal
        ? `LSP 服务器 "${error.serverName}" 崩溃，信号 ${error.signal}`
        : `LSP 服务器 "${error.serverName}" 崩溃，退出码 ${error.exitCode ?? 'unknown'}`;
    case 'lsp-request-timeout':
      return `LSP 服务器 "${error.serverName}" 的 ${error.method} 在 ${error.timeoutMs}ms 后超时`;
    case 'lsp-request-failed':
      return `LSP 服务器 "${error.serverName}" 的 ${error.method} 失败：${error.error}`;
    case 'plugin-cache-miss':
      return `插件 "${error.plugin}" 未缓存在 ${error.installPath}`;
    case 'generic-error':
      return error.error;
  }
  const _exhaustive: never = error;
  return getPluginErrorMessage(_exhaustive);
}

export function getErrorGuidance(error: PluginError): string | null {
  switch (error.type) {
    case 'path-not-found':
      return 'Check that the path in your manifest or marketplace config is correct';
    case 'git-auth-failed':
      return error.authType === 'ssh'
        ? '请配置 SSH 密钥，或改用 HTTPS URL'
        : '请配置凭据，或改用 SSH URL';
    case 'git-timeout':
    case 'network-error':
      return '请检查网络连接后重试';
    case 'manifest-parse-error':
      return '请检查插件目录中清单文件的语法';
    case 'manifest-validation-error':
      return '请检查清单文件是否符合所需的 schema';
    case 'plugin-not-found':
      return `插件可能不存在于市场 "${error.marketplace}" 中`;
    case 'marketplace-not-found':
      return error.availableMarketplaces.length > 0
        ? `可用市场：${error.availableMarketplaces.join(', ')}`
        : '请先用 /plugin marketplace add 添加该市场';
    case 'mcp-config-invalid':
      return '请检查 .mcp.json 或清单文件中的 MCP 服务器配置';
    case 'mcp-server-suppressed-duplicate': {
      // duplicateOf is "plugin:name:srv" when another plugin won dedup —
      // users can't remove plugin-provided servers from their MCP config,
      // so point them at the winning plugin instead.
      if (error.duplicateOf.startsWith('plugin:')) {
        const winningPlugin = error.duplicateOf.split(':')[1] ?? 'the other plugin';
        return `若想改用此插件的版本，请禁用插件 "${winningPlugin}"`;
      }
      return `若想改用该插件的版本，请从 MCP 配置中移除 "${error.duplicateOf}"`;
    }
    case 'hook-load-failed':
      return '请检查 hooks.json 文件的语法和结构';
    case 'component-load-failed':
      return `请检查 ${error.component} 的目录结构和文件权限`;
    case 'mcpb-download-failed':
      return '请检查网络连接以及 URL 是否可访问';
    case 'mcpb-extract-failed':
      return '请确认 MCPB 文件有效且未损坏';
    case 'mcpb-invalid-manifest':
      return '请联系插件作者反馈清单文件无效的问题';
    case 'marketplace-blocked-by-policy':
      if (error.blockedByBlocklist) {
        return '该市场来源已被管理员明确屏蔽';
      }
      return error.allowedSources.length > 0
        ? `允许的来源：${error.allowedSources.join(', ')}`
        : '请联系管理员配置允许的市场来源';
    case 'dependency-unsatisfied':
      return error.reason === 'not-enabled'
        ? `请启用 "${error.dependency}"，或卸载 "${error.plugin}"`
        : `请安装 "${error.dependency}"，或卸载 "${error.plugin}"`;
    case 'lsp-config-invalid':
      return '请检查插件清单文件中的 LSP 服务器配置';
    case 'lsp-server-start-failed':
    case 'lsp-server-crashed':
    case 'lsp-request-timeout':
    case 'lsp-request-failed':
      return '请用 --debug 查看 LSP 服务器日志以了解详情';
    case 'plugin-cache-miss':
      return '运行 /plugins 刷新插件缓存';
    case 'marketplace-load-failed':
    case 'generic-error':
      return null;
  }
  const _exhaustive: never = error;
  return null;
}
