import { SearchFieldsProvider } from './__components/search-fields-provider';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';

export const metadata: Metadata = createMetadata(siteConfig, [
  'integrate frontend and backend',
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted-3 text-foreground">
      <SearchFieldsProvider>
        <ThemeProvider attribute="class">
          <AppBar />

          <div className="min-h-[calc(100vh-112px-40px)] pt-[calc(112px+40px)] lg:min-h-[calc(100vh-60px-40px)] lg:pt-[calc(60px+40px)]">
            {children}
          </div>
        </ThemeProvider>
      </SearchFieldsProvider>
    </div>
  );
}
