# 强化学习、多智能体与可复现实验：核心论文证据库

> 本文件仅提供题录、摘要级重述和治理解读，不复制论文正文。需要精确算法、参数、实验数值时必须回到原文核验。

## 阅读规则

- 先看“治理启示”和“误用警告”，再决定是否需要读原文。
- 顶刊/高引不等于在你的城市、路网和需求下必然有效。
- 实地研究 > 校准良好的仿真 > 单一理想化算例，证据等级必须在推荐中体现。

## A01 · PressLight: Learning Max Pressure Control for Signalized Intersections in Arterial Network

- **作者 / 年份**：H. Wei et al. (2019)
- **期刊 / 会议**：ACM KDD 2019
- **DOI / 来源**：https://www.kdd.org/kdd2019/accepted-papers/view/presslight-learning-max-pressure-control-for-signalized-intersections-in-ar
- **影响力定位**：Highly influential bridge between traffic-control theory and deep RL.
- **研究问题**：Designing RL state/reward using traffic theory rather than heuristics.
- **治理启示**：Theory-informed rewards can improve learning stability; use pressure/queue structure instead of arbitrary reward engineering.
- **适用场景**：Use for RL signal-control agents and ITSAC innovation sections.
- **误用警告**：Simulation superiority does not imply field robustness; benchmark against non-learning controllers and test distribution shift.
- **原始链接**：https://www.kdd.org/kdd2019/accepted-papers/view/presslight-learning-max-pressure-control-for-signalized-intersections-in-ar

## A02 · CoLight: Learning Network-Level Cooperation for Traffic Signal Control

- **作者 / 年份**：H. Wei et al. (2019)
- **期刊 / 会议**：ACM CIKM 2019
- **DOI / 来源**：10.1145/3357384.3357902
- **影响力定位**：Influential graph-attention multi-agent traffic-signal paper.
- **研究问题**：Learning cooperation across many signalized intersections.
- **治理启示**：Communication topology matters; graph-based information sharing is a natural representation for networked signals.
- **适用场景**：Use for multi-agent RL and graph-based signal coordination.
- **误用警告**：Scalability in simulation does not guarantee transferability, safety, interpretability, or field communications reliability.
- **原始链接**：https://doi.org/10.1145/3357384.3357902

## A03 · Recent Advances in Reinforcement Learning for Traffic Signal Control: A Survey of Models and Evaluation

- **作者 / 年份**：H. Wei, G. Zheng, V. Gayah, Z. Li (2021)
- **期刊 / 会议**：ACM SIGKDD Explorations
- **DOI / 来源**：10.1145/3447556.3447565
- **影响力定位**：Widely used RL-TSC survey.
- **研究问题**：How RL-TSC methods differ in state, action, reward, coordination, and evaluation.
- **治理启示**：Evaluation design is as important as model novelty; compare against strong transportation baselines and report simulator assumptions.
- **适用场景**：Use for experiment design and avoiding weak baselines.
- **误用警告**：Survey predates the newest foundation-model/large-scale multi-agent work; supplement with recent reviews.
- **原始链接**：https://doi.org/10.1145/3447556.3447565

## A04 · Reinforcement Learning in Urban Network Traffic Signal Control: A Systematic Literature Review

- **作者 / 年份**：Various authors (2022)
- **期刊 / 会议**：Expert Systems with Applications
- **DOI / 来源**：https://www.sciencedirect.com/science/article/pii/S0957417422002858
- **影响力定位**：Large systematic review covering 160 peer-reviewed network-level studies through March 2020.
- **研究问题**：Evidence quality and research trends in network-level RL signal control.
- **治理启示**：The field has reproducibility, benchmark, and practitioner-integration gaps; governance should not treat simulated RL gains as field-proven.
- **适用场景**：Use for methodological caveats and research-gap sections.
- **误用警告**：Systematic-review inclusion window means newer methods require separate updates.
- **原始链接**：https://www.sciencedirect.com/science/article/pii/S0957417422002858

## A05 · Leveraging Reinforcement Learning for Dynamic Traffic Control: A Survey and Challenges for Field Implementation

- **作者 / 年份**：Y. Han, M. Wang, L. Leclercq (2023)
- **期刊 / 会议**：Communications in Transportation Research
- **DOI / 来源**：10.1016/j.commtr.2023.100104
- **影响力定位**：Recent open-access field-implementation-focused survey.
- **研究问题**：Why RL traffic control struggles to move from simulation to deployment.
- **治理启示**：Sim-to-real transfer, safety, data cost, nonstationarity, and operational constraints must be designed in from the start.
- **适用场景**：Use for modern Agent/RL governance and field-deployment checklists.
- **误用警告**：Use RL only when it beats simpler robust methods under realistic disturbances and constraints.
- **原始链接**：https://doi.org/10.1016/j.commtr.2023.100104

## A06 · Transferable Traffic Signal Control: Reinforcement Learning with Graph Centric State Representation

- **作者 / 年份**：J. Yoon, K. Ahn, J. Park, H. Yeo (2021)
- **期刊 / 会议**：Transportation Research Part C: Emerging Technologies
- **DOI / 来源**：10.1016/j.trc.2021.103321
- **影响力定位**：Representative TR-C work on transferability.
- **研究问题**：Generalizing signal-control policies to unseen demand states.
- **治理启示**：Representation design can improve transfer, but robustness should be measured across demand, topology, detector noise, and incident scenarios.
- **适用场景**：Use when claiming an Agent can generalize beyond one calibrated simulation.
- **误用警告**：Transferability claims are bounded by tested domains; do not extrapolate silently.
- **原始链接**：https://doi.org/10.1016/j.trc.2021.103321

## A07 · IntelliLight: A Reinforcement Learning Approach for Intelligent Traffic Light Control

- **作者 / 年份**：H. Wei, G. Zheng, H. Yao, Z. Li (2018)
- **期刊 / 会议**：ACM SIGKDD
- **DOI / 来源**：10.1145/3219819.3220096
- **影响力定位**：Early influential deep-RL traffic-signal paper at KDD.
- **研究问题**：Learning adaptive single-intersection control from traffic state.
- **治理启示**：Use real/realistic demand, interpretable state/reward design and strong transport baselines when evaluating RL.
- **适用场景**：Use to understand early deep-RL TSC design choices.
- **误用警告**：Do not infer field superiority from offline/simulation performance alone.
- **原始链接**：https://doi.org/10.1145/3219819.3220096

## A08 · Learning Phase Competition for Traffic Signal Control

- **作者 / 年份**：G. Zheng, Y. Xiong, X. Zang, J. Feng, H. Wei, H. Zhang, Y. Li, K. Xu, Z. Li (2019)
- **期刊 / 会议**：ACM CIKM
- **DOI / 来源**：10.1145/3357384.3357900
- **影响力定位**：Influential FRAP paper; strong inductive-bias approach for RL signal control.
- **研究问题**：Generalizable all-phase selection under changing flow and intersection geometry.
- **治理启示**：Embedding traffic-control structure and symmetry can improve sample efficiency and transfer compared with generic neural policies.
- **适用场景**：Use for RL architecture design and generalization discussions.
- **误用警告**：Generalization still depends on simulator fidelity, demand distribution and action constraints.
- **原始链接**：https://doi.org/10.1145/3357384.3357900

## A09 · MetaLight: Value-Based Meta-Reinforcement Learning for Traffic Signal Control

- **作者 / 年份**：X. Zang, H. Yao, G. Zheng, N. Xu, K. Xu, Z. Li (2020)
- **期刊 / 会议**：AAAI
- **DOI / 来源**：10.1609/aaai.v34i01.5467
- **影响力定位**：Influential meta-RL traffic-signal paper at AAAI.
- **研究问题**：Fast adaptation to new traffic scenarios using experience from prior scenarios.
- **治理启示**：Transfer/adaptation should be treated as a first-class deployment requirement; training from scratch for every junction is not a practical governance plan.
- **适用场景**：Use for domain adaptation and rapid reconfiguration discussions.
- **误用警告**：Meta-training distribution can still mismatch deployment; require out-of-distribution stress tests.
- **原始链接**：https://doi.org/10.1609/aaai.v34i01.5467

## A10 · CityFlow: A Multi-Agent Reinforcement Learning Environment for Large Scale City Traffic Scenario

- **作者 / 年份**：H. Zhang, S. Feng, C. Liu, Y. Ding, Y. Zhu, Z. Zhou, W. Zhang, Y. Yu, H. Jin, Z. Li (2019)
- **期刊 / 会议**：The Web Conference
- **DOI / 来源**：10.1145/3308558.3314139
- **影响力定位**：Widely used large-scale traffic-signal RL simulation environment paper.
- **研究问题**：Scalable simulation for large multi-agent traffic-control experiments.
- **治理启示**：Simulation infrastructure affects conclusions; benchmark claims need reproducible network, demand, seed and simulator settings.
- **适用场景**：Use for experimental design and RL benchmark reproducibility.
- **误用警告**：Simulator speed is not simulator validity; calibrate behavioral and flow properties to the target setting.
- **原始链接**：https://doi.org/10.1145/3308558.3314139

## A11 · Multiagent Reinforcement Learning for Integrated Network of Adaptive Traffic Signal Controllers (MARLIN-ATSC): Methodology and Large-Scale Application on Downtown Toronto

- **作者 / 年份**：S. El-Tantawy, B. Abdulhai, H. Abdelgawad (2013)
- **期刊 / 会议**：IEEE Transactions on Intelligent Transportation Systems
- **DOI / 来源**：10.1109/TITS.2013.2255286
- **影响力定位**：Highly cited multi-agent RL signal-control paper in IEEE T-ITS.
- **研究问题**：Coordinated multi-agent learning across a large urban signal network.
- **治理启示**：Coordination can outperform independent agents, but network-scale validation and communication design are necessary.
- **适用场景**：Use as an early large-network MARL reference and comparison point.
- **误用警告**：Simulation-network results require careful baseline tuning and field-transfer analysis.
- **原始链接**：https://doi.org/10.1109/TITS.2013.2255286

## A12 · LibSignal: An Open Library for Traffic Signal Control

- **作者 / 年份**：H. Mei, X. Lei, L. Da, B. Shi, H. Wei (2022)
- **期刊 / 会议**：arXiv / open benchmark library
- **DOI / 来源**：https://arxiv.org/abs/2211.10649
- **影响力定位**：Useful reproducibility benchmark for cross-simulator TSC comparison.
- **研究问题**：Fair implementation and comparison of signal-control methods across simulators.
- **治理启示**：A governance Agent should prefer unified datasets, metrics, seeds and simulator calibration before ranking algorithms.
- **适用场景**：Use to define benchmarking protocol rather than as evidence that one method universally wins.
- **误用警告**：Preprint/library evidence is method-infrastructure evidence, not field deployment evidence.
- **原始链接**：https://arxiv.org/abs/2211.10649
