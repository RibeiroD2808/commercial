import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartProvider';

function Product( {product} ){
    
    
    const { cart, addToCart } = useCart();

    const displayContent = (
        <li className='productDiv' key={product.id}>
            <Link to={"/product?id=" + product.id} >
                <p>{product.productName}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
            </Link>
            <button onClick={() => addToCart(product)}>Add</button>
        </li>
    );

    return displayContent;
}

export default Product;