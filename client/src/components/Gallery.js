import { useState } from "react";
import { FaSortNumericDown } from "react-icons/fa";

function Gallery({images}){

    const[selectedImage, setSelectedimage] = useState(0);
    console.log(images);

    function handleOnClick(value){
        
        const newValue = selectedImage + value;
        console.log(newValue);
        if(newValue >= 0 && newValue < images.length)
            setSelectedimage(selectedImage + value);
    }

    const displayContent = images ? (
        <div className="gallery">
            <button onClick={() => handleOnClick(-1)} ></button>
            <img src={'img/' + images[selectedImage]}></img>
            <button onClick={() => handleOnClick(1)} ></button>
            <ul className="galleryImagesList">
                {images.map((item, key) => (
                <img key={key} src={'img/' + item}></img>
                ))}
            </ul>
        </div>
    ): null;

    return displayContent;
}

export default Gallery;