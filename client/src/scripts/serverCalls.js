import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = async (endpoint ) => {
    try {
      const response = await axios.get('http://localhost:8000' + endpoint );
      console.log("serverCall", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export default fetchData;