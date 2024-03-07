import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header.js';
import Gallery from '../components/Gallery.js';
import Footer from '../components/Footer';
import { useCart } from '../components/CartProvider';
import '../style/productPage.css';
import '../style/gallery.css';

function ProductPage(){

    const id = new URLSearchParams(useLocation().search).get('id');
    const endpoint = '/product?id=' + id;
    const [data, setData] = useState([]);

    const { dispatch  } = useCart();

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
          <div id='productPageGallery'>
            <Gallery images={data.images}/>
          </div>
          <div id='productPageDesc'>
            <h2>{data.productName}</h2>
            <p>{data.category}</p>
            <p>{data.description}</p>
            <p>{data.brand}</p>
            <p>{data.price}</p>
            <button id='addButtonProduct' onClick={() => dispatch({ type: 'ADD', payload: data })}>Add</button>
          </div>
        </div>
        <Footer />
      </>
      ) : null;
  
  
      return displayContent;
};

export default ProductPage;