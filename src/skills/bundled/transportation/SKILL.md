---
name: transportation
description: 查阅 David Levinson 等人的 Fundamentals of Transportation 内置教材，支持交通规划、交通流、排队、公交、信号控制和道路几何设计。
---

# Transportation textbook knowledge base

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
