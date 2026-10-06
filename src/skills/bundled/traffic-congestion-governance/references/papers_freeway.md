# 快速路、匝道控制与瓶颈治理：核心论文证据库

> 本文件仅提供题录、摘要级重述和治理解读，不复制论文正文。需要精确算法、参数、实验数值时必须回到原文核验。

## 阅读规则

- 先看“治理启示”和“误用警告”，再决定是否需要读原文。
- 顶刊/高引不等于在你的城市、路网和需求下必然有效。
- 实地研究 > 校准良好的仿真 > 单一理想化算例，证据等级必须在推荐中体现。

## R01 · ALINEA: A Local Feedback Control Law for On-Ramp Metering

- **作者 / 年份**：M. Papageorgiou, H. Hadj-Salem, J.-M. Blosseville (1991)
- **期刊 / 会议**：Transportation Research Record 1320
- **DOI / 来源**：https://trid.trb.org/View/365587
- **影响力定位**：Seminal ramp-metering paper with extensive later citations and field influence.
- **研究问题**：Local feedback control of freeway on-ramp inflow.
- **治理启示**：Meter inflow to maintain downstream occupancy near a desirable set-point; simple feedback can outperform open-loop rules.
- **适用场景**：Use for recurrent merge bottlenecks and as a benchmark for ramp-control algorithms.
- **误用警告**：Ramp storage and surface-street spillback constrain how aggressively inflow can be held.
- **原始链接**：https://trid.trb.org/View/365587

## R02 · Freeway Ramp Metering: An Overview

- **作者 / 年份**：M. Papageorgiou, A. Kotsialos (2002)
- **期刊 / 会议**：IEEE Transactions on Intelligent Transportation Systems
- **DOI / 来源**：10.1109/TITS.2002.806803
- **影响力定位**：Highly cited IEEE T-ITS review.
- **研究问题**：Why and how ramp metering mitigates recurrent and nonrecurrent congestion.
- **治理启示**：The goal is not merely to reduce ramp inflow; it is to prevent breakdown and preserve high mainline throughput while managing queues.
- **适用场景**：Use for selecting local vs coordinated ramp metering.
- **误用警告**：Equity and ramp-queue constraints must be included in control objectives.
- **原始链接**：https://doi.org/10.1109/TITS.2002.806803

## R03 · Model Predictive Control for Optimal Coordination of Ramp Metering and Variable Speed Limits

- **作者 / 年份**：A. Hegyi, B. De Schutter, H. Hellendoorn (2005)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2004.08.001
- **影响力定位**：Highly cited integrated freeway-control paper.
- **研究问题**：Coordinating ramp metering and variable speed limits to minimize total time spent.
- **治理启示**：Control measures interact; optimize them jointly where possible and evaluate network total time spent rather than one detector speed.
- **适用场景**：Use for integrated freeway corridor management.
- **误用警告**：Model mismatch, compliance with VSL, and computational requirements must be tested.
- **原始链接**：https://doi.org/10.1016/j.trc.2004.08.001

## R04 · Effects of Variable Speed Limits on Motorway Traffic Flow

- **作者 / 年份**：M. Papageorgiou, E. Kosmatopoulos, I. Papamichail (2008)
- **期刊 / 会议**：Transportation Research Record
- **DOI / 来源**：10.3141/2047-05
- **影响力定位**：Influential empirical/control paper on VSL effects.
- **研究问题**：Whether VSL improves traffic-flow efficiency as distinct from safety.
- **治理启示**：VSL has strong safety rationale; efficiency effects depend on operating regime and should be empirically validated instead of assumed.
- **适用场景**：Use when recommending VSL as a congestion measure.
- **误用警告**：Do not promise capacity gains without local evidence and compliance analysis.
- **原始链接**：https://doi.org/10.3141/2047-05

## R05 · Coordinated Ramp Metering for Freeway Networks - A Model-Predictive Hierarchical Control Approach

- **作者 / 年份**：I. Papamichail, A. Kotsialos, I. Margonis, M. Papageorgiou (2010)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2008.11.002
- **影响力定位**：Widely cited coordinated-ramp-control paper.
- **研究问题**：Coordinated control across multiple ramps and bottlenecks.
- **治理启示**：Combine network-level prediction/optimization with robust local feedback; hierarchical control balances global goals and local reliability.
- **适用场景**：Use for multi-bottleneck freeway networks.
- **误用警告**：Queue limits and failure fallback policies are mandatory for deployment.
- **原始链接**：https://doi.org/10.1016/j.trc.2008.11.002

## R06 · Modelling and Real-Time Control of Traffic Flow on the Southern Part of Boulevard Périphérique in Paris: Part I: Modelling

- **作者 / 年份**：M. Papageorgiou, J.-M. Blosseville, H. Hadj-Salem (1990)
- **期刊 / 会议**：Transportation Research Part A
- **DOI / 来源**：10.1016/0191-2607(90)90047-A
- **影响力定位**：Classic field-oriented motorway modeling work underlying METANET-style control.
- **研究问题**：Validated macroscopic modeling for real-time freeway control.
- **治理启示**：Control quality depends on an operationally validated model; calibration against diverse regimes is a governance prerequisite.
- **适用场景**：Use for model selection and digital-twin calibration.
- **误用警告**：A model that reproduces uncongested flow may still fail around breakdown and recovery.
- **原始链接**：https://doi.org/10.1016/0191-2607(90)90047-A

## R07 · Increasing the Capacity of an Isolated Merge by Metering Its On-Ramp

- **作者 / 年份**：M. J. Cassidy, J. Rudjanakanoknad (2005)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2004.12.001
- **影响力定位**：Influential field-based capacity-drop / ramp-metering evidence.
- **研究问题**：Whether metering can restore higher discharge flow at an active merge bottleneck.
- **治理启示**：Ramp metering can protect the bottleneck from breakdown; queue location and lane-changing mechanism matter as much as average demand.
- **适用场景**：Use for merge bottlenecks, capacity drop and ramp-metering rationale.
- **误用警告**：A successful isolated-merge experiment does not guarantee network-wide gains if ramp queues spill back to surface streets.
- **原始链接**：https://doi.org/10.1016/j.trb.2004.12.001

## R08 · Optimal Freeway Ramp Metering Using the Asymmetric Cell Transmission Model

- **作者 / 年份**：G. Gomes, R. Horowitz (2006)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2006.08.001
- **影响力定位**：Highly cited optimization-based ramp-metering paper.
- **研究问题**：Constrained optimal metering with mainline congestion and ramp queue limits.
- **治理启示**：Operational constraints such as maximum ramp queues belong inside the optimization, not in post-processing.
- **适用场景**：Use for CTM-based freeway control and constrained ramp-metering design.
- **误用警告**：Results rely on model structure and conditions preventing problematic queue propagation; validate with realistic demand uncertainty.
- **原始链接**：https://doi.org/10.1016/j.trc.2006.08.001

## R09 · Ten Strategies for Freeway Congestion Mitigation with Advanced Technologies

- **作者 / 年份**：C. F. Daganzo, J. Laval, J. C. Muñoz (2002)
- **期刊 / 会议**：UC Berkeley ITS Research Report
- **DOI / 来源**：https://escholarship.org/uc/item/4kd6v6qf
- **影响力定位**：Influential mechanism-oriented freeway-management report.
- **研究问题**：Which operational strategies can mitigate freeway congestion without relying on large infrastructure expansion.
- **治理启示**：Prefer strategies that target breakdown, lane interactions, bottleneck activation and demand peaking and that can be evaluated with observable KPIs.
- **适用场景**：Use as a mechanism checklist when generating freeway interventions.
- **误用警告**：It is a research report and strategy framework, not a current design standard.
- **原始链接**：https://escholarship.org/uc/item/4kd6v6qf

## R10 · A Flow-Maximizing Adaptive Local Ramp Metering Strategy

- **作者 / 年份**：E. Smaragdis, M. Papageorgiou, E. Kosmatopoulos (2003)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/S0191-2615(03)00012-2
- **影响力定位**：Influential adaptive local ramp-metering extension.
- **研究问题**：How to maximize mainstream flow with local feedback under changing traffic.
- **治理启示**：Local feedback can be strengthened with bottleneck-flow objectives, but queue constraints and network interactions remain essential.
- **适用场景**：Use as a classical adaptive-metering comparator.
- **误用警告**：Local objectives may transfer congestion to ramps or adjacent links if not coordinated.
- **原始链接**：https://doi.org/10.1016/S0191-2615(03)00012-2
