import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/serverCalls'; // Adjust the path accordingly
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const endpoint = '/';
  
  //get data from api using fetchDataAndSetState function inside serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      
      const data = await fetchData(endpoint);
      setData(data.products);
    }

    fetchDataAndSetState(); // Call the function inside useEffect
  }, []); // Empty dependency array to run the effect only once

    const displayContent = data ? (
      
      <div id="homeDiv">
        <h1>Home</h1>
        <div id="categoriesDiv">
          <div id='kitchenUtensilsDiv'>Kitchen Utensils </div>  
          <div id='hygieneCleaningDiv'> Hygiene and Cleaning</div>  
          <div id='packagingDiv'> <Link to="/packaging">Packaging</Link> </div>  
        </div>        
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.category}</li>
          ))}
        </ul>
      </div>
      
    ) : null;


    return displayContent;
};

export default Home;
