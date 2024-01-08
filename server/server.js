const express = require('express');
const cors = require('cors');
const { getHygieneProducts } = require('./data.js');

// Enable CORS for all routes

const app = express();
const port = 8000; // or any other port you prefer

app.use(cors());

app.get('/api/data', (req, res) => {
  const products = getHygieneProducts();
  // Handle your API logic here
  res.json({products});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});