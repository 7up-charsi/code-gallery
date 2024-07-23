import author from '@repo/meta/author.json';

const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'Wearhouse',
  description:
    'Accessible and Responsive eCommerce website with dark and light mode',
  author: author.name,
  portfolio: author.portfolio,
  email: author.email,
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpg`,
};
