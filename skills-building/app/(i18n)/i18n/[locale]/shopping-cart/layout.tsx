import { OrderConfirmedDrawer } from './__components/order-confirmed-drawer';
import { OrderConfirmedDialog } from './__components/order-confirmed-dialog';
import { DictionaryProvider } from './__components/dictionary-provider';
import { AppBarContent } from './__components/app-bar-content';
import { getDictionary } from './__utils/dictionary';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { Red_Hat_Text } from 'next/font/google';
import { Locales } from './__types/dictionary';
import { ThemeProvider } from 'next-themes';
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
    <ThemeProvider
      storageKey={siteConfig.name.replaceAll(' ', '-')}
      attribute="class"
    >
      <DictionaryProvider dictionary={dictionary}>
        <AppBar>
          <AppBarContent />
        </AppBar>

        <div
          className={`${font.className} grid grid-cols-[1fr_auto] px-5 py-5 lg:gap-5`}
        >
          {children}

          <div className="sticky top-[calc(theme(spacing.16)+theme(spacing.5))] flex max-h-[calc(100vh-(theme(spacing.5)*2_+_theme(spacing.16)))] w-80 place-self-start rounded bg-background max-lg:hidden">
            <Cart />
          </div>
        </div>

        <OrderConfirmedDrawer />
        <OrderConfirmedDialog />
      </DictionaryProvider>
    </ThemeProvider>
  );
}
