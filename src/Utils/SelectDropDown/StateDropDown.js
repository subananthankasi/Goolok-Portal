import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchState } from "../../Redux/Actions/MasterPage/StateAction";

export const useStateOptions = (isOpen) => {
  const dispatch = useDispatch();
  const StateData = useSelector((state) => state.State.StateNameData);

  useEffect(() => {
    dispatch(fetchState());
  }, [dispatch]);

  const options = StateData.map((data) => ({
    value: data.id,
    label: data.state_name,
  }));

  return options;
};

const StateDropDown = ({ onSelect, selectedState, isDisabled }) => {
  useEffect(() => {
    if (selectedState) {
      onSelect(selectedState);
    }
  }, [selectedState, onSelect]);

  const options = useStateOptions();

  const handleDistrictSelect = (selectedOption) => {
    onSelect(selectedOption);
  };

  return (
    <div>
      <Select
        options={options}
        onChange={handleDistrictSelect}
        value={selectedState}
        isDisabled={isDisabled}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
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

export default StateDropDown;
