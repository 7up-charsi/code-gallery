import { DictionaryProvider } from './__components/dictionary-provider';
import { getDictionary } from './__utils/dictionary';
import { createMetadata } from '@/utils/metadata';
import { Header } from './__components/header';
import { Locales } from './__types/dictionary';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';

const font = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = createMetadata(siteConfig);

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  const dictionary = await getDictionary(locale);

  return (
    <ThemeProvider
      storageKey={siteConfig.name.replaceAll(' ', '-')}
      attribute="class"
    >
      <DictionaryProvider dictionary={dictionary}>
        <div
          style={font.style}
          className="bg-muted-4 text-foreground"
        >
          <Header />
          {children}
        </div>
      </DictionaryProvider>
    </ThemeProvider>
  );
}
