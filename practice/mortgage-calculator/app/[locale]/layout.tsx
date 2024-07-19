import { Header } from '@/components/header';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config';
import { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'html',
    'css',
    'js',
    'react',
    'mortgage calulator',
    'calculator',
  ],
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

interface RootLayoutProps {
  params: { locale: string };
  children?: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const {
    children,
    params: { locale },
  } = props;

  return (
    <html lang={locale} dir="ltr">
      <body className="min-h-screen bg-background text-foreground md:content-center md:bg-primary-4 md:p-5">
        <ThemeProvider attribute="class">
          <div className="mx-auto md:max-w-screen-md">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

