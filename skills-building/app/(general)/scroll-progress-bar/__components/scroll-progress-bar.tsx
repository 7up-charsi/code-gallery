'use client';

import { motion, useSpring, useScroll } from 'framer-motion';
import React from 'react';

interface ScrollProgressBarProps {}

const displayName = 'ScrollProgressBar';

export const ScrollProgressBar = (props: ScrollProgressBarProps) => {
  const {} = props;

  const scroll = useScroll();
  const springScrollY = useSpring(scroll.scrollYProgress, {
    stiffness: 100,
    damping: 15,
  });

  return !springScrollY ? null : (
    <motion.div
      style={{ scaleX: springScrollY }}
      className="fixed left-0 top-0 h-1 w-full origin-left scale-0 bg-primary-9 transition-[width] data-[full=true]:rounded-none"
    ></motion.div>
  );
};

ScrollProgressBar.displayName = displayName;
