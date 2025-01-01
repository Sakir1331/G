import React, { useState } from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { Unit } from '../types/inventory';

interface ProductFormProps {
  type: 'add' | 'subtract';
}

export function ProductForm({ type }: ProductFormProps) {
  const { products, addProduct, updateQuantity } = useInventoryStore();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<Unit>('piece');
  const [selectedProduct, setSelectedProduct] = useState('');

  const units: Unit[] = ['box', 'bag', 'kg', 'piece'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'add' && !selectedProduct) {
      addProduct({
        name,
        quantity: Number(quantity),
        unit,
      });
    } else {
      updateQuantity(
        selectedProduct,
        type === 'add' ? Number(quantity) : -Number(quantity)
      );
    }

    setName('');
    setQuantity('');
    setSelectedProduct('');
  };

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {type === 'add' ? 'إضافة منتج' : 'خصم منتج'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {type === 'add' ? 'اختر منتج موجود أو أضف منتج جديد' : 'اختر المنتج'}
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- اختر منتج --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {type === 'add' && !selectedProduct && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              اسم المنتج الجديد
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الكمية
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {type === 'add' && !selectedProduct && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              الوحدة
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u === 'box' ? 'صندوق' : u === 'bag' ? 'كيس' : u === 'kg' ? 'كيلو' : 'قطعة'}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {type === 'add' ? 'إضافة' : 'خصم'}
        </button>
      </form>
    </div>
  );
}