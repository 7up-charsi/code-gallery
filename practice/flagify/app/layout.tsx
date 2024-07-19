import { Header } from '@/components/header';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  icons: {
    icon: '/favicon.svg',
  },
  keywords: ['html', 'css', 'react', 'next', 'countries explorer'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    description: siteConfig.description,
    title: siteConfig.name,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    images: [
      {
        width: 1200,
        height: 630,
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={inter.style}
        className="bg-muted-3 text-foreground"
      >
        <ThemeProvider attribute="class">
          <Header />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
