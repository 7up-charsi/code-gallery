import { Space_Mono } from 'next/font/google';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const font = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ['html', 'css', 'react', 'next', 'tip calculator'],
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    description: siteConfig.description,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    title: siteConfig.name,
    images: [
      {
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
      <body className={font.className}>{children}</body>
    </html>
  );
}

