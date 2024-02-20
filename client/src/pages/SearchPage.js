import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../scripts/serverCalls.js'; 
import Header from '../components/Header';
import Filter from '../components/Filter.js';

function SearchPage (){

    const search = new URLSearchParams(useLocation().search).get('search');
    const endpoint = '/search?search=' + search;
    const countData = useRef(0);

    const [data, setData] = useState([]);

    //get data from api using fetchDataAndSetState function inside serverCalls file
    useEffect(() => {
        async function fetchDataAndSetState() {
      
          const data =  await fetchData(endpoint);
          setData(data.data.data);
          console.log(data.data.data.length);
        }

      fetchDataAndSetState(); // call the function inside useEffect
    }, [search]);

    const displayContent =(
        <>  
          <Header />
          { data && data.length > 0 ? (
            <>
              <p>{data.length} results for  “{search}”</p>
              <Filter startData ={data}/>
            </>
          ): <p>0 results for  “{search}”</p>}
        </>
    )

    return displayContent;
}

export default SearchPage;