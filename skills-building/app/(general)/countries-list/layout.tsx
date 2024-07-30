import { Header } from './__components/header';
import author from '@repo/meta/author.json';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={inter.style} className="bg-muted-3 text-foreground">
      <ThemeProvider attribute="class">
        <Header />

        {children}
      </ThemeProvider>
    </div>
  );
}
