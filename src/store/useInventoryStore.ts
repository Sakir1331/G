import { create } from 'zustand';
import { Product, InventoryAction } from '../types/inventory';

interface InventoryState {
  products: Product[];
  actions: InventoryAction[];
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: [],
  actions: [],
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: Math.random().toString(36).substring(7),
          lastUpdated: new Date(),
        },
      ],
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity, lastUpdated: new Date() }
          : product
      ),
      actions: [
        ...state.actions,
        {
          type: quantity > 0 ? 'add' : 'subtract',
          productId,
          quantity: Math.abs(quantity),
          date: new Date(),
        },
      ],
    })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));