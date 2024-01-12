import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import CategoryPage from './pages/CategoryPage.js';
import ProductsPage from './pages/ProductPage.js';
import SearchPage from './pages/SearchPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;