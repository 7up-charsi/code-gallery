import { rootMetadata } from '@/config/root-meta';
import { ToastifyContainer } from '@repo/ui';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} dir="ltr">
      <body
        className={`${inter.className} bg-background text-foreground mx-auto max-w-screen-2xl`}
      >
        {children}

        <ToastifyContainer />
      </body>
    </html>
  );
}