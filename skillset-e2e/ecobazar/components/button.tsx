import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'style'
  > {
  variant?: 'solid' | 'ghost' | 'border';
  size?: 'sm' | 'md' | 'lg';
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const displayName = 'Button';

const base =
  'rounded-full gap-2 outline-none focus-visible:ring-2 ring-branding-success';

const sizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'px-4 h-[45px] text-sm',
  lg: 'px-6 gap-3 h-[51px] text-base',
};

const variants = {
  solid:
    'bg-branding-success text-white text-sm active:bg-branding-success-dark',
  border:
    'border-2 bg-white border-branding-success text-branding-success active:border-branding-success-dark active:text-branding-success-dark',
  ghost:
    'bg-green-gray-50 active:bg-green-gray-100 text-branding-success-dark',
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props: ButtonProps, forwardedRef) => {
  const {
    children,
    size = 'md',
    variant = 'solid',
    className,
    startContent,
    endContent,
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      ref={forwardedRef}
      data-size='sm'
      data-variant='solid'
      className={twMerge(
        base,
        sizes[size],
        variants[variant],
        className
      )}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  );
});

Button.displayName = displayName;
