'use client';

import { CustomInput } from '../_components/custom-input';
import { TipButtons } from '../_components/tip-buttons';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, UserIcon } from 'lucide-react';
import { Result } from '../_components/result';
import React from 'react';
import { z } from 'zod';

const validNumberSchema = z.pipeline(
  z.string().refine((arg) => arg.trim(), 'can not be empty'),
  z.coerce.number({ message: 'must be number' }).min(1, 'minimum 1'),
);

const formSchema = z.object({
  bill: validNumberSchema,
  people: validNumberSchema,
  tip: z.coerce.number().gte(0).lte(100).nullable(),
  isInput: z.boolean(),
});

export type FormValues = z.input<typeof formSchema>;

export default function Home() {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      tip: null,
      isInput: false,
    },
  });

  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <main className="flex h-full min-h-[calc(100vh-105px)] items-center p-5">
        <form className="border-primary-6 bg-background mx-auto grid w-full max-w-screen-md grid-cols-1 gap-5 rounded-2xl border p-5 md:grid-cols-2 md:shadow-md">
          <div className="space-y-5">
            <CustomInput
              label="bill"
              inputMode="decimal"
              {...register('bill')}
              startContent={
                <DollarSign className="text-primary-11" />
              }
              error={!!errors.bill}
              helperText={errors.bill?.message ?? ''}
            />

            <TipButtons />

            <CustomInput
              label="number of people"
              {...register('people')}
              startContent={
                <UserIcon className="stroke-primary-11 fill-transparent !text-xl" />
              }
              error={!!errors.people}
              helperText={errors.people?.message ?? ''}
            />
          </div>

          <Result />
        </form>
      </main>
    </FormProvider>
  );
}
