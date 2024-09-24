'use client';

import { useCalculator } from '../_hooks/calculator';
import React from 'react';

interface ScreenProps {}

const displayName = 'Screen';

export const Screen = (props: ScreenProps) => {
  const {} = props;

  const { operandLeft, result, operandRight, operator } =
    useCalculator();

  return (
    <div className="bg-muted-3 grid h-16 w-full grid-cols-1 grid-rows-2 items-center justify-items-end rounded px-5 py-3 font-bold">
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
