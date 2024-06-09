import React from 'react';
import { ProductTable } from './components/product.table';
import { PageTitle } from '@/components/ui/page-title';

type Props = {};

const ProductPage = (props: Props) => {
  return (
    <div>
      <PageTitle>Produtos</PageTitle>
      <ProductTable />
    </div>
  );
};

export default ProductPage;
