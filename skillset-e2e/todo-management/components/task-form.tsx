'use client';

import { Input, inputStyles } from '@typeweave/react/input';
import { priorities, statuses } from '@/constants/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { CategoriesInput } from './categories-input';
import { Button } from '@typeweave/react/button';
import { CircleIcon } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'title is required').trim(),
  description: z.string().trim(),
  categories: z.array(
    z
      .object({ id: z.string(), value: z.string() })
      .refine((arg) => arg.id && arg.value, 'invalid category'),
  ),
  priority: z
    .object({ id: z.string(), value: z.string() })
    .refine((arg) => arg.id && arg.value, 'priority is required'),
  status: z
    .object({ id: z.string(), value: z.string() })
    .refine((arg) => arg.id && arg.value, 'status is required')
    .nullable(),
});

export type FormValues = z.input<typeof formSchema>;

interface TaskFormProps {
  onSubmit: () => void;
  defaultValues?: FormValues;
}

const displayName = 'TaskForm';

export const TaskForm = (props: TaskFormProps) => {
  const { defaultValues } = props;

  const isEditForm = !!defaultValues;

  const styles = React.useMemo(() => inputStyles(), []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      title: '',
      description: '',
      status: null,
      ...(defaultValues ?? {}),
    },
  });

  console.log(errors);

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <Input
        label="title"
        {...register('title')}
        className="w-full"
        error={!!errors.title}
        helperText={errors.title?.message ?? ' '}
      />

      <Input
        multiline
        label="description"
        {...register('description')}
        className="mt-3 w-full"
        error={!!errors.description}
        helperText={errors.description?.message ?? ' '}
      />

      <Controller
        control={control}
        name="categories"
        render={(props) => <CategoriesInput {...props} />}
      />

      <fieldset className="mt-3">
        <legend className={styles.label()}>priority</legend>

        <div className="mt-1 flex flex-wrap gap-x-5 gap-y-3">
          {priorities.map(({ id, value }) => (
            <div
              key={id}
              className="relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white"
            >
              <input
                data-priority={value}
                type="radio"
                value={value}
                name="priority"
                onChange={(e) => {
                  setValue('priority.id', id);
                  setValue('priority.value', e.target.value);
                }}
                className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-success-9 outline-none ring-focus focus-visible:ring-2 data-[priority=high]:bg-danger-9 data-[priority=medium]:bg-warning-9"
              />

              <CircleIcon
                size={14}
                className="pointer-events-none block peer-checked:hidden"
              />

              <CircleIcon
                size={14}
                className="pointer-events-none hidden fill-current peer-checked:block"
              />

              <span className="pointer-events-none text-sm capitalize">
                {value}
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      {isEditForm && (
        <fieldset className="mt-3">
          <legend className={styles.label()}>status</legend>

          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-3">
            {statuses.map(({ id, value }) => (
              <div
                key={value}
                data-status={value.replace(' ', '-')}
                className="group relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white data-[status=not-started]:text-muted-11"
              >
                <input
                  type="radio"
                  value={value}
                  name="status"
                  onChange={(e) => {
                    setValue('status.id', id);
                    setValue('status.value', e.target.value);
                  }}
                  className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-muted-3 outline-none ring-focus focus-visible:ring-2 group-data-[status=completed]:bg-success-9 group-data-[status=in-progress]:bg-info-9"
                />

                <CircleIcon
                  size={14}
                  className="pointer-events-none block peer-checked:hidden"
                />

                <CircleIcon
                  size={14}
                  className="pointer-events-none hidden fill-current peer-checked:block"
                />

                <span className="pointer-events-none text-sm capitalize">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {!isEditForm && (
        <p
          tabIndex={0}
          className="mt-5 text-balance border-y border-muted-6 py-2 text-center text-foreground/80"
        >
          Default{' '}
          <strong className="font-medium text-foreground">
            Status
          </strong>{' '}
          will be set to{' '}
          <strong className="font-medium text-foreground">
            &apos;Not Started&apos;
          </strong>
          . You can edit the status later as needed.
        </p>
      )}

      <div className="mt-5 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="text"
          color="danger"
          onPress={() => {
            reset();
          }}
        >
          reset
        </Button>

        <Button type="submit" variant="solid" color="success">
          {isEditForm ? 'edit' : 'submit'}
        </Button>
      </div>
    </form>
  );
};

TaskForm.displayName = displayName;
