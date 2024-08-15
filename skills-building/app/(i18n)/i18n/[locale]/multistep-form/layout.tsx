import { DictionaryProvider } from './__components/dictionary-provider';
import { AppBarContent } from './__components/app-bar-content';
import { getDictionary } from './__utils/dictionary';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { Locales } from './__types/dictionary';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';
import React from 'react';

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
        <AppBar>
          <AppBarContent />
        </AppBar>

        {children}
      </DictionaryProvider>
    </ThemeProvider>
  );
}
