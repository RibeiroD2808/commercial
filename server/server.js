const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { getProducts, getUsers } = require('./data.js');
const bodyParser = require('body-parser');

const app = express();
const port = 8000; 

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client-side URL
  credentials: true,
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    name: 'your-custom-cookie-name',
    cookie: {
      domain: 'localhost',
      sameSite: 'None',
      secure: true, // Set to true for HTTPS
      maxAge: 86400000,
      httpOnly: true,
    },
  })
);


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
  
  const id  = req.query.id;
  
  let data = getProducts();
  data = data.filter(item => item.id == id);
  console.log("safasf",data);
  res.json({ data });
});

app.post('/login', (req, res) => {
  
  const { username, password } = req.body;
  //NOW IS LOG IN EVERY TIME
  res.status(200).send('Login successful');
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

app.post('/update-cart', (req, res) => {

  const { cart } = req.body;

  // Initialize the cart in the session if it doesn't exist
  req.session.cart = req.session.cart || [];

  // Add the item to the cart
  req.session.cart = cart;
  console.log('Session:', req.session);
  res.json({ success: true, cart: req.session.cart });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});