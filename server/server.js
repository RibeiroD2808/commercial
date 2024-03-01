const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { getProducts, getUsers, getSessions, setSession, deleteSession, setUsers, getBannerImg } = require('./data.js');
const bodyParser = require('body-parser');

const app = express();
const port = 8000; 

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client-side URL
  credentials: true,
}));
    
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function generateRandomSessionId(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sessionId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionId += characters.charAt(randomIndex);
  }

  return sessionId;
}



app.get('/', (req, res) => {
  const products = getProducts();
  const banners = getBannerImg();
  const sessionId = req.headers['sessionId']; 

  let userName = '';
  if(sessionId){
    console.log("/", getSessions());
    const user = getSessions().find(session => session.sessionId === sessionId);
    console.log("userId:", user);
    userName = (getUsers().find(item => item.id === user.userId)).username;
    console.log(userName);
  
  }

  //sort array by addedDate
  let latestProducts = products.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));  
  latestProducts = latestProducts.slice(0,7);
  
  res.json({products, latestProducts, userName, banners }); 
});

app.get('/category', (req, res) => {
  const category = req.query.category;
  const priceMin = req.query.minPrice;
  const priceMax = req.query.maxPrice;

  const brands = Array.isArray(req.query.brand) ? req.query.brand : [req.query.brand];
  console.log(brands);
  
  let data = getProducts();

  data = data.filter(item => {

    const isCategoryMatch = item.category === category;
    
    //check if priceMin and priceMax are defined, and if so, filter based on the price range
    const isPriceInRange =
      (priceMin === undefined || item.price >= priceMin) &&
      (priceMax === undefined || item.price <= priceMax);
    
    const brandFilter = brands && brands[0] == undefined ? true : brands.some((brand) => item.brand === brand);
    
    console.log(item.productName);
    console.log("               price", isPriceInRange);
    console.log("                                       brand",brands.some((brand) => item.brand === brand));
    //return true only if both category and price conditions are met
    return isCategoryMatch && isPriceInRange && brandFilter;
  });
  console.log(data);
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

  res.json({ data });
});

app.post('/login', (req, res) => {
  
  const { username, password } = req.body;
  user = getUsers().find(item => item.username === username);
  
  //if dont find by user try by email
  if(!user)
    user = getUsers().find(item => item.email === username);

  //if dont have any match for the email or username
  if(!user){
    res.status(401).send('User Not Found');
  }else if(user.password != password){
    res.status(401).send('Wrong Password');
  }else{
    //NEED TO SAVE THIS ON DATA BASE
    const randomSessionId = generateRandomSessionId();
    console.log(getSessions());
    
    res.cookie('sessionId', randomSessionId, { maxAge: 3600000, path: '/', domain: 'localhost'}); //randomSessionId, { maxAge: 3600000 }); // Cookie expires in 1 hour
    //saved on file data.js need to be saved on data base early
    setSession({ userId:user.id, sessionId:randomSessionId});
    console.log(getSessions());
    res.status(200).send('Login successful');
  }


  //NOW LOG IN EVERY TIME
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  //use query to check if database already have a user with this name
  console.log("register", username, email, password);
  const users = getUsers();
  
  //check if user with the given username already exists
  let existingUserByUsername = users.find(item => item.username === username);

  //check if a user with the given email already exists
  let existingUserByEmail = users.find(item => item.email === email);

  if (existingUserByUsername || existingUserByEmail) {
    //a user with the given username or email already exists
    res.status(409  ).send('Login successful');
    console.log("already used");
  } else {


    //add new user
    setUsers({username: username, email: email, password: password });
    const user = getUsers().find(item => item.username === username);

    if (!user) {
      res.status(500).send('Internal Server Error');
      return;
    }

    //generate a random session ID and save it to the session
    const randomSessionId = generateRandomSessionId();
    setSession({ userId: user.id, sessionId: randomSessionId });

    
    res.cookie('sessionId', randomSessionId, { maxAge: 3600000, path: '/', domain: 'localhost' });
    
    
    res.status(200).send('Registration and login successful');
  }

});

app.post('/update-cart', (req, res) => {

  const { cart } = req.body;

  // Set the updated cart in the cookie
  res.cookie('cart', cart, { maxAge: 3600000 }); // Cookie expires in 1 hour
  
  res.json({ success: true, cart }); 
});

app.post('/logout', function(req, res) {
  console.log("logOut");
  const { sessionId } = req.body;
  deleteSession(sessionId);
  console.log(getSessions());

});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});