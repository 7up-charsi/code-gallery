const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'Shopping Cart',
  description:
    'Accessible, internationalized and responsive shopping cart with light/dark mode',
  author: 'muhammad zeeshan',
  email: 'dev@uxweaver.codes',
  portfolio: 'https://www.uxweaver.codes',
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
};
