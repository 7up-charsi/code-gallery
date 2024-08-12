import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default RootLayout;
