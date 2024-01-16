import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header.js';
import { useCart } from '../components/CartProvider.js';
import Product from '../components/Product.js';

function CartPage(){

  const { state } = useCart();
  const displayContent =  (
    <>
      <Header />
      {<ul >
            {state.products.map((product, index) => (
              <li key={product.id}>
              <p>ID: {product.id}</p>
              <p>Name: {product.productName}</p>
              <p>Quantity: {state.quantities[index]}</p>
            </li>
            ))}
        </ul>}
    </>
  )

  return displayContent;
}

export default CartPage;