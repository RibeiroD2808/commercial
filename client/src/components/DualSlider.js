import React, {useEffect, useRef} from "react";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const DualSlider = ({startPrice, value, setValue}) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;

        noUiSlider.create(slider, {
            start: [startPrice.min, startPrice.max],
            connect: true,
            behaviour: 'drag-all',
            range: {
                'min': startPrice.min,
                'max': startPrice.max
            }
        });

        slider.noUiSlider.on('change', function (values, handle) {
            console.log('Slider values:', values);
            setValue(values[0], values[1]);
        });

        return () => {
            // Clean up the slider when the component is unmounted
            slider.noUiSlider.destroy();
        };
    }, []); //run only once on component mount

    return (
        <div ref={sliderRef}></div>
    );
};

export default DualSlider;