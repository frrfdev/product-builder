import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooterForm,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { ProductForm, productFormInitialValues, ProductFormRef } from './product.form';
import { useProductStore } from '../store/product-store';

type ProductModalProps = {
  children: React.ReactNode;
};

export const ProductModal = (props: ProductModalProps) => {
  const formRef = useRef<ProductFormRef>(null);

  const isProductModalOpen = useProductStore((state) => state.isProductModalOpen);
  const setIsProductModalOpen = useProductStore((state) => state.setIsProductModalOpen);
  const setProductToUpdate = useProductStore((state) => state.setProductToUpdate);
  const productToUpdate = useProductStore((state) => state.productToUpdate);

  return (
    <Dialog
      open={isProductModalOpen}
      onOpenChange={(value) => {
        setIsProductModalOpen(value);
        if (!value) setProductToUpdate(null);
      }}
    >
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-[30%]">
          <DialogHeader>{productToUpdate ? 'Editar' : 'Novo'} Produto</DialogHeader>
          <ProductForm
            ref={formRef}
            onSuccess={() => {
              setIsProductModalOpen(false);
              setProductToUpdate(null);
            }}
          ></ProductForm>
          <DialogFooterForm
            onConfirm={() => {
              formRef.current?.submit();
            }}
            onCancel={() => {
              formRef.current?.form.reset(productFormInitialValues);
              setIsProductModalOpen(false);
              setProductToUpdate(null);
            }}
          ></DialogFooterForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
