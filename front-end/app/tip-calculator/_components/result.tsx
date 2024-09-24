'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@typeweave/react/button';
import { FormValues } from '../skill-demo/page';
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
    <article className="bg-primary-5 flex flex-col rounded-2xl p-5 pt-10">
      <dl>
        <div className="flex items-center justify-between">
          <dt>
            <span className="text-primary-11 font-bold capitalize">
              Tip Amount
            </span>
            <br />
            <span className="text-primary-11/70 text-sm font-bold">
              / person
            </span>
          </dt>
          <dd className="text-primary-12 text-3xl font-bold">
            ${calculate ? tipAmount.toFixed(2) : '0.00'}
          </dd>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <dt>
            <span className="text-primary-11 font-bold capitalize">
              Total
            </span>
            <br />
            <span className="text-primary-11/70 text-sm font-bold">
              / person
            </span>
          </dt>
          <dd className="text-primary-12 text-3xl font-bold">
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
        color="primary"
        className="mt-7 h-12 w-full text-xl font-bold"
        onPress={() => reset()}
        disabled={!calculate}
      >
        RESET
      </Button>
    </article>
  );
};

Result.displayName = displayName;
