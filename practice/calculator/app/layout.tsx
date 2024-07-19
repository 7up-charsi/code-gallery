import { League_Spartan } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import '@/styles/globals.css';

const font = League_Spartan({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  keywords: ['html', 'css', 'react', 'next', 'calculator'],
  icons: {
    icon: '/favicon.svg',
  },
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
        style={font.style}
        className="bg-main_bg theme1:text-whiteText theme2:text-darkBlueText theme3:text-yellowText"
      >
        <ThemeProvider
          attribute="class"
          themes={['theme1', 'theme2', 'theme3']}
          defaultTheme="theme1"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

