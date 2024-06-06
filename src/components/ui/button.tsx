import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'bg-white text-gray-700 hover:bg-black/5 dark:bg-frx-blue-900 dark:text-white dark:hover:bg-frx-blue-800/70 hover:text-frx-blue-800',
        destructive:
          'bg-frx-red-900 text-neutral-50 hover:bg-frx-red-700 dark:bg-frx-red-900 dark:text-neutral-50 dark:hover:bg-frx-red-800',
        outline:
          'border bg-white hover:bg-black/5 hover:text-neutral-900 dark:border-frx-blue-800 dark:bg-frx-blue-900 dark:hover:bg-frx-blue-800/70 dark:hover:text-neutral-50',
        secondary:
          'bg-white hover:bg-black/5 text-neutral-900 dark:hover:bg-frx-blue-800/70 dark:bg-frx-blue-900/70 dark:text-neutral-50 dark:hover:bg-frx-blue-800/70',
        ghost:
          'hover:bg-black/5 hover:text-neutral-900 dark:hover:bg-frx-blue-900 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-10 rounded-md px-3',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && 'opacity-30'
        )}
        ref={ref}
        {...props}
        onClick={!isLoading ? props.onClick : undefined}
      />
    );
  }
);
Button.displayName = 'Button';

export interface FlatButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const FlatButton = React.forwardRef<HTMLDivElement, FlatButtonProps>(
  ({ className, variant, size, isLoading, ...props }, ref) => {
    return (
      <div
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && 'opacity-30'
        )}
        ref={ref}
        {...props}
        onClick={!isLoading ? props.onClick : undefined}
      />
    );
  }
);
FlatButton.displayName = 'FlatButton';

export { Button, buttonVariants, FlatButton };
