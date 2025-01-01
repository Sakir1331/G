import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ProductForm } from './components/ProductForm';
import { InventoryList } from './components/InventoryList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add" element={<ProductForm type="add" />} />
          <Route path="subtract" element={<ProductForm type="subtract" />} />
          <Route path="inventory" element={<InventoryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;