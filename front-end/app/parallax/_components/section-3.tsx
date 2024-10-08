'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import { transform } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const displayName = 'Section3';

export const Section3 = () => {
  const [{ scrollY }] = useScroll();

  const imageY = transform(scrollY, [40, 1550], [-500, 0]);
  const contentY = transform(scrollY, [40, 1550], [-900, 0]);

  return (
    <div className="relative isolate flex h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: imageY }}
        className="absolute -z-50 h-full w-full will-change-transform"
      >
        <Image
          src="/assets/parallax/forest-landscape.jpg"
          alt="forest-landscape"
          fill
          priority
          className="object-cover object-top max-md:object-[-100px_top]"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="rounded bg-black/20 p-2 backdrop-blur-sm"
      >
        <span className="text-7xl font-medium uppercase text-white">
          parallax
        </span>
      </motion.div>
    </div>
  );
};

Section3.displayName = displayName;
