'use client';

import { Control, useFormState, useWatch } from 'react-hook-form';
import { FormValues } from '../skill-demo/page';
import React from 'react';

interface ResultProps {
  control: Control<FormValues>;
}

const displayName = 'Result';

export const Result = (props: ResultProps) => {
  const { control } = props;

  const { isSubmitting } = useFormState({ control });

  const [perPersonTip, perPersonTotal] = useWatch({
    control,
    name: ['perPersonTip', 'perPersonTotal'],
  });

  return (
    <article className="mt-5 flex flex-col rounded-2xl p-5">
      <dl className="flex flex-col items-center">
        <dt className="font-bold capitalize">
          Tip Amount
          <span className="text-foreground/70 text-sm">
            {' '}
            / person
          </span>
        </dt>

        <dd className="text-muted-12 mt-2 truncate text-3xl font-bold">
          {isSubmitting || !perPersonTip ? '???' : perPersonTip}
        </dd>

        <dt className="mt-5 font-bold capitalize">
          Total
          <span className="text-foreground/70 text-sm">
            {' '}
            / person
          </span>
        </dt>

        <dd className="text-muted-12 mt-2 truncate text-3xl font-bold">
          {isSubmitting || !perPersonTotal ? '???' : perPersonTotal}
        </dd>
      </dl>
    </article>
  );
};

Result.displayName = displayName;
