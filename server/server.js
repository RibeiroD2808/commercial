const express = require('express');
const cors = require('cors');
const { getProducts, getUsers } = require('./data.js');
const bodyParser = require('body-parser');

const app = express();
const port = 8000; 

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

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
  
  const { id } = req.body;
  let data = getProducts();
  
  data = data.filter(item => item.id == id);

  res.json({ data });
});

app.post('/login', (req, res) => {
  
  const { username, password } = req.body;
  console.log('Received login data:', { username, password });
  console.log(getUsers());
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  //use query to check if database already have a user with this name

  const users = getUsers();
  const existingUser = users.find(item => item.username === username);

  if (existingUser !== undefined) {
    //a user with the given username already exists
    res.json({ success: true, message: 'Already Used' });
  } else {
    res.json({ success: true, message: 'Success' });
  }
});







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});