import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input } from '../../../components/ui/input';
import { Form } from '../../../components/ui/form';
import { BaseFormRef } from '@/types/BaseFormRef';

export type CategoryFormData = {
  name: string;
};

export type CategoryFormProps = {
  onSuccess?: (data: any) => void;
};

export const categoryFormInitialValues = {
  name: 'Teste',
};

export type CategoryFormRef = BaseFormRef<CategoryFormData>;

export const CategoryForm = forwardRef<CategoryFormRef, CategoryFormProps>(
  ({ onSuccess }, ref) => {
    const form = useForm({
      defaultValues: categoryFormInitialValues,
    });

    const submit = () => {
      form.handleSubmit(async (values) => {
        console.log(values);
        onSuccess && onSuccess(values);
      })();
    };

    useImperativeHandle(ref, () => ({
      form,
      submit,
    }));

    return (
      <Form form={form} onSubmit={submit}>
        <FormItem name="name" label="Nome">
          <Input></Input>
        </FormItem>
      </Form>
    );
  }
);
CategoryForm.displayName = 'CategoryForm';
