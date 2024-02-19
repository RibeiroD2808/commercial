import React, { useEffect, useRef } from "react";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const DualSlider = ({ startPrice, value, setValue }) => {
  const sliderRef = useRef(null);
  const slider = sliderRef.current;

  console.log(startPrice, value);
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
      if(sliderRef.current)
        sliderRef.current.noUiSlider.destroy();
    };
  }, []); // Run only once on component mount
  
  useEffect(() => {
    if (slider) {
      slider.noUiSlider.updateOptions({
        start: [value.min, value.max],
      });
    }
  }, [value]);

  //update when the startPrice change
  useEffect(() => {
    if (slider) {
      slider.noUiSlider.updateOptions({
        start: [value.min, value.max],
        range: {
          'min': startPrice.min,
          'max': startPrice.max
        }
      });
    }
  }, [startPrice]);

  useEffect(() => {
    if (slider) {
      slider.noUiSlider.on('change', function (values, handle) {
        console.log('Slider values:', values);
        setValue(values[0], values[1]);
      });
    }
  }, [setValue, slider]);

  return (
    <div ref={sliderRef}></div>
  );
};

export default DualSlider;
