import { SearchFieldsProvider } from './__components/search-fields-provider';
import { AppBarContent } from './__components/app-bar-content';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';
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
        <AppBar>
          <AppBarContent />
        </AppBar>

        {children}
      </SearchFieldsProvider>
    </div>
  );
}
