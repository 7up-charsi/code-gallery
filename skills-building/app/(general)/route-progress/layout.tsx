import { RouteProgress } from './__components/route-progress';
import { Raleway, Roboto } from 'next/font/google';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

const font = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});

const logoFont = Raleway({
  subsets: ['latin'],
  variable: '--logo-font',
});

export const metadata: Metadata = createMetadata(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${font.className} ${logoFont.variable}`}>
      <RouteProgress />
      <AppBar />

      <div className="mt-[104px]">{children}</div>
    </div>
  );
}
