import { DictionaryProvider } from './__components/dictionary-provider';
import { getDictionary } from './__utils/dictionary';
import { Header } from './__components/header';
import { Locales } from './__types/dictionary';
import author from '@repo/meta/author.json';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';

const font = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: author.name, url: author.portfolio }],
  keywords: ['observer interaction', author.name, siteConfig.name],
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} dir="ltr">
      <body style={font.style} className="bg-muted-4 text-foreground">
        <ThemeProvider attribute="class">
          <DictionaryProvider dictionary={dictionary}>
            <Header />
            {children}
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
