import React, { useEffect, useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import CategoryPage from './pages/CategoryPage.js';
import ProductsPage from './pages/ProductPage.js';
import SearchPage from './pages/SearchPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import CartPage from './pages/CartPage.js';
import { CartProvider } from './components/CartProvider.js'; // Assuming you have a CartContext file

const CartContext = createContext();

function App() {


    return (
    <Router>
        <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product" element={<ProductsPage />} />  
          <Route path="/cart" element={<CartPage />} />  
        </Routes>
        </CartProvider>
    </Router>
  );
}

export default App;