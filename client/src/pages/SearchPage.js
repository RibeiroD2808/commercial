import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header';
import Filter from '../components/Filter.js';

function SearchPage (){

    const search = new URLSearchParams(useLocation().search).get('search');
    const endpoint = '/search?search=' + search;
    
    const [data, setData] = useState([]);

    //get data from api using fetchDataAndSetState function inside serverCalls file
    useEffect(() => {
        async function fetchDataAndSetState() {
      
          const data =  await fetchData(endpoint);
          setData(data.data.data);
        }

      fetchDataAndSetState(); // call the function inside useEffect
    }, [search]);

    const displayContent =(
        <>  
          <Header />
          { data && data.length > 0 ? (
            <Filter startData ={data}/>
          ): null}
        </>
    )

    return displayContent;
}

export default SearchPage;