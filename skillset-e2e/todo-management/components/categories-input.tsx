import {
  Combobox,
  createComboboxFilter,
} from '@typeweave/react/combobox';
import { mergeRefs } from '@typeweave/react-utils';
import { Input } from '@typeweave/react/input';
import { useStore } from '@/zustand/store';
import { Category } from '@/types/task';
import React from 'react';

interface CategoriesInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const displayName = 'CategoriesInput';

type CustomCategory = Category & { inputValue: string };

const filterOptions = createComboboxFilter<CustomCategory>({});

export const CategoriesInput = React.forwardRef<
  HTMLInputElement,
  CategoriesInputProps
>((props, forwardedRef) => {
  const {} = props;

  const categories = useStore(
    (state) => state.categories,
  ) as CustomCategory[];

  const addCategory = useStore((state) => state.addCategory);

  const [value, setValue] = React.useState<CustomCategory[]>([]);
  const [open, setOpen] = React.useState(false);

  return (
    <Combobox
      editable
      multiple
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={(reason) =>
        reason !== 'selectOption' && setOpen(false)
      }
      options={categories}
      getOptionLabel={(opt) => opt.value}
      getOptionKey={(opt) => opt.id}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      onChange={(newValue, reason, option) => {
        if (reason === 'selectOption' && option.inputValue) {
          addCategory(option.inputValue);
        } else {
          setOpen(false);
          setValue(newValue);
        }
      }}
      filterOptions={(...params) => {
        const filtered = filterOptions(...params);

        const { inputValue } = params[1];

        if (inputValue && !filtered.length) {
          filtered.push({
            id: '',
            value: `Add: ${inputValue}`,
            inputValue,
          });
        }

        return filtered;
      }}
      renderInput={(props) => (
        <Input
          label="categories"
          className="mt-3 w-full"
          {...props}
          ref={mergeRefs(props.ref, forwardedRef)}
        />
      )}
    />
  );
});

CategoriesInput.displayName = displayName;
