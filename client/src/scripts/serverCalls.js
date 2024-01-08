import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = async (endpoint ) => {
    try {
      const response = await axios.get('http://localhost:8000' + endpoint );
      return response.data.products;
    } catch (error) {
      throw error;
    }
  };
  
export default fetchData;