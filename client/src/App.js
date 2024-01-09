import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PackagingPage from './pages/PackagingPage.js';
import ProductsPage from './pages/ProductPage.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packaging" element={<PackagingPage />} />
        <Route path="/product" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;