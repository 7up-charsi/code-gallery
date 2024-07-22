import { InfoIcon } from 'lucide-react';
import React from 'react';

interface InfoCardProps {
  children?: React.ReactNode;
}

const displayName = 'InfoCard';

export const InfoCard = (props: InfoCardProps) => {
  const { children } = props;

  return (
    <section className="mt-10 flex rounded bg-muted-3 p-5 shadow-md shadow-muted-5">
      <InfoIcon className="mr-2 mt-1 text-info-11" />
      <p className="mt-1">{children}</p>
    </section>
  );
};

InfoCard.displayName = displayName;
