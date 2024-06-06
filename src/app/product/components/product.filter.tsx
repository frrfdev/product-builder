'use client';

import { FlatButton } from '@/components/ui/button';
import React from 'react';
import { ProductModal } from './product.modal';

type Props = {};

export const ProductFilter = (props: Props) => {
  return (
    <div>
      <ProductModal>
        <FlatButton className="w-min">Novo Produto</FlatButton>
      </ProductModal>
    </div>
  );
};
