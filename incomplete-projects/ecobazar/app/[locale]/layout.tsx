import { UtilityBar } from '@/components/utility-bar';
import { AppBar } from '@/components/app-bar';
import { NavBar } from '@/components/nav-bar';
import { Poppins } from 'next/font/google';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.portfolio }],
  keywords: ['ecommerce', 'organic ecommerce', 'ecobazar'],
  icons: {
    icon: '/logo-icon.svg',
  },
  openGraph: {
    type: 'website',
    description: siteConfig.description,
    title: siteConfig.name,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    images: [{ url: siteConfig.ogImage, height: 1080, width: 1920 }],
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
        style={poppins.style}
        className="bg-background text-foreground"
      >
        <div className="mx-auto max-w-screen-xl">
          <UtilityBar />
          <AppBar />
          <NavBar />

          {children}
        </div>
      </body>
    </html>
  );
}

