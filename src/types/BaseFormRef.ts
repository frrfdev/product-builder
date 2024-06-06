import { FieldValues, UseFormReturn } from 'react-hook-form';

export type BaseFormRef<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  submit: () => void;
};
