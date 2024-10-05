import { AppBarContent } from '@/components/app-bar-content';
import { AppBar } from '@/components/app-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar>
        <AppBarContent />
      </AppBar>

      {children}
    </>
  );
}
