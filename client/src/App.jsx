import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import CategoryPage from './pages/CategoryPage.js';
import ProductsPage from './pages/ProductPage.js';
import SearchPage from './pages/SearchPage.js';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;