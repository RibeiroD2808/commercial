import React, { useEffect, useState } from 'react';
import axios from 'axios';

//get function
const fetchData = async ( endpoint ) => {
    try {
      const response = await axios.get('http://localhost:8000' + endpoint );

      console.log("serverCall", response);
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
    console.log(document.cookie);
    return response;
  } catch (error){
    throw error;
  }
}

export default fetchData;

