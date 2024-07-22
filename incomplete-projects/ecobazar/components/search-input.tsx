import { Input } from '@typeweave/react/input';
import { SearchIcon } from 'lucide-react';
import React from 'react';

interface SearchInputProps {}

const displayName = 'SearchInput';

export const SearchInput = (props: SearchInputProps) => {
  const {} = props;

  return (
    <div className="col-start-1 -col-end-1 flex items-center justify-center md:col-start-2 md:col-end-3 md:row-start-1">
      <Input
        label="search"
        hideLabel
        placeholder="Search..."
        startContent={<SearchIcon />}
        className="w-full md:max-w-96"
      />
    </div>
  );
};

SearchInput.displayName = displayName;
