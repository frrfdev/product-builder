'use client';

import EntityTable from '@/components/ui/entity-table';
import { RecipeData } from '@/types/RecipeData';
import React from 'react';
import { useRecipeStore } from '../store/recipe-store';
import { Button, ButtonProps, FlatButton } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { RecipeTableActions } from './recipe.table.actions';
import { RecipeModal } from './recipe.modal';
import { useProductStore } from '@/app/product/store/product-store';
import { NumberUtils } from '@/utils/number';

type Props = {};

const TableButtons = {
  newButtonOnData: (
    <RecipeModal>
      <FlatButton className="w-min" variant="destructive">
        Nova Receita
      </FlatButton>
    </RecipeModal>
  ),
  newButtonOnEmpty: (
    <RecipeModal>
      <FlatButton className="w-min" variant="destructive">
        Nova Receita
      </FlatButton>
    </RecipeModal>
  ),
};

export const columns: ColumnDef<RecipeData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      const recipe = row.original;
      const total = recipe.ingredients.reduce((acc, ingredient) => {
        const product = useProductStore
          .getState()
          .products.find((product) => product.id === ingredient.productId);
        if (!product) return acc;

        return acc + product.price * ingredient.quantity;
      }, 0);
      return NumberUtils.money(total);
    },
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const recipe = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <RecipeTableActions recipe={recipe} />
        </DropdownMenu>
      );
    },
  },
];

export const RecipeTable = (props: Props) => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <EntityTable<RecipeData>
      data={recipes}
      buttons={TableButtons}
      columns={columns}
      emptyMessage="Nenhuma receita cadastrada"
      emptyDescription="Você pode criar uma nova receita clicando no botão 'Novo Receita'"
    ></EntityTable>
  );
};
