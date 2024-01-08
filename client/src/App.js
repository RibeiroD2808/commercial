import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {


  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/data')
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const displayContent = data ? (
    <div className="App">
      <h1>React and Node.js Integration</h1>
      <ul>
        {data.map((number) => (
          <li key={number.id}>{number.name}</li>
        ))}
      </ul>
    </div>
   ) : null;


  return displayContent;
}

export default App;