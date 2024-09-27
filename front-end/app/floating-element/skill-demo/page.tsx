'use client';

import {
  arrow,
  autoUpdate,
  flip,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/react-dom';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { Loader2Icon, SmileIcon } from 'lucide-react';
import { mergeRefs } from '@typeweave/react-utils';
import { Button } from '@typeweave/react/button';
import { createPortal } from 'react-dom';
import React from 'react';

export default function Home() {
  const referenceRef = React.useRef<HTMLButtonElement>(null);
  const arrowRef = React.useRef<HTMLDivElement>(null);

  const isMounted = useIsMounted();

  const { floatingStyles, refs, middlewareData, placement } =
    useFloating({
      placement: 'bottom',
      transform: true,
      strategy: 'fixed',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({ mainAxis: 10 }),
        flip(),
        shift({ limiter: limitShift({ offset: 25 }) }),
        size(),
        arrow({ element: arrowRef, padding: 10 }),
        hide({ strategy: 'referenceHidden' }),
      ],
    });

  React.useEffect(() => {
    referenceRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, []);

  const arrowData = middlewareData.arrow;
  const hideData = middlewareData.hide;
  const side = placement.split('-')[0];

  const floatingElement = (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      data-hide={hideData?.referenceHidden}
      className="bg-paper border-muted-7 relative rounded border p-5 shadow-md data-[hide=true]:hidden max-md:max-w-[calc(100vw-40px)]"
    >
      <div
        ref={arrowRef}
        style={{
          top: arrowData?.y,
          left: arrowData?.x,
        }}
        data-side={side}
        className="absolute left-0 border-[6px] border-transparent [--arrow-color:theme(colors.muted-9)] data-[side=bottom]:bottom-full data-[side=left]:left-full data-[side=right]:right-full data-[side=top]:top-full data-[side=bottom]:border-b-[var(--arrow-color)] data-[side=left]:border-l-[var(--arrow-color)] data-[side=right]:border-r-[var(--arrow-color)] data-[side=top]:border-t-[var(--arrow-color)]"
      ></div>

      <div className="text-muted-12 text-balance text-center font-medium">
        Hi, I&apos;m a floating element!
      </div>

      <div className="mt-2">To ensure a smooth experience:</div>

      <ul className="mt-1 list-inside list-disc">
        <li>I adjust vertically to fit available space</li>
        <li>I shift horizontally when hitting boundaries</li>
        <li>I hide when my reference element is hidden</li>
      </ul>

      <div className="mt-2">Enjoy seamless interactions!</div>
    </div>
  );

  return (
    <main className="flex h-[300vh] w-[300vw] items-center justify-center">
      <Button
        ref={mergeRefs(referenceRef, refs.setReference)}
        startContent={
          isMounted ? (
            <SmileIcon />
          ) : (
            <Loader2Icon className="animate-spin" />
          )
        }
      >
        Reference
      </Button>

      {isMounted &&
        createPortal(floatingElement, globalThis.document?.body)}
    </main>
  );
}
