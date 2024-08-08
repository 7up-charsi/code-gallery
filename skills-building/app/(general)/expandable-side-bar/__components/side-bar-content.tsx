import React from 'react';

interface SideBarContentProps {
  expanded: boolean;
}

const displayName = 'SideBarContent';

export const SideBarContent = (props: SideBarContentProps) => {
  const { expanded } = props;

  return <nav></nav>;
};

SideBarContent.displayName = displayName;
