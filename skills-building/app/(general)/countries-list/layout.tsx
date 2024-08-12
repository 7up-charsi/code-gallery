import { SearchFieldsProvider } from './__components/search-fields-provider';
import { AppBarContent } from './__components/app-bar-content';
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
    <div className="min-h-screen bg-muted-3 text-foreground">
      <SearchFieldsProvider>
        <ThemeProvider attribute="class">
          <AppBar>
            <AppBarContent />
          </AppBar>

          {children}
        </ThemeProvider>
      </SearchFieldsProvider>
    </div>
  );
}
