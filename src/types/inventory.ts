export interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  lastUpdated: Date;
}

export type Unit = 'box' | 'bag' | 'kg' | 'piece';

export interface InventoryAction {
  type: 'add' | 'subtract';
  productId: string;
  quantity: number;
  date: Date;
}