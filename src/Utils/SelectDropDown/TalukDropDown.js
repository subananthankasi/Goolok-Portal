import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchTaluk } from '../../Redux/Actions/MasterPage/TalukAction';



export const useTalukOptions = (filter) => {
    const dispatch = useDispatch();
    const talukData = useSelector((state) => state.Taluk.TalukData);

    useEffect(() => {
        if (filter || filter === null) {
            dispatch(fetchTaluk());
        }
    }, [dispatch, filter]);



    const filterData = talukData.filter((data) => data.taluk_district === (filter ? filter.value : ""))

    const result = filter === undefined ? talukData : filterData

    const options = result.map((data) => ({
        value: data.id,
        label: data.taluk_name,
    }));

    return options;
};

const TalukDropDown = ({ onSelect, selectedTaluk, filter, isDisabled }) => {
    useEffect(() => {
        if (selectedTaluk) {
            onSelect(selectedTaluk);
        }
    }, [selectedTaluk, onSelect]);


    const options = useTalukOptions(filter)

    const handleDistrictSelect = (selectedTaluk) => {
        onSelect(selectedTaluk);
    };

    return (
        <div>
            <Select
                options={options}
                onChange={handleDistrictSelect}
                value={selectedTaluk}
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

export default TalukDropDown;
