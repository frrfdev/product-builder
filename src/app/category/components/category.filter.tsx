'use client';

import { CategoryModal } from '@/app/category/components/category.modal';
import { FlatButton } from '@/components/ui/button';
import React from 'react';

type Props = {};

export const CategoryFilter = (props: Props) => {
  return (
    <div>
      <CategoryModal>
        <FlatButton className="w-min">Nova Categoria</FlatButton>
      </CategoryModal>
    </div>
  );
};
