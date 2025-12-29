import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';    
import { fetchSubPropertyType } from '../../Redux/Actions/MasterPage/SubPropertyAction';
 


export const useSubPropertyOptions = (filter) => {
    const dispatch = useDispatch();
    const SubPropertyTypeData = useSelector((state) => state.SubPropertyType.SubPropertyTypeData);
 
     useEffect(() => {
        dispatch(fetchSubPropertyType());
    }, [dispatch]);

    const filterData = SubPropertyTypeData.filter((data) => data.property === (filter ? filter.value : ""))

    const result = filter === undefined ? SubPropertyTypeData : filterData

    const options = result.map((data) => ({
        value: data.id,
        label: data.subproperty,
    }));

    return options;
};

const SubPropertyDropDown = ({ onSelect,selectedSubProperty,filter }) => {  
    useEffect(() => {
        if (selectedSubProperty) {
            onSelect(selectedSubProperty);
        } 
    }, [selectedSubProperty, onSelect]);
 
 
    const options = useSubPropertyOptions(filter)
 
    const handleDistrictSelect = (selectedOption) => {
        onSelect(selectedOption);
    };

    return (
        <div> 
            <Select 
                options={options}
                onChange={handleDistrictSelect}
                value={selectedSubProperty}
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

export default SubPropertyDropDown;
