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
import { useCategoryStore } from '../store/category-store';

type CategoryModalProps = {
  children: React.ReactNode;
};

export const CategoryModal = (props: CategoryModalProps) => {
  const formRef = useRef<CategoryFormRef>(null);

  const isCategoryModalOpen = useCategoryStore(
    (state) => state.isCategoryModalOpen
  );
  const setIsCategoryModalOpen = useCategoryStore(
    (state) => state.setIsCategoryModalOpen
  );
  const setCategoryToUpdate = useCategoryStore(
    (state) => state.setCategoryToUpdate
  );
  const categoryToUpdate = useCategoryStore((state) => state.categoryToUpdate);

  return (
    <Dialog
      open={isCategoryModalOpen}
      onOpenChange={(value) => {
        setIsCategoryModalOpen(value);
        if (!value) setCategoryToUpdate(null);
      }}
    >
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            {categoryToUpdate ? 'Editar' : 'Nova'} Categoria
          </DialogHeader>
          <CategoryForm
            ref={formRef}
            onSuccess={() => {
              setIsCategoryModalOpen(false);
              setCategoryToUpdate(null);
            }}
          ></CategoryForm>
          <DialogFooterForm
            onConfirm={() => {
              formRef.current?.submit();
            }}
            onCancel={() => {
              formRef.current?.form.reset(categoryFormInitialValues);
              setCategoryToUpdate(null);
              setIsCategoryModalOpen(false);
            }}
          ></DialogFooterForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
