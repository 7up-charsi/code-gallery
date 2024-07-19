'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { TipButtons } from '@/components/tip-buttons';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, UserIcon } from 'lucide-react';
import { Result } from '@/components/result';
import { CustomInput } from './custom-input';
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
      <main className="min-h-screen bg-main_bg md:content-center">
        <h1 className="py-10 text-center text-xl font-semibold uppercase tracking-[.5em] text-dark_grayish_cyan">
          <span>spli</span> <br /> <span>tter</span>
        </h1>

        <form className="mx-auto grid grid-cols-1 gap-5 rounded-t-2xl bg-white p-5 md:max-w-[calc(theme(screens.md)-40px)] md:grid-cols-2 md:rounded-2xl lg:max-w-screen-md">
          <div className="space-y-5">
            <CustomInput
              label="bill"
              inputMode="decimal"
              {...register('bill')}
              startContent={
                <DollarSign className="text-grayish_cyan" />
              }
              error={!!errors.bill}
              helperText={errors.bill?.message ?? ''}
            />

            <TipButtons />

            <CustomInput
              label="number of people"
              {...register('people')}
              startContent={
                <UserIcon className="fill-grayish_cyan stroke-grayish_cyan !text-xl" />
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

