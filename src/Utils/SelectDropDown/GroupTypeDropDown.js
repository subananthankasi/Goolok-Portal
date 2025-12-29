import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';    
import { fetchGroupType } from '../../Redux/Actions/MasterPage/GroupTypeAction';



export const useGroupOptions = () => {
    const dispatch = useDispatch();
    const GroupData = useSelector((state) => state.GroupType.GroupTypeData);

    useEffect(() => {
        dispatch(fetchGroupType());
    }, [dispatch]);
 
    const options = GroupData.map((data) => ({
        value: data.id,
        label: data.group_name,
    }));

    return options;
};

const GroupDropDown = ({ onSelect,selectedGroupType }) => {  
    useEffect(() => {
        if (selectedGroupType) {
            onSelect(selectedGroupType);
        } 
    }, [selectedGroupType, onSelect]);
 
 
    const options = useGroupOptions()
 
    const handleDistrictSelect = (selectedGroupType) => {
        onSelect(selectedGroupType);
    };

    return (
        <div> 
            <Select 
                options={options}
                onChange={handleDistrictSelect}
                value={selectedGroupType}
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

export default GroupDropDown;
