import { useState } from "react";

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

    const displayContent = (
        <div id="banner">
            <img src={images[currentImageIndex].url} alt="Image" width="auto" height="auto"></img>    
            <Buttons/>
        </div>
    );

    return displayContent;
}

export default Banner;