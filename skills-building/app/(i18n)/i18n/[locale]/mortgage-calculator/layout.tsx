import { createMetadata } from '@/utils/metadata';
import { Header } from './__components/header';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

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
