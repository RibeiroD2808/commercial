import React, { useEffect, useState } from 'react';
import Product from './Product';

function Carousel( {products, productsPerPage} ){

    const productscurrentSliceIndex   = products.length;

    const [currentSliceIndex  , setCurrentSliceIndex  ] = useState(0);
    const [visibleProducts , setVisibleProducts ] = useState(products.slice(currentSliceIndex  , currentSliceIndex   + productsPerPage));

    useEffect(() => {
        setVisibleProducts (products.slice(currentSliceIndex  , currentSliceIndex   + productsPerPage));
    }, [currentSliceIndex  , products]);

      
    function Content () {
        return (
        <div id='ContentDiv'>
        <ul className='productsUl'>
            {visibleProducts .map((item) => (
              <Product key={item.id} product={item}/>
            ))}
        </ul>        
        </div>
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
            <button onClick={() => moveCarousel(false)}>Prev</button>
            <Content />
            <button onClick={() => moveCarousel(true)}>Next</button>
        </div>
    );

    return displayContent;
}

export default Carousel;