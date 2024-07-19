'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@typeweave/react';
import { FormValues } from '@/app/page';
import React from 'react';

interface ResultProps {}

const displayName = 'Result';

export const Result = (props: ResultProps) => {
  const {} = props;

  const {
    reset,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [tip = 0, bill, people] = useWatch({
    name: ['tip', 'bill', 'people'],
  });

  console.log(errors);

  const calculate =
    Object.keys(errors).length > 0
      ? false
      : !!(bill > 0 && people > 0);

  // tip per person
  const tipAmount = (bill * (tip / 100)) / people;

  return (
    <article className="flex flex-col rounded-2xl bg-very_dark_cyan p-5 pt-10">
      <dl>
        <div className="flex items-center justify-between">
          <dt>
            <span className="font-bold capitalize text-white">
              Tip Amount
            </span>
            <br />
            <span className="text-sm font-bold text-dark_grayish_cyan">
              / person
            </span>
          </dt>
          <dd className="text-3xl font-bold text-strong_cyan">
            ${calculate ? tipAmount.toFixed(2) : '0.00'}
          </dd>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <dt>
            <span className="font-bold capitalize text-white">
              Total
            </span>
            <br />
            <span className="text-sm font-bold text-dark_grayish_cyan">
              / person
            </span>
          </dt>
          <dd className="text-3xl font-bold text-strong_cyan">
            $
            {calculate
              ? (bill / people + tipAmount).toFixed(2)
              : '0.00'}
          </dd>
        </div>
      </dl>

      <div className="grow"></div>

      <Button
        type="button"
        variant="solid"
        className="mt-7 h-12 w-full bg-strong_cyan text-xl font-bold text-very_dark_cyan hover:bg-strong_cyan"
        onPress={() => reset()}
        disabled={!calculate}
      >
        RESET
      </Button>
    </article>
  );
};

Result.displayName = displayName;
