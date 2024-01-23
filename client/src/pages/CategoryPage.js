import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';
import Product from '../components/Product.js';
import DualSlider from '../components/DualSlider.js';

function CategoryPage(){
  
  const category = new URLSearchParams(useLocation().search).get('category');
  
  const [endpoint, setEndPoint] = useState('/category?category=' + category);
  const [data, setData] = useState([]);

  //filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [startPriceRange, setStartPriceRange] = useState([]);
  
  const [brand, setBrand] = useState("");
  const [brandsList, setBrandsList] = useState();

  useEffect(() =>{
    let newEndPoint = '/category?category=' + category;
    if (priceRange.min !== undefined) {
      newEndPoint += '&minPrice=' + priceRange.min;
    }
    if (priceRange.max !== undefined) {
      newEndPoint += '&maxPrice=' + priceRange.max;
    }
    
    if (brand !== undefined && brand !== "") {
      newEndPoint += '&brand=' + brand;
    }
    setEndPoint(newEndPoint);
  }, [priceRange, brand]); //update every time some filter change
  

  //get data from api using fetchDataAndSetState function on serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      const response =  await fetchData(endpoint);
      setData(response.data.data);
      
      // create an array with brands and their respective counters.
      setBrandsList( response.data.data.reduce((acc, item) => {
        
        const brand = item.brand;
        
        //increment count for the brand or initialize to 1 if it doesn't exist
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
      }, {}))
      
      const prices = response.data.data.map(item => item.price);
      
      //get the minimum and maximum price 
      
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setStartPriceRange({ min: minPrice, max: maxPrice });
      setPriceRange({ min: minPrice, max: maxPrice });
    }
    
    fetchDataAndSetState(); // call the function inside useEffect
  }, [endpoint]);

  const displayContent = data ? (
    <>
      <Header />
      <div id="categoryDiv">
        <h1>{category}</h1>
        { startPriceRange && startPriceRange.min !== undefined ?
          <div id="filterDiv">
            <DualSlider
              startPrice= {startPriceRange}
              value={priceRange} 
              setValue={(min, max) => setPriceRange({ min, max })}
            />
            <select id="brandsFilter" onChange={(e) => setBrand(e.target.value)} defaultValue="">
              <option value="" disabled hidden>Brands</option>
              {Object.entries(brandsList).map(([brand, count]) => (
                <option key={brand} value={brand}>
                  {brand} ({count})
                </option>
              ))}
            </select>
            
            {brand}
          </div> : null
        }
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