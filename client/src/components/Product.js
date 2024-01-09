import React, { useEffect, useState } from 'react';

function Product( {product} ){

    const displayContent = (
        <div className='productDiv'>
            <p>{product.productName}</p>
            <p>{product.brand}</p>
            <p>{product.price}</p>
        </div>
    );

    return displayContent;
}

export default Product;