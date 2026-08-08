---
title: "What Elicitation Gaps Hide"
summary: "Running the same CyBench tasks across a 2×2×2 condition matrix, the biggest driver of apparent capability wasn't guidance or tool access — it was whether the agent ran out of tokens."
date: 2026-04-20
project: cybench-elicitation-ablation
tags: ["evaluations", "cybench", "elicitation"]
---

Capability evaluations report a number: a model got *X%* on a benchmark.
That number quietly depends on a second thing that gets reported far less
carefully — how hard anyone tried to get the model to succeed. Tool access,
prompting, and guidance all shift the measured capability without touching
the model itself. I wanted to see how large that shift could be on a
benchmark where getting it wrong matters: [Cybench](https://cybench.github.io/).

## Setup, briefly

I ran Claude Sonnet 4.6 and Claude Haiku 4.5 across a 9-task Cybench subset
under a full 2×2×2 matrix — model × guidance (unguided vs. an explicit
vulnerability-class hint) × tool access (bash+python vs. bash-only). The
task subset spans all six Cybench categories and a range of difficulty
(human first-solve time 4–84 minutes), so a result isn't just an artifact
of clustering at one end.

## The result I expected, and the one I got

I expected the interesting number to be a *capability* gap — guidance and
tool access changing whether the agent could solve a task at all. That's
not what happened. Across every condition, whenever the agent finished a
task within its token budget, **it solved it correctly 100% of the time.**
The gaps in the raw pass rate were almost entirely explained by budget
exhaustion, not incorrect reasoning.

That only became visible by splitting the pass rate into two numbers: a
raw pass rate (limited/errored samples counted as failures) and a
conditional pass rate (correct ÷ finished samples only). The gap *between*
those two numbers was the actual finding — not a data-quality footnote to
mention in passing, but the headline result. An initial 100k-token cap cut
off roughly 44% of samples before they could even submit an answer; 300k
was needed to get clean data.

## Why this matters beyond one benchmark

A single pass-rate number conflates two very different failure modes:
"the model reasoned incorrectly" and "the model was still working when the
budget ran out." Those imply opposite things about capability. Reporting
elicitation as a single scalar (temperature, tool list, a paragraph of
prompt) without reporting the token budget — and without separating raw
from conditional pass rate — risks measuring infrastructure limits and
calling it a capability finding.

Full methodology, the per-task breakdown, and limitations (including how
tasks split into reliably-solved, reliably-budget-exhausted, and
budget-critical buckets) are in the [full report](https://github.com/allansuresh/cybench-benchmark/blob/main/cybench_elicitation_report.md).