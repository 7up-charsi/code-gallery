import { SharedStuff } from '@/components/shared-stuff';
import { rootMetadata } from '@/config/root-meta';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${inter.className} mx-auto max-w-screen-2xl bg-background text-foreground`}
      >
        {children}

        <SharedStuff />
      </body>
    </html>
  );
}

