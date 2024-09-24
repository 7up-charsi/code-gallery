import { ScrollProgressBar } from '../_components/scroll-progress-bar';
import { AppBarContent } from '../_components/app-bar-content';
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

      <ScrollProgressBar />

      {children}
    </>
  );
}
