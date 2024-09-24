'use client';

import { Button, ButtonProps } from '@typeweave/react/button';
import React from 'react';

interface TipButtonProps extends ButtonProps {
  tip: number | string;
}

const displayName = 'TipButton';

export const TipButton = (props: TipButtonProps) => {
  const { tip, ...restProps } = props;

  return (
    <Button
      type="button"
      variant="solid"
      className="bg-primary-6 text-primary-12 hover:bg-primary-7 data-[selected=true]:bg-primary-8 h-full font-bold"
      {...restProps}
    >
      {isNaN(+tip) ? tip : `${tip}%`}
    </Button>
  );
};

TipButton.displayName = displayName;
