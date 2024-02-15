import React, { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import DualSlider from './DualSlider';
import Product from '../components/Product'

//return list elements the meet the conditions
function FilterData(startData, brandsList, priceRange){

    let filteredData;
    
    const copiedData = Array.from(startData);
    //check if all elements are not selected
    const allSelectedFalse = Object.values(brandsList).every(({ selected }) => !selected);
    
    //if some brand is selected, only display items that meet the brand and price conditions
    if (!allSelectedFalse) {
        filteredData = copiedData.filter((elem) => {
            return brandsList[elem.brand].selected && (elem.price >= priceRange.min && elem.price <= priceRange.max);
        });
    } else {
        //if no brand is selected, display items that meet only the price conditions
        filteredData = copiedData.filter((elem) => {
            return elem.price >= priceRange.min && elem.price <= priceRange.max;
        });
    }

    return filteredData;
}

function Filter(startData){
    const [data, setData] = useState(startData.startData);
    
    //filters
    const [priceRange, setPriceRange] = useState({min: undefined, max: undefined});
    const [startPriceRange, setStartPriceRange] = useState({min: undefined, max: undefined});
    const [firstRender, setFirstRender] = useState(true);
    const prevStartDataRef = useRef(startData);
    //brand list {brand {count, selected}}
    const [brandsList, setBrandsList] = useState();
    
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    useEffect(() => {
        
        if(firstRender){
            setBrandsList( data.reduce((acc, item) => {
          
                const brand = item.brand;
                
                //increment count for the brand or initialize to 1 if it doesn't exist
                acc[brand] = { count: (acc[brand] ? acc[brand].count + 1 : 1), selected: false};
                return acc;
            }, {}))
            
            const prices = data.map(item => item.price);

            //use Math.min and Math.max to find the minimum and maximum prices
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            //set the initial price range state
            setPriceRange({ min: minPrice, max: maxPrice });
            setStartPriceRange({ min: minPrice, max: maxPrice });
            setFirstRender(false);
            
        }else{
            //update the state with the filtered data
            setData(FilterData(startData.startData, brandsList, priceRange));
        }
        
    }, [startData, priceRange, brandsList])
    
    //change the select value
    const handleBrandCheckboxChange = (selectedBrand) => {
        setBrandsList((prevBrandsList) => {
          return {
            ...prevBrandsList,
            [selectedBrand]: {
              ...prevBrandsList[selectedBrand],
              selected: !prevBrandsList[selectedBrand].selected,
            },
          };
        });
    };
    
    //reset all filters
    const handleResetButton = () => {
      setPriceRange(startPriceRange); 
      setBrandsList((prevBrandsList) => {
        // Reset the selected property for all brands
        const updatedBrandsList = { ...prevBrandsList };
        Object.keys(updatedBrandsList).forEach((brand) => {
          updatedBrandsList[brand].selected = false;
        });
        return updatedBrandsList;
      });
    };

    const displayContent = (
        <> { console.log("asfasfasfsa",startPriceRange)}
            { startPriceRange && startPriceRange.min != undefined && startPriceRange.max != undefined ?  
                
                <div id="filterDiv">
                    <DualSlider
                    startPrice= {startPriceRange}
                    value={priceRange} 
                    setValue={(min, max) => setPriceRange({ min, max })}
                    />
                    <div>
                    <button onClick={() => setDropdownVisible(!dropdownVisible)}>Brands</button>
                    <div>
                        {dropdownVisible && Object.entries(brandsList).map(([brand, {count, selected}]) => (
                        <label key={brand}>
                            <input type='checkbox' value={brand} checked={selected} onChange={() => handleBrandCheckboxChange(brand)}></input>{brand} ({count})
                        </label>
                        ))}
                    </div>
                    <button onClick={handleResetButton}>X</button> 
                    <ul className='productsUl'>
                        {data.map((item) => (
                            <Product key={item.id} product={item}></Product>              
                        ))}
                    </ul>
                    </div>
                    
                </div> : null
            }
        </>
    );

    return displayContent;
};

export default Filter;