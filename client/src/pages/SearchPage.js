import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header';

function SearchPage (){

    const search = new URLSearchParams(useLocation().search).get('search');
    const endpoint = '/search?search=' + search;
    
    const [data, setData] = useState([]);

    //get data from api using fetchDataAndSetState function inside serverCalls file
    useEffect(() => {
        async function fetchDataAndSetState() {
      
          const data =  await fetchData(endpoint);
          setData(data.data);
        }

      fetchDataAndSetState(); // call the function inside useEffect
    }, []);

    const displayContent = (
        <>
        <Header />
        {data ? 
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
        : null}
        </>
    );

    return displayContent;
}

export default SearchPage;