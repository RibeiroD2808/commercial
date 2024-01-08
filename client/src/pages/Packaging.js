import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/serverCalls'; // Adjust the path accordingly

function Packaging(){

    const [data, setData] = useState([]);
    const endpoint = '/packaging?category=packaging';
    
        
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
          <h1>safsafas</h1>

          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.category}</li>
            ))}
          </ul>
        </div>
        
      ) : null;
  
  
      return displayContent;
};

export default Packaging;