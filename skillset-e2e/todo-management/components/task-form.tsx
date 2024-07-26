'use client';

import {
  DEFAULT_STATUS_ID,
  priorities,
  statuses,
} from '@/constants/common';
import { Input, inputStyles } from '@typeweave/react/input';
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
  dueDate: z
    .string()
    .min(1, 'due date is required')
    .pipe(z.coerce.date().transform((arg) => arg.getTime())),
  categoryIds: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      inputValue: z.string().optional(),
    }),
  ),
  priorityId: z.string({ message: 'priority is required' }),
  statusId: z.string({ message: 'status is required' }),
});

export type FormValues = z.input<typeof formSchema>;

interface TaskFormProps {
  onSubmit: (values: FormValues, reset: () => void) => void;
  defaultValues?: FormValues;
}

const displayName = 'TaskForm';

export const TaskForm = (props: TaskFormProps) => {
  const { defaultValues, onSubmit } = props;

  const isEditForm = !!defaultValues;

  const styles = React.useMemo(() => inputStyles(), []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      statusId: DEFAULT_STATUS_ID,
      categoryIds: [],
      dueDate: '',
      ...(defaultValues ?? {}),
    },
  });

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit?.(e, reset))}
      className="mt-3"
    >
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
        className="w-full"
        error={!!errors.description}
        helperText={errors.description?.message ?? ' '}
      />

      <Input
        label="due date"
        type="date"
        {...register('dueDate')}
        className="w-full"
        error={!!errors.dueDate}
        helperText={errors.dueDate?.message ?? ' '}
      />

      <Controller
        control={control}
        name="categoryIds"
        render={(props) => <CategoriesInput {...props} />}
      />

      <fieldset
        aria-invalid={!!errors.priorityId}
        aria-describedby="priority-desc"
        className=""
      >
        <legend className={styles.label()}>priority</legend>

        <div className="mt-1 flex flex-wrap gap-x-5 gap-y-3">
          {priorities.map(({ id, label }) => (
            <div
              key={id}
              className="relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white"
            >
              <input
                data-priority={label}
                type="radio"
                value={id}
                {...register('priorityId')}
                className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-success-9 outline-none ring-focus data-[priority=high]:bg-danger-9 data-[priority=medium]:bg-warning-9 focus-visible:ring-2"
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
                {label}
              </span>
            </div>
          ))}
        </div>

        <span
          id="priority-desc"
          data-error={true}
          className={styles.helperText({
            className: 'mt-1 inline-block first-letter:uppercase',
          })}
        >
          {errors.priorityId?.message ?? ' '}
        </span>
      </fieldset>

      {isEditForm && (
        <fieldset
          aria-invalid={!!errors.statusId}
          aria-describedby="status-desc"
          className="mt-3"
        >
          <legend className={styles.label()}>status</legend>

          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-3">
            {statuses.map(({ id, label }) => (
              <div
                key={id}
                data-status={label.replace(' ', '-')}
                className="group relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white data-[status=not-started]:text-muted-11"
              >
                <input
                  type="radio"
                  value={id}
                  {...register('statusId')}
                  className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-muted-3 outline-none ring-focus group-data-[status=completed]:bg-success-9 group-data-[status=in-progress]:bg-info-9 focus-visible:ring-2"
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
                  {label}
                </span>
              </div>
            ))}
          </div>

          <span
            id="status-desc"
            data-error={true}
            className={styles.helperText({
              className: 'mt-1 inline-block first-letter:uppercase',
            })}
          >
            {errors.statusId?.message ?? ' '}
          </span>
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
            &apos;
            {
              statuses.find((ele) => ele.id === DEFAULT_STATUS_ID)
                ?.label
            }
            &apos;
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
