export const en = {
  meta: {
    siteDescription: "A personal blog on technology, ideas, and everyday life.",
    aboutDescription: "About NBlog",
  },
  nav: {
    home: "Home",
    about: "About",
    footerLabel: "Footer navigation",
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
    emptyState:
      "No posts yet. Add Markdown files under content/posts/{locale}/.",
  },
  post: {
    readMore: "Read",
    backHome: "Home",
    backToPosts: "All posts",
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
