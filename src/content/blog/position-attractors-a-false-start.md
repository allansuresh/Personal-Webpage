---
title: "A Position Attractor, a False Start, and What Elicitation Mode Was Hiding"
summary: "An early p=0.0074 result didn't survive a second look — the bug that caused it, and the corrected 2×2×2 design that found something more specific underneath, are more useful than the original number would have been."
date: 2026-03-02
project: sandbagging-position-attractors
tags: ["evaluations", "sandbagging", "methodology"]
---

*Epistemic status: a small pilot (n≈45–90 per cell), extending someone
else's much more rigorous work to a setting they explicitly flagged as
untested. Treat the effect sizes as suggestive, not settled — the point of
this post is more about the methodological trap I fell into than about the
headline numbers.*

**TL;DR:** I set out to test whether a known black-box sandbagging signal
(the "position attractor" — Cacioli 2026) replicates on a frontier model.
An early run produced an exciting p=0.0074. It didn't survive a bug check.
The corrected version found a real but much narrower effect: the attractor
shows up when the model isn't allowed to reason before answering, and even
then it's partly explained by a generic artifact of forced instant-answer
elicitation rather than sandbagging alone.

## Background

Sandbagging — a model deliberately underperforming on an eval — is defined
by looking like ordinary failure, which is what makes black-box detection
hard. Cacioli's 2026 papers established, at real scale (2,000 items, 24,000
trials, cyclic-permutation controls) on 7–9B open models, that sandbagging
models sometimes show a **position attractor**: their wrong answers
cluster on a specific multiple-choice letter, independent of content, in a
way honest wrong answers don't. Two things Cacioli's papers explicitly
flagged as untested: whether this holds at frontier-model scale, and
whether reasoning permission (can the model think before answering)
changes it. That's the gap this pilot tries to fill.

## What I did

Built an Inspect AI pipeline with three black-box signals — confidence/accuracy
gap, the position-attractor test itself, and a weaker-model-imitation
control — and ran them across a 2×2×2 design: difficulty (GPQA Diamond /
ARC-Easy) × reasoning permission (allowed / forbidden) × condition
(honest / sandbagging).

## The false start

The first version used a hand-written 24-item trivia set. It produced a
striking result: a chi-squared p=0.0074 on the position-attractor test.
Exciting enough that I almost wrote it up as-is. Before doing that, I went
back through the analysis code, and found it had been pooling correct and
incorrect answers together. That's a real problem, not a stylistic
one — a *correct* answer's position just reflects wherever option-shuffling
happened to place the true answer, which has nothing to do with any model
bias. Mixing it in with wrong answers dilutes any real signal with noise
that isn't about the hypothesis at all.

I isolated wrong answers only and re-ran it on a real benchmark (GPQA,
swapped in specifically so that wrong answers could plausibly reflect
genuine capability limits rather than only deliberate sandbagging). The
result came back null. No attractor.

That looked like a contradiction — a real effect on trivia, gone on
GPQA — until I noticed difficulty and reasoning-permission had both
changed between the two runs. Neither variable alone could be blamed. That
confound is what forced the design into a proper 2×2×2, holding two
factors constant in every comparison rather than eyeballing a single
before/after difference.

## What held up

- **Reasoning-allowed elicitation:** no position attractor, at either
  difficulty level, in either condition (all p > 0.3).
- **Reasoning-forbidden elicitation:** a strong, replicated attractor at
  both difficulty levels (p=0.0001, p<0.0001).
- **The complication:** under reasoning-forbidden elicitation, the honest
  baseline *also* shows significant skew on the hard tier (p=0.013) — on a
  different letter than the sandbagging condition clusters on. Some of the
  effect is a generic artifact of forcing an instant answer with no
  reasoning, independent of sandbagging. Sandbagging appears to add a
  further, distinct bias on top of that baseline skew, not to be the whole
  story.

## The control that changed my mind twice

The weaker-model-imitation control checks something specific: does a
sandbagging model's wrong-answer *pattern* look statistically like a
genuinely weaker model's wrong-answer pattern? This is the control the
sandbagging-detection literature says matters most, because black-box
error-pattern comparisons are known to be defeated when a model just
imitates a weaker model convincingly.

My first pass used Claude Haiku as the "weak" reference model. The overlap
looked meaningful. Then it occurred to me that Haiku and Sonnet share
training lineage — any overlap in error patterns could be inherited
similarity, not evidence about sandbagging at all. Re-running the same
control against a genuinely cross-family weak model (Llama 3.1 8B) changed
the conclusion. I'm not going to summarize which direction it changed in
here, because the honest version of that sentence needs the sample size
and the actual overlap statistic next to it, not a soundbite — that's in
`FINDINGS.md` in the repo, linked from the project page.

## What I'd take from this if I were reviewing someone else's detector

If I read a paper claiming a black-box sandbagging detector without
specifying (a) whether the model was allowed to reason before answering
and (b) a matched honest-baseline control run under identical elicitation
conditions, I'd now discount the claim substantially. "Skew exists" isn't
sufficient evidence of sandbagging by itself — you have to subtract out
whatever skew the elicitation mode produces on its own first. That's not a
hypothetical caveat; it's the specific thing that made my first "result" on
trivia look real and my first attempt at GPQA look like a contradiction.

## Caveats

This is a pilot, not a replication at Cacioli's scale — single-digit-to-low-hundreds
samples per cell, one frontier model family, English-language
multiple-choice benchmarks only. I'd want at least a second model family
and larger cells before treating any of these p-values as more than
suggestive. The full writeup, including the exact statistics I'm eliding
above, is in the repo.