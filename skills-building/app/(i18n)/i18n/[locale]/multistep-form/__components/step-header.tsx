'use client';

import React from 'react';

interface StepHeaderProps {
  heading: string;
  desc: string;
}

const displayName = 'StepHeader';

export const StepHeader = (props: StepHeaderProps) => {
  const { desc, heading } = props;

  const id = React.useId();

  return (
    <>
      <h1
        aria-describedby={id}
        className="text-primary-11 text-2xl font-semibold first-letter:uppercase"
      >
        {heading}
      </h1>

      <p
        id={id}
        className="text-foreground/80 mb-5 mt-1 first-letter:uppercase"
      >
        {desc}
      </p>
    </>
  );
};

StepHeader.displayName = displayName;
