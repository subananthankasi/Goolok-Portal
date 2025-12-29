import React, { useEffect, useState } from "react";
import PincodeDropDown, {
  usePincodeOptions,
} from "../../../Utils/SelectDropDown/PincodeDropDown";
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
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranch,
  fetchBranch,
  fetchBranchID,
  updateBranch,
} from "../../../Redux/Actions/MasterPage/BranchAction";
import Toast from "../../../Utils/Toast";
import { BranchValidateFormData } from "./BranchValidateFormData ";
import Common from "../../../common/Common";

const BranchEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();
  const branchData = useSelector((state) => state.Branch.selectedBranchID);
  const updateLoading = useSelector((state) => state.Branch.updateLoading);

  useEffect(() => {
    dispatch(fetchBranchID());
    dispatch(fetchBranch());
  }, [dispatch]);
  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();
  const pincodeDropDown = usePincodeOptions();

  const [formData, setFormData] = useState({
    branchid: "",
    branch_name: " ",
    short_name: " ",
    branch_state: " ",
    branch_district: " ",
    branch_taluk: " ",
    branch_village: " ",
    branch_pincode: " ",
    contact_person: " ",
    mobile: " ",
    email: " ",
    geo_location: " ",
    status: " ",
  });

  // set the updating data
  const dataSet = () => {
    if (editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.branch_state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.branch_district
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === editData.branch_taluk
      );
      setSelectedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDropDown.find(
        (option) => option.value === editData.branch_village
      );
      setSelectedVillage(defaultOptionVillage);

      const defaultOptionPincodew = pincodeDropDown.find(
        (option) => option.value === editData.branch_pincode
      );
      setSelectedPincode(defaultOptionPincodew);
    }
  };

  useEffect(() => {
    dataSet();
  }, [editData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

    const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "mobile") {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

    setFormData(prev => ({ ...prev, mobile: numbersOnly }));

    if (value && /\D/.test(value)) {
      setErrors(prev => ({ ...prev, mobile: "Only numbers allowed" }));
    } else if (numbersOnly.length > 0 && numbersOnly.length < 10) {
      setErrors(prev => ({ ...prev, mobile: "Mobile number must be 10 digits" }));
    } else if (numbersOnly.length === 10) {
      setErrors(prev => ({ ...prev, mobile: "" }));
    } else {
      setErrors(prev => ({ ...prev, mobile: "" }));
    }
    return;
  }
  if (name === "contact_person") {
    const lettersOnly = value.replace(/[^A-Za-z\s]/g, "");

    setFormData(prev => ({ ...prev, contact_person: lettersOnly }));

    if (value && lettersOnly !== value) {
      setErrors(prev => ({ ...prev, contact_person: "Only letters allowed" }));
    } else {
      setErrors(prev => ({ ...prev, contact_person: "" }));
    }
    return;
  }

  setFormData(prev => ({ ...prev, [name]: value }));
};


  // set dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setSelectedPincode(null);
  };
  const handlePincodeSelect = (pincode) => {
    setSelectedPincode(pincode);
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        ...formData,
        branchid: editData.branchid,
        branch_name: editData.branch_name,
        short_name: editData.short_name,
        contact_person: editData.contact_person,
        mobile: editData.mobile,
        email: editData.email,
        geo_location: editData.geo_location,
        status: editData.status,
        branch_state: selectedState ? selectedState.value : "",
        branch_district: selectedDistrict ? selectedDistrict.value : "",
        branch_taluk: selectedTaluk ? selectedTaluk.value : "",
        branch_village: selectedVillage ? selectedVillage.value : "",
        branch_pincode: selectedPincode ? selectedPincode.value : "",
      });
    }
  }, [
    editData,
    branchData,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
  ]);

  //  submit and update
  const [errors, setErrors] = useState({}); //validation messages

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const result = BranchValidateFormData(formData);
  //   if (result.isValid) {
  //     Toast({ message: "Updated Successfully", type: "success" });
  //     await dispatch(updateBranch(editData.id, formData));
  //     clear();
  //     setErrors("");
  //   } else {
  //     setErrors(result.errors);
  //   }
  // };

  const { cleanText, cleanObjectValues } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedForm = cleanObjectValues(formData);
    const payload = [cleanedForm];
    const result = BranchValidateFormData(cleanedForm);
    if (result.isValid) {
      const res = await dispatch(updateBranch(editData.id, formData));
      if (res.success) {
        Toast({ message: "Updated Successfully", type: "success" });
        await dispatch(fetchBranchID());
        clear();
        setErrors("");
      } else {
        setErrors(res?.error);
      }

    } else {
      setErrors(result.errors);
    }
  };
  const clear = async () => {
    dataSet();
    closeModal();
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
            <h4 className="page_subheading m-3">Branch Creation</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={() => {
                clear();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-12 col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Branch ID
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    name="branchid"
                    value={formData.branchid}
                    disabled={formData.branchid}
                  />
                </div>

                <div className="col-md-12 col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Short Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="short_name"
                    value={formData.short_name}
                    onChange={handleChange}
                  />
                  {errors.short_name && (
                    <div className="validation_msg">{errors.short_name}</div>
                  )}
                </div>

                <div className="col-md-12  col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="branch_name"
                    value={formData.branch_name}
                    onChange={handleChange}
                  />
                  {errors.branch_name && (
                    <div className="validation_msg">{errors.branch_name}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && (
                    <div className="validation_msg">{errors.mobile}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                  />
                  {errors.contact_person && (
                    <div className="validation_msg">
                      {errors.contact_person}
                    </div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="validation_msg">{errors.email}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Geo Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="geo_location"
                    value={formData.geo_location}
                    onChange={handleChange}
                  />
                  {errors.geo_location && (
                    <div className="validation_msg">{errors.geo_location}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="inputState">
                    State
                  </label>
                  <StateDropDown
                    onSelect={handleStateSelect}
                    selectedState={selectedState}
                  />
                  {errors.branch_state && (
                    <div className="validation_msg">{errors.branch_state}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="inputState">
                    District
                  </label>
                  <DistrictDropDown
                    onSelect={handleDistrictSelect}
                    selectedDistrict={selectedDistrict}
                    filter={selectedState}
                  />
                  {errors.branch_district && (
                    <div className="validation_msg">
                      {errors.branch_district}
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="inputState">
                    Taluk
                  </label>
                  <TalukDropDown
                    onSelect={handleTalukSelect}
                    selectedTaluk={selectedTaluk}
                    filter={selectedDistrict}
                  />
                  {errors.branch_taluk && (
                    <div className="validation_msg">{errors.branch_taluk}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="inputState">
                    Village
                  </label>
                  <VillageDropDown
                    onSelect={handleVillageSelect}
                    selectedVillage={selectedVillage}
                    filter={selectedTaluk}
                  />
                  {errors.branch_village && (
                    <div className="validation_msg">
                      {errors.branch_village}
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="inputState">
                    Pincode
                  </label>
                  <PincodeDropDown
                    onSelect={handlePincodeSelect}
                    selectedPincode={selectedPincode}
                    filter={selectedVillage}
                  />
                  {errors.branch_pincode && (
                    <div className="validation_msg">
                      {errors.branch_pincode}
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
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
                  Cancel
                </button>

                <button
                  className="btn1"
                  onClick={handleSubmit}
                  disabled={updateLoading}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchEdit;
