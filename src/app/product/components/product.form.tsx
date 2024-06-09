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
import ProfilePicker from '@/components/ui/profile-picker';

export type ProductFormData = {
  name: string;
  categoryId: string;
  price: number;
  id?: string;
  profileImage?: File | null | string;
};

export type ProductFormProps = {
  onSuccess?: (data: any) => void;
};

export const productFormInitialValues = {
  name: '',
  categoryId: '',
  price: 0,
  id: '',
  profileImage: null as any as File | null | undefined,
};

export type ProductFormRef = BaseFormRef<ProductFormData>;

export const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(({ onSuccess }, ref) => {
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const productToUpdate = useProductStore((state) => state.productToUpdate);

  const form = useForm({
    defaultValues: productFormInitialValues,
  });

  const submit = () => {
    form.handleSubmit(async (values) => {
      const newValues = {
        ...values,
        price:
          (typeof values?.price !== 'number'
            ? NumberUtils.toNumber(values.price || '0')
            : ((values.price || 0) as number)) || 0,
      };
      if (productToUpdate) {
        updateProduct(productToUpdate.id, newValues);
        onSuccess && onSuccess(newValues);
      } else addProduct({ ...newValues, id: getRandomUUID() });
    })();
  };

  useImperativeHandle(ref, () => ({
    form: form as UseFormReturn<ProductFormData>,
    submit,
  }));

  useEffect(() => {
    form.unregister('price');
    if (productToUpdate) form.reset(productToUpdate);
    form.register('price');
  }, [productToUpdate]);

  useEffect(() => {
    form.register('price');
    return () => {
      form.unregister('price');
    };
  }, []);

  return (
    <Form form={form} onSubmit={submit}>
      {/* <FormItem
        name="profileImage"
        className="margin-auto margin-0"
        rules={{
          validate: (fieldValue: File) => {
            if (fieldValue && fieldValue.size / 1024 > 200) {
              return 'Arquivo muito grande!';
            }
          },
        }}
      >
        <ProfilePicker></ProfilePicker>
      </FormItem> */}

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
});
ProductForm.displayName = 'ProductForm';
