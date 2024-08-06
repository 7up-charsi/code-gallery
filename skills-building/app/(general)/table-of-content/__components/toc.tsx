'use client';

import React from 'react';

interface TocProps {}

const displayName = 'Toc';

export const Toc = (props: TocProps) => {
  const {} = props;

  const [headings, setHeadings] = React.useState<
    HTMLHeadingElement[]
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

    const observer = new IntersectionObserver(() => {}, {
      threshold: [],
    });

    headings.forEach((ele) => observer.observe(ele));

    const handleScroll = () => {
      const currentScroll = scrollY;

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
    <aside className="sticky top-[104px] h-[calc(100vh-40px-64px)] p-5 border-test">
      <h2>Table of Content</h2>

      <ol className="">
        {headings.map(({ id, dataset, innerText }) => (
          <li
            key={id}
            data-depth={dataset.depth}
            className="ml-2 data-[depth=3]:ml-5"
          >
            {innerText}
          </li>
        ))}
      </ol>
    </aside>
  );
};

Toc.displayName = displayName;
