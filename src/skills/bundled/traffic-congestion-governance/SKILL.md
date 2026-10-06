---
name: traffic-congestion-governance
description: Evidence-grounded knowledge base for urban road traffic congestion governance, control strategy selection, congestion diagnosis, simulation evaluation, and literature-backed recommendations. Use when Claude Code needs to analyze recurrent or non-recurrent congestion, choose or justify traffic management measures, design signal/perimeter/freeway/transit/demand-management strategies, compare alternatives in traffic simulation, write ITSAC-style technical reports, or retrieve seminal/high-impact transportation papers on congestion pricing, induced demand, signal control, MFD/perimeter control, ramp metering, transit priority, integrated control, and RL traffic control.
---

# Traffic Congestion Governance

Use this skill as a **traffic-governance evidence base**, not as a generic prompt template.

## Mandatory reasoning order

1. Read `references/00_knowledge_map.md` for routing.
2. Diagnose the congestion mechanism before recommending measures; use `references/02_diagnosis_framework.md`.
3. Read the strategy file matching the mechanism.
4. Retrieve supporting papers from the relevant `references/papers_*.md` file and, if needed, `references/paper_catalog.csv`.
5. State assumptions, applicability limits, side effects, and evaluation KPIs.
6. Prefer mechanism-grounded classic/field evidence before novel AI methods.
7. For simulation or ITSAC tasks, read `references/14_evaluation_and_simulation.md` and `references/18_itsac_playbook.md`.

## Core governance rules

- Never equate low speed alone with a diagnosed cause.
- Never recommend capacity expansion without checking network equilibrium and induced demand.
- Never optimize an upstream movement without checking downstream receiving/storage capacity.
- Treat finite link storage and spillback as first-class constraints.
- Distinguish recurrent congestion from incidents, construction, weather, and events.
- Evaluate network-wide and person-based impacts, not only local vehicle delay.
- When using pricing, gating, or bus priority, explicitly analyze equity and boundary/side-street effects.
- Do not cite a paper as proof outside its tested domain; convert it to a conditional rule.
- For RL/Agent control, require strong transportation baselines, distribution-shift tests, safety constraints, and fallback behavior.

## Reference routing

- Governance principles: `references/01_governance_principles.md`
- Diagnosis: `references/02_diagnosis_framework.md`
- Strategy matrix: `references/03_strategy_selection_matrix.md`
- Pricing / parking / induced demand: `references/04_demand_pricing_parking.md`
- Road-space / network design: `references/05_road_space_network_design.md`
- Signal control: `references/06_signal_control_principles.md`
- Max-Pressure / RL: `references/07_max_pressure_and_rl.md`
- MFD / perimeter: `references/08_mfd_perimeter_control.md`
- Freeway / ramp metering / VSL: `references/09_freeway_corridor_control.md`
- Transit / multimodal: `references/10_transit_multimodal.md`
- Incidents / resilience: `references/11_incident_resilience.md`
- Integrated control: `references/12_integrated_control.md`
- Equity / environment / safety: `references/13_equity_environment_safety.md`
- Simulation evaluation: `references/14_evaluation_and_simulation.md`
- KPI dictionary: `references/15_kpi_dictionary.md`
- Failure modes: `references/16_failure_modes.md`
- Agent reasoning: `references/17_agent_reasoning_rules.md`
- ITSAC playbook: `references/18_itsac_playbook.md`
- Literature quality: `references/19_literature_quality_rules.md`
- Research gaps: `references/20_research_gaps.md`
- Paper index: `references/21_paper_index.md`
- Master bibliography: `references/22_master_bibliography.md`
- Source provenance: `references/23_source_provenance.md`

## Paper category files

- `references/papers_foundations.md`
- `references/papers_demand.md`
- `references/papers_signal.md`
- `references/papers_mfd.md`
- `references/papers_freeway.md`
- `references/papers_transit.md`
- `references/papers_ai.md`
- `references/papers_integrated.md`

## Output standard for governance recommendations

For each recommended strategy, provide:

1. **Target mechanism** — what causal mechanism it addresses.
2. **Action** — what to change operationally.
3. **Evidence** — 1–3 relevant papers from this skill.
4. **Applicability** — traffic state and infrastructure prerequisites.
5. **Side effects** — where congestion or cost may move.
6. **KPI** — how to evaluate success.
7. **Experiment** — baseline and counterfactual test.
8. **Fallback** — when to stop, revert, or downgrade the strategy.

When evidence is weak or only simulation-based, say so explicitly.
## Deep evidence routing

When the task is policy pricing, parking/curb, adaptive signals, DTA/diversion, freeway capacity drop, RL deployment, case evidence, or portfolio design, also read the matching files `references/24_*.md` through `references/34_*.md`. For literature-heavy answers, read `references/21_paper_index.md`, the relevant `references/papers_*.md`, and `references/34_paper_reading_protocol.md`. Treat paper impact as a discovery signal, not proof of transferability.
