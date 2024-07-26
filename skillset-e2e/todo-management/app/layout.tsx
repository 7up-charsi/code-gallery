import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { LoadData } from '@/components/load-data';
import { AppBar } from '@/components/app-bar';
import { siteConfig } from '@/config/site';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  keywords: ['todo', 'todo management', siteConfig.name],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    emails: siteConfig.email,
    images: [
      {
        width: 1200,
        height: 630,
        url: siteConfig.ogImage,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={inter.style}
        className="bg-muted-3 text-foreground"
      >
        <LoadData />
        <AppBar />
        {children}

        <ToastContainer
          position="bottom-center"
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

