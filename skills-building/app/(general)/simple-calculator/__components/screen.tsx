'use client';

import { useCalculator } from '../__zustand/calculator';
import React from 'react';

interface ScreenProps {}

const displayName = 'Screen';

export const Screen = (props: ScreenProps) => {
  const {} = props;

  const { operandLeft, result, operandRight, operator } =
    useCalculator();

  return (
    <div className="grid h-16 w-full grid-cols-1 grid-rows-2 items-center justify-items-end rounded bg-sc-screen_bg px-5 py-3 font-bold">
      {!operator && (
        <span className="row-span-2 text-2xl font-bold">
          {operandLeft}
        </span>
      )}

      {result && (
        <span className="row-span-2 text-2xl font-bold">
          {result}
        </span>
      )}

      {operator && !result && (
        <>
          <span className="">
            {operandLeft} {operator}
          </span>
          <span className="text-xl">{operandRight}</span>
        </>
      )}
    </div>
  );
};

Screen.displayName = displayName;
