'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { inputStyles } from '@typeweave/react/input';
import { FormValues } from '../skill-demo/page';
import { TipButton } from './tip-button';
import { TipInput } from './tip-input';
import React from 'react';

interface TipButtonsProps {}

const displayName = 'TipButtons';

export const TipButtons = (props: TipButtonsProps) => {
  const {} = props;

  const styles = React.useMemo(() => inputStyles({}), []);

  const { setValue } = useFormContext<FormValues>();

  const selectedTip = useWatch({ name: 'tip' });

  return (
    <fieldset className="">
      <legend
        className={styles.label({
          className: 'text-primary-12',
        })}
      >
        select tip %
      </legend>

      <div className="mt-3 grid grid-cols-2 grid-rows-[repeat(3,45px)] gap-5 md:grid-cols-3 md:grid-rows-[repeat(2,45px)]">
        {[5, 10, 15, 25, 50].map((tip) => (
          <TipButton
            key={tip}
            tip={tip}
            data-selected={selectedTip ? tip === selectedTip : false}
            onPress={() => {
              setValue('tip', tip);
              setValue('isInput', false);
            }}
          />
        ))}

        <TipInput />
      </div>
    </fieldset>
  );
};

TipButtons.displayName = displayName;
