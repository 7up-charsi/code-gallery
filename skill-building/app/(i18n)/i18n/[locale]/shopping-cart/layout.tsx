import { OrderConfirmedDrawer } from './__components/order-confirmed-drawer';
import { OrderConfirmedDialog } from './__components/order-confirmed-dialog';
import { DictionaryProvider } from './__components/dictionary-provider';
import { CartDrawer } from './__components/cart-drawer';
import { getDictionary } from './__utils/dictionary';
import { Red_Hat_Text } from 'next/font/google';
import { Header } from './__components/header';
import { Locales } from './__types/dictionary';
import author from '@repo/meta/author.json';
import { ThemeProvider } from 'next-themes';
import { Cart } from './__components/cart';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

const font = Red_Hat_Text({ subsets: ['latin'] });

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
