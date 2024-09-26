import { AppBarContent } from '../_components/app-bar-content';
import { SideBar } from '../_components/side-bar';
import { AppBar } from '../_components/app-bar';

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

      <div className="grid grid-cols-[minmax(var(--side-bar-collapsed-width),auto)_1fr] [--side-bar-collapsed-width:73px]">
        <SideBar />

        <div className="col-start-2">{children}</div>
      </div>
    </>
  );
}
