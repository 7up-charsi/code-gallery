import { AppBar } from '@/components/app-bar';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import Local from 'next/font/local';
import './globals.css';

const satoshi = Local({
  src: [
    {
      path: '../fonts/satoshi/Satoshi-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../fonts/satoshi/Satoshi-BoldItalic.ttf',
      style: 'italic',
      weight: '700',
    },
    {
      path: '../fonts/satoshi/Satoshi-Light.ttf',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../fonts/satoshi/Satoshi-LightItalic.ttf',
      style: 'italic',
      weight: '300',
    },
    {
      path: '../fonts/satoshi/Satoshi-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../fonts/satoshi/Satoshi-MediumItalic.ttf',
      style: 'italic',
      weight: '500',
    },
    {
      path: '../fonts/satoshi/Satoshi-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../fonts/satoshi/Satoshi-Italic.ttf',
      style: 'italic',
      weight: '400',
    },
  ],
  variable: '--satoshi-font',
});

const integral = Local({
  src: [
    {
      path: '../fonts/integral-cf/IntegralCF-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../fonts/integral-cf/IntegralCF-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../fonts/integral-cf/IntegralCF-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
  ],
  variable: '--integral-font',
});

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  keywords: [
    'wearhouse',
    'clothes',
    'accessible',
    'responsive',
    'light/dark',
    'ecommerce',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    images: [
      {
        url: siteConfig.ogImage,
        height: 630,
        width: 1200,
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
        className={`${satoshi.variable} ${integral.variable} bg-background font-satoshi text-foreground`}
      >
        <AppBar />

        {children}
      </body>
    </html>
  );
}

