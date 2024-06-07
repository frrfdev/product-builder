'use client';

import React from 'react';

import { useProductStore } from '../store/product-store';
import { ProductData } from '@/types/ProductData';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useAlertDialog } from '@/components/ui/alert-dialog';

type Props = {
  product: ProductData;
};

export const ProductTableActions = (props: Props) => {
  const { alert } = useAlertDialog();

  const setProductToEdit = useProductStore((state) => state.setProductToUpdate);
  const setProductToDelete = useProductStore(
    (state) => state.setProductToDelete
  );

  const removeProduct = useProductStore((state) => state.removeProduct);

  const handleEditProduct = () => {
    setProductToEdit(props.product);
  };

  const handleDeleteProduct = () => {
    setProductToDelete(props.product);
    alert({
      type: 'warning',
      title: 'Deletar Produto',
      description: `Tem certeza que deseja deletar o produto "${props.product.name}"?`,
      onOk: () => {
        removeProduct(props.product.id);
      },
    });
  };

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEditProduct}>
          Editar Produto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteProduct}>
          Deletar Produto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};
