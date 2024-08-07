import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { ContentSkeleton } from './__components/content-skeleton';
import { TocContent } from './__components/toc-content';
import { ChevronDown, XIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_230px] lg:grid-cols-[230px_1fr_230px]">
      <div className="sticky top-[104px] h-[calc(100vh-40px-64px)] border-r border-muted-6 p-5 max-lg:hidden">
        <aside className="h-full w-full rounded bg-muted-3"></aside>
      </div>

      <DrawerRoot>
        <DrawerTrigger>
          <Button
            className="mx-5 mb-3 mt-5 justify-between md:hidden"
            endContent={<ChevronDown />}
          >
            Table of Content
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay className="md:hidden" />

          <DrawerContent
            placement="bottom"
            className="flex max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-t-2xl md:hidden"
          >
            <div className="flex items-center justify-between gap-2 border-b border-muted-6 px-5 py-3">
              <h2 className="text-muted-12">Table of Content</h2>

              <DrawerClose>
                <Button
                  isIconOnly
                  aria-label="close"
                  color="danger"
                  variant="text"
                  className="text-xl"
                  size="sm"
                >
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>

            <div className="grow overflow-auto px-5 py-3">
              <TocContent />
            </div>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>

      <main id="main-content" className="space-y-5 p-5 max-md:pt-0">
        <h1 className="text-2xl font-medium capitalize">
          Content Skeletons
        </h1>

        <div className="">
          <h2
            data-depth={2}
            id="1"
            className="mb-2 scroll-m-32 text-xl font-medium capitalize"
          >
            heading 1
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="2"
            className="mb-2 scroll-m-32 text-xl font-medium capitalize"
          >
            heading 2
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="3"
            className="mb-2 ml-5 scroll-m-32 text-lg font-medium capitalize"
          >
            heading 3
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="4"
            className="mb-2 ml-5 scroll-m-32 text-lg font-medium capitalize"
          >
            heading 4
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="5"
            className="mb-2 scroll-m-32 text-xl font-medium capitalize"
          >
            heading 5
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="6"
            className="mb-2 ml-5 scroll-m-32 text-lg font-medium capitalize"
          >
            heading 6
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="7"
            className="mb-2 scroll-m-32 text-xl font-medium capitalize"
          >
            heading 7
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="8"
            className="mb-2 scroll-m-32 text-xl font-medium capitalize"
          >
            heading 8
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="9"
            className="mb-2 ml-5 scroll-m-32 text-lg font-medium capitalize"
          >
            heading 9
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="0"
            className="mb-2 scroll-m-32 text-xl font-medium capitalize"
          >
            heading 10
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>
      </main>

      <aside className="sticky top-[104px] flex h-[calc(100vh-40px-64px)] flex-col border-l border-muted-6 p-5 max-md:hidden">
        <h2 className="text-muted-12">Table of Content</h2>

        <div className="grow overflow-auto">
          <TocContent />
        </div>
      </aside>
    </div>
  );
}
