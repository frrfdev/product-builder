import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input } from '../../../components/ui/input';
import { Form } from '../../../components/ui/form';
import { BaseFormRef } from '@/types/BaseFormRef';
import { useCategoryStore } from '../store/category-store';
import { getRandomUUID } from '@/utils/crypto';

export type CategoryFormData = {
  name: string;
  id?: string;
};

export type CategoryFormProps = {
  onSuccess?: (data: any) => void;
};

export const categoryFormInitialValues = {
  name: 'Teste',
  id: '',
};

export type CategoryFormRef = BaseFormRef<CategoryFormData>;

export const CategoryForm = forwardRef<CategoryFormRef, CategoryFormProps>(
  ({ onSuccess }, ref) => {
    const addCategory = useCategoryStore((state) => state.addCategory);
    const updateCategory = useCategoryStore((state) => state.updateCategory);
    const categoryToUpdate = useCategoryStore(
      (state) => state.categoryToUpdate
    );

    const form = useForm({
      defaultValues: categoryFormInitialValues,
    });

    const submit = () => {
      form.handleSubmit(async (values) => {
        if (categoryToUpdate) updateCategory(categoryToUpdate.id, values);
        else addCategory({ ...values, id: getRandomUUID() });
        onSuccess && onSuccess(values);
      })();
    };

    useImperativeHandle(ref, () => ({
      form: form as UseFormReturn<CategoryFormData>,
      submit,
    }));

    useEffect(() => {
      if (categoryToUpdate) form.reset(categoryToUpdate);
    }, [categoryToUpdate]);

    return (
      <Form form={form} onSubmit={submit}>
        <FormItem name="name" label="Nome" rules={{ required: true }}>
          <Input></Input>
        </FormItem>
      </Form>
    );
  }
);
CategoryForm.displayName = 'CategoryForm';
