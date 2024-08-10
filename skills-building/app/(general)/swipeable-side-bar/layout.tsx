import { SideBar } from './__components/side-bar';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
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
      <AppBar />

      {children}
    </>
  );
}
