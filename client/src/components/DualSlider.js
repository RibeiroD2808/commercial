import React, { useEffect, useRef } from "react";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const DualSlider = ({ startPrice, value, setValue }) => {
  const sliderRef = useRef(null);
  const slider = sliderRef.current;

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
