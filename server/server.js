const express = require('express');
const cors = require('cors');
const { getProducts } = require('./data.js');

// Enable CORS for all routes

const app = express();
const port = 8000; // or any other port you prefer

app.use(cors());

app.get('/', (req, res) => {
  const products = getProducts();
  
  //sort array by addedDate
  let latestProducts = products.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));  
  latestProducts = latestProducts.slice(0,7);
  res.json({products, latestProducts}); 
});


app.get('/category', (req, res) => {
  const category = req.query.category;
  console.log("category" + category);
  let data = getProducts();
  data = data.filter(item => item.category === category);

  res.json({data});
});


app.get('/search', (req, res) => {
  const search = req.query.search;

  let data = getProducts();
  data = data.filter(item => item.description.includes(search) || item.productName.includes(search));

  res.json({data});
});


app.get('/product', (req, res) => {
  const id = req.query.id;
  let data = getProducts();
  
  data = data.filter(item => item.id == id);

  res.json({ data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});