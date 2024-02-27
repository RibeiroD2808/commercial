import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../style/header.css'
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../components/CartProvider.js';
import fetchData, { postData } from '../scripts/serverCalls.js';
import getCookie from '../scripts/getCookie.js';

function Header(){

    const { cart, dispatch } = useCart();

    useEffect(() => {
        const updateCookie = setInterval(() => {
            const cookieCart = getCookie('cart');
            //id cart save on cookie its the same as client cart
            if (cookieCart && cookieCart != cart){
                dispatch({ type: 'UPDATE', payload: cookieCart });
            }else{
                console.log("its the same");
            }
        }, 1000);

        return () => clearInterval(updateCookie);
    }, [cart]);


    const handleLogout = async () => {
        const sessionCookie = getCookie('sessionId');
        
        try {
          postData('/logout',{ sessionId : sessionCookie});
          document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } catch (error) {
          console.error('Logout failed:', error.message);
        }
    };

    const displayContent = (       
        <div id='headerDiv'>
            <div id='headerTopDiv'>
                <select name="Language" id="language" selected="pt">
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                </select>
                <div>
                    <Link to='/cart'><FaShoppingCart /></Link>
                        {cart.quantities.reduce((partialSum, a) => partialSum + a, 0)}
                        {document.cookie.includes('sessionId') ? (
                            <button onClick={handleLogout}>LogOut</button>
                        ) : (
                            <>
                                <Link to='/login'>LogIn</Link>
                                <Link to='/register'>Register</Link>
                            </>
                    )}
                </div>
            </div>
            <div id='headerSearchDiv'>
                <Link to='/' id='nameHeader'>Company Name</Link>
                <SearchBar />
                
                
            </div>    
            <div id='headerCategoryDiv'>
                <Link to='/category?category=Packaging'>Packaging</Link>
                <Link to='/category?category=Hygiene+and+Cleaning'>Hygiene Cleaning</Link>
                <Link to='/category?category=Kitchen+Utensils'>Kitchen Utensils</Link>
            </div>
        </div>
    );

    return displayContent;
}

export default Header;