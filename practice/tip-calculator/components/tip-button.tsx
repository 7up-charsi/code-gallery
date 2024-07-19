'use client';

import { Button, ButtonProps } from '@typeweave/react';
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
      className="h-full bg-very_dark_cyan font-bold hover:bg-very_dark_cyan data-[selected=true]:bg-strong_cyan data-[selected=true]:text-very_dark_cyan"
      {...restProps}
    >
      {isNaN(+tip) ? tip : `${tip}%`}
    </Button>
  );
};

TipButton.displayName = displayName;
