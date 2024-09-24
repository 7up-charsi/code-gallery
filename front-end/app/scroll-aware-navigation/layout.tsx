import { createMetadata } from '@/utils/metadata';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
