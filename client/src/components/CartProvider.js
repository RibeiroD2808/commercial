// context/CartContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { postData } from '../scripts/serverCalls';
import getCookie from '../scripts/getCookie';

const CartContext = createContext();

// if theres no cookie for the cart, start with an empty array
const initialCart = getCookie('cart') ?? {
  products: [],
  quantities: []
};

const reducer = (cart, action) => {
  
  //search for the index
  const index = cart.products.map(e => e.id).indexOf(action.payload.id);
  switch (action.type) {
    case 'ADD':

      //if dont have
      if(index == -1){
        return { ...cart, 
          products: [...cart.products, action.payload],
          quantities: [...cart.quantities, 1] };
      }else{

        //update product quantity
        const updatedQuantities = [...cart.quantities];
        updatedQuantities[index] += 1;

        return { 
            ...cart,
            quantities:updatedQuantities,
        };
      }
    case 'UPDATE':
      return action.payload
    case 'DELETE':
      if( cart.quantities[index] == 1){ //if quantity is one, remove item
        const updatedProducts = cart.products.filter(product => product.id !== action.payload.id);
        const updatedQuantities = cart.quantities.filter((_, i) => i !== index);

        return {
          ...cart,
          products: updatedProducts,
          quantities: updatedQuantities,
        };
      } else {
        //if the quantity is more than 1, decrement the quantity
        const updatedQuantities = [...cart.quantities];
        updatedQuantities[index] -= 1;
    
        return {
          ...cart,
          quantities: updatedQuantities,
        };
      }
    default:
      return cart;
  }
};


export function CartProvider({ children }) {

  //cart list  
  const [cart, dispatch] = useReducer(reducer, initialCart);

  useEffect(() => {
    const updateSessionCart = async () => {
      try {
        const response = await postData('/update-cart', {cart});

      } catch (error) {
        console.error('Error updating session cart:', error);
      }
    };

    updateSessionCart();
  }, [cart]);


  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}

