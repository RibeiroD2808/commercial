import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCookie from './getCookie';
//get function
const fetchData = async ( endpoint ) => {
  
  const session = getCookie('sessionId');
  console.log(session);
  try {
    const response = await axios.get('http://localhost:8000' + endpoint, {
      headers: {
        'sessionId': session,
      },
    });
    
    console.log(endpoint);
    //show reponse if inst the cart call
    (endpoint != '/cart') && console.log("serverCall", response);
    return response;
  } catch (error) {
    throw error;
  }
};

//post function

export const postData = async ( endpoint,  postData) => {
  try{
    const response = await axios.post('http://localhost:8000' + endpoint, postData, {
      withCredentials: true, // Include credentials (cookies) with the request
    });
    return response;
  } catch (error){
    throw error;
  }
}

export default fetchData;

