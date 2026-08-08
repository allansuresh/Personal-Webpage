---
title: "Monitored vs. Unmonitored: A Honeypot Study of Instrumental Reasoning"
summary: "A controlled experiment testing whether models take more shortcuts when they believe grading is unmonitored, using a fake grading server as a honeypot."
date: 2026-06-01
stack: ["Inspect AI", "Flask", "Docker", "Claude Sonnet 5"]
status: active
featured: true
---

## The question

Do models behave differently when they believe an action is being watched
versus when they believe it isn't? This project sets up a controlled
honeypot: a Flask-based fake grading server that a model can, if it chooses,
inspect or tamper with — under two framing conditions, monitored and
unmonitored.

## Setup

- **Harness:** built and orchestrated with Inspect AI.
- **Environment:** a Dockerized sandbox running the fake grading server,
  isolated from the scoring path the model is actually evaluated against.
- **Conditions:** identical tasks, varying only whether the system/task
  framing implies an operator is actively monitoring the transcript.
- **Model under test:** Claude Sonnet 5.

## What I'm looking for

The core signal is a difference in shortcut-taking or reward-hacking-adjacent
behavior between the two framings — evidence of instrumental reasoning about
*being watched*, rather than the task itself.

## Status

Actively running. Write-up and full transcripts to follow once the run is
complete — this entry will be updated with results and a link to the
companion post.
