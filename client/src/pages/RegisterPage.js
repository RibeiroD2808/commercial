import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { postData } from '../scripts/serverCalls.js'; 

function RegisterPage( {product} ){

    const [formData, setFormData] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    });

    const [alertMessage, setAlertMessage] = useState('');

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
        e.preventDefault(); //prevent the default form submission

        //check if password field is not empty and if its the same as confirm password
        if(formData.password && formData.password === formData.confirmPassword){
            try {
                
                const response = await postData('/register', formData);
                setAlertMessage(response.message);

                console.log('Form submission successful: ', response.message);
                
            } catch (error) {
                console.error('Form submission failed:', error);
            }
        }else{
            setAlertMessage('The passwords are not the same');
        }
    };

    const displayContent = (
        <>
            <Header />
            <form  onSubmit={handleSubmit}  action='/register' method='POST'>
                <input onChange={handleInputChange} type='text' name='username' placeholder='Username or Email' />
                <input onChange={handleInputChange} type='password' name='password' placeholder='Password' />
                <input onChange={handleInputChange} type='password' name='confirmPassword' placeholder='Confirm Password' />
                <button type='submit'>Register</button>
                <p>{alertMessage}</p>    
            </form>
        </>
    );

    return displayContent;
}

export default RegisterPage;