import { createMetadata } from '@/utils/metadata';
import { Space_Mono } from 'next/font/google';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

const font = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = createMetadata(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${font.className} tip-calculator`}>
      {children}
    </div>
  );
}
