'use client';

import { Input, inputStyles } from '@typeweave/react/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@typeweave/react/checkbox';
import { Button } from '@typeweave/react/button';
import { Dictionary } from '../types/dictionary';
import { CustomRadio } from './custom-radio';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import React from 'react';
import { z } from 'zod';

interface FormProps {
  dictionary: Partial<Dictionary>;
}

const displayName = 'Form';

const formSchema = z.object({
  firstName: z.string().min(1, 'required'),
  lastName: z.string().min(1, 'required'),
  email: z.string().min(1, 'required').email('invalidEmail'),
  queryType: z
    .enum(['general query', 'support request'])
    .nullable()
    .refine((arg) => !!arg, { message: 'required' }),
  message: z.string().min(1, 'required'),
  consent: z.boolean().refine((arg) => !!arg, { message: 'consent' }),
});

type FormValues = z.input<typeof formSchema>;

export const Form = (props: FormProps) => {
  const { dictionary } = props;

  const queryTypeId = React.useId();

  const styles = React.useMemo(() => inputStyles({}), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
      email: '',
      firstName: '',
      lastName: '',
      message: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    toast.success(
      'Thank you for your submission! We will be in touch shortly.',
    );
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 grid grid-cols-1 gap-x-4 md:grid-cols-2"
    >
      <Input
        required
        label={dictionary.firstName}
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={
          dictionary.zod?.[errors.firstName?.message!] ?? ' '
        }
        className="w-full"
      />

      <Input
        required
        label={dictionary.lastName}
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={
          dictionary.zod?.[errors.lastName?.message!] ?? ' '
        }
        className="w-full"
      />

      <Input
        required
        label={dictionary.email}
        inputMode="email"
        {...register('email')}
        error={!!errors.email}
        helperText={dictionary.zod?.[errors.email?.message!] ?? ' '}
        className="w-full md:col-span-2"
      />

      <fieldset
        aria-invalid={!!errors.queryType}
        aria-describedby={errors.queryType ? queryTypeId : undefined}
        className="space-y-1 md:col-span-2"
      >
        <legend
          className={styles.label({
            className: errors.queryType
              ? 'text-danger-11'
              : undefined,
          })}
        >
          {dictionary.queryType}
        </legend>

        <div className="flex flex-col gap-2 md:flex-row">
          <CustomRadio
            {...register('queryType')}
            label={dictionary.generalQuery}
            value="general query"
          />

          <CustomRadio
            {...register('queryType')}
            label={dictionary.supportRequest}
            value="support request"
          />
        </div>

        <div id={queryTypeId} className={styles.helperText({})}>
          {errors.queryType
            ? dictionary.zod?.[errors.queryType?.message!]
            : ' '}
        </div>
      </fieldset>

      <Input
        required
        multiline
        label={dictionary.message}
        {...register('message')}
        error={!!errors.message}
        helperText={dictionary.zod?.[errors.message?.message!] ?? ' '}
        className="w-full md:col-span-2"
      />

      <Checkbox
        label={dictionary.consent}
        {...register('consent')}
        className="mt-2 md:col-span-2"
        aria-invalid={!!errors.consent}
        classNames={{
          label: errors.consent ? 'text-danger-11' : undefined,
        }}
      />

      <div className="mt-5 flex items-center gap-4 md:col-span-2">
        <Button
          variant="solid"
          color="primary"
          className="grow"
          type="submit"
        >
          {dictionary.submitButton}
        </Button>

        <Button
          type="button"
          onPress={() => {
            reset();
          }}
        >
          {dictionary.resetButton}
        </Button>
      </div>
    </form>
  );
};

Form.displayName = displayName;
