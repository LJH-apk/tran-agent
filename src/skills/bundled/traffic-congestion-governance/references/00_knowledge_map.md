# 城市交通拥堵治理知识地图

## 目标

本 Skill 把交通拥堵治理视为“诊断—机制—策略—约束—评估—迭代”的闭环，而不是把所有问题都归结为“加车道、改配时”。

## 五层知识结构

### L0 目标层：先回答“治理什么”
- 车辆效率：总延误、总旅行时间、排队、可靠性。
- 人员效率：人均延误、公交乘客延误、可达性。
- 网络韧性：事故恢复、溢出风险、局部失效是否扩散。
- 公平性：不同收入、地区、出行方式之间的成本与收益分配。
- 安全与环境：冲突风险、排放、噪声、能源。

### L1 诊断层：拥堵属于哪一种
- 需求超过供给：持续过饱和。
- 控制失配：绿信比、周期、相位、协调关系不合理。
- 空间失配：车道功能、转向比例、瓶颈位置、汇入/交织。
- 下游阻塞：出口、相邻路口、公交站、停车、装卸、事故导致回溢。
- 网络失稳：局部排队扩散、网格锁死、MFD 过临界。
- 非常发事件：事故、施工、天气、活动、学校医院集中到发。
- 行为与政策：停车巡游、导航重分配、诱导需求、时段集中。

### L2 策略层：治理工具箱
1. 信号与交叉口控制。
2. 周界/区域控制与 MFD。
3. 快速路匝道控制与 VSL。
4. 路网/车道/渠化与道路空间再分配。
5. 需求管理：定价、停车、出行时段、预约与访问管理。
6. 公交优先、多模式与人员效率。
7. 路径诱导、VMS、导航协同。
8. 事故管理、应急控制与韧性。
9. 综合控制：把多个措施在共同目标下协调。

### L3 证据层：论文与经验
- 核心文献见 papers_*.md。
- 主论文元数据表见 paper_catalog.csv。
- 论文必须作为“证据”，不能机械变成规则。

### L4 Agent 决策层
- 先定位问题，再推荐策略。
- 给出至少 2 个备选机制假设。
- 每个方案写明：机制、前提、数据需求、风险、KPI、验证实验。
- 避免只优化一个局部指标。

## 快速路由
- 为什么“加路”可能没用 → `04_demand_pricing_parking.md` + `05_road_space_network_design.md`
- 交叉口堵、排队回溢 → `06_signal_control_principles.md`
- 整个片区网格锁死 → `08_mfd_perimeter_control.md`
- 快速路入口/合流堵 → `09_freeway_corridor_control.md`
- 公交与小汽车冲突 → `10_transit_multimodal.md`
- 事故/施工/活动拥堵 → `11_incident_resilience.md`
- 多策略组合 → `12_integrated_control.md`
- 怎么设计仿真实验 → `14_evaluation_and_simulation.md`
- 怎么让 Agent 自动治理 → `17_agent_reasoning_rules.md`
- 查论文 → `papers_*.md` / `paper_catalog.csv`

## 深度治理与论文证据扩展（第二层）

- 拥堵收费与可接受性 → `24_pricing_acceptability.md`
- 停车 / 路缘 / 巡游 → `25_parking_curb_management.md`
- 自适应信号谱系 → `26_adaptive_signal_systems.md`
- DTA / 路径诱导 / 二次拥堵 → `27_dynamic_assignment_route_guidance.md`
- 快速路容量下降 → `28_freeway_bottleneck_capacity_drop.md`
- RL 部署与公平 benchmark → `29_rl_deployment_benchmarking.md`
- 城市/现场案例证据 → `30_policy_case_evidence.md`
- 组合治理方案 → `31_strategy_portfolio_templates.md`
- 经典到现代的论文阅读路径 → `32_literature_reading_map.md`
- 机理—策略决策表 → `33_governance_decision_tables.md`
- 论文证据抽取与证据等级 → `34_paper_reading_protocol.md`

- 必读经典/高影响短名单 → `35_must_read_papers.md`
- 治理原则反查论文 → `36_principle_evidence_matrix.md`
- 文献证据形式快速筛选 → `paper_evidence_matrix.csv`
