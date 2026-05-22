---
title: "Pi Behind OpenClaw: A Coding Agent That Lets You Choose What You Need"
date: "2026-03-18"
category: tech
excerpt: "From a Zhihu column: a minimal harness under 1k tokens of prompts—and a Terminal Bench top-five without MCP."
tags: ["AI", "Coding Agents", "OpenClaw", "Open Source", "Pi"]
---

> Adapted from a Zhihu column: [Pi, the core of OpenClaw](https://zhuanlan.zhihu.com/p/2017400881730056207). Rights belong to the original author.

Viral open-source assistant **OpenClaw** runs on a subtractive core: **Pi-coding-agent**.

## So minimal it looks wrong

Versus Claude Code, Cursor, or Codex, Pi ships almost nothing:

- System prompt + tools **under ~1,000 tokens** (Claude Code often 10k+)
- Core tools: **read, write, edit, bash**
- No built-in plan mode, todos, **MCP**, permission dialogs, or locked-in model

Still **top five on Terminal Bench 2.0** alongside Codex, Cursor, and Windsurf; **24k+ GitHub stars**.

Author **Mario Zechner** (libGDX): a good agent shouldn’t preset your stack—it should let **you** decide.

## Insight from Terminus

On Terminal Bench, **Terminus** gives the model one tmux tool and ranks near the top. After heavy RL, models **already know what a coding harness is**—you don’t need a spaceship of features. Pi implements that thesis.

## Deliberate omissions

**No MCP—CLI + README instead.** MCP can burn tens of thousands of tokens up front. Mario’s browser automation kit costs ~225 tokens when read on demand.

**No plan mode / todos / hidden subagents.** Plan in chat or in versioned `PLAN.md`. Spawn subagents mid-session for “context gathering” means you didn’t plan; use a separate session and pass an artifact.

**Parallel subagents as anti-pattern** for feature work—fine for throw-ideas-at-the-wall optimization, bad for coherent codebases.

## Security theater

File access + code execution + network ≈ game over; permission UIs mostly train users to click Yes. Pi defaults to YOLO; use **Docker** when you care.

## Memory: the repo is truth

For coding, skip extra memory products—**re-explore the live codebase** each time. Mario praises Claude Code-style search for that.

## “It got dumber” isn’t paranoia

His **cchistory** tool logs silent Claude Code prompt/tool changes. Pi exists so **harness changes are yours**, visible, and intentional.

---

Pi isn’t a crippled Claude Code—it’s a **meta machine** for builders who want a bare lot; Mario lives in the Spartan default.
