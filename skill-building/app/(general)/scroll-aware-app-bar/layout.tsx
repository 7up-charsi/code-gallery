import { Raleway, Roboto } from 'next/font/google';
import author from '@repo/meta/author.json';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

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
    <div className={`${font.className} ${logoFont.variable}`}>
      {children}
    </div>
  );
}
