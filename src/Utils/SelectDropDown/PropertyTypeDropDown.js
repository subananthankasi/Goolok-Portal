import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';    
import { fetchPropertyType } from '../../Redux/Actions/MasterPage/PropertyTypeAction';



export const usePropertyOptions = () => {
    const dispatch = useDispatch();
    const PropertyTypeData = useSelector((state) => state.PropertyType.PropertyTypeData);
 
    useEffect(() => {
        dispatch(fetchPropertyType());
    }, [dispatch]);

    const options = PropertyTypeData.map((data) => ({
        value: data.id,
        label: data.property_type,
    }));

    return options;
};

const PropertyTypeDropDown = ({ onSelect,selectedProperty }) => {  
    useEffect(() => {
        if (selectedProperty) {
            onSelect(selectedProperty);
        } 
    }, [selectedProperty, onSelect]);
 
 
    const options = usePropertyOptions()
 
    const handleDistrictSelect = (selectedOption) => {
        onSelect(selectedOption);
    };

    return (
        <div> 
            <Select 
                options={options}
                onChange={handleDistrictSelect}
                value={selectedProperty}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused
                            ? "#e7e7e7"
                            : "#e7e7e7",
                        fontSize: "13px",
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: "12px",
                        color: "black",
                    }),
                }} 
            />
        </div>
    );
};

export default PropertyTypeDropDown;
