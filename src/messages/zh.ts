export const zh = {
  meta: {
    siteDescription: "记录技术、思考与生活片段的个人博客",
    aboutDescription: "关于 NBlog 个人博客",
  },
  nav: {
    home: "首页",
    about: "关于",
    footerLabel: "页脚导航",
  },
  hero: {
    title: "思考、技术与日常",
    description: "记录学习笔记、开发实践与生活随想，以文字留存时间的痕迹。",
    postCount: "{count} 篇文章",
    updatedAt: "更新于 {date}",
  },
  home: {
    sectionTitle: "文章",
    emptyState: "暂无文章，请在 content/posts/{locale}/ 目录添加 Markdown 文件。",
  },
  post: {
    readMore: "阅读",
    backHome: "首页",
    backToPosts: "全部文章",
    topics: "相关话题",
  },
  about: {
    eyebrow: "关于",
    title: "关于本站",
    lead: "一个用于记录技术学习、项目实践与日常思考的个人博客。",
    body: "文章以 Markdown 文件存放在",
    bodySuffix: "目录，通过构建时静态生成发布。写作与版本管理保持简单，呈现尽量克制。",
    stackTitle: "技术栈",
    cta: "浏览全部文章",
    stack: [
      { name: "Next.js 16", desc: "App Router" },
      { name: "React 19", desc: "UI" },
      { name: "Tailwind CSS 4", desc: "样式" },
      { name: "Markdown", desc: "内容" },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "页面不存在",
    message: "你访问的地址可能已失效或输入有误",
    cta: "返回首页",
  },
  footer: {
    copyright: "© {year} NBlog",
  },
} as const;
