import author from '@repo/meta/author.json';

const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'scroll aware navigation',
  description:
    "Scroll-aware navigation enhances user experience by dynamically animating navigation elements as the user scrolls through the page. This visual feedback clearly indicates the user's current position within the website, improving navigation and engagement.",
  author: author.name,
  email: author.email,
  portfolio: author.portfolio,
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '?'}open-graph.jpg`,
};
