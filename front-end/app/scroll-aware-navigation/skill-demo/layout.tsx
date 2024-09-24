import { AppBar } from '../_components/app-bar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />

      {children}
    </>
  );
}
