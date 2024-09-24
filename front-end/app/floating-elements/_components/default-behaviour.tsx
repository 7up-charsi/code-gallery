'use client';

import {
  autoUpdate,
  offset,
  useFloating,
} from '@floating-ui/react-dom';
import { Button } from '@typeweave/react/button';
import { FloatingCard } from './floating-card';
import React from 'react';

interface DefaultBehaviourProps {}

const displayName = 'DefaultBehaviour';

export const DefaultBehaviour = (props: DefaultBehaviourProps) => {
  const {} = props;

  const { refs, floatingStyles } = useFloating({
    transform: true,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
      }),
    ],
  });

  return (
    <FloatingCard heading="default behaviour">
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

DefaultBehaviour.displayName = displayName;
