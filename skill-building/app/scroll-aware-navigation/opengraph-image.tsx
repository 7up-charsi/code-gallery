import { OpenGraphImage } from '@/components/open-graph-image';
import { siteConfig } from './__internals/site-config';
import { openGraphConfig } from '@/config/open-graph';
import { ImageResponse } from 'next/og';

export const alt = siteConfig.name;
export const runtime = openGraphConfig.runtime;
export const size = openGraphConfig.size;
export const contentType = openGraphConfig.contentType;

export default function OpenGraphImagePage() {
  return new ImageResponse(<OpenGraphImage name={siteConfig.name} />);
}
