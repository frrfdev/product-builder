'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import { NumberUtils } from '@/utils/number';
import { useRecipeStore } from '../store/recipe-store';
import { RecipeData } from '@/types/RecipeData';
import { useProductStore } from '@/app/product/store/product-store';
import { Edit, View } from 'lucide-react';

type Props = {};

export const RecipeList = (props: Props) => {
  const recipes = useRecipeStore((state) => state.recipes);
  const products = useProductStore((state) => state.products);

  const getRecipeTotalPrice = (recipe: RecipeData) => {
    return recipe.ingredients.reduce((acc, ingredient) => {
      const product = products.find((product) => product.id === ingredient.productId);
      if (!product) return acc;
      return acc + product.price * ingredient.quantity;
    }, 0);
  };

  return (
    <div className="flex gap-2 flex-wrap basis-0 w-full">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className=" basis-0 grow max-w-[250px]">
          <CardContent className="flex flex-col justify-center items-center p-4 gap-2">
            {/* <ProfileImage
              image={product.profileImage !== undefined ? product.profileImage : null}
              className="rounded-md"
            ></ProfileImage> */}
            <span className="font-bold">{recipe.name}</span>
            <span className="text-sm">{NumberUtils.money(getRecipeTotalPrice(recipe))}</span>
            <CardFooter className="w-full p-0 border-t pt-4 border-frx-blue-800">
              <div className="flex justify-around w-full">
                <Edit></Edit>
                <View></View>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
