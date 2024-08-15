import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Karla } from 'next/font/google';
import type { Metadata } from 'next';

const font = Karla({ subsets: ['latin'] });

export const metadata: Metadata = createMetadata(siteConfig);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      storageKey={siteConfig.name.replaceAll(' ', '-')}
      attribute="class"
    >
      <AppBar />

      {children}
    </ThemeProvider>
  );
}
