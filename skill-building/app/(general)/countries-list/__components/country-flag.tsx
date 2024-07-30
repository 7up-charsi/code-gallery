import Image from 'next/image';
import React from 'react';

interface CountryFlagProps {
  cca2: string;
}

const displayName = 'CountryFlag';

export const CountryFlag = (props: CountryFlagProps) => {
  const { cca2 } = props;

  return (
    <div className="relative aspect-video w-full">
      <Image
        src={`https://flagcdn.com/w1280/${cca2.toLowerCase()}.png`}
        alt={cca2}
        fill
        className="object-cover"
      />
    </div>
  );
};

CountryFlag.displayName = displayName;
