import { ProductData } from './ProductData';

export type IngredientData = {
  quantity: number;
  productId: string;
  product?: ProductData;
  id: string;
};
