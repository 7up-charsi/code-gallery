import { OrderConfirmedDrawer } from './__components/order-confirmed-drawer';
import { OrderConfirmedDialog } from './__components/order-confirmed-dialog';
import { DictionaryProvider } from './__components/dictionary-provider';
import { CartDrawer } from './__components/cart-drawer';
import { getDictionary } from './__utils/dictionary';
import { createMetadata } from '@/utils/metadata';
import { Red_Hat_Text } from 'next/font/google';
import { Header } from './__components/header';
import { Locales } from './__types/dictionary';
import { Cart } from './__components/cart';
import { siteConfig } from './site.config';
import type { Metadata } from 'next';

const font = Red_Hat_Text({ subsets: ['latin'] });

export const metadata: Metadata = createMetadata(siteConfig);

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
    <DictionaryProvider dictionary={dictionary}>
      <div
        style={font.style}
        className="bg-primary-2 text-foreground"
      >
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
      </div>
    </DictionaryProvider>
  );
}
