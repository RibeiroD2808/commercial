import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { postData } from '../scripts/serverCalls.js';
import { useNavigate } from 'react-router-dom';

function LoginPage({ product }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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

      if (response.status === 200) {
        console.log('Login successful');
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Form submission failed:', error.message);
    }
  };

  const displayContent = (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type='text'
          name='username'
          placeholder='Username or Email'
        />
        <input
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );

  return displayContent;
}

export default LoginPage;
