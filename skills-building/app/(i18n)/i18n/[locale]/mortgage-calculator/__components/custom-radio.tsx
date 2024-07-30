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
        className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded border border-muted-6 outline-none ring-focus checked:border-secondary-7 checked:bg-secondary-4 focus-within:ring-2"
      />

      <CircleIcon
        size={18}
        className="pointer-events-none peer-checked:hidden"
      />

      <CheckCircle2Icon
        size={18}
        className="pointer-events-none hidden text-secondary-11 peer-checked:block"
      />

      <label
        htmlFor={inputId}
        className="pointer-events-none select-none capitalize peer-checked:text-secondary-11"
      >
        {label}
      </label>
    </div>
  );
});

CustomRadio.displayName = displayName;
