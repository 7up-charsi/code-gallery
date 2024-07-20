import { Raleway, Roboto } from 'next/font/google';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const font = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});

const logoFont = Raleway({
  subsets: ['latin'],
  variable: '--logo-font',
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
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
    <html lang="en">
      <body className={`${font.className} ${logoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
