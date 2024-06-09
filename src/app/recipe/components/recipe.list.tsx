'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import { NumberUtils } from '@/utils/number';
import { useRecipeStore } from '../store/recipe-store';
import { RecipeData } from '@/types/RecipeData';
import { useProductStore } from '@/app/product/store/product-store';
import { Edit, View } from 'lucide-react';
import { PageTitle } from '@/components/ui/page-title';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import { RecipeModal } from './recipe.modal';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type Props = {};

export const RecipeList = (props: Props) => {
  const recipes = useRecipeStore((state) => state.recipes);
  const products = useProductStore((state) => state.products);

  const { setSearch, filteredList } = useSearch({
    list: recipes,
    keys: ['name'],
  });

  const setRecipeToEdit = useRecipeStore((state) => state.setRecipeToUpdate);

  const handleEditRecipe = (recipe: RecipeData) => {
    setRecipeToEdit(recipe);
  };

  const getRecipeTotalPrice = (recipe: RecipeData) => {
    return recipe.ingredients.reduce((acc, ingredient) => {
      const product = products.find(
        (product) => product.id === ingredient.productId
      );
      if (!product) return acc;
      return acc + product.price * ingredient.quantity;
    }, 0);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar receita"
        ></Input>
      </div>
      <div className="flex gap-2 flex-wrap basis-0 w-full">
        {filteredList.map((recipe) => (
          <Card key={recipe.id} className=" basis-0 grow max-w-[250px]">
            <CardContent className="flex flex-col justify-center items-center p-4 gap-2">
              {/* <ProfileImage
              image={product.profileImage !== undefined ? product.profileImage : null}
              className="rounded-md"
            ></ProfileImage> */}
              <span className="font-bold">{recipe.name}</span>
              <span className="text-sm">
                {NumberUtils.money(getRecipeTotalPrice(recipe))}
              </span>
              <CardFooter className="w-full p-0 border-t pt-4 border-frx-blue-800">
                <div className="flex justify-around w-full">
                  <RecipeModal>
                    <div onClick={() => handleEditRecipe(recipe)}>
                      <Edit className="hover:text-frx-red-900"></Edit>
                    </div>
                  </RecipeModal>
                  <View></View>
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
