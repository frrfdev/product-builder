/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import type { FieldErrors, FieldValues, RegisterOptions } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';
import { FormUtils } from '@/utils/form';

export const FormItem = ({
  children,
  name,
  label,
  rules,
  hidden,
  description,
  ...props
}: {
  children: React.ReactNode;
  name: string;
  label?: string;
  description?: string | React.ReactNode;
  rules?: RegisterOptions;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const value = useWatch({ name });
  const error = (FormUtils.findNestedError(errors, name) as FieldErrors<FieldValues>[typeof name]) ?? undefined;

  const updatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const customRegister = {
        ...rules,
        required: rules?.required ? `${label} é um campo obrigatório` : undefined,
      } as RegisterOptions;

      if (register) {
        if (child.props.type === 'number') {
          customRegister.valueAsNumber = true;
        }
        const registerData = register(name, customRegister);
        return React.cloneElement(child, {
          ...child.props,
          ...registerData,
          onChange: child.props.onChange || registerData.onChange,
          name,
          value: child.props.parser ? child.props.parser(value) : value,
          'data-error': !!error?.message,
        });
      }
      return React.cloneElement(child, { ...child.props, name });
    }
    return child;
  });

  return (
    <div
      className={twMerge('flex w-auto flex-col gap-2 dark:text-white', hidden ? 'w-0 h-0 overflow-hidden' : '')}
      {...props}
    >
      <label className="w-full flex flex-col" title={label}>
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full flex gap-1">
          <span className="max-w-fit whitespace-nowrap overflow-hidden overflow-ellipsis">{label}</span>
          <span className="text-red-600">{rules?.required && label ? ' *' : ''}</span>
        </div>
        {description ? <div className="text-neutral-500 text-sm">{description}</div> : null}
      </label>
      <div>{updatedChildren}</div>
      {error?.message ? <span className="text-sm text-red-600">{error?.message as string | undefined}</span> : null}
    </div>
  );
};
