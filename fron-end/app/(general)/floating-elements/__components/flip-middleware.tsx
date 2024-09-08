'use client';

import {
  autoUpdate,
  flip,
  hide,
  offset,
  useFloating,
} from '@floating-ui/react-dom';
import { Button } from '@typeweave/react/button';
import { FloatingCard } from './floating-card';
import React from 'react';

interface FlipMiddlewareProps {}

const displayName = 'FlipMiddleware';

export const FlipMiddleware = (props: FlipMiddlewareProps) => {
  const {} = props;

  const { refs, floatingStyles, middlewareData } = useFloating({
    transform: true,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
      }),
      flip({
        rootBoundary: 'document',
      }),
      hide({
        rootBoundary: 'document',
      }),
    ],
  });

  return (
    <FloatingCard heading="flip middleware">
      <Button ref={refs.setReference}>reference</Button>

      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          visibility: middlewareData.hide?.referenceHidden
            ? 'hidden'
            : undefined,
        }}
        className="border-muted-6 h-10 content-center rounded border bg-black px-3 capitalize text-white"
      >
        floating element
      </div>
    </FloatingCard>
  );
};

FlipMiddleware.displayName = displayName;
