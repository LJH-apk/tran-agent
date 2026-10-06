# Tran Agent 交通工程内置知识库

Tran Agent 随 CLI 打包 David Levinson 等人的开放教材
《Fundamentals of Transportation》的 LibreTexts 英文版本。
同时整合 `traffic-congestion-governance` 的 47 个参考文件。
无需下载或配置向量数据库；教材及治理资料正文可离线检索，教材图片保留在线来源链接。

## 使用

```text
/transportation 解释交通流基本图，并说明如何用于仿真
/transportation 用教材中的排队模型计算交叉口延误
/transportation 比较用户均衡与系统最优
/transportation 分析交叉口排队回溢，并给出治理策略和评价指标
```

技能默认可由模型自动选择。交通类问题出现时，技能描述会引导模型
调用 `transportation`，然后查阅中英文主题索引并读取相关章节。
显式使用 `/transportation` 可确保进入统一知识库检索流程。
旧名称 `/traffic-congestion-governance` 保留为兼容别名，不再单独注册技能。

意图加载复用原生 Skill 机制：技能的 description 和 whenToUse 明确描述
交通工程讨论、分析、解释、计算、研究等意图，由模型根据用户请求选择。
没有额外分类器或额外模型请求，也无需开启实验性 skill-search。
日常通勤建议及软件/网络流量问题本身不属于该技能的适用范围。

教材沿用项目现有的 bundled skill 机制：源码以 Markdown 保存，
通过静态导入编译进 Bun/Vite 产物，首次调用技能时解压至受权限保护的
临时目录，模型使用 Read/Grep 按需查阅。技能指引和按需读取的资料进入上下文，
不把整本书加入每轮系统提示词。模型自动选择并不保证每次交通问题都调用；
也没有对模型权重进行训练。

## 两套资料的路由

- 基础理论与教材公式：`INDEX.md` 和 `references/`。
- 拥堵诊断、治理策略、仿真评价和文献：`governance/SKILL.md` 及
  `governance/references/00_knowledge_map.md`，再读取相关治理资料。

上述路径指技能调用后解压的目录。两套参考文件隔离，避免路径覆盖。
治理资料中的 `references/` 应相对于 `governance/` 解析。
教材引用和文献笔记需区分来源；治理原始文献条目未因合并而独立核验。

## 内容与许可

覆盖 LibreTexts 的交通规划、建模方法、公交、交通流与排队、
交通控制、道路几何设计章节，以及许可明确的前后置页面。
该版本的一些小节是短提纲；知识库保留原状，不补写为教材原文。
网站脚本生成的目录页由本地索引替代，具体见 manifest 的 omittedPages。

- 索引：`src/skills/bundled/transportation/INDEX.md`
- 正文：`src/skills/bundled/transportation/references/*.md`
- 快照记录：`references/manifest.json`（原网页/转换后文件 SHA-256、时间、长度）
- 署名及许可：`src/skills/bundled/transportation/ATTRIBUTION.md`
- 来源：<https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation>
- 教材及其改编：CC BY-SA 4.0。图片可能有独立许可。

每个正文文件记录原始 URL、作者署名、许可及转换说明。回答应引用
具体章节和原始页面，区分教材内容与模型推导。实际工程需核对现行当地规范。

## 更新

```bash
bun run scripts/import-transportation-book.ts
bunx biome format --write src/skills/bundled/transportationContent.ts
bun test src/skills/bundled/__tests__/transportation.test.ts
bun run typecheck
bun run build
```

导入器递归读取章节目录，逐页验证 CC BY-SA 4.0 标签，
转换表格并保留 TeX 公式，生成索引、校验清单和静态导入映射。
若页面结构或许可发生变化，脚本停止，不应略过验证强行入库。
导入更新后，重新构建 CLI 才会更新已安装产物。网络中断导致导入不完整时，
修复网络后重新运行并通过校验再构建。
