import { portfolio } from '@repo/meta';
import { Metadata } from 'next';

export const createMetadata = (
  config: Record<string, string>,
  keywords?: string[],
): Metadata => ({
  title: config.name,
  description: config.description,
  applicationName: config.name,
  authors: [{ name: portfolio.name, url: portfolio.url }],
  keywords: [...(keywords ?? []), portfolio.name, config.name],
});
