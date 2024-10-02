import { AppBarContent } from '../_components/app-bar-content';
import { TocContent } from '../_components/toc-content';
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

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_280px] lg:grid-cols-[250px_1fr_280px]">
        {/* left side-bar */}
        <div className="sticky top-[64px] h-[calc(100vh-64px)] p-2 max-lg:hidden">
          <aside className="bg-muted-3 h-full w-full rounded"></aside>
        </div>

        {children}

        <aside className="sticky top-[64px] flex h-[calc(100vh-64px)] flex-col max-md:hidden">
          <div className="px-5">
            <h2 className="border-muted-6 bg-background border-b py-2 text-sm">
              Table of Content
            </h2>
          </div>

          <div className="scrollbar-thin grow overflow-auto px-5 py-2">
            <TocContent />
          </div>
        </aside>
      </div>
    </>
  );
}
