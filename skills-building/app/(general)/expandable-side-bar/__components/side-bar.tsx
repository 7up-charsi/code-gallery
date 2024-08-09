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

  return (
    <aside
      data-expanded={isExpanded}
      className="sticky left-0 top-[104px] h-[calc(100vh-104px)] w-[73px] border-r border-muted-6 transition-[width] data-[expanded=true]:w-[230px]"
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
