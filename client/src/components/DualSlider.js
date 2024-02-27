import React, { useEffect, useRef, useState } from "react";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const DualSlider = ({ startPrice, value, setValue }) => {
  const sliderRef = useRef(null);
  const prevValues = useRef({min: undefined, max: undefined});
  const [inputValue, setInputValue] = useState({min: startPrice.min, max: startPrice.max});

  useEffect(() => {
    noUiSlider.create(sliderRef.current, {
      start: [startPrice.min, startPrice.max],
      connect: true,
      behaviour: 'drag-all',
      step: 1,
      margin: 1,
      range: {
        'min': startPrice.min,
        'max': startPrice.max
      }
    });

    // Cleanup the slider when the component is unmounted
    return () => {
      if (sliderRef.current)
        sliderRef.current.noUiSlider.destroy();
    };
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.noUiSlider.updateOptions({
        start: [value.min, value.max],
        range: {
          'min': startPrice.min,
          'max': startPrice.max
        }
      });
      console.log("startPrice");
    }
  }, [startPrice]);
  
  if (sliderRef.current) {
    //when handle change
    sliderRef.current.noUiSlider.on('change', function (values, handle) {    
      
      if(prevValues.current.min != values[0] || prevValues.current.max != values[1]){
        prevValues.current = {min: values[0], max: values[1]};
        setValue(values[0], values[1]);
      }
    });
  }

  return (
    <div id="dualSliderDiv">
        <div id="slideValuesDiv">
          <p>{parseFloat(value.min).toFixed(2)} €</p>
          <p>{parseFloat(value.max).toFixed(2)} €</p>
        </div>
      
        <div ref={sliderRef}></div>
    </div>
  );
};

export default DualSlider;
