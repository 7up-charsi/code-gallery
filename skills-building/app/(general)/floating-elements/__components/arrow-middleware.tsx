'use client';

import {
  arrow,
  autoUpdate,
  flip,
  hide,
  limitShift,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { Button } from '@typeweave/react/button';
import { FloatingCard } from './floating-card';
import { ChevronUpIcon } from 'lucide-react';
import React from 'react';

interface ArrowMiddlewareProps {}

const displayName = 'ArrowMiddleware';

export const ArrowMiddleware = (props: ArrowMiddlewareProps) => {
  const {} = props;

  const arrowRef = React.useRef<HTMLSpanElement>(null);

  const { refs, floatingStyles, middlewareData, placement } =
    useFloating({
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
          limiter: limitShift({
            offset: {
              mainAxis: 20,
            },
          }),
          rootBoundary: 'document',
        }),
        hide({
          rootBoundary: 'document',
        }),
        arrow({ element: arrowRef, padding: 5 }),
      ],
    });

  const side = placement.split('-')[0];

  return (
    <FloatingCard heading="arrow middleware">
      <Button ref={refs.setReference}>reference</Button>

      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          visibility: middlewareData.hide?.referenceHidden
            ? 'hidden'
            : undefined,
        }}
        className="border-muted-6 relative h-10 content-center rounded border bg-black px-3 capitalize text-white"
      >
        <span>floating element</span>

        <span
          ref={arrowRef}
          style={{
            top: middlewareData.arrow?.y,
            left: middlewareData.arrow?.x,
          }}
          data-side={side}
          className="absolute border-4 border-transparent border-b-black text-black data-[side=bottom]:bottom-full data-[side=left]:left-full data-[side=right]:right-full data-[side=top]:top-full data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180"
        ></span>
      </div>
    </FloatingCard>
  );
};

ArrowMiddleware.displayName = displayName;
