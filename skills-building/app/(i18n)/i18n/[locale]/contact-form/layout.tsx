import { Header } from './__components/header';
import { Bounce, ToastContainer } from 'react-toastify';
import author from '@repo/meta/author.json';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Karla } from 'next/font/google';
import type { Metadata } from 'next';

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={font.style} className="bg-background text-foreground">
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
    </div>
  );
}
