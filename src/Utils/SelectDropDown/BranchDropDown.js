import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';    
import { fetchBranch } from '../../Redux/Actions/MasterPage/BranchAction';



export const useBranchOptions = () => {
    const dispatch = useDispatch();
    const BranchData = useSelector((state) => state.Branch.BranchData);

    useEffect(() => {
        dispatch(fetchBranch());
    }, [dispatch]);

    const options = BranchData.map((data) => ({
        value: data.id,
        label: data.branch_name,
    }));
 
    return options;
};

const BranchDropDown = ({ onSelect,selectedBranch }) => {  
    useEffect(() => {
        if (selectedBranch) {
            onSelect(selectedBranch);
        } 
    }, [selectedBranch, onSelect]);
 
 
    const options = useBranchOptions()
 
    const handleBranch = (selectedBranch) => {
        onSelect(selectedBranch);
    };

    return (
        <div> 
            <Select 
                options={options}
                onChange={handleBranch}
                value={selectedBranch}
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

export default BranchDropDown;
