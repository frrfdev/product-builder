'use client';

import EntityTable from '@/components/ui/entity-table';
import { CategoryData } from '@/types/CategoryData';
import React from 'react';
import { useCategoryStore } from '../store/category-store';
import { Button, ButtonProps, FlatButton } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { CategoryTableActions } from './category.table.actions';
import { CategoryModal } from './category.modal';

type Props = {};

const TableButtons = {
  newButtonOnData: (
    <CategoryModal>
      <FlatButton className="w-min" variant="destructive">
        Nova Categoria
      </FlatButton>
    </CategoryModal>
  ),
  newButtonOnEmpty: (
    <CategoryModal>
      <FlatButton className="w-min" variant="destructive">
        Nova Categoria
      </FlatButton>
    </CategoryModal>
  ),
};

export const columns: ColumnDef<CategoryData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <CategoryTableActions category={category} />
        </DropdownMenu>
      );
    },
  },
];

export const CategoryTable = (props: Props) => {
  const categories = useCategoryStore((state) => state.categories);

  return (
    <EntityTable<CategoryData>
      data={categories}
      buttons={TableButtons}
      columns={columns}
      emptyMessage="Nenhuma categoria cadastrada"
      emptyDescription="Você pode criar uma nova categoria clicando no botão 'Novo Categoria'"
    ></EntityTable>
  );
};
