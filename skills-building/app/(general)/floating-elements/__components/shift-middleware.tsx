'use client';

import {
  autoUpdate,
  flip,
  limitShift,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { Button } from '@typeweave/react/button';
import { FloatingCard } from './floating-card';
import React from 'react';

interface ShiftMiddlewareProps {}

const displayName = 'ShiftMiddleware';

export const ShiftMiddleware = (props: ShiftMiddlewareProps) => {
  const {} = props;

  const { refs, floatingStyles } = useFloating({
    transform: true,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
      }),
      flip({
        rootBoundary: 'document',
      }),
      shift({
        limiter: limitShift(),
        rootBoundary: 'document',
      }),
    ],
  });

  return (
    <FloatingCard heading="shift middleware">
      <Button ref={refs.setReference}>reference</Button>

      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="border-muted-6 h-10 content-center rounded border bg-black px-3 capitalize text-white"
      >
        floating element
      </div>
    </FloatingCard>
  );
};

ShiftMiddleware.displayName = displayName;
