import React from 'react';
import { CategoryTable } from './components/category.table';
import { PageTitle } from '@/components/ui/page-title';

type Props = {};

const CategoryPage = (props: Props) => (
  <div>
    <PageTitle>Categorias</PageTitle>
    <CategoryTable />
  </div>
);

export default CategoryPage;
