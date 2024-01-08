const express = require('express');
const cors = require('cors');
const { getProducts } = require('./data.js');

// Enable CORS for all routes

const app = express();
const port = 8000; // or any other port you prefer

app.use(cors());

app.get('/', (req, res) => {
  const products = getProducts();
  // Handle your API logic here
  res.json({products});
});


app.get('/packaging', (req, res) => {
  const category = req.query.category;

  let data = getProducts();

  data = data.filter(item => item.category === 'Packaging');
  console.log(data);
  res.json({data});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});