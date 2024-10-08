'use client';

import { useCalculator } from '../_hooks/calculator';
import React from 'react';

const displayName = 'Screen';

export const Screen = () => {
  const { value } = useCalculator();

  return (
    <div className="bg-muted-3 h-16 w-full content-center truncate rounded px-5 py-3 text-right text-lg font-bold [direction:rtl]">
      {reverseString(value)}
    </div>
  );
};

Screen.displayName = displayName;

const reverseString = (str: string) => {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};
