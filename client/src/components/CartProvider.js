// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    
    const [cart, setCart] = useState([]);
    
    //add to the cart
    function addToCart(product){
        setCart(prevCart => [...prevCart, product]);
    }

    return <CartContext.Provider value={{ cart: cart, addToCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    
    return context;
}

