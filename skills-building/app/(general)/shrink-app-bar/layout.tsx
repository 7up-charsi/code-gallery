import { AppBarContent } from './__components/app-bar-content';
import { createMetadata } from '@/utils/metadata';
import { AppBar } from './__components/app-bar';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

interface LayoutProps {
  children?: React.ReactNode;
}

export const metadata: Metadata = createMetadata(siteConfig);

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <AppBar>
        <AppBarContent />
      </AppBar>

      <div className="mt-[120px]">{children}</div>
    </>
  );
}
