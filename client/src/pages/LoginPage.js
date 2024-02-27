import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { postData } from '../scripts/serverCalls.js';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";

function LoginPage({ product }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState('');

  // Update data every time input changes
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await postData('/login', formData);

      navigate('/'); //redirect to the home page
      
    } catch (error) {
      console.error('Form submission failed:', error.message);
      setAlertMessage('Username or Email are wrong');
    }
  };

  const displayContent = (
    <>
      <Link to='/' className='nameP'>Company Name</Link>
      <div id='loginPage'>
        <p id='loginTitle'>Login</p>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              onChange={handleInputChange}
              type='text'
              name='username'
              placeholder='Username or Email'
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              onChange={handleInputChange}
              type='password'
              name='password'
              placeholder='Password'
            />
          </div>          
          <button type='submit'>Login</button>
        </form>
        <p id='alertMessage'>{alertMessage}</p> 
        <div className='separatorDiv'>
          <p className='separator'>New?</p>
        </div>
        
        <Link to='/register' id='registerLink'>Register</Link>
      </div>
      
    </>
  );
  return displayContent;
}

export default LoginPage;
