'use client';

import {
  getInterestOnlyPayment,
  getMonthlyPayment,
  getTotalPayment,
} from '../_utils/mortgage';
import { Input, NumberInput } from '@typeweave/react/input';
import { useDictionaryCtx } from './dictionary-provider';
import { AlertDialog } from '@/components/alert-dialog';
import { Loader2Icon, PercentIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@typeweave/react/dialog';
import { Controller, useForm } from 'react-hook-form';
import { Combobox } from '@typeweave/react/combobox';
import { mergeRefs } from '@typeweave/react-utils';
import { Button } from '@typeweave/react/button';
import { Results } from './results';
import React from 'react';
import { z } from 'zod';

const formSchema = z.object({
  amount: z.pipeline(
    z.string().min(1, 'required'),
    z.coerce
      .number({ message: 'number.number' })
      .gt(0, 'number.minZero')
      .positive('number.positive'),
  ),
  term: z.pipeline(
    z.string().min(1, 'required'),
    z.coerce
      .number()
      .int('number.int')
      .gt(0, 'number.minZero')
      .positive('number.positive'),
  ),
  interestRate: z.pipeline(
    z.string().min(1, 'required'),
    z.coerce
      .number()
      .gt(0, 'number.minZero')
      .lte(100, 'number.max100')
      .positive('number.positive'),
  ),
  type: z
    .enum(['repayment', 'interest-only'])
    .nullable()
    .refine((arg) => !!arg, 'required'),
});

export type FormValues = z.input<typeof formSchema> & {
  monthlyRepayment?: string;
  totalRepayment?: string;
  interestOnlyPayment?: string;
};

interface FormProps {}

const displayName = 'Form';

export const Form = (props: FormProps) => {
  const {} = props;

  const formRef = React.useRef<HTMLFormElement>(null);

  const { dictionary } = useDictionaryCtx(displayName);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      interestRate: '',
      term: '',
      type: null,

      interestOnlyPayment: '',
      monthlyRepayment: '',
      totalRepayment: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const amount = +values.amount;
    const term = +values.term;
    const interestRate = +values.interestRate;
    const type = values.type;

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const monthlyPayment = getMonthlyPayment(
      amount,
      interestRate,
      term,
    );

    const totalPayment = getTotalPayment(monthlyPayment, term);

    if (type === 'repayment') {
      setValue('monthlyRepayment', monthlyPayment + '');
      setValue('totalRepayment', totalPayment + '');
      setValue('interestOnlyPayment', undefined);
    } else {
      const interestOnlyPayment = getInterestOnlyPayment(
        totalPayment,
        amount,
      );

      setValue('interestOnlyPayment', interestOnlyPayment + '');
      setValue('monthlyRepayment', undefined);
      setValue('totalRepayment', undefined);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 grid w-full max-w-screen-md grid-cols-1 gap-x-4 md:grid-cols-2"
    >
      <Controller
        control={control}
        name="amount"
        render={({
          field: { onChange, ...field },
          fieldState: { error },
        }) => (
          <NumberInput
            required
            {...field}
            onChange={(value) => onChange({ target: { value } })}
            label={dictionary.mortgageAmount}
            min={0}
            inputMode="numeric"
            disabled={isSubmitting}
            className="w-full"
            error={!!error}
            helperText={dictionary.zod?.[error?.message!] ?? ' '}
          />
        )}
      />

      <Controller
        control={control}
        name="term"
        render={({
          field: { onChange, ...field },
          fieldState: { error },
        }) => (
          <NumberInput
            required
            {...field}
            onChange={(value) => onChange({ target: { value } })}
            label={dictionary.mortgageTerm}
            disabled={isSubmitting}
            min={0}
            endContent={
              <span className="text-sm font-semibold capitalize">
                years
              </span>
            }
            className="w-full"
            error={!!error}
            helperText={dictionary.zod?.[error?.message!] ?? ' '}
          />
        )}
      />

      <Controller
        control={control}
        name="interestRate"
        render={({
          field: { onChange, ...field },
          fieldState: { error },
        }) => (
          <NumberInput
            required
            {...field}
            onChange={(value) => onChange({ target: { value } })}
            label={dictionary.interestRate}
            min={0}
            disabled={isSubmitting}
            max={100}
            inputMode="decimal"
            endContent={<PercentIcon />}
            className="w-full"
            error={!!error}
            helperText={dictionary.zod?.[error?.message!] ?? ' '}
          />
        )}
      />

      <Controller
        control={control}
        name="type"
        disabled={isSubmitting}
        render={({
          field: { name, onBlur, onChange, ref, value, disabled },
        }) => (
          <Combobox
            value={value}
            onChange={(newValue) => {
              onChange({ target: { value: newValue } });
            }}
            options={['repayment', 'interest-only']}
            disabled={disabled}
            getOptionLabel={(option) =>
              option === 'repayment'
                ? dictionary.typeOptions?.repayment!
                : dictionary.typeOptions?.interestOnly!
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
                label={dictionary.type}
                error={!!errors.type}
                helperText={
                  dictionary.zod?.[errors.type?.message!] ?? ' '
                }
                className="w-full"
              />
            )}
          />
        )}
      />

      <Results control={control} />

      <div className="flex items-center justify-end gap-4 md:col-span-2">
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
              startContent={
                isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : undefined
              }
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
