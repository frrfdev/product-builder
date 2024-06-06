import { RecipeData } from '@/types/RecipeData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RecipeStore = {
  recipes: RecipeData[];
  selectedRecipe: RecipeData | null;
  setRecipes: (recipes: RecipeData[]) => void;
  addRecipe: (recipe: RecipeData) => void;
  removeRecipe: (recipeId: string) => void;
  updateRecipe: (recipeId: string, recipe: RecipeData) => void;
};

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set) => ({
      recipes: [],
      selectedRecipe: null,
      setRecipes: (recipes) => set({ recipes }),
      addRecipe: (recipe) =>
        set((state) => ({ recipes: [...state.recipes, recipe] })),
      removeRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
        })),
      updateRecipe: (recipeId, recipe) =>
        set((state) => ({
          recipes: state.recipes.map((r) => (r.id === recipeId ? recipe : r)),
        })),
    }),
    {
      name: 'recipe-store',
    }
  )
);
