import { createMetadata } from '@/utils/metadata';
import { Header } from './__components/header';
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
      <div
        style={font.style}
        className="bg-background text-foreground"
      >
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
}
