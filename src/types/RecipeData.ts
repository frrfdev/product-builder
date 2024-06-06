import { IngredientData } from './IngredientData';

export type RecipeData = {
  id: string;
  name: string;
  ingredients: IngredientData[];
};
