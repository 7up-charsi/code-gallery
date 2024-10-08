'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../_hooks/form-steps';
import React from 'react';

const displayName = 'Steps';

export const Steps = () => {
  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, updateStep } = useFormSteps();

  return (
    <aside
      aria-label="form indicators"
      className="mb-5 flex flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <PointerEvents key={i} onPress={() => updateStep(i + 1)}>
            <button
              aria-label={`${i + 1} step`}
              color="primary"
              data-active={currentStep === i + 1}
              className="ring-focus data-[active=true]:border-muted-8 data-[active=true]:text-muted-12 bg-background hover:data-[active=false]:border-muted-7 size-9 cursor-pointer select-none rounded border border-transparent outline-none focus-visible:ring-2 data-[active=true]:shadow-md"
            >
              {i + 1}
            </button>
          </PointerEvents>
        ))}
      </div>

      <h1 className="mt-5 text-2xl font-medium capitalize">
        {/* @ts-expect-error '`step${number}`' can't be used to index type 'Dictionary'. */}
        {dictionary[`step${currentStep}`].title}
      </h1>
    </aside>
  );
};

Steps.displayName = displayName;

// data-disabled={i === 3 && (!submitCount || hasErrors)}
// className="data-[disabled=true]:disabled flex items-center gap-3"
