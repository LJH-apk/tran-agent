# MFD、分区与周界控制：核心论文证据库

> 本文件仅提供题录、摘要级重述和治理解读，不复制论文正文。需要精确算法、参数、实验数值时必须回到原文核验。

## 阅读规则

- 先看“治理启示”和“误用警告”，再决定是否需要读原文。
- 顶刊/高引不等于在你的城市、路网和需求下必然有效。
- 实地研究 > 校准良好的仿真 > 单一理想化算例，证据等级必须在推荐中体现。

## M01 · Urban Gridlock: Macroscopic Modeling and Mitigation Approaches

- **作者 / 年份**：C. F. Daganzo (2007)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2006.03.001
- **影响力定位**：Seminal/highly cited urban-gridlock paper.
- **研究问题**：How oversaturated neighborhoods collapse into gridlock and how accumulation can be controlled.
- **治理启示**：Protect critical urban regions from over-accumulation; maximizing inflow is not the same as maximizing completed trips.
- **适用场景**：Use for CBD protection, gating, regional control, and ITSAC network governance.
- **误用警告**：A regional model needs a meaningful aggregate relation; heterogeneous congestion can weaken simple MFD assumptions.
- **原始链接**：https://doi.org/10.1016/j.trb.2006.03.001

## M02 · Existence of Urban-Scale Macroscopic Fundamental Diagrams: Some Experimental Findings

- **作者 / 年份**：N. Geroliminis, C. F. Daganzo (2008)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2008.02.002
- **影响力定位**：Seminal/highly cited empirical MFD paper.
- **研究问题**：Whether large urban regions exhibit a stable aggregate flow-density relation.
- **治理启示**：When a region is sufficiently homogeneous, aggregate accumulation and production can support parsimonious control; network completion rate is a better goal than isolated link speed.
- **适用场景**：Use to justify MFD-based monitoring and regional gating.
- **误用警告**：Do not force an MFD onto highly heterogeneous networks; inspect scatter, hysteresis, and spatial variance.
- **原始链接**：https://doi.org/10.1016/j.trb.2008.02.002

## M03 · An Analytical Approximation for the Macroscopic Fundamental Diagram of Urban Traffic

- **作者 / 年份**：C. F. Daganzo, N. Geroliminis (2008)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2008.06.008
- **影响力定位**：Highly cited analytical companion to MFD experiments.
- **研究问题**：When an aggregate MFD should exist and how it relates to signalized urban structure.
- **治理启示**：Network geometry and signal timing shape aggregate capacity; MFD reasoning should be tied to network structure, not treated as a universal curve.
- **适用场景**：Use for analytical explanation and sensitivity analysis.
- **误用警告**：Approximation assumptions may fail under severe heterogeneity, turning complexity, or nonstationary control.
- **原始链接**：https://doi.org/10.1016/j.trb.2008.06.008

## M04 · Clockwise Hysteresis Loops in the Macroscopic Fundamental Diagram: An Effect of Network Instability

- **作者 / 年份**：V. V. Gayah, C. F. Daganzo (2011)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2010.11.006
- **影响力定位**：Influential MFD hysteresis paper.
- **研究问题**：Why network performance during congestion recovery can differ from loading.
- **治理启示**：Spatial heterogeneity and route adaptation affect recovery; governance should reduce uneven congestion, not just average accumulation.
- **适用场景**：Use for recovery control, incident analysis, and interpreting MFD loops.
- **误用警告**：A single average state can conceal dangerous localized oversaturation.
- **原始链接**：https://doi.org/10.1016/j.trb.2010.11.006

## M05 · Exploiting the Fundamental Diagram of Urban Networks for Feedback-Based Gating

- **作者 / 年份**：M. Keyvan-Ekbatani, A. Kouvelas, I. Papamichail, M. Papageorgiou (2012)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2012.06.008
- **影响力定位**：Highly cited bridge from MFD theory to practical gating control.
- **研究问题**：Real-time protection of saturated urban regions.
- **治理启示**：Use feedback to hold accumulation near the productive region of the MFD; perimeter signals become flow-control gates.
- **适用场景**：Use for real-time gating and protected-zone management.
- **误用警告**：Holding vehicles outside a zone creates external queues; boundary fairness and storage must be checked.
- **原始链接**：https://doi.org/10.1016/j.trb.2012.06.008

## M06 · On the Spatial Partitioning of Urban Transportation Networks

- **作者 / 年份**：Y. Ji, N. Geroliminis (2012)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2012.08.005
- **影响力定位**：Influential network-partitioning paper.
- **研究问题**：How to divide a heterogeneous city into regions suitable for MFD-based control.
- **治理启示**：Partition by traffic-state homogeneity and spatial connectivity; control zones should be data-derived rather than administratively arbitrary.
- **适用场景**：Use before applying multi-region MFD or perimeter control.
- **误用警告**：Partitions may need to change over time as congestion patterns evolve.
- **原始链接**：https://doi.org/10.1016/j.trb.2012.08.005

## M07 · Dynamics of Heterogeneity in Urban Networks: Aggregated Traffic Modeling and Hierarchical Control

- **作者 / 年份**：M. Ramezani, J. Haddad, N. Geroliminis (2015)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/j.trb.2014.12.010
- **影响力定位**：High-quality TR-B extension connecting heterogeneity and hierarchical control.
- **研究问题**：Control when regional averages hide subregional imbalance.
- **治理启示**：Use hierarchical control: regulate inter-region flows while actively reducing internal heterogeneity.
- **适用场景**：Use for multi-region governance and two-level controllers.
- **误用警告**：Requires enough observability to estimate both accumulation and heterogeneity.
- **原始链接**：https://doi.org/10.1016/j.trb.2014.12.010
