import { AppBarContent } from './_components/app-bar-content';
import { RouteProgress } from './_components/route-progress';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './_components/app-bar';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RouteProgress />
      <AppBar>
        <AppBarContent />
      </AppBar>

      {children}
    </>
  );
}
