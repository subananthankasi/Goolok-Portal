import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchDistrict } from "../../Redux/Actions/MasterPage/DistrictAction";

export const useDistrictOptions = (filter) => {
  const DistrictData = useSelector((state) => state.District.districtData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter || filter === null) {
      dispatch(fetchDistrict());
    }
  }, [dispatch, filter]);

  const filterData = DistrictData.filter(
    (data) => data.state_type === (filter ? filter.value : " ")
  );
  const result = filter === undefined ? DistrictData : filterData;

  const options = result.map((data) => ({
    value: data.id,
    label: data.district,
  }));

  return options;
};

const DistrictDropDown = ({
  onSelect,
  selectedDistrict,
  filter,
  isDisabled,
}) => {
  const options = useDistrictOptions(filter);
  useEffect(() => {
    if (selectedDistrict) {
      onSelect(selectedDistrict);
    }
  }, [selectedDistrict, onSelect]);

  const handleDistrictSelect = (selectedOption) => {
    onSelect(selectedOption);
  };

  return (
    <div>
      <Select
        options={options}
        onChange={handleDistrictSelect}
        value={selectedDistrict}
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

export default DistrictDropDown;
