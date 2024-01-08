import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Packaging from './pages/Packaging';
import axios from 'axios';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packaging" element={<Packaging />} />
      </Routes>
    </Router>
  );
}

export default App;