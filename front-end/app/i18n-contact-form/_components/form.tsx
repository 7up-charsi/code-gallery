'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@typeweave/react/dialog';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '@typeweave/react/checkbox';
import { Combobox } from '@typeweave/react/combobox';
import { AlertDialog } from '@repo/ui/alert-dialog';
import { mergeRefs } from '@typeweave/react-utils';
import { Dictionary } from '../_types/dictionary';
import { Button } from '@typeweave/react/button';
import { Input } from '@typeweave/react/input';
import { Loader2Icon } from 'lucide-react';
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
    .enum(['general-query', 'support-request'])
    .nullable()
    .refine((arg) => !!arg, { message: 'required' }),
  message: z.string().min(1, 'required'),
  consent: z.boolean().refine((arg) => !!arg, { message: 'consent' }),
});

type FormValues = z.input<typeof formSchema>;

export const Form = (props: FormProps) => {
  const { dictionary } = props;

  const formRef = React.useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      queryType: null,
    },
  });

  const onSubmit = async () => {
    const toastId = toast(dictionary.submittingMessage, {
      autoClose: false,
      type: 'info',
      isLoading: true,
      icon: <Loader2Icon className="animate-spin" />,
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    toast.update(toastId, {
      render: dictionary.submittedMessage,
      type: 'success',
      autoClose: 2000,
      isLoading: false,
      icon: undefined,
    });

    reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 grid w-full max-w-screen-md grid-cols-1 gap-x-4 md:grid-cols-2"
    >
      <Input
        required
        label={dictionary.firstName}
        {...register('firstName')}
        error={!!errors.firstName}
        disabled={isSubmitting}
        helperText={
          errors.firstName?.message
            ? dictionary.zod?.[errors.firstName.message]
            : ' '
        }
        className="w-full"
      />

      <Input
        required
        label={dictionary.lastName}
        {...register('lastName')}
        error={!!errors.lastName}
        disabled={isSubmitting}
        helperText={
          errors.lastName?.message
            ? dictionary.zod?.[errors.lastName?.message]
            : ' '
        }
        className="w-full"
      />

      <Input
        required
        label={dictionary.email}
        inputMode="email"
        {...register('email')}
        disabled={isSubmitting}
        error={!!errors.email}
        helperText={
          errors.email?.message
            ? dictionary.zod?.[errors.email?.message]
            : ' '
        }
        className="w-full"
      />

      <Controller
        control={control}
        name="queryType"
        disabled={isSubmitting}
        render={({
          field: { name, onBlur, onChange, ref, value, disabled },
        }) => (
          <Combobox
            value={value}
            onChange={(newValue) => {
              onChange({ target: { value: newValue } });
            }}
            options={['general-query', 'support-request']}
            disabled={disabled}
            getOptionLabel={(option) =>
              option === 'general-query'
                ? dictionary.generalQuery!
                : dictionary.supportRequest!
            }
            renderInput={(props) => (
              <Input
                {...props}
                name={name}
                onBlur={(e) => {
                  onBlur?.();
                  props.onBlur?.(e);
                }}
                ref={mergeRefs(ref, props.ref)}
                required
                label={dictionary.queryType}
                error={!!errors.queryType}
                helperText={
                  errors.queryType?.message
                    ? dictionary.zod?.[errors.queryType?.message]
                    : ' '
                }
                className="w-full"
              />
            )}
          />
        )}
      />

      <Input
        required
        multiline
        label={dictionary.message}
        {...register('message')}
        disabled={isSubmitting}
        error={!!errors.message}
        helperText={
          errors.message?.message
            ? dictionary.zod?.[errors.message?.message]
            : ' '
        }
        className="w-full md:col-span-2"
        classNames={{ textarea: 'min-h-60' }}
      />

      <Checkbox
        label={dictionary.consent}
        {...register('consent')}
        color="success"
        className="mt-2 md:col-span-2"
        disabled={isSubmitting}
        aria-invalid={!!errors.consent}
        classNames={{
          label: errors.consent ? 'text-danger-11' : undefined,
        }}
      />

      <div className="mt-5 flex items-center justify-end gap-4 md:col-span-2">
        <AlertDialog
          title={dictionary.resetConfirmation?.title ?? ''}
          description={
            dictionary.resetConfirmation?.description ?? ''
          }
          trigger={
            <Button
              type="button"
              variant="text"
              color="danger"
              disabled={isSubmitting}
            >
              {dictionary.resetButton}
            </Button>
          }
        >
          <DialogClose>
            <Button variant="text" color="success">
              {dictionary.cancel}
            </Button>
          </DialogClose>

          <DialogClose>
            <Button
              color="danger"
              onPress={() => {
                reset();
              }}
            >
              {dictionary.ok}
            </Button>
          </DialogClose>
        </AlertDialog>

        <AlertDialog
          title={dictionary.submitConfirmation?.title ?? ''}
          description={
            dictionary.submitConfirmation?.description ?? ''
          }
          trigger={
            <Button
              type="button"
              variant="solid"
              color="success"
              disabled={isSubmitting}
            >
              {dictionary.submitButton}
            </Button>
          }
        >
          <DialogClose>
            <Button variant="text" color="danger">
              {dictionary.cancel}
            </Button>
          </DialogClose>

          <DialogClose>
            <Button
              color="success"
              onPress={() => {
                formRef.current?.requestSubmit();
              }}
            >
              {dictionary.ok}
            </Button>
          </DialogClose>
        </AlertDialog>
      </div>
    </form>
  );
};

Form.displayName = displayName;
