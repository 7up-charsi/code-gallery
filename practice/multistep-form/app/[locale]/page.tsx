'use client';

import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { FormIndicators } from '@/components/form-indicators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSteps } from '@/zustand/form-steps';
import { ThankYou } from '@/components/thank-you';
import { Stepper } from '@/components/stepper';
import { Step1 } from '@/components/step-1';
import { Step2 } from '@/components/step-2';
import { Step3 } from '@/components/step-3';
import { Step4 } from '@/components/step-4';
import React from 'react';
import { z } from 'zod';

const addonSchema = z.object({
  id: z.string().min(1, 'required'),
  name: z.string().min(1, 'required'),
  price: z.number().int().positive().min(1, 'required'),
});

const formSchema = z.object({
  name: z.string().min(1, 'required'),
  email: z.string().min(1, 'required').email('invalidEmail'),
  phoneNumber: z.string(),
  plan: z.object({
    id: z.string().min(1, 'required'),
    name: z.string().min(1, 'required'),
    price: z.number().int().positive().min(1, 'required'),
    billing: z.string().min(1, 'required'),
  }),
  onlineServiceAddon: addonSchema.nullable(),
  largerStorageAddon: addonSchema.nullable(),
  customizableProfileAddon: addonSchema.nullable(),
});

export type FormValues = z.input<typeof formSchema>;

export default function Home() {
  const formRef = React.useRef<HTMLFormElement>(null);

  const { updateStep, currentStep } = useFormSteps();

  const formMethods = useForm<FormValues, { currentStep: number }>({
    reValidateMode: 'onSubmit',
    resolver: async (...args) => {
      const context = args[1];

      const data = await zodResolver(formSchema)(...args);

      const errors = data.errors as FieldErrors<FormValues>;

      if (errors.name || errors.email || errors.phoneNumber) {
        updateStep(1);
      } else if (errors.plan) {
        updateStep(2);
      } else if (
        errors.onlineServiceAddon ||
        errors.largerStorageAddon ||
        errors.customizableProfileAddon
      ) {
        updateStep(3);
      } else if (context?.currentStep === 3) {
        updateStep(4);
      }

      return data;
    },
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      plan: {
        billing: 'monthly',
      },
      customizableProfileAddon: null,
      largerStorageAddon: null,
      onlineServiceAddon: null,
    },
    context: { currentStep },
  });

  const onSubmit = (values: FormValues) => {
    // Do any action here
    console.log(values);
  };

  return (
    <main className="md:flex md:h-[calc(100vh-theme(spacing.16))] md:items-center md:justify-center md:px-10">
      <div className="grid w-full max-w-screen-md grid-cols-1 md:h-[90%] md:grid-cols-[theme(spacing.64),1fr] md:rounded-xl md:bg-background md:p-5">
        <FormProvider {...formMethods}>
          <FormIndicators />

          <form
            ref={formRef}
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="rounded bg-background p-5 max-md:mx-auto max-md:-mt-20 max-md:w-[calc(100%-40px)] md:relative"
          >
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
            <ThankYou />
            <Stepper
              onSubmit={() => {
                formRef.current?.requestSubmit();
              }}
            />
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

