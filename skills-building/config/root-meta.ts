import { rootSiteConfig } from './root-site';
import { portfolio } from '@repo/meta';
import { Metadata } from 'next';

export const rootMetadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: rootSiteConfig.name,
  description: rootSiteConfig.description,
  applicationName: rootSiteConfig.name,
  category: rootSiteConfig.category,
  authors: [{ name: portfolio.name, url: portfolio.url }],
  creator: portfolio.name,
  icons: { icon: '/favicon.svg' },
  keywords: [
    'skill-building',
    'exercises',
    'learning',
    'front-end exercises',
  ],
};
