# NBlog

A personal blog built with Next.js and Markdown, with English and Chinese support.

## Features

- Home page post list, sorted by date
- Markdown post pages (static generation)
- About page
- i18n: English (default) and Chinese

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site picks a locale from your browser `Accept-Language` header (Chinese → `/zh`, otherwise `/en`). Use the header switcher to change language; your choice is saved in a cookie.

## Content structure

Posts are organized by locale, with matching filenames across folders:

```
content/posts/
  en/
    welcome.md
    nextjs-tips.md
    ...
  zh/
    welcome.md
    nextjs-tips.md
    ...
```

The filename (without `.md`) is the URL slug: `/en/blog/welcome`, `/zh/blog/welcome`.

## Writing a post

Create a file under `content/posts/en/` or `content/posts/zh/`, for example `my-post.md`:

```markdown
---
title: "Post title"
date: "2026-05-19"
excerpt: "One-line summary"
tags: ["tag"]
---

Body starts here…
```

## UI translations

Interface copy lives in `src/messages/en.ts` and `src/messages/zh.ts`.

## Build & deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- gray-matter + remark
# nblog
