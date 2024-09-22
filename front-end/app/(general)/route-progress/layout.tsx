import { AppBarContent } from './__components/app-bar-content';
import { RouteProgress } from './__components/route-progress';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      storageKey={siteConfig.name.replaceAll(' ', '-')}
      attribute="class"
    >
      <RouteProgress />
      <AppBar>
        <AppBarContent />
      </AppBar>

      {children}
    </ThemeProvider>
  );
}
