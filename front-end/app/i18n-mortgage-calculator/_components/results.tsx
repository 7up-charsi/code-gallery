'use client';

import { Control, useFormState, useWatch } from 'react-hook-form';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { useDictionaryCtx } from './dictionary-provider';
import { EuroIcon, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { FormValues } from './form';
import React from 'react';

interface ResultsProps {
  control: Control<FormValues>;
}

const displayName = 'Results';

export const Results = (props: ResultsProps) => {
  const { control } = props;

  const articleRef = React.useRef<HTMLElement>(null);

  const { isSubmitting } = useFormState({ control });

  const { dictionary } = useDictionaryCtx(displayName);

  const isMounted = useIsMounted();

  const [_interestOnlyPayment, _totalRepayment, _monthlyRepayment] =
    useWatch({
      control,
      name: [
        'interestOnlyPayment',
        'totalRepayment',
        'monthlyRepayment',
      ],
    });

  const interestOnlyPayment = _interestOnlyPayment?.toFixed(2);
  const totalRepayment = _totalRepayment?.toFixed(2);
  const monthlyRepayment = _monthlyRepayment?.toFixed(2);

  return (
    <>
      <article
        ref={articleRef}
        className="bg-background rounded p-5 md:col-span-2"
      >
        {!isSubmitting ? null : (
          <div className="flex min-h-[124px] items-center justify-center">
            <Loader2 size={60} className="animate-spin" />
          </div>
        )}

        {isSubmitting ? null : (
          <>
            {interestOnlyPayment ||
            totalRepayment ||
            monthlyRepayment ? null : (
              <>
                <h2 className="text-balance text-center text-2xl font-semibold capitalize">
                  {dictionary.emptyResultHeading}
                </h2>

                <p className="mx-auto mt-3 w-full max-w-lg text-balance text-center text-sm">
                  {dictionary.emptyResultDescription}
                </p>
              </>
            )}

            {!(
              interestOnlyPayment ||
              totalRepayment ||
              monthlyRepayment
            ) ? null : (
              <>
                <h2 className="text-balance text-center text-2xl font-semibold capitalize">
                  {dictionary.resultHeading}
                </h2>

                <p className="mx-auto mt-3 w-full max-w-lg text-balance text-center text-sm">
                  {dictionary.resultDescription}
                </p>
              </>
            )}

            {!interestOnlyPayment ? null : (
              <>
                <h3 className="mt-10 text-center font-semibold capitalize">
                  {dictionary.interestOnlyHeading}
                </h3>

                <p className="mc-results-scrollbar overflow-x-auto py-2 font-mono">
                  <span className="text-primary-9 flex min-w-fit items-center justify-center text-6xl font-semibold">
                    <EuroIcon size={43} />
                    {interestOnlyPayment}
                  </span>
                </p>
              </>
            )}

            {!monthlyRepayment ? null : (
              <>
                <h3 className="mt-10 text-center font-semibold capitalize">
                  {dictionary.monthlyHeading}
                </h3>

                <p className="mc-results-scrollbar overflow-x-auto py-2 font-mono">
                  <span className="text-primary-9 flex min-w-fit items-center justify-center text-6xl font-semibold">
                    <EuroIcon size={43} className="shrink-0" />
                    {monthlyRepayment}
                  </span>
                </p>
              </>
            )}

            {!totalRepayment ? null : (
              <>
                <hr className="my-5" />

                <h3 className="text-center font-semibold capitalize">
                  {dictionary.totalHeading}
                </h3>

                <p className="mc-results-scrollbar overflow-x-auto py-2 font-mono">
                  <span className="flex min-w-fit items-center justify-center text-4xl font-semibold">
                    <EuroIcon size={30} />
                    {totalRepayment}
                  </span>
                </p>
              </>
            )}
          </>
        )}
      </article>

      {!isMounted
        ? null
        : createPortal(
            <>
              <div role="status" className="sr-only">
                {isSubmitting ? 'loading' : null}
              </div>

              <div
                aria-live="polite"
                aria-atomic="true"
                aria-relevant="all"
                className="sr-only"
              >
                {!(
                  interestOnlyPayment ||
                  totalRepayment ||
                  monthlyRepayment
                ) ? null : (
                  <>
                    your results are,{' '}
                    <span aria-hidden="true">&#8230;</span>
                    {!interestOnlyPayment
                      ? `monthly repayment is ${monthlyRepayment} and
        total amount you will repay over the term is ${totalRepayment}`
                      : `your interest only payment is ${interestOnlyPayment}`}
                  </>
                )}
              </div>
            </>,
            document.body,
          )}
    </>
  );
};

Results.displayName = displayName;
