import { Bounce, ToastContainer } from 'react-toastify';
import { Header } from '@/components/header';
import { ThemeProvider } from 'next-themes';
import { Karla } from 'next/font/google';
import { siteConfig } from '@/config';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const font = Karla({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  keywords: ['html', 'css', 'js', 'react', 'contact form'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    description: siteConfig.description,
    title: siteConfig.name,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    images: [
      {
        width: 1200,
        height: 630,
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
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
      <body className="min-h-screen bg-background text-foreground md:content-center md:bg-primary-4 md:p-5">
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
