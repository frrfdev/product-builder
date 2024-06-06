import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooterForm,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  ProductForm,
  productFormInitialValues,
  ProductFormRef,
} from './product.form';

type ProductModalProps = {
  children: React.ReactNode;
};

export const ProductModal = (props: ProductModalProps) => {
  const formRef = useRef<ProductFormRef>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-[90%]">
          <DialogHeader>Novo Produto</DialogHeader>
          <ProductForm
            ref={formRef}
            onSuccess={() => {
              setIsOpen(false);
            }}
          ></ProductForm>
          <DialogFooterForm
            onConfirm={() => {
              formRef.current?.submit();
            }}
            onCancel={() => {
              formRef.current?.form.reset(productFormInitialValues);
            }}
          ></DialogFooterForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
