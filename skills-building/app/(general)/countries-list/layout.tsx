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
    <div style={inter.style} className="bg-muted-3 text-foreground">
      <SearchFieldsProvider>
        <ThemeProvider attribute="class">
          <Header />

          {children}
        </ThemeProvider>
      </SearchFieldsProvider>
    </div>
  );
}
