import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input, InputMoney } from '../../../components/ui/input';
import { Form } from '../../../components/ui/form';
import { BaseFormRef } from '@/types/BaseFormRef';
import { useProductStore } from '../store/product-store';
import { getRandomUUID } from '@/utils/crypto';
import { CategorySelect } from '@/app/category/components/category.select';
import { CategoryModal } from '@/app/category/components/category.modal';
import { Button, FlatButton } from '@/components/ui/button';
import { NumberUtils } from '@/utils/number';
import { Calculator } from 'lucide-react';
import { ProductCalculateModal } from './product-calculate.modal';

export type ProductFormData = {
  name: string;
  categoryId: string;
  price: number;
  id?: string;
};

export type ProductFormProps = {
  onSuccess?: (data: any) => void;
};

export const productFormInitialValues = {
  name: '',
  categoryId: '',
  price: 0,
  id: '',
};

export type ProductFormRef = BaseFormRef<ProductFormData>;

export const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ onSuccess }, ref) => {
    const addProduct = useProductStore((state) => state.addProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);
    const productToUpdate = useProductStore((state) => state.productToUpdate);

    const form = useForm({
      defaultValues: productFormInitialValues,
    });

    const submit = () => {
      form.handleSubmit(async (values) => {
        if (productToUpdate) updateProduct(productToUpdate.id, values);
        else addProduct({ ...values, id: getRandomUUID() });
        onSuccess && onSuccess(values);
      })();
    };

    useImperativeHandle(ref, () => ({
      form: form as UseFormReturn<ProductFormData>,
      submit,
    }));

    useEffect(() => {
      if (productToUpdate) form.reset(productToUpdate);
    }, [productToUpdate]);

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

        <div className="flex gap-2 items-end">
          <FormItem
            name="price"
            label="Preço por g/ml"
            rules={{
              setValueAs: (val) => {
                if (typeof val === 'number') return val;
                return NumberUtils.toNumber(val);
              },
            }}
          >
            <InputMoney />
          </FormItem>
          <ProductCalculateModal
            onSuccess={(price) => {
              form.setValue('price', price);
            }}
          >
            <Button type="button">
              <Calculator></Calculator>
            </Button>
          </ProductCalculateModal>
        </div>
      </Form>
    );
  }
);
ProductForm.displayName = 'ProductForm';
