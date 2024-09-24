import { AppBarContent } from './_components/app-bar-content';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './_components/app-bar';
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
      <AppBar>
        <AppBarContent />
      </AppBar>

      {children}
    </>
  );
};

export default RootLayout;
