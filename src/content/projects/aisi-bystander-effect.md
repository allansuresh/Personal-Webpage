---
title: "Bystander Effect in LLM Agents"
summary: "5,120 scenarios across 20 domains measuring whether LLM agents intervene less when other agents are present, drawing on the classic Darley & Latané paradigm."
date: 2025-08-01
stack: ["Inspect AI", "distilabel", "Python"]
status: complete
---

## Premise

The bystander effect — people are less likely to help when others are
present — is one of the best-studied findings in social psychology. Does
something structurally similar show up in multi-agent LLM deployments? This
was the central question of my AISI Fellowship project at Georgia Tech.

## Method

- **Scale:** 5,120 generated scenarios spanning 20 domains, built on a
  distilabel-based generation pipeline.
- **Factors varied systematically:** group size, presence of an authority
  figure, clarity of the situation, and peer reaction.
- **Metrics:** a **Weighted Intervention Score (WIS)** and a **Diffusion of
  Responsibility Index (DRI)**, designed to capture not just whether an
  agent intervened but how the presence of other agents shifted that
  decision.

Evaluation tooling was built in both Inspect AI and custom Python, drawing
on the foundational Darley & Latané experiments as the behavioral baseline.

## Status

Complete. Publishing as an arXiv preprint is on the near-term roadmap.
