'use client';

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
  CategoryForm,
  categoryFormInitialValues,
  CategoryFormRef,
} from './category.form';

type CategoryModalProps = {
  children: React.ReactNode;
};

export const CategoryModal = (props: CategoryModalProps) => {
  const formRef = useRef<CategoryFormRef>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-[90%]">
          <DialogHeader>Nova Categoria</DialogHeader>
          <CategoryForm
            ref={formRef}
            onSuccess={() => {
              setIsOpen(false);
            }}
          ></CategoryForm>
          <DialogFooterForm
            onConfirm={() => {
              formRef.current?.submit();
            }}
            onCancel={() => {
              formRef.current?.form.reset(categoryFormInitialValues);
            }}
          ></DialogFooterForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
