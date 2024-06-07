import { RecipeData } from '@/types/RecipeData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RecipeStore = {
  recipes: RecipeData[];
  setRecipes: (recipes: RecipeData[]) => void;
  addRecipe: (recipe: RecipeData) => void;
  removeRecipe: (recipeId: string) => void;
  updateRecipe: (recipeId: string, recipe: RecipeData) => void;
  setRecipeToUpdate: (role: RecipeData | null) => void;
  recipeToUpdate: RecipeData | null;
  setRecipeToDelete: (role: RecipeData | null) => void;
  recipeToDelete: RecipeData | null;
  isRecipeModalOpen: boolean;
  setIsRecipeModalOpen: (isOpen: boolean) => void;
};

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set) => ({
      recipes: [],
      recipeToUpdate: null,
      recipeToDelete: null,
      isRecipeModalOpen: false,
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
      setRecipeToUpdate: (recipeToUpdate) => set({ recipeToUpdate }),
      setRecipeToDelete: (recipeToDelete) => set({ recipeToDelete }),
      setIsRecipeModalOpen: (isOpen) => set({ isRecipeModalOpen: isOpen }),
    }),
    {
      name: 'recipe-store',
    }
  )
);
