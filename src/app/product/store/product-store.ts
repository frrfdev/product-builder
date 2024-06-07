import { ProductData } from '@/types/ProductData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProductStore = {
  products: ProductData[];
  setProducts: (products: ProductData[]) => void;
  addProduct: (product: ProductData) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, product: ProductData) => void;
  setProductToUpdate: (role: ProductData | null) => void;
  productToUpdate: ProductData | null;
  setProductToDelete: (role: ProductData | null) => void;
  productToDelete: ProductData | null;
  isProductModalOpen: boolean;
  setIsProductModalOpen: (isOpen: boolean) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      productToUpdate: null,
      productToDelete: null,
      isProductModalOpen: false,
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId
          ),
        })),
      updateProduct: (productId, product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? product : p
          ),
        })),
      setProductToUpdate: (productToUpdate) => set({ productToUpdate }),
      setProductToDelete: (productToDelete) => set({ productToDelete }),
      setIsProductModalOpen: (isOpen) => set({ isProductModalOpen: isOpen }),
    }),
    {
      name: 'product-store',
    }
  )
);
