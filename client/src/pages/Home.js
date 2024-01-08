import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/serverCalls'; // Adjust the path accordingly

function Home() {
  const [data, setData] = useState([]);
  const endpoint = '/api/data';
  
  //get data from api using fetchDataAndSetState function inside serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      
      const products = await fetchData(endpoint);
      setData(products);
    }

    fetchDataAndSetState(); // Call the function inside useEffect
  }, []); // Empty dependency array to run the effect only once

    const displayContent = data ? (
      <div className="App">
        <h1>Home</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    ) : null;


    return displayContent;
};

export default Home;
