'use client';

import { Input, NumberInput } from '@typeweave/react/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@typeweave/react/button';
import { Result } from '../_components/result';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

const numberSchema = z.pipeline(
  z.string().trim().min(1, 'this field is required'),
  z.coerce.number({ message: 'must be number' }).min(1, 'minimum 1'),
);

const formSchema = z.object({
  bill: numberSchema,
  people: numberSchema,
  tip: z.pipeline(
    z.string(),
    z.coerce.number({ message: 'must be number' }),
  ),
});

export type FormValues = z.input<typeof formSchema> & {
  perPersonTip: string;
  perPersonTotal: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tip: '',
      bill: '',
      people: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { bill, tip, people } = values;

    const perPersonTip = +tip ? (+bill * (+tip / 100)) / +people : 0;

    const perPersonTotal = +bill / +people + perPersonTip;

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    setValue('perPersonTip', perPersonTip.toFixed(2));
    setValue('perPersonTotal', perPersonTotal.toFixed(2));
  };

  return (
    <main className="bg-muted-2 flex min-h-[calc(100vh-64px)] items-center justify-center p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm"
      >
        <div className="space-y-5">
          <Input
            label="bill"
            required
            disabled={isSubmitting}
            inputMode="decimal"
            {...register('bill')}
            error={!!errors.bill}
            helperText={errors.bill?.message ?? ''}
            className="w-full"
          />

          <Controller
            control={control}
            name="tip"
            disabled={isSubmitting}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <NumberInput
                label="tip in %"
                inputMode="decimal"
                {...field}
                onChange={(value) => {
                  onChange({ target: { value } });
                }}
                error={!!error}
                helperText={error?.message ?? ''}
                className="w-full"
              />
            )}
          />

          <Controller
            control={control}
            name="people"
            disabled={isSubmitting}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <NumberInput
                label="number of people"
                required
                {...field}
                onChange={(value) => {
                  onChange({ target: { value } });
                }}
                error={!!error}
                helperText={error?.message ?? ''}
                className="w-full"
              />
            )}
          />
        </div>

        <Result control={control} />

        <div className="mt-5 flex items-center justify-end gap-2">
          <Button
            variant="text"
            color="danger"
            type="button"
            disabled={isSubmitting}
            onPress={() => {
              reset();
            }}
          >
            reset
          </Button>

          <Button
            color="success"
            type="submit"
            disabled={isSubmitting}
            startContent={
              isSubmitting && <Loader2Icon className="animate-spin" />
            }
          >
            submit
          </Button>
        </div>
      </form>
    </main>
  );
}
