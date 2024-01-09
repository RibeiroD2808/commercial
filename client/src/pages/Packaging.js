import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/serverCalls'; 
import '../style/main.css';
import '../components/Header';
import Header from '../components/Header.js';

function Packaging(){

    const [data, setData] = useState([]);
    const endpoint = '/packaging?category=packaging';
    
        
    //get data from api using fetchDataAndSetState function inside serverCalls file
    useEffect(() => {
        async function fetchDataAndSetState() {
      
          const data =  await fetchData(endpoint);
          setData(data.data);
        }

      fetchDataAndSetState(); // call the function inside useEffect
    }, []);

    console.log(data);  
    const displayContent = data ? (
      <>
        <Header />
        <div id="packagingDiv">
          <h1>Packaging</h1>

          <ul className='productsUl'>
            {data.map((item) => (
              <li key={item.productId}>
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

export default Packaging;