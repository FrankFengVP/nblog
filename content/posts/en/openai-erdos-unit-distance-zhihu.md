---
title: "OpenAI Model Disproves Erdős Unit Distance Conjecture"
date: "2026-05-20"
category: news
excerpt: "From a Zhihu column: a general reasoning model found counterexamples with n^(1+δ) unit-distance pairs; δ refined to 0.014; proof verified externally."
tags: ["AI", "OpenAI", "Mathematics", "Erdős", "Discrete Geometry", "Research"]
---

> Adapted from a Zhihu column: [OpenAI model disproves the Erdős unit distance conjecture](https://zhuanlan.zhihu.com/p/1975182964951385616). Rights belong to the original author. The Zhihu article could not be fully fetched via API; this summarizes [OpenAI’s announcement](https://openai.com/index/model-disproves-discrete-geometry-conjecture/) and public coverage. See the Zhihu link for the full column.

In May 2026, OpenAI announced that an **internal general-purpose reasoning model** made a breakthrough in discrete geometry: it autonomously constructed counterexamples that **disprove** Paul Erdős’s 1946 **planar unit distance conjecture**. External mathematicians verified the proof and wrote a companion exposition.

Fields medalist **Timothy Gowers** calls it **a milestone in AI mathematics**; number theorist **Arul Shankar** argues current models can go beyond assisting humans to producing and executing **original, ingenious** ideas.

## A simple question, a hard wall

Place **n points** in the plane. How many **pairs** are exactly distance 1 apart?

Let **u(n)** be the maximum possible count.

- A line: about **n−1** pairs  
- A square grid: about **2n** pairs  
- Erdős’s 1946 refined grid (Gaussian integers): about **n^(1 + C/log log n)** — the lower bound barely moved for ~80 years  

For decades, many believed grid-like layouts were essentially optimal. Erdős conjectured an upper bound of **n^(1+o(1))** — only slightly faster than linear, with no **fixed exponent** gain.

For upper bounds, Spencer–Szemerédi–Trotter (1984) gave **u(n) = O(n^(4/3))**, with limited improvement since.

## What OpenAI did

The model produced an **infinite family** of n-point configurations with at least:

**u(n) ≥ n^(1+δ)**

for some fixed **δ > 0** (the original AI proof did not pin δ; Princeton’s **Will Sawin** later refined **δ = 0.014**).

This does not tighten an upper bound—it **refutes** the core conjecture that growth must stay at **n^(1+o(1))**, delivering a **polynomial-level** improvement for infinitely many n.

## Why it shocks: geometry question, number-theory proof

The key move is **algebraic number theory**, not routine combinatorial geometry:

- Erdős used **Gaussian integers** (a+bi) for grid intuition  
- The new construction uses richer **algebraic number fields** and symmetries  
- The argument invokes tools like **infinite class field towers** and **Golod–Shafarevich theory** to show the required fields exist  

Noga Alon praised the **elegant, clever** use of deep number theory in the analysis.

## Why it matters: general model, not a math-only system

OpenAI stresses:

- The proof came from a **new general reasoning model**, not a bespoke math prover  
- The model was evaluated on a broader set of **Erdős problems** and solved this one  
- Long, checkable proof chains are a strong test of **coherent multi-step reasoning** and cross-domain linking  

Human mathematicians then verified, wrote companion notes, and sharpened δ. Thomas Bloom’s remarks suggest number-theoretic constructions may matter more in discrete geometry than expected—and may inspire follow-up problems.

## References

- [OpenAI blog post](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)
- [AI proof PDF](https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-proof.pdf)
- [Companion remarks PDF](https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-remarks.pdf)

## Takeaway

This is a high-profile case of **AI autonomously resolving a central open problem**: elementary statement, long history, proof via unexpected number theory. It reframes the unit distance problem and hints that similar long-chain, cross-field reasoning may matter beyond math. Full peer review continues—but the signal is clear: **sit down before the next problem.**
