# 综合治理、网络设计与协同控制：核心论文证据库

> 本文件仅提供题录、摘要级重述和治理解读，不复制论文正文。需要精确算法、参数、实验数值时必须回到原文核验。

## 阅读规则

- 先看“治理启示”和“误用警告”，再决定是否需要读原文。
- 顶刊/高引不等于在你的城市、路网和需求下必然有效。
- 实地研究 > 校准良好的仿真 > 单一理想化算例，证据等级必须在推荐中体现。

## I01 · An Integrated Control Approach for Traffic Corridors

- **作者 / 年份**：M. Papageorgiou (1995)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/0968-090X(94)00012-T
- **影响力定位**：Classic integrated-corridor control paper.
- **研究问题**：Coordinating signals, ramp metering, route guidance, and other controls under one objective.
- **治理启示**：Optimize corridor controls jointly around total delay/time spent; isolated controllers can fight each other.
- **适用场景**：Use for integrated corridor management and multi-tool Agents.
- **误用警告**：Joint optimization increases model and operational complexity; define fallback modes.
- **原始链接**：https://doi.org/10.1016/0968-090X(94)00012-T

## I02 · A Review of Urban Transportation Network Design Problems

- **作者 / 年份**：R. Z. Farahani, E. Miandoabchi, W. Y. Szeto, H. Rashidi (2013)
- **期刊 / 会议**：European Journal of Operational Research
- **DOI / 来源**：10.1016/j.ejor.2013.01.001
- **影响力定位**：Highly cited invited review; EJOR.
- **研究问题**：How road and public-transport network design problems are formulated and solved.
- **治理启示**：Network design is inherently bilevel/multilevel: infrastructure decisions change route/mode choices; evaluate equilibrium response and multiple objectives.
- **适用场景**：Use for long-term governance and network redesign.
- **误用警告**：Design-optimal solutions can be politically or operationally infeasible; add implementability constraints.
- **原始链接**：https://doi.org/10.1016/j.ejor.2013.01.001

## I03 · An Integrated Real-Time Traffic Signal System for Transit Signal Priority, Incident Detection and Congestion Management

- **作者 / 年份**：F. Ahmed, Y. E. Hawas (2015)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2015.08.004
- **影响力定位**：Representative integrated urban-control paper.
- **研究问题**：Handling recurrent congestion, incidents, downstream blockage, and transit priority in one signal system.
- **治理启示**：Governance logic should identify operating regime first; the best control action differs between recurrent congestion, incidents, and downstream blockage.
- **适用场景**：Use for rule-based Agent state machines and incident-aware signal control.
- **误用警告**：Simulation validation should be complemented with field data before deployment claims.
- **原始链接**：https://doi.org/10.1016/j.trc.2015.08.004
