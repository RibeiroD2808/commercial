import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/serverCalls'; 
import { Link } from 'react-router-dom';
import Product from '../components/Product';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const endpoint = '/';
  
  //get data from api using fetchDataAndSetState function inside serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      
      const data = await fetchData(endpoint);
      setLatestProducts(data.latestProducts);
    }

    fetchDataAndSetState(); // call the function inside useEffect
  }, []); 

    const displayContent = latestProducts ? (
      
      <div id="homeDiv">
        <h1>Home</h1>
        <div id="categoriesDiv">
          <div id='kitchenUtensilsDiv'>Kitchen Utensils </div>  
          <div id='hygieneCleaningDiv'> Hygiene and Cleaning</div>  
          <div id='packagingDiv'> <Link to="/packaging">Packaging</Link> </div>  
        </div>
        <div id='latestProductsDiv'>
          <ul className='productsUl'>
            {latestProducts.map((item) => (
              <li key={item.productId}>
                <Product product = {item}/>
              </li>
            ))}
          </ul>
        </div>        
      </div>
      
    ) : null;


    return displayContent;
};

export default Home;
