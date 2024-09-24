import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../_hooks/form-steps';
import Image from 'next/image';
import React from 'react';

interface ThankYouProps {}

const displayName = 'ThankYou';

export const ThankYou = (props: ThankYouProps) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { isThankYouStep } = useFormSteps();

  if (!isThankYouStep) return;

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/assets/multistep-form/icon-thank-you.svg"
        alt="thank you"
        width={40}
        height={40}
        className="mt-20"
      />

      <h1 className="mt-5 text-center text-2xl font-semibold">
        {dictionary.thankYou.heading}
      </h1>

      <p className="text-muted-11/80 mb-10 mt-3 text-balance text-center">
        {dictionary.thankYou.description}
      </p>
    </div>
  );
};

ThankYou.displayName = displayName;
