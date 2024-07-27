import { Input } from '@typeweave/react/input';
import React from 'react';

interface SearchProps {}

const displayName = 'Search';

export const Search = (props: SearchProps) => {
  const {} = props;

  return (
    <search className="grow">
      <Input
        label="search tasks"
        hideLabel
        placeholder="Search Tasks..."
        className="w-full"
        classNames={{ inputWrapper: 'h-9' }}
      />
    </search>
  );
};

Search.displayName = displayName;
