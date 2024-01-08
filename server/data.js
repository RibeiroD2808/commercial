const products = [
  {
    productId: 1,
    category: 'Kitchen Utensils',
    productName: 'ErgoGrip Precision Knife Set',
    brand: 'ErgoChef',
    description: 'Professional-grade knives with ergonomic handles for precision chopping and slicing.',
    price: 49.99,
    quantity: 100
  },
  {
    productId: 2,
    category: 'Kitchen Utensils',
    productName: 'Silicone Flexi-Whisk',
    brand: 'FlexiMix',
    description: 'Versatile and flexible silicone whisk that adapts to the shape of your bowls for efficient mixing.',
    price: 14.99,
    quantity: 150
  },
  {
    productId: 3,
    category: 'Kitchen Utensils',
    productName: 'Bamboo Fiber Cutting Boards Trio',
    brand: 'GreenChop',
    description: 'Eco-friendly cutting boards made from bamboo fiber, designed for specific food groups to prevent cross-contamination.',
    price: 29.99,
    quantity: 75
  },
  {
    productId: 4,
    category: 'Kitchen Utensils',
    productName: 'Collapsible Silicone Colander',
    brand: 'FlexiStore',
    description: 'Space-saving colander made from durable and heat-resistant silicone.',
    price: 19.99,
    quantity: 120
  },
  {
    productId: 5,
    category: 'Kitchen Utensils',
    productName: 'Chef\'s Delight Spice Rack Carousel',
    brand: 'SpiceMaster',
    description: 'Stylish rotating spice rack with labeled jars, ensuring easy access to your favorite spices while cooking.',
    price: 39.99,
    quantity: 90
  },
  {
    productId: 6,
    category: 'Hygiene and Cleaning',
    productName: 'GermGuard Antibacterial Soap Dispenser',
    brand: 'CleanTech',
    description: 'Touchless soap dispenser with antibacterial technology, promoting hygiene in the bathroom or kitchen.',
    price: 29.99,
    quantity: 200
  },
  {
    productId: 7,
    category: 'Hygiene and Cleaning',
    productName: 'Microfiber Magic Cleaning Cloths',
    brand: 'CleanSwipe',
    description: 'Ultra-absorbent and lint-free microfiber cloths for streak-free cleaning on various surfaces.',
    price: 12.99,
    quantity: 300
  },
  {
    productId: 8,
    category: 'Hygiene and Cleaning',
    productName: 'AutoFresh Toilet Bowl Deodorizer',
    brand: 'FreshScent',
    description: 'Discreet and long-lasting toilet bowl deodorizer that releases a pleasant fragrance with every flush.',
    price: 8.99,
    quantity: 150
  },
  {
    productId: 9,
    category: 'Hygiene and Cleaning',
    productName: 'EcoClean All-Purpose Natural Cleaner',
    brand: 'GreenClean',
    description: 'Environmentally friendly and multi-surface cleaner with a refreshing citrus scent.',
    price: 16.99,
    quantity: 100
  },
  {
    productId: 10,
    category: 'Hygiene and Cleaning',
    productName: 'NoStain Carpet and Upholstery Cleaner',
    brand: 'StainAway',
    description: 'Powerful stain remover specifically formulated for carpets and upholstery.',
    price: 19.99,
    quantity: 80
  },
  {
    productId: 11,
    category: 'Packaging',
    productName: 'EcoWrap Sustainable Gift Wrap Set',
    brand: 'EcoGift',
    description: 'Recyclable and eco-friendly gift wraps, perfect for all occasions.',
    price: 7.99,
    quantity: 150
  },
  {
    productId: 12,
    category: 'Packaging',
    productName: 'FreshSeal Food Storage Containers',
    brand: 'FreshLock',
    description: 'Airtight food storage containers designed to keep your ingredients fresh for longer.',
    price: 24.99,
    quantity: 120
  },
  {
    productId: 13,
    category: 'Packaging',
    productName: 'QuickZip Ziplock Bags Variety Pack',
    brand: 'ZipFresh',
    description: 'Durable and reusable ziplock bags in various sizes, perfect for storing snacks, fruits, and leftovers.',
    price: 11.99,
    quantity: 200
  },
  {
    productId: 14,
    category: 'Packaging',
    productName: 'BubbleGuard Fragile Item Packaging',
    brand: 'SafeShip',
    description: 'Protective bubble wrap with a fragile item indicator, ensuring safe shipping of delicate items.',
    price: 6.99,
    quantity: 300
  },
  {
    productId: 15,
    category: 'Packaging',
    productName: 'KraftWave Biodegradable Takeout Containers',
    brand: 'EcoToGo',
    description: 'Sustainable takeout containers made from biodegradable kraft paper.',
    price: 16.99,
    quantity: 100
  }
];
  module.exports = {
    getProducts: () => products,
  };