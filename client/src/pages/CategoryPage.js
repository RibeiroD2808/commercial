import React, { useEffect, useRef, useState } from 'react';
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
  const [priceRange, setPriceRange] = useState({min: undefined, max: undefined});
  const [startPriceRange, setStartPriceRange] = useState({min: undefined, max: undefined});
  const [firstRender, setFirstRender] = useState(true); 

  //brand list {brand {count, selected}}
  const [brandsList, setBrandsList] = useState();
  
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() =>{
    let newEndPoint = '/category?category=' + category;
    
    if (priceRange.min !== undefined) {
      newEndPoint += '&minPrice=' + priceRange.min;
    }
    if (priceRange.max !== undefined) {
      newEndPoint += '&maxPrice=' + priceRange.max;
    }
    if(brandsList !== undefined){
      Object.entries(brandsList).map(([brand, {count, selected}]) => {
        if(selected == true){
          newEndPoint += '&brand=' + brand;
        }
      })
    }

    setEndPoint(newEndPoint);
  }, [priceRange, brandsList]); //update every time some filter change
  

  //get data from api using fetchDataAndSetState function on serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      const response =  await fetchData(endpoint);
      setData(response.data.data);
      
      if(firstRender){
        // create an array with brands and their respective counters.
        setBrandsList( response.data.data.reduce((acc, item) => {
          
          const brand = item.brand;
          
          //increment count for the brand or initialize to 1 if it doesn't exist
          acc[brand] = { count: (acc[brand] ? acc[brand].count + 1 : 1), selected: false};
          return acc;
        }, {}))
        setFirstRender(false);
        
        const prices = response.data.data.map(item => item.price);

        //get the minimum and maximum price 
        
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setStartPriceRange({ min: minPrice, max: maxPrice });
        setPriceRange({ min: minPrice, max: maxPrice });
      }
    }
    
    fetchDataAndSetState(); // call the function inside useEffect
  }, [endpoint]);

  const handleBrandCheckboxChange = (selectedBrand) => {
    setBrandsList((prevBrandsList) => {
      return {
        ...prevBrandsList,
        [selectedBrand]: {
          ...prevBrandsList[selectedBrand],
          selected: !prevBrandsList[selectedBrand].selected,
        },
      };
    });
  };

  const handleResetButton = () => {
    setPriceRange(startPriceRange); 
    setBrandsList((prevBrandsList) => {
      // Reset the selected property for all brands
      const updatedBrandsList = { ...prevBrandsList };
      Object.keys(updatedBrandsList).forEach((brand) => {
        updatedBrandsList[brand].selected = false;
      });
      return updatedBrandsList;
    });
    };

  const displayContent = data ? (
    <>
      <Header />
      <div id="categoryDiv">
        <h1>{category}</h1>
        { startPriceRange && startPriceRange.min !== undefined && startPriceRange.max !== undefined ?  
          <div id="filterDiv">
            <DualSlider
              startPrice= {startPriceRange}
              value={priceRange} 
              setValue={(min, max) => setPriceRange({ min, max })}
            />
            <div>
              <button onClick={() => setDropdownVisible(!dropdownVisible)}>Brands</button>
              <div>
                {dropdownVisible && Object.entries(brandsList).map(([brand, {count, selected}]) => (
                  <label key={brand}>
                    <input type='checkbox' value={brand} checked={selected} onChange={() => handleBrandCheckboxChange(brand)}></input>{brand} ({count})
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleResetButton}>X</button> 
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