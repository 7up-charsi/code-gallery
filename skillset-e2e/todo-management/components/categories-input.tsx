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
import React from 'react';

interface CategoriesInputProps {
  field: ControllerRenderProps<FormValues, 'categoryIds'>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormValues>;
}

const displayName = 'CategoriesInput';

type Category = FormValues['categoryIds'][number];

const filterOptions = createComboboxFilter<Category>({});

export const CategoriesInput = (props: CategoriesInputProps) => {
  const {
    field: { name, onBlur, onChange, ref, value, disabled },
    fieldState: { error },
  } = props;

  const categories = useStore(
    (state) => state.categories,
  ) as Category[];

  const addCategory = useStore((state) => state.addCategory);

  const [open, setOpen] = React.useState(false);

  return (
    <Combobox
      editable
      multiple
      disabled={disabled}
      options={categories}
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={(reason) =>
        reason !== 'selectOption' && setOpen(false)
      }
      getOptionKey={(opt) => opt.id}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      onChange={(newValue, reason, option) => {
        if (
          reason === 'selectOption' &&
          'inputValue' in option &&
          typeof option.inputValue === 'string'
        ) {
          addCategory(option.inputValue);
        } else {
          setOpen(false);
          onChange({
            target: { value: newValue },
          });
        }
      }}
      filterOptions={(...params) => {
        const filtered = filterOptions(...params);

        const { inputValue } = params[1];

        if (inputValue && !filtered.length) {
          filtered.push({
            id: '',
            label: `Add: ${inputValue}`,
            inputValue,
          });
        }

        return filtered;
      }}
      renderInput={(props) => (
        <Input
          label="categories"
          className="w-full"
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
