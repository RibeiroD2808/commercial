const session = require("express-session");

const products = [
  {
    id: 1,
    category: 'Kitchen Utensils',
    productName: 'ErgoGrip Precision Knife Set',
    brand: 'ErgoChef',
    description: 'Professional-grade knives with ergonomic handles for precision chopping and slicing.',
    price: 49.99,
    quantity: 100,
    addedDate: '2023-05-15',
    images: ['0700400.png', '0700623.png']
  },
  {
    id: 2,
    category: 'Kitchen Utensils',
    productName: 'Silicone Flexi-Whisk',
    brand: 'FlexiMix',
    description: 'Versatile and flexible silicone whisk that adapts to the shape of your bowls for efficient mixing.',
    price: 14.99,
    quantity: 150,
    addedDate: '2023-07-22',
    images: ['0700623.png'] 
  },
  {
    id: 3,
    category: 'Kitchen Utensils',
    productName: 'Bamboo Fiber Cutting Boards Trio',
    brand: 'GreenChop',
    description: 'Eco-friendly cutting boards made from bamboo fiber, designed for specific food groups to prevent cross-contamination.',
    price: 29.99,
    quantity: 75,
    addedDate: '2023-04-10',
    images: ['0700627.png', '0700400.png'] 
  },
  {
    id: 4,
    category: 'Kitchen Utensils',
    productName: 'Collapsible Silicone Colander',
    brand: 'FlexiStore',
    description: 'Space-saving colander made from durable and heat-resistant silicone.',
    price: 19.99,
    quantity: 120,
    addedDate: '2023-08-05',
    images: ['0700400.png', '0700623.png', '0700627.png'] 
  },
  {
    id: 5,
    category: 'Kitchen Utensils',
    productName: 'Chef\'s Delight Spice Rack Carousel',
    brand: 'SpiceMaster',
    description: 'Stylish rotating spice rack with labeled jars, ensuring easy access to your favorite spices while cooking.',
    price: 39.99,
    quantity: 90,
    addedDate: '2023-06-18',
    images: ['0700400.png']
  },
  {
    id: 6,
    category: 'Hygiene and Cleaning',
    productName: 'GermGuard Antibacterial Soap Dispenser',
    brand: 'CleanTech',
    description: 'Touchless soap dispenser with antibacterial technology, promoting hygiene in the bathroom or kitchen.',
    price: 29.99,
    quantity: 200,
    addedDate: '2023-03-02',
    images: ['0700623.png', '0700627.png']
  },
  {
    id: 7,
    category: 'Hygiene and Cleaning',
    productName: 'Microfiber Magic Cleaning Cloths',
    brand: 'CleanTech',
    description: 'Ultra-absorbent and lint-free microfiber cloths for streak-free cleaning on various surfaces.',
    price: 12.99,
    quantity: 300,
    addedDate: '2023-09-14',
    images: ['0700627.png'] 
  },
  {
    id: 8,
    category: 'Hygiene and Cleaning',
    productName: 'AutoFresh Toilet Bowl Deodorizer',
    brand: 'FreshScent',
    description: 'Discreet and long-lasting toilet bowl deodorizer that releases a pleasant fragrance with every flush.',
    price: 8.99,
    quantity: 150,
    addedDate: '2023-01-25',
    images: ['0700400.png', '0700623.png'] 
  },
  {
    id: 9,
    category: 'Hygiene and Cleaning',
    productName: 'EcoClean All-Purpose Natural Cleaner',
    brand: 'GreenClean',
    description: 'Environmentally friendly and multi-surface cleaner with a refreshing citrus scent.',
    price: 16.99,
    quantity: 100,
    addedDate: '2023-11-30',
    images: ['0700400.png', '0700623.png', '0700627.png']
  },
  {
    id: 10,
    category: 'Hygiene and Cleaning',
    productName: 'NoStain Carpet and Upholstery Cleaner',
    brand: 'StainAway',
    description: 'Powerful stain remover specifically formulated for carpets and upholstery.',
    price: 19.99,
    quantity: 80,
    addedDate: '2023-02-12',
    images: ['0700400.png', '0700627.png']
  },
  {
    id: 11,
    category: 'Packaging',
    productName: 'EcoWrap Sustainable Gift Wrap Set',
    brand: 'EcoGift',
    description: 'Recyclable and eco-friendly gift wraps, perfect for all occasions.',
    price: 7.99,
    quantity: 150,
    addedDate: '2023-10-20',
    images: ['0700623.png'] 
  },
  {
    id: 12,
    category: 'Packaging',
    productName: 'FreshSeal Food Storage Containers',
    brand: 'FreshLock',
    description: 'Airtight food storage containers designed to keep your ingredients fresh for longer.',
    price: 24.99,
    quantity: 120,
    addedDate: '2023-07-01',
    images: ['0700400.png', '0700627.png']
  },
  {
    id: 13,
    category: 'Packaging',
    productName: 'QuickZip Ziplock Bags Variety Pack',
    brand: 'ZipFresh',
    description: 'Durable and reusable ziplock bags in various sizes, perfect for storing snacks, fruits, and leftovers.',
    price: 11.99,
    quantity: 200,
    addedDate: '2023-05-08',
    images: ['0700400.png']
  },
  {
    id: 14,
    category: 'Packaging',
    productName: 'BubbleGuard Fragile Item Packaging',
    brand: 'SafeShip',
    description: 'Protective bubble wrap with a fragile item indicator, ensuring safe shipping of delicate items.',
    price: 6.99,
    quantity: 300,
    addedDate: '2023-12-05',
    images: ['0700623.png', '0700627.png'] 
  },
  {
    id: 15,
    category: 'Packaging',
    productName: 'KraftWave Biodegradable Takeout Containers',
    brand: 'EcoToGo',
    description: 'Sustainable takeout containers made from biodegradable kraft paper.',
    price: 16.99,
    quantity: 100,
    addedDate: '2023-04-28',
    images: ['0700627.png']
  }
];

const users = [
  { id: 0, username: 'user1', email: 'user1@email.com', password: '1' },
  { id: 1, username: 'user2', email: 'user2@email.com', password: '2' },
  { id: 2, username: 'user3', email: 'user3@email.com', password: '3' },
  { id: 3, username: 'user4', email: 'user4@email.com', password: '4' },
  { id: 4, username: 'user5', email: 'user5@email.com', password: '5' },
];

const bannerImg = [

  {url: 'img/banner1.png',},
  {url: 'img/banner2.png',},
  {url: 'img/banner3.png',},
  {url: 'img/banner4.png',},
];


const sessions = [
  { userId: 10, sessionId: 10},
  { userId:0, sessionId: 'ms4EubBCJ'}
]

function deleteSession(sessionId){
  const index = sessions.findIndex((session) => session.sessionId === sessionId);
  if (index !== -1) {
    sessions.splice(index, 1);
  }
}

function setUsers(userData) {
  const userId = Math.max(...users.map(user => user.id), 0) + 1;

  users.push({ id: userId, ...userData });
}

module.exports = {
  getProducts: () => products,
  getUsers: () => users,
  setUsers,
  getSessions: () => sessions,
  setSession: (sessionData) => {
    sessions.push(sessionData);
  },
  deleteSession,
  getBannerImg: () => bannerImg,
};
