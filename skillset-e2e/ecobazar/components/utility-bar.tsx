import React from 'react';

interface UtilityBarProps {}

const displayName = 'UtilityBar';

export const UtilityBar = (props: UtilityBarProps) => {
  const {} = props;

  return (
    <div aria-label="utility bar" className="hidden">
      UtilityBar
    </div>
  );
};

UtilityBar.displayName = displayName;
