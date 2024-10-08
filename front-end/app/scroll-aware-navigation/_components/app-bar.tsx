'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import useEmblaCarousel from 'embla-carousel-react';
import { Branding } from '@repo/ui/branding';
import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

const displayName = 'AppBar';

export const AppBar = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const [activeSectionId, setActiveSectionId] = React.useState(0);

  const scrollDirRef = React.useRef(0);

  const [{ isAtTop, dirY }] = useScroll();

  React.useEffect(() => {
    scrollDirRef.current = dirY;
  }, [dirY]);

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
            entry.intersectionRatio >= 0.5
          ) {
            setActiveSectionId(+entry.target.id);
            emblaApi.scrollTo(+entry.target.id - 1);
          } else if (
            entry.isIntersecting &&
            scrollDir === -1 &&
            entry.intersectionRatio === 1
          ) {
            setActiveSectionId(+entry.target.id);
            emblaApi.scrollTo(+entry.target.id - 1);
          }
        });
      },
      { threshold: [0.7, 1], rootMargin: '-112px 0px 0px 0px' },
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
      className="bg-background sticky left-0 top-0 z-50 w-full data-[scrolled=true]:shadow-md"
    >
      <div className="border-muted-4 flex h-16 items-center gap-3 border-b px-5 md:px-8">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <ThemeSwitcher />
      </div>

      <div
        ref={emblaRef}
        className="h-12 overflow-hidden px-5 md:px-8"
      >
        <nav className="mx-auto flex h-full max-w-screen-lg items-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link
              key={i}
              data-active={activeSectionId === i + 1}
              href={`#${i + 1}`}
              className="before:bg-muted-9 hover:bg-muted-3 active:bg-muted-4 relative flex h-full shrink-0 select-none items-center px-2 capitalize outline-none before:absolute before:bottom-0 before:left-1/2 before:hidden before:h-1 before:w-1/3 before:-translate-x-1/2 before:rounded-full focus-visible:ring-2 data-[active=true]:before:block"
            >
              section {i + 1}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
