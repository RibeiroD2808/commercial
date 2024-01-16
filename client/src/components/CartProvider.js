// context/CartContext.js
import React, { createContext, useContext, useState, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  products: [],
  quantities: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      //search for the index
      const index = state.products.map(e => e.id).indexOf(action.payload.id);

      //if dont have
      if(index == -1){
        return { ...state, 
          products: [...state.products, action.payload],
          quantities: [...state.quantities, 1] };
      }else{

        //update product quantity
        const updatedQuantities = [...state.quantities];
        updatedQuantities[index] += 1;

        return { 
            ...state,
            quantities:updatedQuantities,
        };
      }
      case 'REMOVE':
        //NEED TO ADD REMOVE FUNCTION
      return { count: state.count - action.payload };
    default:
      return state;
  }
};


export function CartProvider({ children }) {

  //cart list  
  const [state, dispatch] = useReducer(reducer, initialState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}

