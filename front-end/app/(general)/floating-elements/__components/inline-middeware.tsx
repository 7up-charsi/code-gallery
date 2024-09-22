'use client';

import {
  autoUpdate,
  hide,
  inline,
  offset,
  useFloating,
} from '@floating-ui/react-dom';
import { mergeRefs } from '@typeweave/react-utils';
import { FloatingCard } from './floating-card';
import React from 'react';

interface InlineMiddlewareProps {}

const displayName = 'InlineMiddleware';

export const InlineMiddleware = (props: InlineMiddlewareProps) => {
  const {} = props;

  const inlineEleRef = React.useRef<HTMLSpanElement>(null);

  const [inlineX, setInlineX] = React.useState<number | undefined>(
    undefined,
  );

  const [inlineY, setInlineY] = React.useState<number | undefined>(
    undefined,
  );

  const [isHidden, setIsHidden] = React.useState(true);

  React.useEffect(() => {
    const ele = inlineEleRef.current;

    if (!ele) return;

    const onPointerEnter = (e: PointerEvent) => {
      setInlineX(e.clientX);
      setInlineY(e.clientY);
      setIsHidden(false);
    };

    const onPointerLeave = (e: PointerEvent) => {
      setInlineX(undefined);
      setInlineY(undefined);
      setIsHidden(true);
    };

    ele.addEventListener('pointerenter', onPointerEnter);
    ele.addEventListener('pointerleave', onPointerLeave);

    return () => {
      ele.removeEventListener('pointerenter', onPointerEnter);
      ele.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const { refs, floatingStyles, middlewareData } = useFloating({
    transform: true,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
      }),
      inline({ x: inlineX, y: inlineY }),
      hide({
        rootBoundary: 'document',
      }),
    ],
  });

  return (
    <FloatingCard heading="inline middleware">
      <p className="w-full max-w-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        <span
          ref={mergeRefs(refs.setReference, inlineEleRef)}
          className="bg-primary-5"
        >
          Aspernatur quisquam aut corrupti temporibus amet cupiditate
          quo obcaecati numquam unde ,
        </span>
        facere quaerat autem voluptates magnam sapiente provident
        praesentium. Incidunt, praesentium nesciunt!
      </p>

      {isHidden ? null : (
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
      )}
    </FloatingCard>
  );
};

InlineMiddleware.displayName = displayName;
