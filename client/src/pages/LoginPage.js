import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Product( {product} ){


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/login', {
            data: dataToSend,
          });
          console.log('Response from server:', response.data);
        } catch (error) {
          console.error('Error sending data to server:', error);
        }
      };

    const displayContent = (
        <>
            <Header />
            <form onSubmit={handleFormSubmit} action='/login' method='POST'>
                <input type='text' name='usernameOrEmail' placeholder='Username or Email' />
                <input type='password' name='password' placeholder='Password' />
                <button type='submit'>Login</button>
            </form>
        </>
    );

    return displayContent;
}

export default Product;