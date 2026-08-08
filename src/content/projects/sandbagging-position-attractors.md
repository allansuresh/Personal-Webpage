---
title: "Sandbagging Detection via Position Attractors"
summary: "A 2×2×2 pilot extending Cacioli's 2026 position-attractor work to a frontier model, testing whether reasoning-permission changes whether sandbagging leaves a detectable signature."
date: 2026-07-10
stack: ["Inspect AI", "GPQA Diamond", "ARC-Easy", "SciPy"]
status: complete
featured: true
repoUrl: "https://github.com/allansuresh/ai-sandbagging"
writeupUrl: "https://github.com/allansuresh/ai-sandbagging/blob/main/FINDINGS.md"
---

## Background

Sandbagging — a model deliberately underperforming on an evaluation — is
hard to detect precisely because it's designed to look like ordinary
failure. This is a small pilot extending Jon-Paul Cacioli's 2026 work on
**position attractors** (established rigorously, at scale, on 7–9B open
models) to a frontier model, and testing a reasoning-permission axis the
original work flagged as untested. It replicates and extends prior work at
pilot scale — it is not a novel discovery in its own right, and the repo
is explicit about that distinction.

## Design

A full 2×2×2 factorial design: difficulty (easy/hard) × reasoning
permission (allowed/forbidden) × condition (honest/sandbagging), holding
the other two factors constant in each comparison.

- **Hard tier:** GPQA Diamond — 198 graduate-level, expert-validated
  multiple-choice questions, where both "genuinely doesn't know" and
  "deliberately sandbagging" are plausible explanations for a wrong answer.
- **Easy tier:** ARC-Easy — 5,197 grade-school science questions, chosen to
  share domain and origin with GPQA and remove the sample-size ceiling an
  earlier hand-written trivia set had.
- **Detectors:** a confidence/accuracy gap, a response-position attractor
  test (option order re-shuffled per repeat, analyzed with a chi-squared
  goodness-of-fit test), and a weaker-model-imitation control — the most
  important of the three, since black-box error-pattern comparisons are
  known to be defeated when a model simply imitates a weaker model well.

## What went into getting a trustworthy result

The project's own README documents the process as much as the outcome: an
early p=0.0074 "result" turned out to be an analysis bug mixing correct
and incorrect answers together; the corrected analysis on GPQA came back
null; the null turned out to be confounded with a simultaneous change in
reasoning-permission; and the weaker-model-imitation control's conclusion
*changed* once the weak reference model was swapped from a same-family
model (Claude Haiku) to a genuinely cross-family one (Llama 3.1 8B) — same
training lineage can inflate apparent overlap for reasons unrelated to
sandbagging.

## Findings

- **Reasoning-allowed elicitation:** no position attractor, at either
  difficulty level, in either condition (all p > 0.3).
- **Reasoning-forbidden elicitation:** a strong, replicated position
  attractor at both difficulty levels (p=0.0001 and p<0.0001).
- **But it isn't a clean sandbagging signal on its own** — under
  reasoning-forbidden elicitation, even the *honest* baseline shows
  significant skew on the hard tier (p=0.013), on a different letter than
  the sandbagging condition's cluster. Some of the effect is a generic
  artifact of forced instant-answer elicitation; sandbagging appears to add
  a further, distinct bias on top of that rather than being the sole cause.

**Practical implication:** a black-box sandbagging detector needs to
specify which elicitation mode it was validated under, and should report a
matched honest-baseline control before attributing observed skew to
sandbagging specifically. Full attribution, statistics, and the
weaker-model-imitation writeup are in `FINDINGS.md`.