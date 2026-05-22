---
title: "54.6k Star：用 12 节课从 0 造出 Claude Code 同款引擎"
date: "2026-05-19"
category: tech
excerpt: "摘自知乎想法，介绍 GitHub 项目 learn-claude-code：智能来自模型训练，Harness 工程师为模型建造它能居住的世界。"
tags: ["人工智能", "Claude", "智能体", "编程", "编译代码", "虚拟制作", "代码变现", "ClaudeCode"]
---

> 本文整理自知乎想法：[54.6k Star、9k Fork，这个项目用12节课教你从0造出Claude Code同款引擎](https://www.zhihu.com/pin/2033491876934833059)，作者 @代码科小土豆。版权归原作者所有。关联专栏：[全文链接](https://zhuanlan.zhihu.com/p/2033490899401957920)

我在 GitHub Trending 看到一个仓库叫 **learn-claude-code**，开头第一段话直接给我整不会了：

> Agency — the ability to perceive, reason, and act — comes from model training, not from external code orchestration.

（智能来自模型训练，不来自外部代码编排。）

这句话戳穿了过去两年 AI 圈里一个价值数十亿美元的集体幻觉——那些把 LLM API 用 if-else 分支和节点图串起来，然后叫它「Agent」的产品。README 里的原话更毒：

> What they build is a Rube Goldberg machine... That is not an agent. That is a shell script with delusions of grandeur.

（他们造出来的是一台鲁布·戈德堡机械……那不是 Agent，那是一个妄自尊大的 Shell 脚本。）

## 项目在讲什么

这个项目的核心定位，是用 **12 个渐进式 Session**，带你亲手实现一个迷你版的「AI Agent 引擎」。它用五个历史里程碑来证明 *Intelligence comes from training, not coding*，然后给出结论：

> Agency — the ability to perceive, reason, and act — is trained, not coded.

（能动性——感知、推理与行动的能力——是被训练出来的，而不是被编码出来的。）

## Harness 工程师：模型是驾驶员，你是造车的人

这个铺垫是为了说一件事：你作为 **Harness 工程师**，你的工作不是给模型编写智能，而是给模型建造它能居住的世界。

- **模型**是驾驶员
- **Harness**是车辆

整个项目从头到尾都不打破这个原则——12 个 Session 加了 12 个机制，**核心循环一行都没有改变**。

![learn-claude-code 项目截图 1](https://pic4.zhimg.com/v2-2cc60b32ac81d2f4cf5d3651be5f8b4d.jpg)

![learn-claude-code 项目截图 2](https://pic2.zhimg.com/v2-9c863af0408c5e38a1d57d0600bef5ab.jpg)
