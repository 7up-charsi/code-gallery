'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface ScrollProgressBarProps {}

const displayName = 'ScrollProgressBar';

export const ScrollProgressBar = (props: ScrollProgressBarProps) => {
  const {} = props;

  const [{ scrollYProgress }] = useScroll();

  return !scrollYProgress ? null : (
    <div
      style={{ scale: `${scrollYProgress} 1` }}
      className="fixed left-0 top-0 z-[999] h-1 w-full origin-left bg-black transition-transform dark:bg-white"
    ></div>
  );
};

ScrollProgressBar.displayName = displayName;
