// context/CartContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { postData } from '../scripts/serverCalls';

const CartContext = createContext();

const initialCart = {
  products: [],
  quantities: []
};

const reducer = (cart, action) => {
  switch (action.type) {
    case 'ADD':
      //search for the index
      const index = cart.products.map(e => e.id).indexOf(action.payload.id);

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
      case 'REMOVE':
        //NEED TO ADD REMOVE FUNCTION
      return { count: cart.count - action.payload };
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

        console.log(cart);
        const response = await postData('/update-cart', {cart});
        console.log(response);

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

