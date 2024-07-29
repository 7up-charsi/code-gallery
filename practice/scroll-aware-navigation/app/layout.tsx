import { AppBar } from '@/components/app-bar';
import { siteConfig } from '@/config/site';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'observer interaction',
    siteConfig.author,
    siteConfig.name,
  ],
  icons: {
    icon: '/favicon.svg',
  },
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    images: [{ width: 1200, height: 630, url: siteConfig.ogImage }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar />
        {children}
      </body>
    </html>
  );
}
