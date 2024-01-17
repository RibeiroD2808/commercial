import React, { useEffect, usecart } from 'react'; 
import Header from '../components/Header.js';
import { useCart } from '../components/CartProvider.js';
import Product from '../components/Product.js';
import getCookie from '../scripts/getCookie.js';

function CartPage(){


  const { cart } = useCart();
  const displayContent =  (
    <>
      <Header />
      {<ul >
            {cart.products.map((product, index) => (
              <li key={product.id}>
              <p>ID: {product.id}</p>
              <p>Name: {product.productName}</p>
              <p>Quantity: {cart.quantities[index]}</p>
            </li>
            ))}
        </ul>}
        {}
    </>
  )

  return displayContent;
}

export default CartPage;