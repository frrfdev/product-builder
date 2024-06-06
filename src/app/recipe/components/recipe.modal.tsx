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
  RecipeForm,
  recipeFormInitialValues,
  RecipeFormRef,
} from './recipe.form';

type RecipeModalProps = {
  children: React.ReactNode;
};

export const RecipeModal = (props: RecipeModalProps) => {
  const formRef = useRef<RecipeFormRef>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-[90%]">
          <DialogHeader>Novo Produto</DialogHeader>
          <RecipeForm
            ref={formRef}
            onSuccess={() => {
              setIsOpen(false);
            }}
          ></RecipeForm>
          <DialogFooterForm
            onConfirm={() => {
              formRef.current?.submit();
            }}
            onCancel={() => {
              formRef.current?.form.reset(recipeFormInitialValues);
            }}
          ></DialogFooterForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
