# 传统信号、自适应控制与网络协调：核心论文证据库

> 本文件仅提供题录、摘要级重述和治理解读，不复制论文正文。需要精确算法、参数、实验数值时必须回到原文核验。

## 阅读规则

- 先看“治理启示”和“误用警告”，再决定是否需要读原文。
- 顶刊/高引不等于在你的城市、路网和需求下必然有效。
- 实地研究 > 校准良好的仿真 > 单一理想化算例，证据等级必须在推荐中体现。

## S01 · SCOOT - A Traffic Responsive Method of Coordinating Signals

- **作者 / 年份**：P. B. Hunt, D. I. Robertson, R. D. Bretherton, R. I. Winton (1981)
- **期刊 / 会议**：TRRL Report / UK traffic-control literature
- **DOI / 来源**：https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/PB82142761.xhtml
- **影响力定位**：Seminal adaptive signal-control system and field practice reference.
- **研究问题**：Network coordination under changing traffic demand.
- **治理启示**：Frequent small adjustments of split, cycle, and offset can outperform static plans when demand varies; adaptive control needs reliable detection.
- **适用场景**：Use as a benchmark class when comparing new signal-control algorithms.
- **误用警告**：Commercial/system details and detector layouts matter; do not equate SCOOT with a generic algorithm.
- **原始链接**：https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/PB82142761.xhtml

## S02 · A Multivariable Regulator Approach to Traffic-Responsive Network-Wide Signal Control

- **作者 / 年份**：C. Diakaki, M. Papageorgiou, K. Aboudolas (2002)
- **期刊 / 会议**：Control Engineering Practice
- **DOI / 来源**：10.1016/S0967-0661(01)00121-6
- **影响力定位**：Highly influential TUC paper.
- **研究问题**：Coordinated urban signal control under saturation.
- **治理启示**：Queue balancing with a store-and-forward network model is a powerful oversaturation principle; prevent local queues from triggering network-wide spillback.
- **适用场景**：Use for congested urban networks, network-wide green split control, and benchmark design.
- **误用警告**：Model aggregation suppresses detailed phase-level phenomena; calibration and constraints remain necessary.
- **原始链接**：https://doi.org/10.1016/S0967-0661(01)00121-6

## S03 · Store-and-forward Based Methods for the Signal Control Problem in Large-Scale Congested Urban Road Networks

- **作者 / 年份**：K. Aboudolas, M. Papageorgiou, E. Kosmatopoulos (2009)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2008.10.002
- **影响力定位**：Influential TR-C urban-control paper.
- **研究问题**：Computationally feasible control for large saturated networks.
- **治理启示**：Balance link occupancies/queues and explicitly reduce spillback risk; computational tractability is a governance requirement for real-time deployment.
- **适用场景**：Use when comparing centralized optimization, feedback, and practical real-time control.
- **误用警告**：Performance depends on state estimation and model structure; capacity and turning ratios should not be assumed known without evidence.
- **原始链接**：https://doi.org/10.1016/j.trc.2008.10.002

## S04 · A Rolling-Horizon Quadratic-Programming Approach to the Signal Control Problem in Large-Scale Congested Urban Road Networks

- **作者 / 年份**：K. Aboudolas, M. Papageorgiou, A. Kouvelas, E. Kosmatopoulos (2010)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2009.06.003
- **影响力定位**：Influential constrained optimization approach in TR-C.
- **研究问题**：Network-wide signal control with operational constraints and spillback.
- **治理启示**：Rolling-horizon optimization can control congestion by minimizing and balancing queues, but must remain feasible at each control step.
- **适用场景**：Use for MPC/QP signal-control designs and Agent-generated timing policies.
- **误用警告**：Prediction error and solver latency must be stress-tested.
- **原始链接**：https://doi.org/10.1016/j.trc.2009.06.003

## S05 · Max Pressure Control of a Network of Signalized Intersections

- **作者 / 年份**：P. Varaiya (2013)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2013.08.014
- **影响力定位**：Seminal/highly cited modern signal-control paper.
- **研究问题**：Decentralized network control that stabilizes queues under feasible demand.
- **治理启示**：Serve movements with high upstream-minus-downstream pressure; downstream congestion must influence green allocation.
- **适用场景**：Use for oversaturated networks, decentralized control, and theoretically grounded RL reward design.
- **误用警告**：Classical theory often assumes point queues/unlimited storage; finite link storage requires spillback-aware modifications.
- **原始链接**：https://doi.org/10.1016/j.trc.2013.08.014

## S06 · Review of Road Traffic Control Strategies

- **作者 / 年份**：M. Papageorgiou, C. Diakaki, V. Dinopoulou, A. Kotsialos, Y. Wang (2003)
- **期刊 / 会议**：Proceedings of the IEEE
- **DOI / 来源**：10.1109/JPROC.2003.819610
- **影响力定位**：Major highly cited review across freeway, route guidance, and urban control.
- **研究问题**：Taxonomy and design principles across traffic-control strategies.
- **治理启示**：Treat signals, ramp metering, route guidance, and information as a coordinated control system; local improvements can conflict at network scale.
- **适用场景**：Use as the top-level taxonomy for control-oriented governance.
- **误用警告**：Technology has evolved, so pair it with recent literature for connected vehicles and learning-based control.
- **原始链接**：https://doi.org/10.1109/JPROC.2003.819610

## S07 · The Sydney Coordinated Adaptive Traffic (SCAT) System Philosophy and Benefits

- **作者 / 年份**：A. G. Sims, K. W. Dobinson (1980)
- **期刊 / 会议**：IEEE Transactions on Vehicular Technology
- **DOI / 来源**：10.1109/T-VT.1980.23833
- **影响力定位**：Classic adaptive traffic-control system paper; several hundred indexed citations.
- **研究问题**：Network-adaptive signal timing using traffic-responsive cycle, split and offset logic.
- **治理启示**：Adaptive control is an operations system involving detection, coordination logic and fallback plans, not just an optimizer.
- **适用场景**：Use as a classical benchmark family and for deployment architecture reasoning.
- **误用警告**：SCATS is a system architecture; do not reduce it to one formula or compare with RL using incompatible detectors/KPIs.
- **原始链接**：https://doi.org/10.1109/T-VT.1980.23833

## S08 · OPAC: A Demand-Responsive Strategy for Traffic Signal Control

- **作者 / 年份**：N. H. Gartner (1983)
- **期刊 / 会议**：Transportation Research Record
- **DOI / 来源**：https://trid.trb.org/View/196609
- **影响力定位**：Classic demand-responsive decentralized signal-control work; heavily cited.
- **研究问题**：Real-time demand-responsive optimization with upstream detector input.
- **治理启示**：Rolling local optimization can be practical when it uses available detector data and decomposes network control.
- **适用场景**：Use for adaptive signal-control lineage and decentralized optimization baselines.
- **误用警告**：Reported performance depends on detector quality and prediction horizon; historical implementations differ from modern systems.
- **原始链接**：https://trid.trb.org/View/196609

## S09 · A Real-Time Traffic Signal Control System: Architecture, Algorithms, and Analysis

- **作者 / 年份**：P. Mirchandani, L. Head (2001)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/S0968-090X(00)00047-4
- **影响力定位**：Influential RHODES real-time adaptive-control paper.
- **研究问题**：Hierarchical prediction and control across vehicle/platoon/network resolutions.
- **治理启示**：Good adaptive control architecture separates prediction, local decisions and network coordination by time scale.
- **适用场景**：Use when designing hierarchical Agent/tool architectures for signal control.
- **误用警告**：Prediction accuracy and computation deadlines are part of the control problem.
- **原始链接**：https://doi.org/10.1016/S0968-090X(00)00047-4

## S10 · MAXBAND: A Program for Setting Signals on Arteries and Triangular Networks

- **作者 / 年份**：J. D. C. Little, M. D. Kelson, N. H. Gartner (1981)
- **期刊 / 会议**：Transportation Research Record
- **DOI / 来源**：https://onlinepubs.trb.org/Onlinepubs/trr/1981/795/795.pdf
- **影响力定位**：Classic arterial progression / bandwidth optimization reference.
- **研究问题**：Choosing cycle, offsets and progression bands for coordinated arterials.
- **治理启示**：When the main objective is progression, optimize corridor coordination explicitly rather than only intersection delay.
- **适用场景**：Use for arterial coordination baselines and offset-plan design.
- **误用警告**：Bandwidth objectives can disadvantage cross streets, pedestrians or oversaturated conditions; pair with demand/capacity constraints.
- **原始链接**：https://onlinepubs.trb.org/Onlinepubs/trr/1981/795/795.pdf

## S11 · Distributed Traffic Signal Control for Maximum Network Throughput

- **作者 / 年份**：T. Wongpiromsarn, T. Uthaicharoenpong, Y. Wang, E. Frazzoli, D. Wang (2012)
- **期刊 / 会议**：IEEE Intelligent Transportation Systems Conference
- **DOI / 来源**：10.1109/ITSC.2012.6338817
- **影响力定位**：Important bridge from backpressure theory to distributed signal control.
- **研究问题**：Distributed signal control with maximum-throughput guarantees.
- **治理启示**：Pressure-based decentralized control can offer strong theoretical baselines for congested networks and should be compared before claiming ML gains.
- **适用场景**：Use as a baseline and theoretical anchor for decentralized/agent signal control.
- **误用警告**：Throughput optimality assumptions do not automatically guarantee good pedestrian service, fairness or finite-storage performance.
- **原始链接**：https://doi.org/10.1109/ITSC.2012.6338817

## S12 · A Novel Traffic Signal Control Formulation

- **作者 / 年份**：H. K. Lo (1999)
- **期刊 / 会议**：Transportation Research Part A: Policy and Practice
- **DOI / 来源**：10.1016/S0965-8564(98)00049-4
- **影响力定位**：Influential network signal-control formulation.
- **研究问题**：Joint representation of signal control and traffic assignment/dynamics.
- **治理启示**：Signal timing changes route/network states; optimization should reflect the traffic response to control rather than freeze demand patterns.
- **适用场景**：Use for signal-control formulations with network interactions.
- **误用警告**：Model complexity and solution tractability limit direct real-time deployment.
- **原始链接**：https://doi.org/10.1016/S0965-8564(98)00049-4
