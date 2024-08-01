import { createMetadata } from '@/utils/metadata';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

interface LayoutProps {
  children?: React.ReactNode;
}

export const metadata: Metadata = createMetadata(siteConfig);

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return <div className="mx-auto max-w-screen-2xl">{children}</div>;
}
