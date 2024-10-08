'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import { useMobileDrawerState } from './mobile-drawer';
import { siteConfig } from '../site.config';
import { TocLink } from './toc-link';
import React from 'react';

const displayName = 'TocContent';

export const TocContent = () => {
  const [headings, setHeadings] = React.useState<
    HTMLHeadingElement[]
  >([]);

  const [activeHeadings, setActiveHeadings] = React.useState<
    string[]
  >([]);

  const handleClose = useMobileDrawerState((s) => s.handleClose);

  const dirYRef = React.useRef(0);

  const [{ dirY }] = useScroll();

  React.useEffect(() => {
    dirYRef.current = dirY;
  }, [dirY]);

  React.useEffect(() => {
    const mainContentId = 'main-content';

    const headings = document.querySelectorAll(
      `#${mainContentId} h2, #${mainContentId} h3`,
    ) as unknown as HTMLHeadingElement[];

    if (!headings.length) return;

    setHeadings(Array.from(headings));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setActiveHeadings((prev) =>
              [...prev, entry.target.id].sort(),
            );
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ol className="scrollbar-thin h-full overflow-auto">
      {headings.map(({ id, dataset, innerText }) => {
        const isActive = activeHeadings.includes(id);

        return (
          <li key={id}>
            <TocLink
              data-depth={dataset.depth}
              isActive={isActive}
              href={`${siteConfig.pathname}/skill-demo#${id}`}
              data-active={isActive}
              handleClose={handleClose}
              className="before:bg-primary-9 hover:bg-muted-4 active:bg-muted-5 relative block rounded px-2 py-1 text-sm before:absolute before:left-0 before:top-1/2 before:hidden before:h-1/3 before:w-1 before:-translate-y-1/2 before:rounded-full data-[depth=3]:ml-2 max-md:text-base md:data-[active=true]:before:block"
            >
              {innerText}
            </TocLink>
          </li>
        );
      })}
    </ol>
  );
};

TocContent.displayName = displayName;
