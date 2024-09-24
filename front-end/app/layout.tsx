import { RouteProgress } from '@/components/route-progress';
import { Bounce, ToastContainer } from 'react-toastify';
import { rootMetadata } from '@/config/root-meta';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = rootMetadata;

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
