'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { SideBarContent } from './side-bar-content';
import { Button } from '@typeweave/react/button';
import React from 'react';

interface SideBarProps {}

const displayName = 'SideBar';

export const SideBar = (props: SideBarProps) => {
  const {} = props;

  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const sideBarLink = document.querySelector(
      '#side-bar-nav a',
    ) as HTMLAnchorElement | null;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();

        setIsExpanded((prev) => {
          const isOpen = !prev;

          if (isOpen) {
            sideBarLink?.focus();
          }

          return isOpen;
        });
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <aside
      data-expanded={isExpanded}
      className="border-muted-6 sticky left-0 top-[65px] h-[calc(100vh-65px)] w-[73px] border-r transition-[width] data-[expanded=true]:w-[230px] max-md:hidden"
    >
      <Button
        isIconOnly
        aria-label="shrink side bar"
        size="sm"
        color="primary"
        variant="solid"
        onPress={() => {
          setIsExpanded((prev) => !prev);
        }}
        className="absolute right-0 top-1/2 size-5 -translate-y-1/2 translate-x-1/2 rounded-full"
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>

      <SideBarContent isExpanded={isExpanded} />
    </aside>
  );
};

SideBar.displayName = displayName;
