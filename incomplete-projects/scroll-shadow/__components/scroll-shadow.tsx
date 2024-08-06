'use client';

import { twMerge } from 'tailwind-merge';
import React from 'react';

interface ScrollShadowProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'ScrollShadow';

export const ScrollShadow = (props: ScrollShadowProps) => {
  const { className, children, ...restProps } = props;

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [shadow, setShadow] = React.useState({
    top: false,
    bottom: false,
  });

  React.useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;

      console.log({ scrollTop, scrollHeight, clientHeight });

      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight === scrollHeight;

      // setShadow({ top: !isAtTop, bottom: !isAtBottom });

      //   element?.setAttribute('data-', `${!isAtTop}`);

      element.dataset.top = `${!isAtTop}`;
      element.dataset.bottom = `${!isAtBottom}`;
    };

    handleScroll();

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={twMerge(
        'data-[top=true]:shadow-[inset_0px_0px_20px_rgba(0,0,0,0.2)]',
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

ScrollShadow.displayName = displayName;
