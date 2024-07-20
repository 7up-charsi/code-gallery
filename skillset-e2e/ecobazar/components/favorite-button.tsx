import { Button } from '@typeweave/react/button';
import { HeartIcon } from 'lucide-react';
import React from 'react';

interface FavoriteButtonProps {}

const displayName = 'FavoriteButton';

export const FavoriteButton = (props: FavoriteButtonProps) => {
  const {} = props;

  return (
    <>
      <Button variant="text" isIconOnly aria-label="favorites">
        <HeartIcon />
      </Button>
    </>
  );
};

FavoriteButton.displayName = displayName;
