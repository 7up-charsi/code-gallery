import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Combobox,
  createComboboxFilter,
} from '@typeweave/react/combobox';
import { convexQuery } from '@convex-dev/react-query';
import { mergeRefs } from '@typeweave/react-utils';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@typeweave/react/input';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { FormValues } from './task-form';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface CategoriesInputProps {
  field: ControllerRenderProps<FormValues, 'categories'>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormValues>;
}

const displayName = 'CategoriesInput';

type Category = FormValues['categories'][number];

const filterOptions = createComboboxFilter<Category>({});

export const CategoriesInput = (props: CategoriesInputProps) => {
  const {
    field: { name, onBlur, onChange, ref, value, disabled },
    fieldState: { error },
  } = props;

  const [open, setOpen] = React.useState(false);

  const addCategory = useMutation(api.category.create);

  const { data, isLoading } = useQuery(
    convexQuery(api.category.categories, {}),
  );

  const categories = data as Category[];

  const [loading, setLoading] = React.useState(false);

  return (
    <Combobox
      editable
      multiple
      disabled={disabled}
      options={categories ?? []}
      value={value}
      open={open}
      loading={isLoading || loading}
      onOpen={() => setOpen(true)}
      onClose={(reason) =>
        reason !== 'selectOption' && setOpen(false)
      }
      getOptionKey={(opt) => opt._id}
      getOptionLabel={(opt) => opt.value}
      isOptionEqualToValue={(opt, value) => opt._id === value._id}
      classNames={{
        inputWrapper: 'pr-[84px]',
      }}
      endContent={
        loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : null
      }
      onChange={async (newValue, reason, option) => {
        if (
          reason === 'selectOption' &&
          'inputValue' in option &&
          typeof option.inputValue === 'string'
        ) {
          try {
            setLoading(true);

            await addCategory({ value: option.inputValue });
            toast.success('category created');
            setLoading(false);
          } catch (e) {
            toast.error('Error occurred during category creation');
            setLoading(false);
          }
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
            _id: '',
            value: `Add: ${inputValue}`,
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
