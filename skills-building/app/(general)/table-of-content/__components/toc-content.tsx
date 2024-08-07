'use client';

import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

interface TocContentProps {}

const displayName = 'TocContent';

export const TocContent = (props: TocContentProps) => {
  const {} = props;

  const [headings, setHeadings] = React.useState<
    HTMLHeadingElement[]
  >([]);

  const [activeHeadings, setActiveHeadings] = React.useState<
    string[]
  >([]);

  React.useEffect(() => {
    const mainContentId = 'main-content';

    const headings = document.querySelectorAll(
      `#${mainContentId} h2, #${mainContentId} h3`,
    ) as unknown as HTMLHeadingElement[];

    if (!headings.length) return;

    setHeadings(Array.from(headings));

    let lastScroll = 0;
    let lastScrollDirection = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setActiveHeadings((prev) => [...prev, entry.target.id]);
          }

          if (entry.intersectionRatio === 0) {
            setActiveHeadings((prev) =>
              prev.filter((id) => id !== entry.target.id),
            );
          }
        });
      },
      {
        rootMargin: '-104px 0px 0px 0px',
        threshold: [1, 0],
      },
    );

    headings.forEach((ele) => observer.observe(ele));

    const handleScroll = () => {
      const currentScroll = scrollY;

      const newScrollDirection = currentScroll > lastScroll ? 1 : -1;

      lastScroll = currentScroll;
      lastScrollDirection = newScrollDirection;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <ol>
      {headings.map(({ id, dataset, innerText }) => {
        const isActive = activeHeadings.includes(id);

        return (
          <li
            key={id}
            data-depth={dataset.depth}
            className="relative data-[depth=3]:ml-5 md:pl-3"
          >
            {!isActive ? null : (
              <div className="absolute left-0 top-1/2 size-[6px] -translate-y-1/2 rounded-full bg-primary-9 max-md:hidden"></div>
            )}

            <Link
              href={`${siteConfig.pathname}#${id}`}
              data-active={isActive}
              className="flex h-9 items-center rounded px-2 text-sm hover:bg-muted-4 active:bg-muted-5 max-md:px-4 max-md:text-base max-md:text-muted-12 md:h-7 md:data-[active=true]:text-muted-12"
            >
              {innerText}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

TocContent.displayName = displayName;
