---
title: "OpenClaw 背后的 Pi：好的 Coding Agent 让用户自己决定需要什么"
date: "2026-03-18"
category: tech
excerpt: "摘自知乎专栏：极简 harness、不到 1000 tokens 提示词，以及为何 Terminal Bench 前五不需要 MCP。"
tags: ["人工智能", "编程智能体", "OpenClaw", "开源", "Pi"]
---

> 本文整理自知乎专栏：[OpenClaw 背后核心框架 Pi](https://zhuanlan.zhihu.com/p/2017400881730056207)。版权归原作者所有。

开源个人 AI 助手 **OpenClaw** 爆火，但其核心其实是一个「做减法」的框架：**Pi-coding-agent**。

## 极简到令人怀疑

与 Claude Code、Cursor、Codex 相比，Pi 的特点几乎是「什么都没有」：

- 系统提示词 + 工具定义 **合计不到 1000 tokens**（Claude Code 常超 10000）
- 核心工具只有 **read、write、edit、bash** 四个
- 无内置 plan mode、无 to-do、**不支持 MCP**、无权限弹窗、不绑定特定模型

即便如此，它在 **Terminal Bench 2.0** 上与 Codex、Cursor、Windsurf 同进前五；GitHub 上已有 **2.4 万+ stars**。

作者 **Mario Zechner**（libGDX 创始人）的理念：**好的 coding agent 不应预设你需要什么，而应让你自己决定。**

## 灵感：Terminus 与「模型已懂 harness」

Mario 观察 Terminal Bench 上的 **Terminus** harness：只给 LLM 一个与 tmux 交互的工具，靠发送按键、读 ANSI 输出完成任务，却长期位居前三。

结论：经过大量 RL 训练后，**模型天然理解 coding harness 是什么**，不必堆叠厚重外壳。Pi 就是这一思路的实现。

## 主动选择「不做」什么

### 不用 MCP，用 CLI + README

主流 MCP 会在上下文里灌入大量工具定义（Playwright MCP 约 13700 tokens）。Mario 的替代方案：为每个能力写 **CLI + README**，agent 按需阅读（浏览器自动化整套仅约 225 tokens）。

### 不内置 plan mode / to-do / SubAgent

- 规划：直接说「先想清楚，别改文件」或写入 **PLAN.md** 版本化
- to-do：经验上常让模型更困惑
- SubAgent：黑箱里的黑箱；需要时用 bash 再起一个 Pi 实例，**完全可观测**

Mario 直言：session 中途 spawn 子 agent 收集上下文，说明**没规划好**；应先在独立 session 产出 artifact，再带着干净上下文开工。

### 并行 SubAgent 往往是反模式

多人并行改代码库，除非你不介意最终变成「垃圾山」。探索型优化（往墙上扔方案看哪个粘住）适合并行；**功能构建**仍应在 loop 里由人拍板。

## 安全：承认「三体难题」

读本地文件 + 执行代码 + 访问网络 ≈ 传统权限弹窗拦不住（用户最终会一路 Yes）。Pi 的策略是默认 **YOLO**，建议敏感环境用 **Docker** 隔离。

## 记忆：代码库就是真相

编程任务不需要额外向量记忆层。**让 agent 每次探索当前代码库**，比维护一份一周就过时的文档更可靠。Claude Code 的「搜索」被 Mario 视为伟大发明之一。

## 「工具变笨了」不是错觉

Mario 的工具 **cchistory** 追踪 Claude Code 各版本提示词与工具的**静默变更**——用户不知情，但 session 行为已被改写。这是他做 Pi 的动机：**确定性的 harness，改什么自己说了算。**

---

Pi 不是「阉割版 Claude Code」，而是一台 **meta slop machine**：给 power user 一块空地，自己搭建 agent；作者本人则住在极简的斯巴达世界里。
