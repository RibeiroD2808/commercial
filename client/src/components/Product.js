import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartProvider';


function Product( {product} ){
    
    
    const { dispatch  } = useCart();

    const displayContent = (
        <li className='productDiv' key={product.id}>
            <Link to={"/product?id=" + product.id} >
                <img alt="Your Image" src={'img/' + product.images[0]} />
                <div className='productDescription'>
                    <p className='productId'>#{product.id}</p>
                    <p className='productName'>{product.productName}</p>
                    <p className='productBrand'>{product.brand}</p>
                    <p className='productPrice'>{product.price} €</p>
                </div>
            </Link>
            <button id='addButtonProduct' onClick={() => dispatch({ type: 'ADD', payload: product })}>Add</button>
        </li>
    );

    return displayContent;
}

export default Product;