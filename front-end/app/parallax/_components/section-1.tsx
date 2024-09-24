'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import { transform } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface Section1Props {}

const displayName = 'Section1';

export const Section1 = (props: Section1Props) => {
  const {} = props;

  const [{ scrollY }] = useScroll();

  const imageY = transform(scrollY, [40, 1000], [0, 500]);
  const contentY = transform(scrollY, [40, 1000], [0, 300]);

  return (
    <div className="relative isolate flex h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: imageY }}
        className="absolute -z-50 h-full w-full will-change-transform"
      >
        <Image
          src="/assets/parallax/jungle-landscape.jpg"
          alt="jungle-landscape"
          fill
          priority
          className="object-cover object-top max-md:object-[-100px_top]"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="bg-background/20 rounded p-2 backdrop-blur-sm"
      >
        <span className="text-7xl font-medium uppercase text-white">
          parallax
        </span>
      </motion.div>
    </div>
  );
};

Section1.displayName = displayName;
