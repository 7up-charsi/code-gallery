'use client';

import { mergeRefs } from '@typeweave/react-utils';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import React from 'react';

interface FloatingCardProps {
  children?: React.ReactNode;
  heading: string;
}

const displayName = 'FloatingCard';

export const FloatingCard = React.forwardRef<
  HTMLDivElement,
  FloatingCardProps
>((props, forwardedRef) => {
  const { children, heading } = props;

  const scrollAnsectorRef = React.useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = React.useState(true);

  React.useEffect(() => {
    const ele = scrollAnsectorRef.current;

    if (!ele) return;

    const centerY = (ele.scrollHeight - ele.clientHeight) / 2;
    const centerX = (ele.scrollWidth - ele.clientWidth) / 2;

    ele.scrollTo({ top: centerY, left: centerX });

    setIsHidden(false);
  }, []);

  return (
    <section
      data-hidden={isHidden}
      className="border-muted-6 data-[hidden=true]:border-primary-6 relative isolate overflow-hidden rounded border"
    >
      <AnimatePresence>
        {isHidden ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="from-primary-3 to-secondary-3 absolute inset-0 z-50 bg-gradient-to-b"
          />
        ) : null}
      </AnimatePresence>

      <div className="flex h-full w-full flex-col">
        <div className="h-10 shrink-0 content-center border-b text-center font-medium capitalize">
          {heading}
        </div>

        <div
          ref={mergeRefs(forwardedRef, scrollAnsectorRef)}
          className="grow overflow-auto [scrollbar-width:_thin]"
        >
          <div className="flex h-[2000px] w-[2000px] items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
});

FloatingCard.displayName = displayName;
