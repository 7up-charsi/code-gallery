'use client';

import { Control, useFormState, useWatch } from 'react-hook-form';
import { useDictionaryCtx } from './dictionary-provider';
import { Skeleton } from '@typeweave/react/skeleton';
import { FormValues } from './form';
import React from 'react';

interface ResultsProps {
  control: Control<FormValues>;
}

const displayName = 'Results';

export const Results = (props: ResultsProps) => {
  const { control } = props;

  const interestOnlyId = React.useId();
  const monthlyId = React.useId();
  const totalId = React.useId();

  const articleRef = React.useRef<HTMLElement>(null);

  const { isSubmitting } = useFormState({ control });

  const { dictionary } = useDictionaryCtx(displayName);

  const [_interestOnlyPayment, _totalRepayment, _monthlyRepayment] =
    useWatch({
      control,
      name: [
        'interestOnlyPayment',
        'totalRepayment',
        'monthlyRepayment',
      ],
    });

  const interestOnlyPayment = _interestOnlyPayment
    ? (+_interestOnlyPayment).toFixed(2)
    : undefined;

  const totalRepayment = _totalRepayment
    ? (+_totalRepayment).toFixed(2)
    : undefined;

  const monthlyRepayment = _monthlyRepayment
    ? (+_monthlyRepayment).toFixed(2)
    : undefined;

  return (
    !!(interestOnlyPayment || totalRepayment || monthlyRepayment) && (
      <article
        ref={articleRef}
        className="bg-background mb-5 rounded px-5 pb-3 pt-5 md:col-span-2"
      >
        {!interestOnlyPayment ? null : (
          <>
            <h3
              aria-describedby={interestOnlyId}
              className="mb-2 text-balance text-center font-medium capitalize"
            >
              {isSubmitting ? (
                <Skeleton
                  variant="text"
                  className="mx-auto w-full max-w-md"
                />
              ) : (
                dictionary.interestOnlyHeading
              )}
            </h3>

            <div
              id={interestOnlyId}
              className="scrollbar-thin overflow-x-auto py-2 text-center font-mono text-6xl font-bold"
            >
              {isSubmitting ? (
                <Skeleton
                  variant="text"
                  className="mx-auto w-full max-w-md"
                />
              ) : (
                interestOnlyPayment
              )}
            </div>
          </>
        )}

        {!monthlyRepayment ? null : (
          <>
            <h3
              aria-describedby={monthlyId}
              className="mb-2 text-balance text-center font-medium capitalize"
            >
              {isSubmitting ? (
                <Skeleton
                  variant="text"
                  className="mx-auto w-full max-w-md"
                />
              ) : (
                dictionary.monthlyHeading
              )}
            </h3>

            <div
              id={monthlyId}
              className="scrollbar-thin overflow-x-auto py-2 text-center font-mono text-6xl font-bold"
            >
              {isSubmitting ? (
                <Skeleton
                  variant="text"
                  className="mx-auto w-full max-w-md"
                />
              ) : (
                monthlyRepayment
              )}
            </div>
          </>
        )}

        {!totalRepayment ? null : (
          <>
            <hr className="mx-auto my-5 w-full max-w-md" />

            <h3
              aria-describedby={totalId}
              className="mb-2 text-balance text-center font-medium capitalize"
            >
              {isSubmitting ? (
                <Skeleton
                  variant="text"
                  className="mx-auto w-full max-w-md"
                />
              ) : (
                dictionary.totalHeading
              )}
            </h3>

            <div
              id={totalId}
              className="scrollbar-thin overflow-x-auto py-2 text-center font-mono text-6xl font-bold"
            >
              {isSubmitting ? (
                <Skeleton
                  variant="text"
                  className="mx-auto w-full max-w-md"
                />
              ) : (
                totalRepayment
              )}
            </div>
          </>
        )}
      </article>
    )
  );
};

Results.displayName = displayName;
