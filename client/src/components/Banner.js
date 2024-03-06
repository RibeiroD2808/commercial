import { useState, useEffect } from "react";

function Banner({images}){
    
    const[currentImageIndex, setCurrentImageIndex] = useState(0);
    
    function getImageClass(index) {
        return index === currentImageIndex ? 'active' : '';
    }

    function Buttons(){
        return (
            <ul className="button-list">
                {images.map((image, index) => (
                    <li key={index}>
                        <button onClick={() => setCurrentImageIndex(index)}
                                                className={getImageClass(index)}></button>
                    </li>
                ))}
            </ul>
        )
    }

    //change banner every x time
    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImageIndex((prevIndex) => {
            if (prevIndex !== images.length - 1) {
              //if not the last banner
              return prevIndex + 1;
            } else {
              //if is the last banner
              return 0;
            }
          });
        }, 10000); // 10 seconds
        return () => clearInterval(intervalId);
      }, [images.length]);


    const displayContent = (
        <div id="banner">
            <img src={images[currentImageIndex].url} alt="Image" width="auto" height="auto"></img>    
            <Buttons/>
        </div>
    );

    return displayContent;
}

export default Banner;