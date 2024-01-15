import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header.js';
import { useCart } from '../components/CartProvider.js';

function CartPage(){

  const { cart } = useCart();

  const displayContent =  (
    <>
      <Header />
      {cart.length}
    </>
  )
  
  return displayContent;
}

export default CartPage;