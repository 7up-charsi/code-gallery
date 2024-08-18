'use client';

import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface Section1Props {}

const displayName = 'Section1';

export const Section1 = (props: Section1Props) => {
  const {} = props;

  const { scrollY } = useScroll();

  const position = useTransform(scrollY, [40, 800], [0, 500]);

  return (
    <div className="relative isolate h-screen overflow-hidden">
      <motion.div
        style={{ y: position }}
        className="absolute -z-50 h-full w-full will-change-transform"
      >
        <Image
          src="/assets/parallax/jungle-landscape.jpg"
          alt="jungle-landscape"
          fill
          className="object-cover object-top max-md:object-[-100px_top]"
        />
      </motion.div>
    </div>
  );
};

Section1.displayName = displayName;
