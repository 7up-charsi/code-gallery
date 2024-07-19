const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'calculator',
  description: 'Accessible and resposive calculator with 3 themes',
  author: 'muhammad zeeshan',
  email: 'dev@uxweaver.codes',
  portfolio: 'https://www.uxweaver.codes',
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
};
