'use client';

import React from 'react';

import { useCategoryStore } from '../store/category-store';
import { CategoryData } from '@/types/CategoryData';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useAlertDialog } from '@/components/ui/alert-dialog';
import { FlatButton } from '@/components/ui/button';
import { CategoryModal } from './category.modal';

type Props = {
  category: CategoryData;
};

export const CategoryTableActions = (props: Props) => {
  const { alert } = useAlertDialog();

  const setCategoryToEdit = useCategoryStore(
    (state) => state.setCategoryToUpdate
  );
  const setCategoryToDelete = useCategoryStore(
    (state) => state.setCategoryToDelete
  );

  const removeCategory = useCategoryStore((state) => state.removeCategory);

  const handleEditCategory = () => {
    setCategoryToEdit(props.category);
  };

  const handleDeleteCategory = () => {
    setCategoryToDelete(props.category);
    alert({
      type: 'warning',
      title: 'Deletar Categoria',
      description: `Tem certeza que deseja deletar a categoria "${props.category.name}"?`,
      onOk: () => {
        removeCategory(props.category.id);
      },
    });
  };

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <CategoryModal>
          <DropdownMenuItem onClick={handleEditCategory}>
            Editar Categoria
          </DropdownMenuItem>
        </CategoryModal>
        <DropdownMenuItem onClick={handleDeleteCategory}>
          Deletar Categoria
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};
