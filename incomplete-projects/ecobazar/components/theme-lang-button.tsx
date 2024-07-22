'use client';

import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

interface ThemeLangButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'> {}

const displayName = 'ThemeLangButton';

export const ThemeLangButton = React.forwardRef<
  HTMLButtonElement,
  ThemeLangButtonProps
>((props: ThemeLangButtonProps, forwardedRef) => {
  const { children, ...restProps } = props;

  const isMounted = useIsMounted();

  return (
    <>
      {!isMounted && (
        <Skeleton
          variant="rounded"
          className="max-lg:grow lg:h-6 lg:w-16"
        />
      )}

      {isMounted && (
        <Button
          ref={forwardedRef}
          {...restProps}
          endContent={<ChevronDownIcon />}
          className="justify-between gap-0 px-2 capitalize max-lg:grow lg:h-6 lg:w-16 lg:text-sm"
        >
          {children}
        </Button>
      )}
    </>
  );
});

ThemeLangButton.displayName = displayName;
