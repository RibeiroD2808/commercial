import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../style/header.css'
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../components/CartProvider.js';
import fetchData, { postData } from '../scripts/serverCalls.js';
import getCookie from '../scripts/getCookie.js';
import axios from 'axios';

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
          //await axios.post('http://localhost:8000/logout', { sessionId : sessionCookie});
          postData('/logout',{ sessionId : sessionCookie});
          document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } catch (error) {
          console.error('Logout failed:', error.message);
        }
    };

    const displayContent = (       
        <div id='headerDiv'>
            <div id='headerSearchDiv'>
                <Link to='/'>Home</Link>
                <SearchBar />
                
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
            <div id='headerLinksDiv'>
                <Link to='/category?category=Packaging'>Packaging</Link>
                <Link to='/category?category=Hygiene+and+Cleaning'>Hygiene Cleaning</Link>
                <Link to='/category?category=Kitchen+Utensils'>Kitchen Utensils</Link>
            </div>
        </div>
    );

    return displayContent;
}

export default Header;