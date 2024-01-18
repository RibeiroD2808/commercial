import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/serverCalls'; 
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import '../style/main.css';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const endpoint = '/';
  
  //get data from api using fetchDataAndSetState function inside serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      
      const data = await fetchData(endpoint);
      setLatestProducts(data.data.latestProducts);

    }

    fetchDataAndSetState(); // call the function inside useEffect
  }, []); 

    const displayContent = latestProducts ? (
      <>
        <Header />
        <div id="homeDiv">
          <div id='latestProductsDiv'>
            <Carousel products={latestProducts} productsPerPage={4} />  
          </div>           
        </div>
      </>
    ) : null;

    return displayContent;
};

export default Home;
