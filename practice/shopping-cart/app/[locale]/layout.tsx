import { OrderConfirmedDrawer } from '@/components/drawers/order-confirmed-drawer';
import { OrderConfirmedDialog } from '@/components/order-confirmed-dialog';
import { CartDrawer } from '@/components/drawers/cart-drawer';
import { DictionaryProvider } from '@/providers/dictionary';
import { getDictionary } from '@/utils/dictionary';
import { Red_Hat_Text } from 'next/font/google';
import { Header } from '@/components/header';
import { Locales } from '@/types/dictionary';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Cart } from '@/components/cart';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const font = Red_Hat_Text({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: ['html', 'css', 'js', 'react', 'shopping cart'],
  icons: {
    icon: '/favicon.svg',
  },
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.portfolio,
    },
  ],
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
  children: React.ReactNode;
  params: { locale: Locales };
}

export default async function RootLayout(props: RootLayoutProps) {
  const {
    children,
    params: { locale },
  } = props;

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} dir="ltr">
      <body
        style={font.style}
        className="bg-primary-2 text-foreground"
      >
        {' '}
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider attribute="class">
            <Header />
            <div className="px-5 py-5 lg:grid lg:grid-cols-[1fr_auto] lg:gap-5">
              {children}

              <div className="sticky top-[calc(theme(spacing.16)+theme(spacing.5))] flex max-h-[calc(100vh-(theme(spacing.5)*2_+_theme(spacing.16)))] w-80 place-self-start rounded bg-background max-lg:hidden">
                <Cart />
              </div>
            </div>
            <CartDrawer />
            <OrderConfirmedDrawer />
            <OrderConfirmedDialog />
          </ThemeProvider>{' '}
        </DictionaryProvider>
      </body>
    </html>
  );
}
