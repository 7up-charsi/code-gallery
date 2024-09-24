import { OrderConfirmedDrawer } from './_components/order-confirmed-drawer';
import { OrderConfirmedDialog } from './_components/order-confirmed-dialog';
import { DictionaryProvider } from './_components/dictionary-provider';
import { AppBarContent } from './_components/app-bar-content';
import { getDictionary } from './_utils/dictionary';
import { createMetadata } from '@/utils/metadata';
import { Red_Hat_Text } from 'next/font/google';
import { AppBar } from './_components/app-bar';
import { Locales } from './_types/dictionary';
import { siteConfig } from './site.config';
import { Cart } from './_components/cart';
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
    <>
      <DictionaryProvider dictionary={dictionary}>
        <AppBar>
          <AppBarContent />
        </AppBar>

        <div
          className={`${font.className} grid grid-cols-[1fr_auto] px-5 py-5 lg:gap-5`}
        >
          {children}

          <div className="bg-background sticky top-[calc(theme(spacing.16)+theme(spacing.5))] flex max-h-[calc(100vh-(theme(spacing.5)*2_+_theme(spacing.16)))] w-80 place-self-start rounded max-lg:hidden">
            <Cart />
          </div>
        </div>

        <OrderConfirmedDrawer />
        <OrderConfirmedDialog />
      </DictionaryProvider>
    </>
  );
}
