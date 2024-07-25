import author from '@repo/meta/author.json';

const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'Wearhouse',
  description:
    'We have clothes that suits your style and which you’re proud to wear. From women to men.',
  author: author.name,
  portfolio: author.portfolio,
  email: author.email,
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpg`,
};
