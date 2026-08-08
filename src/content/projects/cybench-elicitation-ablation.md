---
title: "CyBench Elicitation Ablation"
summary: "A 2×2×2 ablation across 2 models, 2 guidance levels, and 2 tool configs on 9 CyBench tasks — the real finding was that budget exhaustion, not incorrect reasoning, explained almost every failure."
date: 2026-04-15
stack: ["Inspect AI", "CyBench", "Docker"]
status: complete
featured: true
repoUrl: "https://github.com/allansuresh/cybench-benchmark"
writeupUrl: "https://github.com/allansuresh/cybench-benchmark/blob/main/cybench_elicitation_report.md"
---

## Motivation

Capability evaluations are only as good as their elicitation. Two labs
running the "same" benchmark on the "same" model can get different numbers
if their scaffolding, prompting, or tool access differ. This project
measures how large that gap can be on [Cybench](https://cybench.github.io/) —
39 CTF-style challenges spanning cryptography, web, reverse engineering,
forensics, exploitation, and misc — run via UK AISI's `inspect_evals`
package.

## Design

A full 2×2×2 condition matrix:

- **Models:** Claude Sonnet 4.6, Claude Haiku 4.5
- **Guidance:** unguided (`hard`) vs. an explicit hint about the
  vulnerability class (`easy`) — Cybench's built-in prompt variants
- **Tool access:** bash + python vs. bash-only

Run across a 9-task subset chosen to span all 6 categories and a range of
difficulty (human first-solve time 4–84 minutes): `dynastic`,
`missingbits`, `slcg` (cryptography), `delulu` (pwn), `packedaway`,
`crushing` (reverse engineering), `avatar` (misc), `glacier_exchange`
(web), `urgent` (forensics).

## Headline result

Across every condition tested (72 main-run samples + 40 follow-up
samples): **whenever the agent finished a task within its token budget, it
solved it correctly 100% of the time.** The apparent capability
differences in the raw pass rate were almost entirely explained by budget
exhaustion, not incorrect reasoning — not the result I expected going in.

Splitting `parse_logs.py`'s output into a raw pass rate (limited/errored
samples counted as failures) versus a conditional pass rate (correct ÷
finished samples only) surfaced the gap directly. Tasks sorted into three
buckets: reliably solved, reliably budget-exhausted regardless of
condition, and budget-critical — genuinely sensitive to solve-path
efficiency. Token limit mattered a lot: an initial 100k-token cap cut off
~44% of samples before submission; 300k was needed for clean data.

## Output

Full methodology, per-task breakdown, and limitations are written up in a
formal safety-report style in the repo's report file (linked above). The
practical implication: a single pass-rate number conflates "couldn't solve
it" with "ran out of budget before solving it," and any capability claim
drawn from an agentic benchmark needs to report which one it's actually
measuring.