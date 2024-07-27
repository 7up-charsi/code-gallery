import { Input } from '@typeweave/react/input';
import React from 'react';

interface SearchProps {}

const displayName = 'Search';

export const Search = (props: SearchProps) => {
  const {} = props;

  return (
    <search className="col-start-1 -col-end-1">
      <Input
        label="search tasks"
        hideLabel
        placeholder="Search Tasks..."
        className="w-full bg-white"
      />
    </search>
  );
};

Search.displayName = displayName;
