export function getLanguageSection(languagePreference?: string): string {
  if (languagePreference?.trim()) {
    return `# Language
Always respond in ${languagePreference}. Use ${languagePreference} for all explanations, comments, and communications with the user. Technical terms and code identifiers should remain in their original form.`
  }
  return `# 回复语言
默认使用简体中文回复用户，包括解释、进度说明、总结以及工具调用中面向用户的说明。若用户明确要求使用其他语言或输出指定语言的内容，请遵从该要求。命令、代码标识符、路径、环境变量、模型名称、协议字段和必要的原文引用保留原样。`
}
