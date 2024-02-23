import React, { useEffect, useRef } from "react";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const DualSlider = ({ startPrice, value, setValue }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    noUiSlider.create(sliderRef.current, {
      start: [startPrice.min, startPrice.max],
      connect: true,
      behaviour: 'drag-all',
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
  }, [startPrice.min, startPrice.max]); // Run when startPrice changes

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.noUiSlider.updateOptions({
        start: [value.min, value.max],
      });
    }
  }, [value]);

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
  
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.noUiSlider.on('change', function (values, handle) {
        console.log('Slider values:', values);
        setValue(values[0], values[1]);
      });
    }
  }, [setValue]);

  return (
    <div ref={sliderRef}></div>
  );
};

export default DualSlider;
