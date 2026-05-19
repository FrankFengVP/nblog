---
title: "用 Next.js 搭建静态博客的要点"
date: "2026-05-15"
excerpt: "App Router、Markdown 解析与静态生成的几个实用技巧。"
tags: ["技术", "Next.js"]
---

使用 Next.js App Router 做博客时，有几个值得留意的实践。

## 文件即路由

`app/[locale]/blog/[slug]/page.tsx` 对应动态路由。配合 `generateStaticParams`，可以在构建时预渲染所有文章页面，获得极佳的首屏性能。

## Markdown 工作流

常见组合是 **gray-matter** 解析 Front Matter，**remark** 将正文转为 HTML。文章与代码分离，写作体验接近纯文本编辑器，也方便版本管理。

## 样式与排版

博客的阅读体验很大程度取决于排版：合适的行宽（约 65–75 字符）、舒适的行高、清晰的标题层级。Tailwind 的 `@tailwindcss/typography` 插件可以快速实现 `prose` 样式；本项目在 `globals.css` 中手写了一套精简排版规则。

## 部署

构建产物可部署到 Vercel、Netlify 或任何支持 Node 静态导出的平台。运行 `npm run build` 与 `npm start` 即可在本地预览生产环境效果。
