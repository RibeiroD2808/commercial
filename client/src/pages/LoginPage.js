import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { postData } from '../scripts/serverCalls.js'; 

function LoginPage( {product} ){

    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    //update data every time input change
    const handleInputChange = (e) => {
      // Update the form data when input fields change
      setFormData((prevFormData) => ({
        ...prevFormData, //previous data
        [e.target.name]: e.target.value
      }));
      console.log("handleInput ", formData)
    };

    //send post when submit button e pressed
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission
  
      try {
        
        const response = await postData('/login', formData);
        console.log('Form submission successful');
        
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    };

    const displayContent = (
        <>
            <Header />
            <form  onSubmit={handleSubmit}  action='/login' method='POST'>
                <input onChange={handleInputChange} type='text' name='username' placeholder='Username or Email' />
                <input onChange={handleInputChange} type='password' name='password' placeholder='Password' />
                <button type='submit'>Login</button>
            </form>
        </>
    );

    return displayContent;
}

export default LoginPage;