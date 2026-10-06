# 交通拥堵治理内置技能

用户提供的 `traffic-congestion-governance` 已并入 Tran Agent 的
`transportation` 内置技能，原名保留为兼容别名。
它包含拥堵机理诊断、策略选择、信号/周界/快速路/公交/需求管理、
仿真评价和文献证据资料。47 个参考文件随 CLI 打包，首次使用时
按现有 bundled skill 机制解压，供模型使用 Read/Grep 按需读取。

## 使用

```text
/transportation 诊断交叉口排队回溢，并比较治理方案
/transportation 设计区域周界控制的仿真评价方案
```

模型通过原生 Skill 意图匹配自动选择统一技能：教材提供基础理论，
治理资料提供方法和文献证据。技能调用后，治理指引位于
`governance/SKILL.md`，所有治理参考文件位于 `governance/references/`。
教材参考文件位于根目录的 `references/`，避免与治理资料混淆。

原始包中的 SKILL.md、INSTALL.md、agents/openai.yaml 和参考文件
均保存在 `src/skills/bundled/traffic-congestion-governance/`，保持原文。
INSTALL.md 是原包的手动安装说明，内置使用无需执行。
运行时解压治理指引和参考文件；技能正文按纯文本加载。CSV 也作为原始文本
随包携带，无需更改 Bun/Vite 的资源加载配置。

这些资料是提供者整理的文献笔记和元数据，不是论文全文；此次接入
未独立核验全部论文条目。精确数字、实验设置、公式和引用应回到
原论文核对，解压后的来源说明见 `governance/references/23_source_provenance.md`。

## 更新与验证

```bash
bun run scripts/import-congestion-skill.ts /path/to/skill.zip
bunx biome format --write scripts/import-congestion-skill.ts src/skills/bundled/trafficCongestionGovernanceContent.json src/skills/bundled/trafficCongestionGovernanceManifest.json
bun test src/skills/bundled/__tests__/trafficCongestionGovernance.test.ts
bun run typecheck
bun run build
```

导入器校验 ZIP 路径和技能名称，保留原始文本，生成参考文件映射及
SHA-256 清单。清单还记录原 ZIP 的 SHA-256，可追溯输入版本。
测试检查原文件/打包文本一致性、具体引用路径，以及编译后技能的
注册和离线解压。更新源文件后应重新导入并构建。
