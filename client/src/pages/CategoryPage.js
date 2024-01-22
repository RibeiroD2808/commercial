import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';
import Product from '../components/Product.js';

function CategoryPage(){
  
  const category = new URLSearchParams(useLocation().search).get('category');
  let endpoint = '/category?category=' + category;
  const [data, setData] = useState([]);

  //filters
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [brand, setBrand] = useState();


  if (priceMin !== undefined) {
    endpoint += `&priceMin=${priceMin}`;
  }
  
  if (priceMax !== undefined) {
    endpoint += `&priceMax=${priceMax}`;
  }
  
  if (brand !== undefined) {
    endpoint += `&brand=${brand}`;
  }

  //get data from api using fetchDataAndSetState function inside serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      
      const data =  await fetchData(endpoint);
      setData(data.data.data);
      
      const countsObject = data.data.data.reduce((acc, item) => {
        // Assuming 'brand' is a property of each item in your data
        const brand = item.brand;
      
        // Increment count for the brand or initialize to 1 if it doesn't exist
        acc[brand] = (acc[brand] || 0) + 1;
        
        return acc;
      }, {});
    }
    
    fetchDataAndSetState(); // call the function inside useEffect
  }, [endpoint]);

  const displayContent = data ? (
    <>
      <Header />
      <div id="filterDiv">

      </div>
      <div id="categoryDiv">
        <h1>{category}</h1>
        <ul className='productsUl'>
          {data.map((item) => (
            <Product key={item.id} product={item}></Product>              
          ))}
        </ul>
      </div>
    </>
  ) : null;


  return displayContent;
};

export default CategoryPage;