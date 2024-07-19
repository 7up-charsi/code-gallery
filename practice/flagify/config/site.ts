const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'flagify',
  description:
    'Accessible, Internationalized and responsive countries explorer with light/dark mode',
  siteUrl,
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
  author: 'muhammad zeeshan',
  email: 'dev@uxweaver.codes',
  portfolio: 'https://www.uxweaver.codes',
};
