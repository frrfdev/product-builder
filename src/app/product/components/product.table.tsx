'use client';

import EntityTable from '@/components/ui/entity-table';
import { ProductData } from '@/types/ProductData';
import React from 'react';
import { useProductStore } from '../store/product-store';
import { Button, ButtonProps, FlatButton } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ProductTableActions } from './product.table.actions';
import { ProductModal } from './product.modal';
import { useCategoryStore } from '@/app/category/store/category-store';
import { NumberUtils } from '@/utils/number';

type Props = {};

const TableButtons = {
  newButtonOnData: (
    <ProductModal>
      <FlatButton className="w-min">Novo Produto</FlatButton>
    </ProductModal>
  ),
  newButtonOnEmpty: (
    <ProductModal>
      <FlatButton className="w-min">Novo Produto</FlatButton>
    </ProductModal>
  ),
};

export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      const category = useCategoryStore
        .getState()
        .categories.find((category) => category.id === product.categoryId);
      if (!category) return 'Categoria não encontrada';
      return category.name;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return NumberUtils.money(product.price);
    },
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <ProductTableActions product={product} />
        </DropdownMenu>
      );
    },
  },
];

export const ProductTable = (props: Props) => {
  const products = useProductStore((state) => state.products);

  return (
    <EntityTable<ProductData>
      data={products}
      buttons={TableButtons}
      columns={columns}
      emptyMessage="Nenhum produto cadastrado"
      emptyDescription="Você pode criar um novo produto clicando no botão 'Novo Produto'"
    ></EntityTable>
  );
};
