'use client';

import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface Section3Props {}

const displayName = 'Section3';

export const Section3 = (props: Section3Props) => {
  const {} = props;

  const { scrollY } = useScroll();

  const position = useTransform(scrollY, [800, 1550], [-500, 0]);

  return (
    <div className="relative isolate h-screen overflow-hidden">
      <motion.div
        style={{ y: position }}
        className="absolute -z-50 h-full w-full will-change-transform"
      >
        <Image
          src="/assets/parallax/forest-landscape.jpg"
          alt="forest-landscape"
          fill
          className="object-cover object-top max-md:object-[-100px_top]"
        />
      </motion.div>
    </div>
  );
};

Section3.displayName = displayName;
