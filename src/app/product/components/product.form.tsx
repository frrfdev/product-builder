import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input, InputMoney } from '../../../components/ui/input';
import { Form } from '../../../components/ui/form';
import { BaseFormRef } from '@/types/BaseFormRef';
import { useProductStore } from '../store/product-store';
import { getRandomUUID } from '@/utils/crypto';
import { CategorySelect } from '@/app/category/components/category.select';
import { CategoryModal } from '@/app/category/components/category.modal';
import { FlatButton } from '@/components/ui/button';
import { NumberUtils } from '@/utils/number';

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

        <div className="flex gap-2 items-end">
          <FormItem name="categoryId" label="Categoria">
            <CategorySelect></CategorySelect>
          </FormItem>
          <CategoryModal>
            <FlatButton className="w-min">Nova Categoria</FlatButton>
          </CategoryModal>
        </div>

        <FormItem
          name="price"
          label="Preço por g/ml"
          rules={{
            setValueAs: (value: string) =>
              Number(NumberUtils.moneyToNumber(value)),
          }}
        >
          <InputMoney />
        </FormItem>
      </Form>
    );
  }
);
ProductForm.displayName = 'ProductForm';
