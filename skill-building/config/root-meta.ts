import { rootSiteConfig } from './root-site';
import author from '@repo/meta/author.json';
import { Metadata } from 'next';

export const rootMetadata: Metadata = {
  title: rootSiteConfig.name,
  description: rootSiteConfig.description,
  applicationName: rootSiteConfig.name,
  category: rootSiteConfig.category,
  authors: [{ name: author.name, url: author.portfolio }],
  creator: author.name,
  icons: { icon: '/favicon.svg' },
  keywords: [
    'skill-building',
    'exercises',
    'learning',
    'front-end exercises',
  ],
};
