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
      className="bg-tc-very_dark_cyan hover:bg-tc-very_dark_cyan data-[selected=true]:bg-tc-strong_cyan data-[selected=true]:text-tc-very_dark_cyan h-full font-bold"
      {...restProps}
    >
      {isNaN(+tip) ? tip : `${tip}%`}
    </Button>
  );
};

TipButton.displayName = displayName;
