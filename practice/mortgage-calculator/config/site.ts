const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'Mortgage calculator',
  description:
    'Accessible, internationalized and responsive mortgage calculator with light/dark mode',
  author: 'muhammad zeeshan',
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
  email: 'dev@uxweaver.codes',
  portfolio: 'https://www.uxweaver.codes',
};
