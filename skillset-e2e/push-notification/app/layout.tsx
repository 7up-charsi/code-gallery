import { ConvexClientProvider } from '@/components/convex-client-provider';
import { AppBarContent } from '../components/app-bar-content';
import { Bounce, ToastContainer } from 'react-toastify';
import { AppBar } from '../components/app-bar';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Inter } from 'next/font/google';
import { portfolio } from '@repo/meta';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: portfolio.name, url: portfolio.url }],
  keywords: [portfolio.name, siteConfig.name, 'push notification'],
  icons: {
    icon: '/favicon.svg',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="eng" dir="ltr">
      <body
        className={`${inter.className} bg-background text-foreground`}
      >
        <ThemeProvider
          storageKey={siteConfig.name.replaceAll(' ', '-')}
          attribute="class"
        >
          <ConvexClientProvider>
            <AppBar>
              <AppBarContent />
            </AppBar>

            {children}
          </ConvexClientProvider>
        </ThemeProvider>

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
      </body>
    </html>
  );
}
