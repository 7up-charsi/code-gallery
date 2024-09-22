import { CheckCircle2Icon, CircleIcon } from 'lucide-react';
import React from 'react';

interface CustomRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
}

const displayName = 'CustomRadio';

export const CustomRadio = React.forwardRef<
  HTMLInputElement,
  CustomRadioProps
>((props, forwardedRef) => {
  const { label, ...restProps } = props;

  const inputId = React.useId();

  return (
    <div
      role="group"
      className="relative isolate flex items-center gap-2 px-3 py-2"
    >
      <input
        {...restProps}
        ref={forwardedRef}
        type="radio"
        id={inputId}
        className="border-muted-6 ring-focus ring-offset-background checked:border-primary-7 checked:bg-primary-3 peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded border outline-none ring-offset-2 focus-within:ring-2"
      />

      <CircleIcon
        size={18}
        className="pointer-events-none peer-checked:hidden"
      />

      <CheckCircle2Icon
        size={18}
        className="text-primary-11 pointer-events-none hidden peer-checked:block"
      />

      <label
        htmlFor={inputId}
        className="peer-checked:text-primary-11 pointer-events-none select-none capitalize"
      >
        {label}
      </label>
    </div>
  );
});

CustomRadio.displayName = displayName;
