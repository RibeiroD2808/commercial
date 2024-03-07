import { useState } from "react";
import { FaSortNumericDown } from "react-icons/fa";

function Gallery({images}){

    const[selectedImage, setSelectedimage] = useState(0);

    function handleOnClick(value){
        
        const newValue = selectedImage + value;
        console.log(newValue);
        if(newValue >= 0 && newValue < images.length)
            setSelectedimage(selectedImage + value);
    }

    function handleOnClickImage(value){
        setSelectedimage(value);    
        console.log(value);
    }

    const displayContent = images ? (
        <div className="gallery">
            <div>
                <button onClick={() => handleOnClick(-1)} ></button>
                <img src={'img/' + images[selectedImage]}></img>
                <button onClick={() => handleOnClick(1)} ></button>
            </div>
            <ul className="galleryImagesList">
                {images.map((item, key) => (
                    <img key={key} onClick={() => handleOnClickImage(key)} className={key === selectedImage ? 'selected' : ''} src={'img/' + item}></img>
                ))}
            </ul>
        </div>
    ): null;

    return displayContent;
}

export default Gallery;