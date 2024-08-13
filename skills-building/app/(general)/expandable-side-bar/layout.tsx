import { AppBarContent } from './__components/app-bar-content';
import { SideBar } from './__components/side-bar';
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
      <AppBar>
        <AppBarContent />
      </AppBar>

      <div className="grid grid-cols-[auto_1fr] max-md:grid-cols-1">
        <SideBar />

        {children}
      </div>
    </ThemeProvider>
  );
}
