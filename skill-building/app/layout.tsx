import { rootSiteConfig } from '@/config/root-site';
import author from '@repo/meta/author.json';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: rootSiteConfig.name,
  description: rootSiteConfig.description,
  applicationName: rootSiteConfig.name,
  category: rootSiteConfig.category,
  authors: [{ name: author.name, url: author.portfolio }],
  creator: author.name,
  icons: { icon: '/favicon.svg' },
  keywords: [
    'skill-building',
    'exercises',
    'learning',
    'front-end exercises',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

