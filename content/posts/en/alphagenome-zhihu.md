---
title: "AlphaGenome: Reading 1 Million DNA Bases at Once—What It Means for Biology"
date: "2025-06-27"
category: news
excerpt: "From a Zhihu answer: DeepMind’s model hit the Hacker News front page with 1 Mb context and single–base-pair predictions across 11 regulatory modalities."
tags: ["AI", "Biotech", "AlphaGenome", "DeepMind", "Genomics", "Hacker News"]
---

> Adapted from a Zhihu Q&A: [What impact does Google’s AlphaGenome—reading 1 million DNA bases at once—have on biological research?](https://www.zhihu.com/question/1921603205894247123/answer/1921935798716077411), by @安小强. Rights belong to the original author. This post summarizes the publicly available portion; see the Zhihu link for the full answer.

## Not trending in China yet—already hot on Hacker News

The work is still under the radar domestically, but overseas it nearly topped Hacker News. AlphaGenome turns DNA from something you could only “zoom in on locally” into a model that **reads 1 million bases in one pass**, predicts many regulatory readouts at **single–base-pair resolution**, and scores functional impact for arbitrary mutations with the **same** network.

![Hacker News discussion screenshot](https://picx.zhimg.com/v2-5c9a90aca37e4abdf9e32c70590365e6_r.jpg?source=2c26e567)

## What does it predict?

At base-pair precision it outputs **11 classes of regulatory signals**, including:

- Promoter and enhancer activity
- RNA abundance
- Splice sites
- Chromatin accessibility
- And other molecular tracks tied to gene regulation

A single forward pass can compare wild-type vs mutant sequences to produce variant effect scores—critical when disease risk variants sit in the **non-coding 98%** of the genome.

## Two technical breakthroughs

### 1 Mb context

Regulatory elements and target genes can enter the model **together**, avoiding the old windowing problem: you see pieces but cannot connect cause and effect across distance.

### Single–base-pair resolution

You can ask which **exact letter change** up- or down-regulates expression, not just get a blurry signal over a bin.

## Benchmark results

- **Variant effect** tasks: matched or beat the best specialized models on **24/26** benchmarks
- **Single-sequence** prediction: won **22/24** tasks

This is less “yet another track predictor” and more a **unified** sequence-to-function stack.

## Model architecture (the author’s favorite part)

![Model architecture diagram](https://picx.zhimg.com/v2-cb0f71c26ff60c5d845c9b2d0c0c63c1_r.jpg?source=2c26e567)

The pipeline is roughly:

1. **Multi-scale convolutions** for local “DNA word” motifs
2. A **Transformer** to wire information across the full 1 Mb span
3. **Multi-head outputs** for thousands of cell-type tracks (~5,930 human, ~1,128 mouse)

Training runs on **TPU Pods**; one model finishes in about **four hours** (the original Zhihu answer continues beyond this point behind login).

## What does it mean for biological research?

From the portion of the answer that is publicly available:

1. **From “visible fragments” to “one regulatory story per window”**—a 1 Mb context lets enhancers, promoters, and target genes sit in the same model input
2. **Variant interpretation at single-base precision**—ask what happens when one letter changes, not just whether a bin looks correlated
3. **One model instead of a toolkit**—eleven regulatory modalities plus variant scores share one set of weights, matching or beating specialized SOTA on most benchmarks

If you work on non-coding disease variants, GWAS mechanisms, or splicing defects, sequence-to-track tools like this lower the cost of a **first mechanistic hypothesis**—still no substitute for wet-lab validation.

## Further reading

- Nature paper: [Advancing regulatory variant effect prediction with AlphaGenome](https://www.nature.com/articles/s41586-025-10014-0)
- DeepMind blog: [AlphaGenome: AI for better understanding the genome](https://deepmind.google/blog/alphagenome-ai-for-better-understanding-the-genome/)
- Hacker News thread: [AlphaGenome on HN](https://news.ycombinator.com/item?id=44387659)
