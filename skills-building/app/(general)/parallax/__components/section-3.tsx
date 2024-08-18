'use client';

import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import React from 'react';

interface Section3Props {}

const displayName = 'Section3';

export const Section3 = (props: Section3Props) => {
  const {} = props;

  const { scrollY } = useScroll();

  const position = useTransform(scrollY, [800, 1550], [-500, 0]);

  return (
    <motion.div
      style={{
        backgroundPositionX: 'center',
        backgroundPositionY: position,
      }}
      className="h-screen bg-[url(/assets/parallax/forest-landscape.jpg)] bg-cover bg-no-repeat"
    ></motion.div>
  );
};

Section3.displayName = displayName;
