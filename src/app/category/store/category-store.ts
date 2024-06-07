import { CategoryData } from '@/types/CategoryData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CategoryStore = {
  categories: CategoryData[];
  setCategories: (categories: CategoryData[]) => void;
  addCategory: (category: CategoryData) => void;
  removeCategory: (categoryId: string) => void;
  updateCategory: (categoryId: string, category: CategoryData) => void;
  setCategoryToUpdate: (role: CategoryData | null) => void;
  categoryToUpdate: CategoryData | null;
  setCategoryToDelete: (role: CategoryData | null) => void;
  categoryToDelete: CategoryData | null;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (isOpen: boolean) => void;
};

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [],
      categoryToUpdate: null,
      categoryToDelete: null,
      isCategoryModalOpen: false,
      setCategories: (categories) => set({ categories }),
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      removeCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.id !== categoryId
          ),
        })),
      updateCategory: (categoryId, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? category : c
          ),
        })),
      setCategoryToUpdate: (categoryToUpdate) => set({ categoryToUpdate }),
      setCategoryToDelete: (categoryToDelete) => set({ categoryToDelete }),
      setIsCategoryModalOpen: (isOpen) => set({ isCategoryModalOpen: isOpen }),
    }),
    {
      name: 'category-store',
    }
  )
);
