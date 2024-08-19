'use client';

import { useFloating } from '@floating-ui/react-dom';
import { Button } from '@typeweave/react/button';
import { FloatingCard } from './floating-card';
import React from 'react';

interface DefaultBehaviourProps {}

const displayName = 'DefaultBehaviour';

export const DefaultBehaviour = (props: DefaultBehaviourProps) => {
  const {} = props;

  const { refs, floatingStyles } = useFloating();

  return (
    <FloatingCard>
      <Button>reference</Button>
    </FloatingCard>
  );
};

DefaultBehaviour.displayName = displayName;
