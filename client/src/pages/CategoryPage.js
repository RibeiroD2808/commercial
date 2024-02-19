import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';
import Product from '../components/Product.js';
import Filter from '../components/Filter.js';

function CategoryPage(){
  
  const category = new URLSearchParams(useLocation().search).get('category');
  
  const [endpoint, setEndPoint] = useState('/category?category=' + category);
  const [data, setData] = useState([]);
  const key = useRef(0);

  //get data from api using fetchDataAndSetState function on serverCalls file
  useEffect(() => {
    setEndPoint('/category?category=' + category);
    (async () => {
      const response = await fetchData(endpoint);
      setData(response.data.data);
      
    })();
    key.current ++;
    console.log("key",key, data);
  }, [endpoint, category]);

  const displayContent = (
    <>
      <Header />
      <div id="categoryDiv">
        <h1>{category}</h1>
        { data && data.length > 0 ? (
            <Filter startData ={data} key={key}/>
          ): null}
      </div>
    </>
  ); 

  return displayContent;
};

export default CategoryPage;