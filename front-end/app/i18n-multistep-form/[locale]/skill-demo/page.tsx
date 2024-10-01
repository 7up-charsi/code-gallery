'use client';

import {
  ThankYouDialog,
  useThankYouDialogState,
} from '../../_components/thank-you-dialog';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useFormSteps } from '../../_hooks/form-steps';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper } from '../../_components/stepper';
import { Step1 } from '../../_components/step-1';
import { Step2 } from '../../_components/step-2';
import { Step3 } from '../../_components/step-3';
import { Step4 } from '../../_components/step-4';
import { Steps } from '../../_components/steps';
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

  const { control } = formMethods;

  const thankYouDialog = useThankYouDialogState((s) => s.handleOpen);

  const { handleSubmit } = formMethods;

  const onSubmit = (values: FormValues) => {
    // Do any action here
    console.log(values);

    thankYouDialog();
  };

  return (
    <main className="bg-muted-2 min-h-[calc(100vh-64px)] p-5 md:px-8">
      <div className="mx-auto mt-10 w-full max-w-md">
        <FormProvider {...formMethods}>
          <ThankYouDialog />

          <Steps />

          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 control={control} />

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
