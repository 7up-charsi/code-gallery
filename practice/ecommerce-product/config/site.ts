const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'ecommerce product',
  description:
    'Accessible, internationalized and responsive ecommerce product page with light/dark mode',
  author: 'muhammad zeeshan',
  email: 'dev@uxweaver.codes',
  portfolio: 'https://www.uxweaver.codes',
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
};
