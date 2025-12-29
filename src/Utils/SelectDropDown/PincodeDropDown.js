import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchPincode } from '../../Redux/Actions/MasterPage/PincodeAction';



export const usePincodeOptions = (filter) => {

    const dispatch = useDispatch();
    const PincodeData = useSelector((state) => state.Pincode.PincodeData);

    useEffect(() => {
        dispatch(fetchPincode());
    }, [dispatch]);




    const filterData = PincodeData.filter((data) => data.pin_village === (filter ? filter.value : ""))

    const result = filter === undefined ? PincodeData : filterData

    const options = result.map((data) => ({
        value: data.id,
        label: data.pincode,
    }));
    return options;
};

const PincodeDropDown = ({ onSelect, selectedPincode, filter, isDisabled }) => {
    useEffect(() => {
        if (selectedPincode) {
            onSelect(selectedPincode);
        }
    }, [selectedPincode, onSelect]);


    const options = usePincodeOptions(filter)

    const handleDistrictSelect = (selectedPincode) => {
        onSelect(selectedPincode);
    };

    return (
        <div>
            <Select
                options={options}
                onChange={handleDistrictSelect}
                value={selectedPincode}
                isDisabled={isDisabled}
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

export default PincodeDropDown;
