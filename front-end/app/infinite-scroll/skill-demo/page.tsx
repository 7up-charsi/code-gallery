'use client';

import { Loader2Icon } from 'lucide-react';
import { Fab } from '../_components/fab';
import React from 'react';

const maxRows = 350;

export default function SkillDemoPage() {
  const canLoadMoreRef = React.useRef(true);
  const isLoadingRef = React.useRef(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState(50);

  React.useEffect(() => {
    let lastScroll = 0;
    let lastScrollDirection = 0; // 1 is down, -1 is up

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          lastScrollDirection === 1 &&
          entry.isIntersecting &&
          entry.intersectionRatio === 1 &&
          canLoadMoreRef.current &&
          !isLoadingRef.current
        ) {
          setIsLoading(true);
          isLoadingRef.current = true;

          setTimeout(() => {
            setIsLoading(false);
            isLoadingRef.current = false;

            setRows((prev) => {
              if (prev >= maxRows) {
                canLoadMoreRef.current = false;
                return prev;
              }

              return Math.min(maxRows, prev + 30);
            });
          }, 1000);
        }
      },
      {
        rootMargin: '0px 0px 200px 0px',
        threshold: 1,
      },
    );

    const elementToObserve = document.getElementById('bottom');

    if (elementToObserve) observer.observe(elementToObserve);

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      const newScrollDirection = currentScroll > lastScroll ? 1 : -1;

      lastScroll = currentScroll;
      lastScrollDirection = newScrollDirection;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);

      observer.disconnect();
    };
  }, []);

  return (
    <main className="bg-muted-2 min-h-[calc(100vh-64px)] p-5 md:px-8">
      <h1 className="my-10 text-balance text-center text-2xl font-medium">
        Scroll for more
      </h1>

      <div className="mx-auto max-w-screen-md">
        <div className="">
          {Array.from({
            length: rows,
          }).map((_, i) => (
            <div
              key={i}
              data-margin={i % 30 === 0}
              className="mt-2 flex h-5 items-center gap-5 data-[margin=true]:mt-10"
            >
              <div className="bg-muted-9 h-px grow rounded"></div>

              <span className="">{i + 1}</span>

              <div className="bg-muted-9 h-px grow rounded"></div>
            </div>
          ))}
        </div>

        {isLoading && rows < maxRows ? (
          <div className="mt-10 flex w-full items-center justify-center gap-5">
            <span>Loading more</span>
            <Loader2Icon size={50} className="animate-spin" />
          </div>
        ) : null}

        <div
          id="bottom"
          data-margin={rows === maxRows}
          className="flex items-center justify-center font-bold capitalize opacity-50 data-[margin=true]:my-10"
        >
          {rows === maxRows ? 'At the end' : null}
        </div>
      </div>

      <Fab />
    </main>
  );
}
