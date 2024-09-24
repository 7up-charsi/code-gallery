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

      <div className="grid grid-cols-[auto_1fr] max-md:grid-cols-1">
        <SideBar />

        {children}
      </div>
    </>
  );
}
