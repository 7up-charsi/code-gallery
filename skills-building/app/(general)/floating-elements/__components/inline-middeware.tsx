'use client';

import {
  autoUpdate,
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

    const onPointerOver = (e: PointerEvent) => {
      setInlineX(e.clientX);
      setInlineY(e.clientY);
      setIsHidden(false);
    };

    const onPointerOut = (e: PointerEvent) => {
      setInlineX(undefined);
      setInlineY(undefined);
      setIsHidden(true);
    };

    ele.addEventListener('pointerenter', onPointerOver);
    ele.addEventListener('pointerleave', onPointerOut);

    return () => {
      ele.removeEventListener('pointerenter', onPointerOver);
      ele.removeEventListener('pointerleave', onPointerOut);
    };
  }, []);

  const { refs, floatingStyles } = useFloating({
    transform: true,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
      }),
      inline({ x: inlineX, y: inlineY }),
    ],
  });

  return (
    <FloatingCard heading="inline middleware">
      <div className="max-w-sm">
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
      </div>

      {isHidden ? null : (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="border-muted-6 h-10 content-center rounded border bg-black px-3 capitalize text-white"
        >
          floating element
        </div>
      )}
    </FloatingCard>
  );
};

InlineMiddleware.displayName = displayName;
