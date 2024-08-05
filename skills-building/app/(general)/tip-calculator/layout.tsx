import { PortfolioHeader } from '@/components/portfolio-header';
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
    <div className="tip-calculator flex min-h-screen flex-col gap-5 bg-tc-main_bg">
      <PortfolioHeader />

      <div className={`${font.className}`}>{children}</div>
    </div>
  );
}
