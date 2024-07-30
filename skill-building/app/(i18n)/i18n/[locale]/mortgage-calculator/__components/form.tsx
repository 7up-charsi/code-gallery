'use client';

import {
  getInterestOnlyPayment,
  getMonthlyPayment,
  getTotalPayment,
} from '../__utils/mortgage';
import { CalculatorIcon, EuroIcon, PercentIcon } from 'lucide-react';
import { inputStyles, NumberInput } from '@typeweave/react/input';
import { useDictionaryCtx } from './dictionary-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@typeweave/react/button';
import { CustomRadio } from './custom-radio';
import { wait } from '../__utils/wait';
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
    .enum(['repayment', 'interestOnly'])
    .nullable()
    .refine((arg) => !!arg, 'required'),
});

export type FormValues = z.input<typeof formSchema> & {
  monthlyRepayment?: number;
  totalRepayment?: number;
  interestOnlyPayment?: number;
};

interface FormProps {}

const displayName = 'Form';

export const Form = (props: FormProps) => {
  const {} = props;

  const typeId = React.useId();

  const styles = React.useMemo(() => inputStyles(), []);

  const { dictionary } = useDictionaryCtx(displayName);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      interestRate: '',
      term: '',
      type: null,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const amount = +values.amount;
    const term = +values.term;
    const interestRate = +values.interestRate;
    const type = values.type;

    await wait();

    const monthlyPayment = getMonthlyPayment(
      amount,
      interestRate,
      term,
    );

    const totalPayment = getTotalPayment(monthlyPayment, term);

    if (type === 'repayment') {
      setValue('monthlyRepayment', monthlyPayment);
      setValue('totalRepayment', totalPayment);
      setValue('interestOnlyPayment', undefined);
    } else {
      const interestOnlyPayment = getInterestOnlyPayment(
        totalPayment,
        amount,
      );

      setValue('interestOnlyPayment', interestOnlyPayment);
      setValue('monthlyRepayment', undefined);
      setValue('totalRepayment', undefined);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 py-5 md:col-start-1"
      >
        <Controller
          control={control}
          name="amount"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <NumberInput
              {...field}
              onChange={(value) => onChange({ target: { value } })}
              label={dictionary.mortgageAmount}
              min={0}
              inputMode="numeric"
              startContent={<EuroIcon />}
              className="w-full md:col-span-2"
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
              {...field}
              onChange={(value) => onChange({ target: { value } })}
              label={dictionary.mortgageTerm}
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
              {...field}
              onChange={(value) => onChange({ target: { value } })}
              label={dictionary.interestRate}
              min={0}
              max={100}
              inputMode="decimal"
              endContent={<PercentIcon />}
              className="w-full"
              error={!!error}
              helperText={dictionary.zod?.[error?.message!] ?? ' '}
            />
          )}
        />

        <fieldset
          aria-invalid={!!errors.type}
          aria-describedby={errors.type ? typeId : undefined}
          className="space-y-1 md:col-span-2"
        >
          <legend
            className={styles.label({
              className: errors.type ? 'text-danger-11' : undefined,
            })}
          >
            {dictionary.mortgageType}
          </legend>

          <div className="space-y-2">
            <CustomRadio
              {...register('type')}
              label={dictionary.repayment}
              value="repayment"
            />

            <CustomRadio
              {...register('type')}
              label={dictionary.interestOnly}
              value="interestOnly"
            />
          </div>

          <span
            id={typeId}
            data-error={true}
            className={styles.helperText({ className: 'w-full' })}
          >
            <span className="inline-block first-letter:uppercase">
              {errors.type
                ? dictionary.zod?.[errors.type?.message!]
                : ' '}
            </span>
          </span>
        </fieldset>

        <div className="mt-1 flex items-center gap-4">
          <Button
            type="submit"
            variant="solid"
            color="secondary"
            className="grow rounded-full font-medium capitalize text-white md:col-span-2"
            startContent={<CalculatorIcon />}
          >
            {dictionary.calculateButton}
          </Button>

          <Button
            type="reset"
            onPress={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            {dictionary.resetButton}
          </Button>
        </div>
      </form>

      <Results control={control} />
    </>
  );
};

Form.displayName = displayName;
