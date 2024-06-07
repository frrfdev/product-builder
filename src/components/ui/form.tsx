import React, { useEffect } from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

export const Form = ({
  children,
  onSubmit,
  form,
  ...props
}: {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  form?: UseFormReturn<any, any, undefined>;
} & Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  'onSubmit'
>) => {
  const methods = useForm({});

  const formMethods = form ?? methods;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit ? formMethods.handleSubmit(onSubmit) : undefined}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};
