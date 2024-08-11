'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface ScrollProgressBarProps {}

const displayName = 'ScrollProgressBar';

export const ScrollProgressBar = (props: ScrollProgressBarProps) => {
  const {} = props;

  const scroll = useScroll();

  return !scroll.y ? null : (
    <div className="fixed left-0 right-0 top-0 h-1">
      <div
        style={{ width: `${scroll.yInPercent}%` }}
        data-full={true}
        className="h-full rounded-r-full bg-primary-9 transition-[width] data-[full=true]:rounded-none"
      />
    </div>
  );
};

ScrollProgressBar.displayName = displayName;
