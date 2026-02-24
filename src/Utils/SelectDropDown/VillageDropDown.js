// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Select from "react-select";
// import { fetchVillage } from "../../Redux/Actions/MasterPage/VillageAction";

// export const useVillageOptions = (filter) => {
//   const dispatch = useDispatch();
//   const VillageData = useSelector((state) => state.Village.villageData);

//   useEffect(() => {
//     dispatch(fetchVillage());
//   }, [dispatch]);

//   const filterData = VillageData.filter(
//     (data) => data.village_taluk === (filter ? filter.value : "")
//   );

//   const result = filter === undefined ? VillageData : filterData;

//   const options = result.map((data) => ({
//     value: data.id,
//     label: data.village_name,
//   }));

//   return options;
// };

// const VillageDropDown = ({ onSelect, selectedVillage, filter, isDisabled }) => {
//   useEffect(() => {
//     if (selectedVillage) {
//       onSelect(selectedVillage);
//     }
//   }, [selectedVillage, onSelect]);

//   const options = useVillageOptions(filter);

//   const handleDistrictSelect = (selectedVillage) => {
//     onSelect(selectedVillage);
//   };

//   return (
//     <div>
//       <Select
//         options={options}
//         onChange={handleDistrictSelect}
//         value={selectedVillage}
//         isDisabled={isDisabled}
//         styles={{
//           control: (baseStyles, state) => ({
//             ...baseStyles,
//             borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
//             fontSize: "13px",
//           }),
//           option: (baseStyles, state) => ({
//             ...baseStyles,
//             fontSize: "12px",
//             color: "black",
//           }),
//         }}
//       />

//     </div>
//   );
// };

// export default VillageDropDown;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVillage } from "../../Redux/Actions/MasterPage/VillageAction";

export const useVillageOptions = (filter) => {
  const dispatch = useDispatch();
  const VillageData = useSelector((state) => state.Village.villageData);

  useEffect(() => {
    if (filter || filter === null) {
      dispatch(fetchVillage());

    }
  }, [dispatch, filter]);

  const filterData = VillageData.filter(
    (data) => data.village_taluk === (filter ? filter.value : "")
  );

  const result = filter === undefined ? VillageData : filterData;

  const options = result.map((data) => ({
    value: data.id,
    label: data.village_name,
  }));

  return options;
};

const VillageDropDown = ({ onSelect, selectedVillage, filter, isDisabled }) => {
  useEffect(() => {
    if (selectedVillage) {
      onSelect(selectedVillage);
    }
  }, [selectedVillage, onSelect]);

  const options = useVillageOptions(filter);

  const handleDistrictSelect = (e) => {
    const selected = options.find((opt) => opt.value === e.target.value);
    onSelect(selected);
  };

  return (
    <div>
      <select
        className="form-control"
        value={selectedVillage?.value || ""}
        onChange={handleDistrictSelect}
        disabled={isDisabled}
        style={{ fontSize: "13px", borderColor: "#e7e7e7" }}
      >
        <option value="">Select Village</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VillageDropDown;
