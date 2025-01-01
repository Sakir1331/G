import React from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { Package, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  const { products, actions } = useInventoryStore();

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.quantity < 10).length;
  const recentActions = actions.slice(-5);

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600">إجمالي المنتجات</p>
              <p className="text-2xl font-semibold">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600">منتجات منخفضة المخزون</p>
              <p className="text-2xl font-semibold">{lowStockProducts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">آخر التحديثات</h2>
        <div className="space-y-4">
          {recentActions.map((action, index) => {
            const product = products.find((p) => p.id === action.productId);
            return (
              <div key={index} className="flex items-center">
                {action.type === 'add' ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <span className="mr-2 text-gray-600">
                  {action.type === 'add' ? 'إضافة' : 'خصم'} {action.quantity}{' '}
                  {product?.unit} من {product?.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}