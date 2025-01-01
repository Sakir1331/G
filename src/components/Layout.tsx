import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutGrid, PackagePlus, PackageMinus, ClipboardList } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-4 text-gray-800 hover:text-gray-600"
              >
                <LayoutGrid className="h-6 w-6 mr-2" />
                <span className="font-semibold">لوحة التحكم</span>
              </Link>
            </div>
            <div className="flex space-x-8 rtl:space-x-reverse">
              <Link
                to="/add"
                className="flex items-center px-3 text-gray-800 hover:text-gray-600"
              >
                <PackagePlus className="h-5 w-5 mr-1" />
                <span>إضافة</span>
              </Link>
              <Link
                to="/subtract"
                className="flex items-center px-3 text-gray-800 hover:text-gray-600"
              >
                <PackageMinus className="h-5 w-5 mr-1" />
                <span>خصم</span>
              </Link>
              <Link
                to="/inventory"
                className="flex items-center px-3 text-gray-800 hover:text-gray-600"
              >
                <ClipboardList className="h-5 w-5 mr-1" />
                <span>المخزون</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}