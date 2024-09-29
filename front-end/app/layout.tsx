import { RouteProgress } from '@/components/route-progress';
import { Bounce, ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/site.config';
import { Inter } from 'next/font/google';
import { portfolio } from '@repo/meta';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: siteConfig.category,
  authors: [{ name: portfolio.name, url: portfolio.url }],
  creator: portfolio.name,
  icons: { icon: '/favicon.svg' },
  keywords: [
    'exercises',
    'learning',
    'front-end',
    'front-end exercises',
    'full-stack',
    'full-stack exercises',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${inter.className} bg-background text-foreground mx-auto max-w-screen-2xl`}
      >
        <ThemeProvider attribute="class">
          {children}

          <RouteProgress />

          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
