import { PageTitle } from '@/components/ui/page-title';
import React from 'react';
import { RecipeList } from '../recipe/components/recipe.list';

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="w-full h-full">
      <PageTitle>Receitas</PageTitle>
      <div className="mt-4">
        <RecipeList />
      </div>
    </div>
  );
};

export default DashboardPage;
