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
  priority: z
    .enum(priorities)
    .refine((arg) => arg, 'priority is required'),
  status: z.enum(statuses).refine((arg) => arg, 'status is required'),
  categories: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      inputValue: z.string().optional(),
    }),
  ),
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
      status: 'pending',
      categories: [],
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

      <Controller
        control={control}
        name="categories"
        render={(props) => <CategoriesInput {...props} />}
      />

      {/* priority */}
      <fieldset
        aria-invalid={!!errors.priority}
        aria-describedby="priority-desc"
        className="space-y-1"
      >
        <legend className={styles.label()}>priority</legend>

        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {priorities.map((priority) => (
            <div
              key={priority}
              className="relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white"
            >
              <input
                data-priority={priority}
                type="radio"
                value={priority}
                {...register('priority')}
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
                {priority}
              </span>
            </div>
          ))}
        </div>

        <div
          id="priority-desc"
          data-error={true}
          className={styles.helperText({
            className: 'first-letter:uppercase',
          })}
        >
          {errors.priority?.message ?? ' '}
        </div>
      </fieldset>

      {/* status */}
      {isEditForm && (
        <fieldset
          aria-invalid={!!errors.status}
          aria-describedby="status-desc"
          className="space-y-1"
        >
          <legend className={styles.label()}>status</legend>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {statuses.map((status) => (
              <div
                key={status}
                data-status={status}
                className="group relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white data-[status=not-started]:text-muted-11"
              >
                <input
                  type="radio"
                  value={status}
                  {...register('status')}
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
                  {status}
                </span>
              </div>
            ))}
          </div>

          <div
            id="status-desc"
            data-error={true}
            className={styles.helperText({
              className: 'first-letter:uppercase',
            })}
          >
            {errors.status?.message ?? ' '}
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
            &apos; pending &apos;
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
