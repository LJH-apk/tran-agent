# 基础理论、均衡与动态分配：核心论文证据库

> 本文件仅提供题录、摘要级重述和治理解读，不复制论文正文。需要精确算法、参数、实验数值时必须回到原文核验。

## 阅读规则

- 先看“治理启示”和“误用警告”，再决定是否需要读原文。
- 顶刊/高引不等于在你的城市、路网和需求下必然有效。
- 实地研究 > 校准良好的仿真 > 单一理想化算例，证据等级必须在推荐中体现。

## F01 · Some Theoretical Aspects of Road Traffic Research

- **作者 / 年份**：J. G. Wardrop (1952)
- **期刊 / 会议**：Proceedings of the Institution of Civil Engineers
- **DOI / 来源**：10.1680/ipeds.1952.11259
- **影响力定位**：Seminal: foundation of user-equilibrium and system-optimum reasoning.
- **研究问题**：How self-interested route choice differs from a system-wide optimum.
- **治理启示**：Governance must distinguish user equilibrium from system optimum; route guidance or pricing that only shifts users among routes can fail if it ignores network equilibrium.
- **适用场景**：Use when evaluating diversion, route guidance, pricing, network design, or Braess-type effects.
- **误用警告**：Static equilibrium does not capture queue spillback, temporal dynamics, or incident recovery.
- **原始链接**：https://doi.org/10.1680/ipeds.1952.11259

## F02 · On a Paradox of Traffic Planning

- **作者 / 年份**：D. Braess, A. Nagurney, T. Wakolbinger (2005)
- **期刊 / 会议**：Transportation Science
- **DOI / 来源**：10.1287/trsc.1050.0127
- **影响力定位**：Highly cited English presentation of the Braess paradox; Transportation Science.
- **研究问题**：Why adding a link can worsen equilibrium travel times.
- **治理启示**：Capacity expansion is not automatically congestion relief; always test equilibrium rerouting and network-wide performance after topology changes.
- **适用场景**：Use for road additions, lane additions, turn openings, reversible links, and route guidance.
- **误用警告**：The paradox is topology- and cost-function-dependent; do not claim every new road worsens traffic.
- **原始链接**：https://doi.org/10.1287/trsc.1050.0127

## F03 · Congestion Theory and Transport Investment

- **作者 / 年份**：W. S. Vickrey (1969)
- **期刊 / 会议**：American Economic Review
- **DOI / 来源**：https://www.jstor.org/stable/1823678
- **影响力定位**：Seminal congestion-pricing and bottleneck-economics paper.
- **研究问题**：How congestion externalities should affect pricing and investment.
- **治理启示**：Congestion is partly a pricing and scheduling problem, not only a capacity problem; marginal-cost logic is a core governance principle.
- **适用场景**：Use for peak pricing, toll design, demand spreading, and investment appraisal.
- **误用警告**：Pure efficiency pricing must be paired with equity, acceptability, and implementation analysis.
- **原始链接**：https://www.jstor.org/stable/1823678

## F04 · The Scheduling of Consumer Activities: Work Trips

- **作者 / 年份**：K. A. Small (1982)
- **期刊 / 会议**：American Economic Review
- **DOI / 来源**：https://ideas.repec.org/a/aea/aecrev/v72y1982i3p467-79.html
- **影响力定位**：Seminal departure-time/schedule-delay model.
- **研究问题**：How travelers trade travel time against early/late arrival penalties.
- **治理启示**：Peak congestion can be governed by shifting departure times as well as routes or modes; schedule delay is part of generalized cost.
- **适用场景**：Use for staggered work hours, peak spreading, dynamic pricing, and bottleneck analysis.
- **误用警告**：Behavioral parameters are context-dependent and should be calibrated when quantitative recommendations are made.
- **原始链接**：https://ideas.repec.org/a/aea/aecrev/v72y1982i3p467-79.html

## F05 · A Structural Model of Peak-Period Congestion: A Traffic Bottleneck with Elastic Demand

- **作者 / 年份**：R. Arnott, A. de Palma, R. Lindsey (1993)
- **期刊 / 会议**：American Economic Review
- **DOI / 来源**：https://ideas.repec.org/a/aea/aecrev/v83y1993i1p161-79.html
- **影响力定位**：Seminal structural bottleneck model; major reference in congestion economics.
- **研究问题**：Peak-period equilibrium when demand is elastic and queueing is endogenous.
- **治理启示**：Policies affect not only queues but whether, when, and how much people travel; demand response must be included in governance evaluation.
- **适用场景**：Use for dynamic congestion pricing and peak-period policy design.
- **误用警告**：Point-bottleneck abstraction omits network spillback and multi-intersection interactions.
- **原始链接**：https://ideas.repec.org/a/aea/aecrev/v83y1993i1p161-79.html

## F06 · The Cell Transmission Model: A Dynamic Representation of Highway Traffic Consistent with the Hydrodynamic Theory

- **作者 / 年份**：C. F. Daganzo (1994)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/0191-2615(94)90002-7
- **影响力定位**：Seminal dynamic traffic-flow paper; one of the most cited TR-B traffic-flow works.
- **研究问题**：Represent queue formation, propagation, and dissipation with a computationally tractable model.
- **治理启示**：Governance decisions must respect finite storage and shock propagation; average speed alone can hide spillback and blocking.
- **适用场景**：Use for dynamic bottlenecks, incidents, lane closures, evacuation, and simulation reasoning.
- **误用警告**：Cell size/time step and fundamental-diagram assumptions matter; it is a macroscopic approximation.
- **原始链接**：https://doi.org/10.1016/0191-2615(94)90002-7

## F07 · The Cell Transmission Model, Part II: Network Traffic

- **作者 / 年份**：C. F. Daganzo (1995)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/0191-2615(94)00022-R
- **影响力定位**：Seminal network extension of CTM.
- **研究问题**：Dynamic multi-commodity flows through network junctions.
- **治理启示**：Network control should model node interactions, turn proportions, and downstream receiving capacity rather than treating links independently.
- **适用场景**：Use for network simulation, DTA, evacuation, diversion, and queue-spillback analysis.
- **误用警告**：Junction rules and route-choice assumptions must match the intended application.
- **原始链接**：https://doi.org/10.1016/0191-2615(94)00022-R

## F08 · Dynamic Modeling, Assignment, and Route Guidance in Traffic Networks

- **作者 / 年份**：M. Papageorgiou (1990)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/0191-2615(90)90041-V
- **影响力定位**：Influential early integration of dynamic assignment, guidance, and control.
- **研究问题**：How route guidance interacts with dynamic network traffic.
- **治理启示**：Information is a control input: guidance can improve or worsen congestion depending on network response; integrate route choice with control rather than optimizing them separately.
- **适用场景**：Use for VMS, navigation guidance, incident diversion, and intelligent-agent routing.
- **误用警告**：Guidance compliance and information penetration should be modeled explicitly.
- **原始链接**：https://doi.org/10.1016/0191-2615(90)90041-V

## F09 · A Variational Inequality Formulation of the Dynamic Network User Equilibrium Problem

- **作者 / 年份**：T. L. Friesz, D. Bernstein, T. E. Smith, R. L. Tobin, B. W. Wie (1993)
- **期刊 / 会议**：Operations Research
- **DOI / 来源**：10.1287/opre.41.1.179
- **影响力定位**：Seminal dynamic user-equilibrium formulation in a top OR journal.
- **研究问题**：Dynamic route and departure-time equilibrium with FIFO.
- **治理启示**：Traffic-management policies should be evaluated against time-dependent route/departure responses, not only a static assignment.
- **适用场景**：Use for dynamic route guidance, event traffic, time-varying pricing, DTA and diversion evaluation.
- **误用警告**：The formulation is theoretical; operational deployment needs a calibrated dynamic network loading model.
- **原始链接**：https://doi.org/10.1287/opre.41.1.179

## F10 · Foundations of Dynamic Traffic Assignment: The Past, the Present and the Future

- **作者 / 年份**：S. Peeta, A. K. Ziliaskopoulos (2001)
- **期刊 / 会议**：Networks and Spatial Economics
- **DOI / 来源**：10.1023/A:1012827724856
- **影响力定位**：Canonical review of dynamic traffic assignment.
- **研究问题**：How DTA formulations connect mathematical programming, optimal control, VI and simulation.
- **治理启示**：Use DTA when congestion management changes route choice over time and queue propagation matters.
- **适用场景**：Use as a map of DTA concepts before selecting a route-guidance or network-control model.
- **误用警告**：A review is not an operational algorithm; choose a specific DNL and equilibrium concept for implementation.
- **原始链接**：https://doi.org/10.1023/A:1012827724856

## F11 · Dynamic User Optimal Traffic Assignment on Congested Multidestination Networks

- **作者 / 年份**：B. W. Wie, T. L. Friesz, R. L. Tobin (1990)
- **期刊 / 会议**：Transportation Research Part B: Methodological
- **DOI / 来源**：10.1016/0191-2615(90)90038-Z
- **影响力定位**：Early influential dynamic user-optimal assignment paper in TR-B.
- **研究问题**：Dynamic generalization of Wardrop equilibrium for congested multi-OD networks.
- **治理启示**：Diversion and information policies can produce new time-dependent equilibria; evaluate the resulting state, not the first-order rerouting response.
- **适用场景**：Use for route guidance, peak management and network diversion reasoning.
- **误用警告**：Continuous-time optimal-control assumptions are idealized and require practical approximations.
- **原始链接**：https://doi.org/10.1016/0191-2615(90)90038-Z
