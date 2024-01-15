import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header.js';
import { useCart } from '../components/CartProvider.js';
import Product from '../components/Product.js';

function CartPage(){

  const { cart } = useCart();

  const displayContent =  (
    <>
      <Header />
      <ul >
            {cart.map((item) => (
              <li key={item[0].id}>
                <p>{item[0].id}</p>
                <p>{item[0].productName}</p>
                <p>        |  {item[1]}</p>
              </li>
            ))}
        </ul>
    </>
  )

  return displayContent;
}

export default CartPage;