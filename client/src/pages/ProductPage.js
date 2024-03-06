import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';
import Gallery from '../components/Gallery.js';
import '../style/productPage.css';
import '../style/gallery.css';

function ProductPage(){

    const id = new URLSearchParams(useLocation().search).get('id');
    const endpoint = '/product?id=' + id;
    const [data, setData] = useState([]);

    //get data from api using fetchDataAndSetState function inside serverCalls file
    useEffect(() => {
        async function fetchDataAndSetState() {
      
          const data =  await fetchData(endpoint);
          setData(data.data.data[0]);
        }

      fetchDataAndSetState(); // call the function inside useEffect
    }, []);

    const displayContent = data ? (
      <>
        <Header />
        <div id="productPageDiv">
          <h2>{data.productName}</h2>
          <Gallery images={data.images}/>
          <p>{data.category}</p>
          <p>{data.description}</p>
          <p>{data.brand}</p>
          <p>{data.price}</p>
        </div>
      </>
      ) : null;
  
  
      return displayContent;
};

export default ProductPage;