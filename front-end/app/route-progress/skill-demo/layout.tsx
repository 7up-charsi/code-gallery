import { AppBarContent } from '../_components/app-bar-content';
import { RouteProgress } from '../_components/route-progress';
import { AppBar } from '../_components/app-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RouteProgress />

      <AppBar>
        <AppBarContent />
      </AppBar>

      <div className="bg-muted-2 min-h-[calc(100vh-64px)]">
        {children}
      </div>
    </>
  );
}
