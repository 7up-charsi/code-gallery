import author from '@repo/meta/author.json';

const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'todo management',
  description: 'Accessible and Responsive with light/dark mode',
  author: author.name,
  email: author.email,
  portfolio: author.portfolio,
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph.jpg`,
};
