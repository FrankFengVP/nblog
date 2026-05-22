export const en = {
  meta: {
    siteDescription: "A personal blog on technology, ideas, and everyday life.",
    aboutDescription: "About NBlog",
  },
  nav: {
    home: "Home",
    about: "About",
    mainLabel: "Main navigation",
    footerLabel: "Footer navigation",
  },
  categories: {
    tech: "Tech",
    life: "Life",
    emotion: "Emotions",
    news: "News",
  },
  categoryPage: {
    emptyState: "No posts in this category yet.",
    allPosts: "All posts",
  },
  hero: {
    title: "Thoughts, tech, and everyday life",
    description:
      "Notes on learning, building, and living — written to leave a trace of time in words.",
    postCount: "{count} posts",
    updatedAt: "Updated {date}",
  },
  home: {
    sectionTitle: "Posts",
    pinnedTitle: "Pinned",
    pinnedBadge: "Pinned",
    emptyState:
      "No posts yet. Add Markdown files under content/posts/{locale}/.",
  },
  pagination: {
    prev: "Previous",
    next: "Next",
    pageOf: "Page {page} of {total}",
    navLabel: "Post pagination",
    ellipsis: "…",
  },
  post: {
    readMore: "Read",
    backHome: "Home",
    backToPosts: "All posts",
    topics: "Topics",
  },
  about: {
    eyebrow: "About",
    title: "About this site",
    lead: "A personal blog for technical learning, project notes, and everyday reflection.",
    body: "Posts live as Markdown files in",
    bodySuffix:
      "and are published via static generation at build time. Writing and version control stay simple; presentation stays restrained.",
    stackTitle: "Stack",
    cta: "Browse all posts",
    stack: [
      { name: "Next.js 16", desc: "App Router" },
      { name: "React 19", desc: "UI" },
      { name: "Tailwind CSS 4", desc: "Styling" },
      { name: "Markdown", desc: "Content" },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    message: "The address may be invalid or the page may have been removed.",
    cta: "Back to home",
  },
  footer: {
    copyright: "© {year} NBlog",
  },
} as const;
