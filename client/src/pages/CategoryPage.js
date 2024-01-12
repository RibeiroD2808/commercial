import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';
import Product from '../components/Product.js';

function CategoryPage(){

    
    const category = new URLSearchParams(useLocation().search).get('category');
    const endpoint = '/category?category=' + category;
    const [data, setData] = useState([]);

    //get data from api using fetchDataAndSetState function inside serverCalls file
    useEffect(() => {
        async function fetchDataAndSetState() {
      
          const data =  await fetchData(endpoint);
          setData(data.data);
        }
        
      fetchDataAndSetState(); // call the function inside useEffect
    }, [endpoint]);

    const displayContent = data ? (
      <>
        <Header />
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