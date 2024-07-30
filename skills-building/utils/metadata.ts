import author from '@repo/meta/author.json';
import { Metadata } from 'next';

export const createMetadata = (
  config: Record<string, string>,
  keywords?: string[],
): Metadata => ({
  title: config.name,
  description: config.description,
  applicationName: config.name,
  authors: [{ name: author.name, url: author.portfolio }],
  keywords: [...(keywords ?? []), author.name, config.name],
  icons: {
    icon: '/favicon.svg',
  },
});
