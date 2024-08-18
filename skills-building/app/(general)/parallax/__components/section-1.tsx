'use client';

import { transform, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import React from 'react';

interface Section1Props {}

const displayName = 'Section1';

export const Section1 = (props: Section1Props) => {
  const {} = props;

  const { scrollY } = useScroll();

  const position = useTransform(scrollY, [40, 800], [0, 500]);

  return (
    <motion.div
      style={{
        backgroundPositionX: -100,
        backgroundPositionY: position,
      }}
      className="h-screen bg-[url(/assets/parallax/jungle-landscape.jpg)] bg-cover bg-no-repeat"
    ></motion.div>
  );
};

Section1.displayName = displayName;
