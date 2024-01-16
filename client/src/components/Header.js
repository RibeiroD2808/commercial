import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../style/header.css'
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../components/CartProvider.js';

function Header(){

    const { cart } = useCart();

    const displayContent = (
        <div id='headerDiv'>
            <div id='headerSearchDiv'>
                <Link to='/'>Home</Link>
                <SearchBar />
                <Link to='/login'>LogIn</Link>
                <Link to='/register'>Register</Link>
                <Link to='/cart'><FaShoppingCart /></Link>
                {cart.quantities.reduce((partialSum, a) => partialSum + a, 0)}
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