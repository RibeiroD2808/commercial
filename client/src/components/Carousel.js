import React, { useEffect, useState } from 'react';
import Product from './Product';
import '../style/main.css';

function Carousel( {products, productsPerPage} ){

    const productscurrentSliceIndex   = products.length;

    const [currentSliceIndex  , setCurrentSliceIndex  ] = useState(0);
    const [visibleProducts , setVisibleProducts ] = useState(products.slice(currentSliceIndex  , currentSliceIndex   + productsPerPage));

    useEffect(() => {
        setVisibleProducts (products.slice(currentSliceIndex  , currentSliceIndex   + productsPerPage));
    }, [currentSliceIndex  , products]);

      
    function Content () {
        return (
        <ul id='caroucelProducts'>
            {visibleProducts .map((item) => (
            <Product key={item.id} product={item}/>
            ))}
        </ul>        
        )
    }
    
    function moveCarousel(add){
        if(add && currentSliceIndex   < productscurrentSliceIndex   - productsPerPage)
            setCurrentSliceIndex  (currentSliceIndex   + 1)
        else if(!add && currentSliceIndex   > 0)
            setCurrentSliceIndex  (currentSliceIndex   - 1)
        return;
    }

    const displayContent = (
        <div className='carouselDiv'>
            <button onClick={() => moveCarousel(false)}>&lt;</button>

            <Content />

            <button id='nextButton' onClick={() => moveCarousel(true)}>&gt;</button>
        </div>
    );

    return displayContent;
}

export default Carousel;