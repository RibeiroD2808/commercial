import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function SearchBar (){

    const [search, setSearch] = useState("");

    function handleChange(event){
        setSearch(event.target.value); 
    }

    function handleOnClick(event){
        event.preventDefault();
        console.log(search);
    }

    const displayContent = (
        <form onSubmit={handleOnClick}>
            <input onChange={handleChange} value={search} placeholder='What do you search?' name='search'></input>
            <Link to={`/search?search=${search}`}>
                <button type='submit'>Search</button>
            </Link>
        </form>
    );

    return displayContent;
}

export default SearchBar;