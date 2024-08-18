import { OpenGraphImage } from '@/config/open-graph';
import { openGraphConfig } from '@/config/open-graph';
import { siteConfig } from './site.config';
import { ImageResponse } from 'next/og';

export const alt = siteConfig.name;
export const runtime = openGraphConfig.runtime;
export const size = openGraphConfig.size;
export const contentType = openGraphConfig.contentType;

export default function TwitterImagePage() {
  return new ImageResponse(<OpenGraphImage name={siteConfig.name} />);
}
