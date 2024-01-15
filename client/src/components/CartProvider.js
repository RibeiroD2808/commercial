// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    //ADD VARIBALE TO COUNT ELEMENTS ON CART (RIGHT NOW IF A ELEMENT HAVE A QUANTITY OF 2 HE ONLY WILL COUNT AS 1 )
    //DELETE CART FUNCTION (REDUCE I GUESS) 

    

    //add to the cart
    function addToCart(product){
        const existingProduct = cart.find((item) => item[0].id === product.id);
        
        if (existingProduct) {
            //if the product already exists in the cart, update its quantity
            setCart((prevCart) =>
              prevCart.map((item) =>
                item[0].id === product.id ? [item[0], item[1] + 1] : item
              )
            );
          } else {
            //if the product doesnt exist, add it to the cart with quantity 1
            setCart((prevCart) => [...prevCart, [product, 1]]);
          }
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

