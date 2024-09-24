import { AppBarContent } from '../../_components/app-bar-content';
import { AppBar } from '../../_components/app-bar';

export default function Layout({
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
