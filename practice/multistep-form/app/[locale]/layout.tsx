import { DictionaryProvider } from '@/providers/dictionary';
import { getDictionary } from '@/utils/dictionary';
import { Header } from '@/components/header';
import { Locales } from '@/types/dictionary';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const font = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: ['html', 'css', 'js', 'react', 'next', 'multistep form'],
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} dir="ltr">
      <body style={font.style} className="bg-muted-4 text-foreground">
        <ThemeProvider attribute="class">
          <DictionaryProvider dictionary={dictionary}>
            <>
              <Header />
              {children}
            </>
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
