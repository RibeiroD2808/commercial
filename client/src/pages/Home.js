import React, { useEffect, useState, useContext } from 'react';
import fetchData from '../scripts/serverCalls'; 
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../style/main.css';
import '../style/home.css';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [username, setUserName] = useState([]);
  const [images, setImages] = useState([]);
  
  const endpoint = '/';

  //get data from api using fetchDataAndSetState function inside serverCalls file
  useEffect(() => {
    async function fetchDataAndSetState() {
      
      const data = await fetchData(endpoint);
      setLatestProducts(data.data.latestProducts);
      setUserName(data.data.userName);
      setImages(data.data.banners);
      console.log("banners",data.data.banners);
    }

    fetchDataAndSetState(); // call the function inside useEffect
  }, []); 

    const displayContent = (images.length > 0 || latestProducts.length > 0) ? (
      <>
        <Header />
        <div id="homeDiv" className='mainContent'>

          <Banner images={images}/>

          <Carousel products={latestProducts} productsPerPage={4} />  
        
        </div>
        <Footer />	
      </>
    ) : null;

    return displayContent;
};

export default Home;
