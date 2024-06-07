import { cn } from '@/lib/utils';
import { getRandomUUID } from '@/utils/crypto';
import { NumberUtils } from '@/utils/number';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [id] = React.useState(getRandomUUID());

    return (
      <input
        id={id}
        type={type}
        className={cn(
          'flex h-12 w-full bg-white border dark:border-0 rounded-md text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-5 dark:bg-frx-blue-900 dark:placeholder:text-neutral-200',
          type === 'color' ? 'px-1 py-1' : 'px-3 py-3',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const InputNumber = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    formatter?: (val: string | number) => string;
    parser?: (val: string) => number;
  }
>(({ formatter, ...props }, ref) => {
  return (
    <Input
      {...props}
      value={formatter ? formatter(props.value?.toString() || 0) : props.value}
      ref={ref}
    />
  );
});
InputNumber.displayName = 'InputNumber';

const InputMoney = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    formatter?: (val: string | number) => string;
    parser?: (val: string) => number;
  }
>((props, ref) => {
  return (
    <InputNumber
      {...props}
      ref={ref}
      formatter={(value: string | number) =>
        NumberUtils.money(value, 2, 'R$', true)
      }
    />
  );
});
InputMoney.displayName = 'InputMoney';

export { Input, InputNumber, InputMoney };
