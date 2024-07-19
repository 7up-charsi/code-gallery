const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'tip calculator',
  description: 'accessible and responsive tip calculator',
  author: 'muhammad zeeshan',
  portfolio: 'https://www.uxweaver.codes',
  email: 'dev@uxweaver.codes',
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
};
