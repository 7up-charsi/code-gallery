import { DictionaryProvider } from './_components/dictionary-provider';
import { AppBarContent } from './_components/app-bar-content';
import { getDictionary } from './_utils/dictionary';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './_components/app-bar';
import { Locales } from './_types/dictionary';
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
    <>
      <DictionaryProvider dictionary={dictionary}>
        <AppBar>
          <AppBarContent />
        </AppBar>

        {children}
      </DictionaryProvider>
    </>
  );
}
