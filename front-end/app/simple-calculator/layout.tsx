import { createMetadata } from '@/utils/metadata';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
