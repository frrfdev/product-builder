import React from 'react';
import { RecipeTable } from './components/recipe.table';
import { PageTitle } from '@/components/ui/page-title';

type Props = {};

const RecipePage = (props: Props) => {
  return (
    <div>
      <PageTitle>Receitas</PageTitle>
      <RecipeTable />
    </div>
  );
};

export default RecipePage;
