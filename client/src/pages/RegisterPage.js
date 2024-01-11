import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Product( {product} ){

    const displayContent = (
        <>
            <Header />
            <form>
                <input placeholder='asf'></input> 
                <input placeholder='asf'></input> 
                <input placeholder='asf'></input> 
                <button type='submit'></button>
            </form>
        </>
    );

    return displayContent;
}

export default Product;