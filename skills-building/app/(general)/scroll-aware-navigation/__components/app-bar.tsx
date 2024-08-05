'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import useEmblaCarousel from 'embla-carousel-react';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const headerRef = React.useRef<HTMLElement>(null);
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
      { threshold: [0.7, 1], rootMargin: '-56px 0px 0px 0px' },
    );

    toObserve.forEach((element) => {
      observer.observe(element);
    });

    const handleScroll = () => {
      const currentScroll = scrollY;

      scrollDirection = currentScroll > lastScroll ? 1 : -1;

      lastScroll = currentScroll;

      if (headerRef.current) {
        headerRef.current.style.top = `-${Math.min(80, currentScroll)}px`;
      }

      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (scrollTop > 100) return;

      if (scrollTop) {
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
      ref={headerRef}
      data-scrolled={scrolled}
      className="fixed left-0 right-0 top-0 z-50 bg-white data-[scrolled=true]:shadow-md"
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
                  className="flex h-9 select-none items-center gap-2 rounded px-2 capitalize outline-none hover:bg-gray-200 focus-visible:ring-2 active:bg-gray-300"
                >
                  section {i + 1}
                </Link>

                {activeSectionId === i + 1 && (
                  <span className="absolute bottom-0 left-0 block h-[2px] w-full rounded-full bg-purple-500"></span>
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
