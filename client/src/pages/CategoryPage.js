import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';

function PackagingPage(){

    
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
        <div id="packagingDiv">
          <h1>Packaging</h1>

          <ul className='productsUl'>
            {data.map((item) => (
              <li key={item.id}>
                  <div className='productDiv'>
                    <p>{item.productName}</p>
                    <p>{item.price}</p>
                    <p>{item.brand}</p>
                  </div>  
              </li>
            ))}
          </ul>
        </div>
      </>
      ) : null;
  
  
      return displayContent;
};

export default PackagingPage;