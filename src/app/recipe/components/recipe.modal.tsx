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
import { useRecipeStore } from '../store/recipe-store';

type RecipeModalProps = {
  children: React.ReactNode;
};

export const RecipeModal = (props: RecipeModalProps) => {
  const formRef = useRef<RecipeFormRef>(null);

  const isRecipeModalOpen = useRecipeStore((state) => state.isRecipeModalOpen);
  const setIsRecipeModalOpen = useRecipeStore(
    (state) => state.setIsRecipeModalOpen
  );
  const setRecipeToUpdate = useRecipeStore((state) => state.setRecipeToUpdate);
  const recipeToUpdate = useRecipeStore((state) => state.recipeToUpdate);

  return (
    <Dialog
      open={isRecipeModalOpen}
      onOpenChange={(value) => {
        setIsRecipeModalOpen(value);
        if (!value) setRecipeToUpdate(null);
      }}
    >
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="lg:w-[40%] w-[90%]">
          <DialogHeader>
            {recipeToUpdate ? 'Editar' : 'Nova'} Receita
          </DialogHeader>
          <RecipeForm
            ref={formRef}
            onSuccess={() => {
              setIsRecipeModalOpen(false);
            }}
          ></RecipeForm>
          <DialogFooterForm
            onConfirm={() => {
              formRef.current?.submit();
            }}
            onCancel={() => {
              formRef.current?.form.reset(recipeFormInitialValues);
              setIsRecipeModalOpen(false);
            }}
          ></DialogFooterForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
