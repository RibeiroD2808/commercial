const hygieneProducts = [
    {
      "id": 1,
      "name": "Antibacterial Hand Soap",
      "category": "Hand Care",
      "brand": "CleanHands",
      "price": 4.99,
      "quantity": 200
    },
    {
      "id": 2,
      "name": "Fluoride Toothpaste",
      "category": "Oral Care",
      "brand": "BrightSmile",
      "price": 2.99,
      "quantity": 150
    },
    {
      "id": 3,
      "name": "Alcohol-Free Mouthwash",
      "category": "Oral Care",
      "brand": "FreshBreath",
      "price": 6.49,
      "quantity": 100
    },
    {
      "id": 4,
      "name": "Moisturizing Body Wash",
      "category": "Body Care",
      "brand": "SilkySkin",
      "price": 8.99,
      "quantity": 120
    },
    {
      "id": 5,
      "name": "Dandruff Control Shampoo",
      "category": "Hair Care",
      "brand": "HealthyLocks",
      "price": 5.79,
      "quantity": 80
    },
    {
      "id": 6,
      "name": "Sensitive Skin Deodorant",
      "category": "Deodorant",
      "brand": "GentleCare",
      "price": 3.49,
      "quantity": 180
    },
    {
      "id": 7,
      "name": "Feminine Hygiene Wipes",
      "category": "Feminine Care",
      "brand": "PureComfort",
      "price": 4.29,
      "quantity": 150
    },
    {
      "id": 8,
      "name": "Facial Cleansing Wipes",
      "category": "Facial Care",
      "brand": "FreshFace",
      "price": 7.99,
      "quantity": 100
    },
    {
      "id": 9,
      "name": "Soothing Aloe Vera Gel",
      "category": "Skin Care",
      "brand": "AloeSoothe",
      "price": 6.99,
      "quantity": 130
    },
    {
      "id": 10,
      "name": "Disposable Razors",
      "category": "Shaving",
      "brand": "SmoothShave",
      "price": 9.49,
      "quantity": 90,
      "features": ["Triple Blade", "Moisture Strip"]
    }
  ]
  
  module.exports = {
    getHygieneProducts: () => hygieneProducts,
  };