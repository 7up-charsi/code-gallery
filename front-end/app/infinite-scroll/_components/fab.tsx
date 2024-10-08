import { useScroll } from '@typeweave/react/use-scroll';
import { Button } from '@typeweave/react/button';
import { ArrowUpIcon } from 'lucide-react';
import React from 'react';

const displayName = 'Fab';

export const Fab = () => {
  const [{ scrollY }] = useScroll();

  return scrollY < 1000 ? null : (
    <Button
      isIconOnly
      aria-label="go to top"
      variant="solid"
      className="fixed bottom-10 right-10 shadow-md"
      onPress={() => {
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <ArrowUpIcon />
    </Button>
  );
};

Fab.displayName = displayName;
