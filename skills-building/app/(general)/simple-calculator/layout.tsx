import { PortfolioHeader } from '@/components/portfolio-header';
import { League_Spartan } from 'next/font/google';
import { createMetadata } from '@/utils/metadata';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

const font = League_Spartan({ subsets: ['latin'] });

export const metadata: Metadata = createMetadata(siteConfig);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      themes={['sc-theme1', 'sc-theme2', 'sc-theme3']}
      defaultTheme="sc-theme1"
      storageKey="simple-calculator-theme"
    >
      <div
        style={font.style}
        className="flex h-screen flex-col gap-5 bg-sc-main_bg sc-theme1:text-sc-whiteText sc-theme2:text-sc-darkBlueText sc-theme3:text-sc-yellowText"
      >
        <PortfolioHeader />

        {children}
      </div>
    </ThemeProvider>
  );
}
