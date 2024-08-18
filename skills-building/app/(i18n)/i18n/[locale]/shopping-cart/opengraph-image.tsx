import { openGraphConfig } from '@/config/open-graph';
import { rootSiteConfig } from '@/config/root-site';
import { siteConfig } from './site.config';
import { OpenGraphImage } from '@repo/ui';
import { ImageResponse } from 'next/og';

export const alt = siteConfig.name;
export const runtime = openGraphConfig.runtime;
export const size = openGraphConfig.size;
export const contentType = openGraphConfig.contentType;

export default function OpenGraphImagePage() {
  return new ImageResponse(
    <OpenGraphImage name={siteConfig.name} config={rootSiteConfig} />,
  );
}
