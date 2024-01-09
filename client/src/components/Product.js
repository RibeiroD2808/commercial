import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Product( {product} ){

    const displayContent = (
        <li className='productDiv' key={product.id}>
            <Link to={"/product?id=" + product.id} >
                <p>{product.productName}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
            </Link>
        </li>
    );

    return displayContent;
}

export default Product;