import { AppBarContent } from '../_components/app-bar-content';
import { AppBar } from '../_components/app-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-background text-foreground">
        <AppBar>
          <AppBarContent />
        </AppBar>

        {children}
      </div>
    </>
  );
}
