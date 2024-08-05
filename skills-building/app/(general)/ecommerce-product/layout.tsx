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
    <div className="mt-[104px] bg-background text-foreground">
      <ThemeProvider attribute="class">
        <AppBar />
        {children}
      </ThemeProvider>
    </div>
  );
}
