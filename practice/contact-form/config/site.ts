const siteUrl =
  process.env.SITE_URL ?? `http://localhost:${process.env.PORT}`;

export const siteConfig = {
  name: 'Contact Form',
  description:
    'Accessible, internationalized and responsive contact form with light/dark mode',
  ogImage: `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'}open-graph/og.jpeg`,
  author: 'muhammad zeeshan',
  email: 'dev@uxweaver.codes',
  portfolio: 'https://www.uxweaver.codes',
};
