import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

interface LandingPageLayoutProps {
  children?: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export default function LandingPageLayout(
  props: LandingPageLayoutProps,
) {
  const { children } = props;

  return (
    <html>
      <body
        className={`${inter.className} bg-background text-foreground mx-auto max-w-screen-2xl`}
      >
        <ThemeProvider storageKey="landing-page" attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
