'use client';

import { FlatButton } from '@/components/ui/button';
import React from 'react';
import { RecipeModal } from './recipe.modal';

type Props = {};

export const RecipeFilter = (props: Props) => {
  return (
    <div>
      <RecipeModal>
        <FlatButton className="w-min">Nova Receita</FlatButton>
      </RecipeModal>
    </div>
  );
};
