---
name: transportation
description: 当用户讨论、分析、解释、计算或研究交通工程问题时使用，支持交通流、排队、信号配时、交通规划、公交、道路设计、拥堵机理诊断、治理策略比较、交通仿真评价和文献证据；整合 Fundamentals of Transportation 教材和拥堵治理资料。日常通勤建议、软件或网络流量问题本身不触发本技能。
---

# Transportation engineering knowledge base

Use this skill when the user's intent is transportation engineering analysis
or discussion. Select it through normal Skill intent matching; a separate
classifier or extra model call is not needed. For explicit invocation, use
`/transportation`; `traffic-congestion-governance` is a compatibility alias.

## Choose the relevant collection

- For foundational theory, definitions, formulas and textbook calculations,
  read INDEX.md and the matching files under references/.
- For congestion diagnosis, governance strategies, evidence-backed comparisons,
  simulation evaluation or literature research, read governance/SKILL.md and
  governance/references/00_knowledge_map.md, then only the relevant references.
  Paths such as references/02_diagnosis_framework.md in the governance document
  are relative to governance/, not to the textbook directory. Treat governance/
  as that document's base directory.
- When a task needs both, use textbook chapters for the theoretical basis and
  governance references for diagnosis, strategies, experiments and evidence.
  Distinguish the source of each claim. Governance literature notes are supplied
  summaries and metadata, not full texts or independently verified citations;
  consult governance/references/23_source_provenance.md and the original papers
  for precise numbers, formulas, experimental settings and quotations.

Both collections are bundled offline; read files on demand, not the entire
knowledge base. Apply the governance reasoning/output workflow only to tasks
that need governance recommendations, not to every textbook question.

## Textbook use

Use this bundled source for transportation engineering explanations, textbook
calculations, and the theory behind traffic simulation. All text references ship
with Tran Agent; invoking this skill extracts them to the base directory above.

1. Read INDEX.md to select chapters. For Chinese questions, use its bilingual
   topic routing to find the English terms. Search the references with Grep when
   the relevant subsection is unclear, then Read the matching files.
2. Ground definitions, formulas and examples in the actual reference passages.
   Read surrounding definitions before calculating; state units, assumptions,
   applicability and the distinction between per-lane and aggregate quantities.
3. Answer in the user's language. Cite the book, chapter/subsection and original
   source URL recorded in the reference. Distinguish source content from your
   derivations, simulation implementation choices, and supplemental information.
4. The snapshot includes short outlines and unfinished pages. If a passage does
   not answer the question, say so and use additional sources when needed. The
   book is foundational teaching material; check current local standards for
   design compliance. Do not present textbook examples as calibrated parameters
   for the user's network.
5. Math is retained as TeX. The source itself includes malformed delimiters and
   inconsistent labels (for example, the space-mean-speed section labels its
   harmonic mean with a time-mean-speed subscript). Check dimensions and the
   surrounding definitions; label a correction as your derivation rather than
   silently attributing it to the book. Images are external links, not offline assets. Open
   the source page when a figure or ambiguous conversion matters. Do not invent
   a missing figure, equation, exercise solution or citation.

Read ATTRIBUTION.md when copying or adapting substantial textbook material.
The textbook adaptation is CC BY-SA 4.0, attributed to David Levinson et al.,
Wikibooks contributors and LibreTexts. references/manifest.json identifies the
snapshot and checksums. Do not load the entire book into the conversation.

If no base directory was provided or the reference files cannot be read, report
that local extraction failed and use the original source online if available:
https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation
