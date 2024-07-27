import { AppBar } from '@/components/app-bar';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  return (
    <div className="mx-auto max-w-screen-md">
      <AppBar />
      {children}
    </div>
  );
}
