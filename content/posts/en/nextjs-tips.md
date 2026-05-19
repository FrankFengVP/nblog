---
title: "Building a static blog with Next.js"
date: "2026-05-15"
excerpt: "Practical tips for App Router, Markdown parsing, and static generation."
tags: ["Tech", "Next.js"]
---

When building a blog with the Next.js App Router, a few practices are worth keeping in mind.

## File-based routing

`app/[locale]/blog/[slug]/page.tsx` maps to a dynamic route. Combined with `generateStaticParams`, every post can be pre-rendered at build time for excellent first-load performance.

## Markdown workflow

A common stack is **gray-matter** for Front Matter and **remark** to turn content into HTML. Posts stay separate from code, writing feels like plain text, and version control stays straightforward.

## Typography

Reading experience depends heavily on layout: a comfortable line length (roughly 65–75 characters), generous line height, and clear heading hierarchy. The `@tailwindcss/typography` plugin gives you `prose` styles quickly; this project uses a lean custom set in `globals.css`.

## Deployment

Ship the build output to Vercel, Netlify, or any platform that supports Next.js static output. Run `npm run build` and `npm start` locally to preview production.
