import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css'
function Header(){

    const displayContent = (
        <div id='headerDiv'>
            <div id='headerLinksDiv'>
                <Link to='/'>Home</Link>
                <Link to='/packaging'>Packaging</Link>
            </div>
        </div>
    );

    return displayContent;
}

export default Header;