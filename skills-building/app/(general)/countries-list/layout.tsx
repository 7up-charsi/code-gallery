import { SearchFieldsProvider } from './__components/search-fields-provider';
import { createMetadata } from '@/utils/metadata';
import { Header } from './__components/header';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = createMetadata(siteConfig, [
  'integrate frontend and backend',
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={inter.style}
      className="mx-auto max-w-screen-2xl bg-muted-3 text-foreground"
    >
      <SearchFieldsProvider>
        <ThemeProvider attribute="class">
          <Header />

          <div className="min-h-[calc(100vh-112px-40px)] pt-[calc(112px+40px)] lg:min-h-[calc(100vh-60px-40px)] lg:pt-[calc(60px+40px)]">
            {children}
          </div>
        </ThemeProvider>
      </SearchFieldsProvider>
    </div>
  );
}
