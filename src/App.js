import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/Stranici/MainPage';
import CategoryPage from './components/Stranici/CategoryPage';
import CategoryProductsPage from './components/Stranici/CategoryProductsPage';
import Products from './components/Stranici/Products';
import ProductDetailsPage from './components/Stranici/ProductDetailsPage';
import CartPage from './components/Stranici/CartPage';

const App = () => {
  return (
    <Routes>
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default App;
