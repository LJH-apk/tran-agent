# 必读核心文献短名单

> 这不是按引用数机械排序，而是按“理论锚点 + 顶级/主流期刊 + 领域影响 + 治理可转化性”筛选。用它建立交通治理知识主干，再从 `21_paper_index.md` 扩展。

共 **39 篇**。

## 均衡、拥堵与网络动力学

### F01 · Some Theoretical Aspects of Road Traffic Research
- J. G. Wardrop (1952), *Proceedings of the Institution of Civil Engineers*
- **为什么读**：Seminal: foundation of user-equilibrium and system-optimum reasoning.
- **治理规则**：Governance must distinguish user equilibrium from system optimum; route guidance or pricing that only shifts users among routes can fail if it ignores network equilibrium.
- **使用边界**：Static equilibrium does not capture queue spillback, temporal dynamics, or incident recovery.
- **DOI/来源**：10.1680/ipeds.1952.11259

### F03 · Congestion Theory and Transport Investment
- W. S. Vickrey (1969), *American Economic Review*
- **为什么读**：Seminal congestion-pricing and bottleneck-economics paper.
- **治理规则**：Congestion is partly a pricing and scheduling problem, not only a capacity problem; marginal-cost logic is a core governance principle.
- **使用边界**：Pure efficiency pricing must be paired with equity, acceptability, and implementation analysis.
- **DOI/来源**：https://www.jstor.org/stable/1823678

### F05 · A Structural Model of Peak-Period Congestion: A Traffic Bottleneck with Elastic Demand
- R. Arnott, A. de Palma, R. Lindsey (1993), *American Economic Review*
- **为什么读**：Seminal structural bottleneck model; major reference in congestion economics.
- **治理规则**：Policies affect not only queues but whether, when, and how much people travel; demand response must be included in governance evaluation.
- **使用边界**：Point-bottleneck abstraction omits network spillback and multi-intersection interactions.
- **DOI/来源**：https://ideas.repec.org/a/aea/aecrev/v83y1993i1p161-79.html

### F06 · The Cell Transmission Model: A Dynamic Representation of Highway Traffic Consistent with the Hydrodynamic Theory
- C. F. Daganzo (1994), *Transportation Research Part B: Methodological*
- **为什么读**：Seminal dynamic traffic-flow paper; one of the most cited TR-B traffic-flow works.
- **治理规则**：Governance decisions must respect finite storage and shock propagation; average speed alone can hide spillback and blocking.
- **使用边界**：Cell size/time step and fundamental-diagram assumptions matter; it is a macroscopic approximation.
- **DOI/来源**：10.1016/0191-2615(94)90002-7

### F07 · The Cell Transmission Model, Part II: Network Traffic
- C. F. Daganzo (1995), *Transportation Research Part B: Methodological*
- **为什么读**：Seminal network extension of CTM.
- **治理规则**：Network control should model node interactions, turn proportions, and downstream receiving capacity rather than treating links independently.
- **使用边界**：Junction rules and route-choice assumptions must match the intended application.
- **DOI/来源**：10.1016/0191-2615(94)00022-R

### F09 · A Variational Inequality Formulation of the Dynamic Network User Equilibrium Problem
- T. L. Friesz, D. Bernstein, T. E. Smith, R. L. Tobin, B. W. Wie (1993), *Operations Research*
- **为什么读**：Seminal dynamic user-equilibrium formulation in a top OR journal.
- **治理规则**：Traffic-management policies should be evaluated against time-dependent route/departure responses, not only a static assignment.
- **使用边界**：The formulation is theoretical; operational deployment needs a calibrated dynamic network loading model.
- **DOI/来源**：10.1287/opre.41.1.179

### F10 · Foundations of Dynamic Traffic Assignment: The Past, the Present and the Future
- S. Peeta, A. K. Ziliaskopoulos (2001), *Networks and Spatial Economics*
- **为什么读**：Canonical review of dynamic traffic assignment.
- **治理规则**：Use DTA when congestion management changes route choice over time and queue propagation matters.
- **使用边界**：A review is not an operational algorithm; choose a specific DNL and equilibrium concept for implementation.
- **DOI/来源**：10.1023/A:1012827724856

## 需求管理、定价与真实政策

### D01 · The Fundamental Law of Road Congestion: Evidence from US Cities
- G. Duranton, M. A. Turner (2011), *American Economic Review*
- **为什么读**：Highly cited AER empirical paper on induced traffic.
- **治理规则**：Added lane-km can induce roughly proportional additional vehicle travel in the studied US context; do not evaluate expansion with fixed-demand assumptions only.
- **使用边界**：Empirical magnitude is context-specific; do not mechanically transfer elasticity to every city or corridor.
- **DOI/来源**：10.1257/aer.101.6.2616

### D03 · Disappearing Traffic? The Story So Far
- S. Cairns, S. Atkins, P. Goodwin (2002), *Proceedings of the ICE - Municipal Engineer*
- **为什么读**：Influential evidence synthesis on road-space reallocation.
- **治理规则**：Traffic may redistribute, retime, remode, or disappear rather than simply displacing one-for-one; evaluate behavioral adaptation instead of assuming fixed trips.
- **使用边界**：Outcomes vary substantially by alternatives, network redundancy, enforcement, and complementary measures.
- **DOI/来源**：10.1680/muen.2002.151.1.13

### D04 · Cruising for Parking
- D. C. Shoup (2006), *Transport Policy*
- **为什么读**：Highly cited parking-policy paper.
- **治理规则**：Parking management is congestion management; curb pricing and occupancy targets can remove search traffic and reduce local circulation.
- **使用边界**：Pricing requires loading-zone design, enforcement, equity treatment, and off-street substitution analysis.
- **DOI/来源**：10.1016/j.tranpol.2006.05.005

### D09 · A Cost-Benefit Analysis of the Stockholm Congestion Charging System
- J. Eliasson (2009), *Transportation Research Part A: Policy and Practice*
- **为什么读**：Highly influential observed-data evaluation of congestion charging.
- **治理规则**：Judge pricing with observed traffic, travel time, revenue, operating cost, safety and emissions rather than traffic reduction alone.
- **使用边界**：Transferability depends on geography, alternatives, charge design, implementation cost and public finance.
- **DOI/来源**：10.1016/j.tra.2008.11.014

### D10 · The Stockholm Congestion-Charging Trial 2006: Overview of Effects
- J. Eliasson, L. Hultkrantz, L. Nerhagen, L. Smidfelt Rosqvist (2009), *Transportation Research Part A: Policy and Practice*
- **为什么读**：Landmark full-scale congestion-pricing field evidence.
- **治理规则**：A policy trial can change both congestion and acceptance; visible travel-time reliability gains matter for legitimacy.
- **使用边界**：Do not assume the same acceptance trajectory where transit alternatives or governance conditions differ.
- **DOI/来源**：10.1016/j.tra.2008.09.007

### D11 · The London Congestion Charge
- J. Leape (2006), *Journal of Economic Perspectives*
- **为什么读**：Widely cited policy account in a leading economics journal.
- **治理规则**：Implementation design, exemptions, enforcement and political feasibility are part of traffic governance, not afterthoughts.
- **使用边界**：A city-center charging case should not be copied mechanically to polycentric cities.
- **DOI/来源**：10.1257/jep.20.4.157

## 信号与网络控制

### S02 · A Multivariable Regulator Approach to Traffic-Responsive Network-Wide Signal Control
- C. Diakaki, M. Papageorgiou, K. Aboudolas (2002), *Control Engineering Practice*
- **为什么读**：Highly influential TUC paper.
- **治理规则**：Queue balancing with a store-and-forward network model is a powerful oversaturation principle; prevent local queues from triggering network-wide spillback.
- **使用边界**：Model aggregation suppresses detailed phase-level phenomena; calibration and constraints remain necessary.
- **DOI/来源**：10.1016/S0967-0661(01)00121-6

### S05 · Max Pressure Control of a Network of Signalized Intersections
- P. Varaiya (2013), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Seminal/highly cited modern signal-control paper.
- **治理规则**：Serve movements with high upstream-minus-downstream pressure; downstream congestion must influence green allocation.
- **使用边界**：Classical theory often assumes point queues/unlimited storage; finite link storage requires spillback-aware modifications.
- **DOI/来源**：10.1016/j.trc.2013.08.014

### S06 · Review of Road Traffic Control Strategies
- M. Papageorgiou, C. Diakaki, V. Dinopoulou, A. Kotsialos, Y. Wang (2003), *Proceedings of the IEEE*
- **为什么读**：Major highly cited review across freeway, route guidance, and urban control.
- **治理规则**：Treat signals, ramp metering, route guidance, and information as a coordinated control system; local improvements can conflict at network scale.
- **使用边界**：Technology has evolved, so pair it with recent literature for connected vehicles and learning-based control.
- **DOI/来源**：10.1109/JPROC.2003.819610

### S07 · The Sydney Coordinated Adaptive Traffic (SCAT) System Philosophy and Benefits
- A. G. Sims, K. W. Dobinson (1980), *IEEE Transactions on Vehicular Technology*
- **为什么读**：Classic adaptive traffic-control system paper; several hundred indexed citations.
- **治理规则**：Adaptive control is an operations system involving detection, coordination logic and fallback plans, not just an optimizer.
- **使用边界**：SCATS is a system architecture; do not reduce it to one formula or compare with RL using incompatible detectors/KPIs.
- **DOI/来源**：10.1109/T-VT.1980.23833

### S08 · OPAC: A Demand-Responsive Strategy for Traffic Signal Control
- N. H. Gartner (1983), *Transportation Research Record*
- **为什么读**：Classic demand-responsive decentralized signal-control work; heavily cited.
- **治理规则**：Rolling local optimization can be practical when it uses available detector data and decomposes network control.
- **使用边界**：Reported performance depends on detector quality and prediction horizon; historical implementations differ from modern systems.
- **DOI/来源**：https://trid.trb.org/View/196609

### S09 · A Real-Time Traffic Signal Control System: Architecture, Algorithms, and Analysis
- P. Mirchandani, L. Head (2001), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Influential RHODES real-time adaptive-control paper.
- **治理规则**：Good adaptive control architecture separates prediction, local decisions and network coordination by time scale.
- **使用边界**：Prediction accuracy and computation deadlines are part of the control problem.
- **DOI/来源**：10.1016/S0968-090X(00)00047-4

## MFD 与核心区保护

### M01 · Urban Gridlock: Macroscopic Modeling and Mitigation Approaches
- C. F. Daganzo (2007), *Transportation Research Part B: Methodological*
- **为什么读**：Seminal/highly cited urban-gridlock paper.
- **治理规则**：Protect critical urban regions from over-accumulation; maximizing inflow is not the same as maximizing completed trips.
- **使用边界**：A regional model needs a meaningful aggregate relation; heterogeneous congestion can weaken simple MFD assumptions.
- **DOI/来源**：10.1016/j.trb.2006.03.001

### M02 · Existence of Urban-Scale Macroscopic Fundamental Diagrams: Some Experimental Findings
- N. Geroliminis, C. F. Daganzo (2008), *Transportation Research Part B: Methodological*
- **为什么读**：Seminal/highly cited empirical MFD paper.
- **治理规则**：When a region is sufficiently homogeneous, aggregate accumulation and production can support parsimonious control; network completion rate is a better goal than isolated link speed.
- **使用边界**：Do not force an MFD onto highly heterogeneous networks; inspect scatter, hysteresis, and spatial variance.
- **DOI/来源**：10.1016/j.trb.2008.02.002

### M05 · Exploiting the Fundamental Diagram of Urban Networks for Feedback-Based Gating
- M. Keyvan-Ekbatani, A. Kouvelas, I. Papamichail, M. Papageorgiou (2012), *Transportation Research Part B: Methodological*
- **为什么读**：Highly cited bridge from MFD theory to practical gating control.
- **治理规则**：Use feedback to hold accumulation near the productive region of the MFD; perimeter signals become flow-control gates.
- **使用边界**：Holding vehicles outside a zone creates external queues; boundary fairness and storage must be checked.
- **DOI/来源**：10.1016/j.trb.2012.06.008

### M06 · On the Spatial Partitioning of Urban Transportation Networks
- Y. Ji, N. Geroliminis (2012), *Transportation Research Part B: Methodological*
- **为什么读**：Influential network-partitioning paper.
- **治理规则**：Partition by traffic-state homogeneity and spatial connectivity; control zones should be data-derived rather than administratively arbitrary.
- **使用边界**：Partitions may need to change over time as congestion patterns evolve.
- **DOI/来源**：10.1016/j.trb.2012.08.005

## 快速路瓶颈与控制

### R01 · ALINEA: A Local Feedback Control Law for On-Ramp Metering
- M. Papageorgiou, H. Hadj-Salem, J.-M. Blosseville (1991), *Transportation Research Record 1320*
- **为什么读**：Seminal ramp-metering paper with extensive later citations and field influence.
- **治理规则**：Meter inflow to maintain downstream occupancy near a desirable set-point; simple feedback can outperform open-loop rules.
- **使用边界**：Ramp storage and surface-street spillback constrain how aggressively inflow can be held.
- **DOI/来源**：https://trid.trb.org/View/365587

### R02 · Freeway Ramp Metering: An Overview
- M. Papageorgiou, A. Kotsialos (2002), *IEEE Transactions on Intelligent Transportation Systems*
- **为什么读**：Highly cited IEEE T-ITS review.
- **治理规则**：The goal is not merely to reduce ramp inflow; it is to prevent breakdown and preserve high mainline throughput while managing queues.
- **使用边界**：Equity and ramp-queue constraints must be included in control objectives.
- **DOI/来源**：10.1109/TITS.2002.806803

### R03 · Model Predictive Control for Optimal Coordination of Ramp Metering and Variable Speed Limits
- A. Hegyi, B. De Schutter, H. Hellendoorn (2005), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Highly cited integrated freeway-control paper.
- **治理规则**：Control measures interact; optimize them jointly where possible and evaluate network total time spent rather than one detector speed.
- **使用边界**：Model mismatch, compliance with VSL, and computational requirements must be tested.
- **DOI/来源**：10.1016/j.trc.2004.08.001

### R07 · Increasing the Capacity of an Isolated Merge by Metering Its On-Ramp
- M. J. Cassidy, J. Rudjanakanoknad (2005), *Transportation Research Part B: Methodological*
- **为什么读**：Influential field-based capacity-drop / ramp-metering evidence.
- **治理规则**：Ramp metering can protect the bottleneck from breakdown; queue location and lane-changing mechanism matter as much as average demand.
- **使用边界**：A successful isolated-merge experiment does not guarantee network-wide gains if ramp queues spill back to surface streets.
- **DOI/来源**：10.1016/j.trb.2004.12.001

### R08 · Optimal Freeway Ramp Metering Using the Asymmetric Cell Transmission Model
- G. Gomes, R. Horowitz (2006), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Highly cited optimization-based ramp-metering paper.
- **治理规则**：Operational constraints such as maximum ramp queues belong inside the optimization, not in post-processing.
- **使用边界**：Results rely on model structure and conditions preventing problematic queue propagation; validate with realistic demand uncertainty.
- **DOI/来源**：10.1016/j.trc.2006.08.001

## 公交与多模式

### T01 · Bus Lanes with Intermittent Priority: Strategy Formulae and an Evaluation
- M. Eichler, C. F. Daganzo (2006), *Transportation Research Part B: Methodological*
- **为什么读**：Influential analytical bus-priority paper.
- **治理规则**：Evaluate person-delay, not vehicle-delay; intermittent priority can outperform rigid lane dedication in specific demand ranges.
- **使用边界**：Not suitable near or beyond severe saturation; car-lane capacity loss can dominate.
- **DOI/来源**：10.1016/j.trb.2005.10.001

### T02 · Multi-Modal Traffic Signal Control with Priority, Signal Actuation and Coordination
- Q. He, K. L. Head, J. Ding (2014), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Highly cited multimodal signal-control paper.
- **治理规则**：Priority should be conditional and network-aware; combine actuation, coordination, and multimodal priority rather than treating TSP as an isolated exception.
- **使用边界**：Priority can transfer delay to side streets or pedestrians if person-based objectives are omitted.
- **DOI/来源**：10.1016/j.trc.2014.05.001

### T06 · Coordinated Transit Signal Priority Supporting Transit Progression under Connected Vehicle Technology
- J. Hu, B. B. Park, Y.-J. Lee (2015), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Influential connected-vehicle TSP / corridor coordination paper.
- **治理规则**：Transit priority should be corridor-coordinated and preferably person-delay-aware rather than granting isolated priority at each junction.
- **使用边界**：Benefits decrease under heavy saturation; protect general-traffic storage and downstream capacity.
- **DOI/来源**：10.1016/j.trc.2014.12.005

## AI/RL：只在强传统基线上继续

### A01 · PressLight: Learning Max Pressure Control for Signalized Intersections in Arterial Network
- H. Wei et al. (2019), *ACM KDD 2019*
- **为什么读**：Highly influential bridge between traffic-control theory and deep RL.
- **治理规则**：Theory-informed rewards can improve learning stability; use pressure/queue structure instead of arbitrary reward engineering.
- **使用边界**：Simulation superiority does not imply field robustness; benchmark against non-learning controllers and test distribution shift.
- **DOI/来源**：https://www.kdd.org/kdd2019/accepted-papers/view/presslight-learning-max-pressure-control-for-signalized-intersections-in-ar

### A02 · CoLight: Learning Network-Level Cooperation for Traffic Signal Control
- H. Wei et al. (2019), *ACM CIKM 2019*
- **为什么读**：Influential graph-attention multi-agent traffic-signal paper.
- **治理规则**：Communication topology matters; graph-based information sharing is a natural representation for networked signals.
- **使用边界**：Scalability in simulation does not guarantee transferability, safety, interpretability, or field communications reliability.
- **DOI/来源**：10.1145/3357384.3357902

### A07 · IntelliLight: A Reinforcement Learning Approach for Intelligent Traffic Light Control
- H. Wei, G. Zheng, H. Yao, Z. Li (2018), *ACM SIGKDD*
- **为什么读**：Early influential deep-RL traffic-signal paper at KDD.
- **治理规则**：Use real/realistic demand, interpretable state/reward design and strong transport baselines when evaluating RL.
- **使用边界**：Do not infer field superiority from offline/simulation performance alone.
- **DOI/来源**：10.1145/3219819.3220096

### A08 · Learning Phase Competition for Traffic Signal Control
- G. Zheng, Y. Xiong, X. Zang, J. Feng, H. Wei, H. Zhang, Y. Li, K. Xu, Z. Li (2019), *ACM CIKM*
- **为什么读**：Influential FRAP paper; strong inductive-bias approach for RL signal control.
- **治理规则**：Embedding traffic-control structure and symmetry can improve sample efficiency and transfer compared with generic neural policies.
- **使用边界**：Generalization still depends on simulator fidelity, demand distribution and action constraints.
- **DOI/来源**：10.1145/3357384.3357900

### A09 · MetaLight: Value-Based Meta-Reinforcement Learning for Traffic Signal Control
- X. Zang, H. Yao, G. Zheng, N. Xu, K. Xu, Z. Li (2020), *AAAI*
- **为什么读**：Influential meta-RL traffic-signal paper at AAAI.
- **治理规则**：Transfer/adaptation should be treated as a first-class deployment requirement; training from scratch for every junction is not a practical governance plan.
- **使用边界**：Meta-training distribution can still mismatch deployment; require out-of-distribution stress tests.
- **DOI/来源**：10.1609/aaai.v34i01.5467

### A11 · Multiagent Reinforcement Learning for Integrated Network of Adaptive Traffic Signal Controllers (MARLIN-ATSC): Methodology and Large-Scale Application on Downtown Toronto
- S. El-Tantawy, B. Abdulhai, H. Abdelgawad (2013), *IEEE Transactions on Intelligent Transportation Systems*
- **为什么读**：Highly cited multi-agent RL signal-control paper in IEEE T-ITS.
- **治理规则**：Coordination can outperform independent agents, but network-scale validation and communication design are necessary.
- **使用边界**：Simulation-network results require careful baseline tuning and field-transfer analysis.
- **DOI/来源**：10.1109/TITS.2013.2255286

## 综合治理

### I01 · An Integrated Control Approach for Traffic Corridors
- M. Papageorgiou (1995), *Transportation Research Part C: Emerging Technologies*
- **为什么读**：Classic integrated-corridor control paper.
- **治理规则**：Optimize corridor controls jointly around total delay/time spent; isolated controllers can fight each other.
- **使用边界**：Joint optimization increases model and operational complexity; define fallback modes.
- **DOI/来源**：10.1016/0968-090X(94)00012-T

### I02 · A Review of Urban Transportation Network Design Problems
- R. Z. Farahani, E. Miandoabchi, W. Y. Szeto, H. Rashidi (2013), *European Journal of Operational Research*
- **为什么读**：Highly cited invited review; EJOR.
- **治理规则**：Network design is inherently bilevel/multilevel: infrastructure decisions change route/mode choices; evaluate equilibrium response and multiple objectives.
- **使用边界**：Design-optimal solutions can be politically or operationally infeasible; add implementability constraints.
- **DOI/来源**：10.1016/j.ejor.2013.01.001
