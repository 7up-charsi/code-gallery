import { DictionaryProvider } from '../../_components/dictionary-provider';
import { AppBarContent } from '../../_components/app-bar-content';
import { getDictionary } from '../../_utils/dictionary';
import { AppBar } from '@typeweave/react/app-bar';
import { Locales } from '../../_types/dictionary';
import React from 'react';

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
