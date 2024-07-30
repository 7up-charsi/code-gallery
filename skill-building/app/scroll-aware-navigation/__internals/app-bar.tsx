'use client';

import useEmblaCarousel from 'embla-carousel-react';
import author from '@repo/meta/author.json';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const [scrolled, setScrolled] = React.useState(false);
  const [activeSectionId, setActiveSectionId] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    let lastScroll = 0;
    let scrollDirection = 0; // 1 is down and -1 is up

    const toObserve = Array.from({ length: 10 })
      .map((_, i) => document.getElementById(`${i + 1}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            scrollDirection === 1 &&
            entry.intersectionRatio >= 0.7
          ) {
            setActiveSectionId(+entry.target.id);
            emblaApi.scrollTo(+entry.target.id);
          } else if (
            entry.isIntersecting &&
            scrollDirection === -1 &&
            entry.intersectionRatio === 1
          ) {
            setActiveSectionId(+entry.target.id);
            emblaApi.scrollTo(+entry.target.id);
          }
        });
      },
      { threshold: [0.7, 1], rootMargin: '-60px 0px 0px 0px' },
    );

    toObserve.forEach((element) => {
      observer.observe(element);
    });

    const handleScroll = () => {
      const currentScroll = scrollY;

      scrollDirection = currentScroll > lastScroll ? 1 : -1;

      lastScroll = currentScroll;

      const { top } = document.body.getBoundingClientRect();

      if (top < -100) return;

      if (top < 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [emblaApi]);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky -top-16 left-0 right-0 z-50 data-[scrolled=true]:shadow-md"
    >
      <div className="flex h-16 items-center bg-purple-500 px-5">
        <Link
          href={author.portfolio}
          className="rounded p-1 text-xl uppercase text-white outline-none ring-white focus-visible:ring-2"
        >
          {author.name}
        </Link>
      </div>

      <div ref={emblaRef} className="overflow-hidden bg-gray-50 px-5">
        <nav className="flex items-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="relative h-full shrink-0 content-center py-2"
            >
              <Link
                href={`#${i + 1}`}
                className="flex h-9 select-none items-center gap-2 rounded px-2 capitalize outline-none hover:bg-gray-200 focus-visible:ring-2 active:bg-gray-300"
              >
                section {i + 1}
              </Link>

              {activeSectionId === i + 1 && (
                <span className="absolute bottom-0 left-0 block h-1 w-full rounded-full bg-purple-500"></span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
