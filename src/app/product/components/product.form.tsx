import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input } from '../../../components/ui/input';
import { Form } from '../../../components/ui/form';
import { BaseFormRef } from '@/types/BaseFormRef';
import { useProductStore } from '../store/product-store';
import { getRandomUUID } from '@/utils/crypto';

export type ProductFormData = {
  name: string;
  categoryId: string;
  price: number;
};

export type ProductFormProps = {
  onSuccess?: (data: any) => void;
};

export const productFormInitialValues = {
  name: '',
  categoryId: '',
  price: 0,
};

export type ProductFormRef = BaseFormRef<ProductFormData>;

export const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ onSuccess }, ref) => {
    const addProduct = useProductStore((state) => state.addProduct);

    const form = useForm({
      defaultValues: productFormInitialValues,
    });

    const submit = () => {
      form.handleSubmit(async (values) => {
        addProduct({ ...values, id: getRandomUUID() });
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

        <FormItem name="categoryId" label="Categoria">
          <Input></Input>
        </FormItem>

        <FormItem name="price" label="Preço por g/ml">
          <Input></Input>
        </FormItem>
      </Form>
    );
  }
);
ProductForm.displayName = 'ProductForm';
