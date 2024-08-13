import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { TocContent } from './__components/toc-content';
import { ChevronDown, XIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_280px] lg:grid-cols-[250px_1fr_280px]">
      <div className="sticky top-[104px] h-[calc(100vh-40px-64px)] border-r border-muted-6 p-2 max-lg:hidden">
        <aside className="h-full w-full rounded bg-muted-3"></aside>
      </div>

      <DrawerRoot>
        <DrawerTrigger>
          <Button
            className="mx-5 my-3 justify-between md:hidden"
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

      <main
        id="main-content"
        className="space-y-5 p-5 max-md:pt-0 md:px-8"
      >
        {[
          {
            label: 'Introduction',
            depth: 2,
          },
          {
            label: 'Background',
            depth: 3,
          },
          {
            label: 'Purpose',
            depth: 3,
          },
          {
            label: 'Overview',
            depth: 2,
          },
          {
            label: 'Product Description',
            depth: 3,
          },
          {
            label: 'Key Highlights',
            depth: 3,
          },
          {
            label: 'Features',
            depth: 2,
          },
          {
            label: 'Core Features',
            depth: 3,
          },
          {
            label: 'Advanced Features',
            depth: 3,
          },
          {
            label: 'Benefits',
            depth: 2,
          },
          {
            label: 'User Benefits',
            depth: 3,
          },
          {
            label: 'Business Benefits',
            depth: 3,
          },
          {
            label: 'Technical Details',
            depth: 2,
          },
          {
            label: 'System Requirements',
            depth: 3,
          },
          {
            label: 'Technical Specifications',
            depth: 3,
          },
          {
            label: 'FAQs',
            depth: 2,
          },
          {
            label: 'General Questions',
            depth: 3,
          },
          {
            label: 'Technical Questions',
            depth: 3,
          },
          {
            label: 'Testimonials',
            depth: 2,
          },
          {
            label: 'Customer Reviews',
            depth: 3,
          },
          {
            label: 'Expert Endorsements',
            depth: 3,
          },
          {
            label: 'Pricing Plans',
            depth: 2,
          },
          {
            label: 'Basic Plan',
            depth: 3,
          },
          {
            label: 'Premium Plan',
            depth: 3,
          },
          {
            label: 'Conclusion',
            depth: 2,
          },
          {
            label: 'Summary',
            depth: 3,
          },
          {
            label: 'Final Thoughts',
            depth: 3,
          },
          {
            label: 'Call to Action',
            depth: 2,
          },
          {
            label: 'Sign Up Now',
            depth: 3,
          },
          {
            label: 'Contact Us',
            depth: 3,
          },
        ].map(({ depth, label }, i) => {
          const Comp = `h${depth}`;

          return (
            <section
              data-depth={depth}
              key={i}
              className="data-[depth=3]:pl-5"
            >
              {/* @ts-ignore */}
              <Comp
                data-depth={depth}
                id={`${i + 1}`}
                className="scroll-mt-40 text-2xl font-medium capitalize data-[depth=3]:text-lg"
              >
                {label}
              </Comp>

              <div
                key={i}
                className="my-5 space-y-3 first:mt-0 last:mb-0"
              >
                {Array.from({
                  length:
                    Math.floor(Math.random() * (15 - 7 + 1)) + 7,
                }).map((_, i, arr) => (
                  <div
                    key={i}
                    style={{
                      width:
                        i + 1 === arr.length
                          ? `${Math.floor(Math.random() * (70 - 10 + 1)) + 10}%`
                          : '100%',
                    }}
                    className="h-3 rounded bg-muted-5"
                  ></div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <aside className="sticky top-[104px] flex h-[calc(100vh-40px-64px)] flex-col border-l border-muted-6 max-md:hidden">
        <div className="px-5">
          <h2 className="border-b border-muted-6 bg-background py-2 text-sm">
            Table of Content
          </h2>
        </div>

        <div className="grow overflow-auto px-5 py-2">
          <TocContent />
        </div>
      </aside>
    </div>
  );
}
