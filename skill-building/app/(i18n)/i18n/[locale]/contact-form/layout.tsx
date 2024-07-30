import { Header } from './__internals/components/header';
import { Bounce, ToastContainer } from 'react-toastify';
import author from '@repo/meta/author.json';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Karla } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const font = Karla({ subsets: ['latin'] });

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
        style={font.style}
        className="min-h-screen bg-background text-foreground md:content-center md:bg-primary-4 md:p-5"
      >
        <ThemeProvider attribute="class">
          <div className="mx-auto max-w-screen-md">
            <Header />
            {children}
          </div>
        </ThemeProvider>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
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
