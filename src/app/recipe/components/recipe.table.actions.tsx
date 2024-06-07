'use client';

import React from 'react';

import { useRecipeStore } from '../store/recipe-store';
import { RecipeData } from '@/types/RecipeData';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useAlertDialog } from '@/components/ui/alert-dialog';

type Props = {
  recipe: RecipeData;
};

export const RecipeTableActions = (props: Props) => {
  const { alert } = useAlertDialog();

  const setRecipeToEdit = useRecipeStore((state) => state.setRecipeToUpdate);
  const setRecipeToDelete = useRecipeStore((state) => state.setRecipeToDelete);

  const removeRecipe = useRecipeStore((state) => state.removeRecipe);

  const handleEditRecipe = () => {
    setRecipeToEdit(props.recipe);
  };

  const handleDeleteRecipe = () => {
    setRecipeToDelete(props.recipe);
    alert({
      type: 'warning',
      title: 'Deletar Receita',
      description: `Tem certeza que deseja deletar a receita "${props.recipe.name}"?`,
      onOk: () => {
        removeRecipe(props.recipe.id);
      },
    });
  };

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEditRecipe}>
          Editar Receita
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteRecipe}>
          Deletar Receita
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};
