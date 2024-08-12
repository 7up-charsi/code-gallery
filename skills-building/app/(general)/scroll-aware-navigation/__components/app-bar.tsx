'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { useScroll } from '@typeweave/react/use-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const [activeSectionId, setActiveSectionId] = React.useState(0);

  const scrollDirRef = React.useRef(0);

  const [{ isAtTop }] = useScroll({
    onScrollY: ({ dirY }) => {
      scrollDirRef.current = dirY;
    },
  });

  React.useEffect(() => {
    if (!emblaApi) return;

    const toObserve = Array.from({ length: 10 })
      .map((_, i) => document.getElementById(`${i + 1}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const scrollDir = scrollDirRef.current;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            scrollDir === 1 &&
            entry.intersectionRatio >= 0.7
          ) {
            setActiveSectionId(+entry.target.id);
            emblaApi.scrollTo(+entry.target.id);
          } else if (
            entry.isIntersecting &&
            scrollDir === -1 &&
            entry.intersectionRatio === 1
          ) {
            setActiveSectionId(+entry.target.id);
            emblaApi.scrollTo(+entry.target.id);
          }
        });
      },
      { threshold: [0.7, 1], rootMargin: '-96px 0px 0px 0px' },
    );

    toObserve.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [emblaApi]);

  return (
    <header
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="sticky -top-10 left-0 right-0 z-50 bg-white data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="grid h-24 grid-cols-1 grid-rows-[40px_56px] items-center justify-center">
        <div className="mx-auto">
          <Branding href={siteConfig.pathname}>
            {siteConfig.name}
          </Branding>
        </div>

        <div
          ref={emblaRef}
          className="h-full overflow-hidden bg-muted-2 px-5"
        >
          <nav className="mx-auto flex h-full max-w-screen-lg items-center gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="relative h-full shrink-0 content-center"
              >
                <Link
                  href={`#${i + 1}`}
                  className="flex h-9 select-none items-center gap-2 rounded px-2 capitalize outline-none hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4"
                >
                  section {i + 1}
                </Link>

                {activeSectionId === i + 1 && (
                  <span className="absolute bottom-0 left-0 block h-[2px] w-full rounded-full bg-primary-9"></span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
