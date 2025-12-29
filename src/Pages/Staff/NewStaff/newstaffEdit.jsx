import React, { useEffect, useState } from "react";
import StateDropDown, {
  useStateOptions,
} from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown, {
  useDistrictOptions,
} from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown, {
  useTalukOptions,
} from "../../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown, {
  useVillageOptions,
} from "../../../Utils/SelectDropDown/VillageDropDown";
import GroupDropDown, {
  useGroupOptions,
} from "../../../Utils/SelectDropDown/GroupTypeDropDown";
import BranchDropDown, {
  useBranchOptions,
} from "../../../Utils/SelectDropDown/BranchDropDown";
import PincodeDropDown, {
  usePincodeOptions,
} from "../../../Utils/SelectDropDown/PincodeDropDown";
import { useDispatch, useSelector } from "react-redux";
import { updateStaff } from "../../../Redux/Actions/MasterPage/Staff";
import { StaffValidation } from "./StaffValidation";
import Toast from "../../../Utils/Toast";

const NewStaffEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();
  const updateLoading = useSelector((state) => state.staff);

  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();
  const pincodeDropDown = usePincodeOptions();
  const groupTypeDropDown = useGroupOptions();
  const branchDropDown = useBranchOptions();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editData && isOpen) {
      dataSet();
      setFormData((prev) => ({ ...prev, ...editData }));
    }
  }, [isOpen, editData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "staff_name") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, staffName: "Only letters are allowed" }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, staffName: "" }));
      }
    }
    if (name === "staff_mobile") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, staffMobile: "Only numbers are allowed" }));
        return;
      }
      if (value.length > 10) return;

      setErrors((prev) => ({ ...prev, staffMobile: "" }));
    }
    if (name === "staff_aadhaar") {
      let cleanedValue = value.replace(/\s+/g, "");
      if (!/^\d*$/.test(cleanedValue)) {
        setErrors((prev) => ({ ...prev, staffAadhaar: "Only numbers are allowed" }));
        return;
      }
      if (cleanedValue.length > 12) return;
      const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      if (cleanedValue.length === 12) {
        setErrors((prev) => ({ ...prev, staffAadhaar: "" }));
      } else if (cleanedValue.length > 0) {
        setErrors((prev) => ({ ...prev, staffAadhaar: "Aadhaar number must be 12 digits" }));
      } else {
        setErrors((prev) => ({ ...prev, staffAadhaar: "" }));
      }

      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // set dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [selectedGroupType, SetSelectedGroupType] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setSelectedPincode(null);
  };
  const handlePincodeSelect = (pincode) => {
    setSelectedPincode(pincode);
  };

  const handleGroupSelect = (groupType) => {
    SetSelectedGroupType(groupType);
  };

  const handleBranch = (branch) => {
    setSelectedBranch(branch);
  };

  // set the updating data

  const dataSet = () => {
    if (editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.staff_state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.staff_district
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === editData.staff_taluk
      );
      setSelectedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDropDown.find(
        (option) => option.value === editData.staff_village
      );
      setSelectedVillage(defaultOptionVillage);
      const defaultOptionPincode = pincodeDropDown.find(
        (option) => option.value === editData.staff_pincode
      );

      setSelectedPincode(defaultOptionPincode);

      const defaultOptionGroup = groupTypeDropDown.find(
        (option) => option.value === editData.staff_group
      );
      SetSelectedGroupType(defaultOptionGroup);

      const defaultOptionBranch = branchDropDown.find(
        (option) => option.value === editData.staff_branch
      );
      setSelectedBranch(defaultOptionBranch);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      staff_state: selectedState ? selectedState.value : "",
      staff_district: selectedDistrict ? selectedDistrict.value : "",
      staff_taluk: selectedTaluk ? selectedTaluk.value : " ",
      staff_village: selectedVillage ? selectedVillage.value : "",
      staff_pincode: selectedPincode ? selectedPincode.value : "",
      staff_group: selectedGroupType ? selectedGroupType.value : "",
      staff_branch: selectedBranch ? selectedBranch.value : "",
    });
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
    selectedGroupType,
    selectedBranch,
  ]);

  // name changing for db
  const dbName = {
    staffId: formData.staff_id,
    staffName: formData.staff_name,
    staffEmail: formData.staff_email,
    staffMobile: formData.staff_mobile,
    staffAadhaar: formData.staff_aadhaar,
    staffAddress: formData.staff_address,
    staffBranch: formData.staff_branch,
    staffGroup: formData.staff_group,
    staffState: formData.staff_state,
    staffDistrict: formData.staff_district,
    staffTaluk: formData.staff_taluk,
    staffVillage: formData.staff_village,
    staffPincode: formData.staff_pincode,
    staffPassword: formData.staff_password,
    staffConfirm: formData.staff_password,
    status: formData.status,
  };

  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = StaffValidation(dbName);
    if (result.isValid) {
      const res = await dispatch(updateStaff(editData.id, dbName));
      if (res.success) {
        setErrors("");
        clear();
        Toast({ message: "Updated Successfully", type: "success" });
      } else {
        const backendErrors = res?.error || {};
        const mappedErrors = {};
        if (backendErrors.staff_email) mappedErrors.staffEmail = backendErrors.staff_email;
        if (backendErrors.staff_mobile) mappedErrors.staffMobile = backendErrors.staff_mobile;
        setErrors((prev) => ({ ...prev, ...mappedErrors }));
      }

    } else {
      setErrors(result.errors);
    }
  };

  const clear = () => {
    setFormData(editData);
    closeModal();
    dataSet();
    setErrors("");
  };
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Update New Staff</h4>
            <button type="button" className="close closebutton" onClick={clear}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    readOnly
                    value={formData.staff_id}
                  />
                  {errors.staffId && (
                    <div className="validation_msg">{errors.staffId}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_name"
                    value={formData.staff_name}
                    onChange={handleChange}
                  />
                  {errors.staffName && (
                    <div className="validation_msg">{errors.staffName}</div>
                  )}
                </div>
                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_email"
                    value={formData.staff_email}
                    onChange={handleChange}
                  />
                  {errors.staffEmail && (
                    <div className="validation_msg">{errors.staffEmail}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Adhaar Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_aadhaar"
                    value={formData.staff_aadhaar}
                    onChange={handleChange}
                  />
                  {errors.staffAadhaar && (
                    <div className="validation_msg">{errors.staffAadhaar}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_mobile"
                    value={formData.staff_mobile}
                    onChange={handleChange}
                  />
                  {errors.staffMobile && (
                    <div className="validation_msg">{errors.staffMobile}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_address"
                    value={formData.staff_address}
                    onChange={handleChange}
                  />
                  {errors.staffAddress && (
                    <div className="validation_msg">{errors.staffAddress}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    Group Type
                  </label>
                  <GroupDropDown
                    onSelect={handleGroupSelect}
                    selectedGroupType={selectedGroupType}
                  />
                  {errors.staffGroup && (
                    <div className="validation_msg">{errors.staffGroup}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    Branch
                  </label>
                  <BranchDropDown
                    onSelect={handleBranch}
                    selectedBranch={selectedBranch}
                  />
                  {errors.staffBranch && (
                    <div className="validation_msg">{errors.staffBranch}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    State
                  </label>
                  <StateDropDown
                    onSelect={handleStateSelect}
                    selectedState={selectedState}
                  />
                  {errors.staffState && (
                    <div className="validation_msg">{errors.staffState}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    District
                  </label>
                  <DistrictDropDown
                    onSelect={handleDistrictSelect}
                    selectedDistrict={selectedDistrict}
                    filter={selectedState}
                  />
                  {errors.staffDistrict && (
                    <div className="validation_msg">{errors.staffDistrict}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    Taluk
                  </label>
                  <TalukDropDown
                    onSelect={handleTalukSelect}
                    selectedTaluk={selectedTaluk}
                    filter={selectedDistrict}
                  />
                  {errors.staffTaluk && (
                    <div className="validation_msg">{errors.staffTaluk}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    Village
                  </label>
                  <VillageDropDown
                    onSelect={handleVillageSelect}
                    selectedVillage={selectedVillage}
                    filter={selectedTaluk}
                  />
                  {errors.staffVillage && (
                    <div className="validation_msg">{errors.staffVillage}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    Pincode
                  </label>
                  <PincodeDropDown
                    onSelect={handlePincodeSelect}
                    selectedPincode={selectedPincode}
                    filter={selectedVillage}
                  />
                  {errors.staffPincode && (
                    <div className="validation_msg">{errors.staffPincode}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_password"
                    value={formData.staff_password}
                    onChange={handleChange}
                  />
                  {errors.staffPassword && (
                    <div className="validation_msg">{errors.staffPassword}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    Status
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                  {errors.status && (
                    <div className="validation_msg">{errors.status}</div>
                  )}
                </div>
              </div>

              <div className="text-end py-3 px-3">
                <button className="btn1 me-1" type="button" onClick={clear}>
                  Clear
                </button>
                <button className="btn1" onClick={onSubmit}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStaffEdit;
