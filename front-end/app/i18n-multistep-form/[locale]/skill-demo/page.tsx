'use client';

import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { FormIndicators } from '../../_components/form-indicators';
import { ThankYou } from '../../_components/thank-you';
import { useFormSteps } from '../../_hooks/form-steps';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper } from '../../_components/stepper';
import { Step1 } from '../../_components/step-1';
import { Step2 } from '../../_components/step-2';
import { Step3 } from '../../_components/step-3';
import { Step4 } from '../../_components/step-4';
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
    <main className="flex min-h-[calc(100vh-105px)] justify-center md:items-center md:px-8 md:py-5">
      <div className="border-muted-6 bg-background w-full max-w-screen-md grid-cols-1 max-md:pb-5 md:grid md:min-h-[70vh] md:grid-cols-[theme(spacing.64),1fr] md:overflow-hidden md:rounded-xl md:border md:p-3 md:shadow-md">
        <FormProvider {...formMethods}>
          <FormIndicators />

          <form
            ref={formRef}
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="border-muted-6 bg-background mx-auto -mt-20 flex w-[calc(100%-40px)] flex-col gap-1 rounded border p-5 max-md:shadow-md md:mt-0 md:h-full md:w-full md:border-0 md:py-0 md:pl-5 md:pr-2"
          >
            <div className="grow overflow-auto">
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
              <ThankYou />
            </div>

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
