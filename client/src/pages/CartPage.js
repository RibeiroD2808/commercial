import React, { useEffect, useState, usecart } from 'react'; 
import Header from '../components/Header.js';
import { useCart } from '../components/CartProvider.js';
import Product from '../components/Product.js';
import getCookie from '../scripts/getCookie.js';
import '../style/cartPage.css';

function CartPage(){

  const { cart, dispatch } = useCart();
  
  const sum = cart.products.reduce((acc, product, index) => acc + (product.price * cart.quantities[index]), 0).toFixed(2);

  const displayContent =  (
    <>
      <Header />
      <ul >
        {cart.products.map((product, index) => (
          <li key={product.id}>
            <p>ID: {product.id}</p>
            <p>Name: {product.productName}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {cart.quantities[index]}</p>
            <button onClick={() => dispatch({ type: 'ADD', payload: product })}>+</button>
            <button onClick={() => dispatch({ type: 'DELETE', payload: product })}>-</button>
          </li>
        ))}
      </ul>
      <p id='cartPageTotal'>TOTAL: {sum}</p>
      </>
  )

  return displayContent;
}

export default CartPage;