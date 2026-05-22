---
title: "Bye SWE-Bench? Cursor Ships CursorBench for Coding Agents"
date: "2026-03-10"
excerpt: "From a Zhihu column: hybrid offline/online evals on real dev tasks—and why old benchmarks stop separating top models."
tags: ["AI", "Cursor", "Coding Agents", "Benchmarks", "SWE-Bench"]
---

> Adapted from a Zhihu column: [Cursor launches CursorBench](https://zhuanlan.zhihu.com/p/2016139463613522421). Rights belong to the original author.

**Cursor** released **CursorBench**—a benchmark aimed at agentic coding: which model, inside Cursor, actually behaves like a productive agent on **realistic dev work**?

## Why old benches stall

**SWE-Bench** and friends mattered, but at the frontier:

- Tasks still aren’t full engineering reality  
- Scores cluster; **separation collapses**  
- Offline winners ≠ what users feel day to day  

Cursor’s answer: **blend offline tasks with live product signals**.

## Offline CursorBench

1. Same task set for each model  
2. Score **correctness, code quality, efficiency, interaction style**  
3. Compare offline numbers  

Tasks grew ~2× from early sets to **CursorBench-3** (lines touched, files involved)—closer to serious session work.

## Online eval: do users keep the code?

A/B tests in production: do developers **accept** generations and **keep iterating**? Cursor reports **offline ranks track those online signals** better than legacy benches.

## So what?

- **More spread** among frontier models on CursorBench  
- Rankings align better with “pleasant to ship with”  
- Agent era needs benchmarks rooted in **how people actually build**

## Next: longer-running agents

CursorBench-3 still fits one session, but they expect most work to move to **long-horizon agents on local machines**—future suites will stretch tasks accordingly.

---

For practitioners, the lesson isn’t the leaderboard—it’s to match evals to **your** workflow instead of one public number.
