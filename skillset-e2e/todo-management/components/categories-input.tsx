import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Combobox,
  createComboboxFilter,
} from '@typeweave/react/combobox';
import { mergeRefs } from '@typeweave/react-utils';
import { Input } from '@typeweave/react/input';
import { useStore } from '@/zustand/store';
import { FormValues } from './task-form';
import { Category } from '@/types/task';
import React from 'react';

interface CategoriesInputProps {
  field: ControllerRenderProps<FormValues, 'categories'>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormValues>;
}

const displayName = 'CategoriesInput';

type CustomCategory = Category & { inputValue: string };

const filterOptions = createComboboxFilter<CustomCategory>({});

export const CategoriesInput = (props: CategoriesInputProps) => {
  const {
    field: { name, onBlur, onChange, ref, value, disabled },
    fieldState: { error },
  } = props;

  const categories = useStore(
    (state) => state.categories,
  ) as CustomCategory[];

  const addCategory = useStore((state) => state.addCategory);

  const [open, setOpen] = React.useState(false);

  return (
    <Combobox
      editable
      multiple
      disabled={disabled}
      value={value as CustomCategory[]}
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
          onChange({ target: { value: newValue } });
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
          name={name}
          {...props}
          ref={mergeRefs(props.ref, ref)}
          onBlur={(e) => {
            props.onBlur?.(e);
            onBlur();
          }}
          error={!!error}
          helperText={error?.message ?? ' '}
        />
      )}
    />
  );
};

CategoriesInput.displayName = displayName;
