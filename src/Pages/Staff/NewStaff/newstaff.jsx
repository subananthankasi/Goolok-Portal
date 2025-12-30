import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addStaff,
  fetchStaff,
  fetchStaffID,
} from "../../../Redux/Actions/MasterPage/Staff";
import StateDropDown from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown from "../../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown from "../../../Utils/SelectDropDown/VillageDropDown";
import PincodeDropDown from "../../../Utils/SelectDropDown/PincodeDropDown";
import GroupDropDown from "../../../Utils/SelectDropDown/GroupTypeDropDown";
import { StaffValidation } from "./StaffValidation";
import BranchDropDown from "../../../Utils/SelectDropDown/BranchDropDown";
import Toast from "../../../Utils/Toast";
import Common from "../../../common/Common";

function NewStaff() {
  const dispatch = useDispatch();

  const autoStaffID = useSelector((state) => state.staff.staffID);

  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchStaffID());
  }, [dispatch]);

  useEffect(() => {
    if (autoStaffID) {
      setFormData((prevData) => ({ ...prevData, staffId: autoStaffID }));
    }
  }, [autoStaffID]);

  const [formData, setFormData] = useState({
    staffId: "",
    staffName: "",
    staffEmail: "",
    staffMobile: "",
    staffAadhaar: "",
    staffAddress: "",
    staffBranch: "",
    staffGroup: "",
    staffState: "",
    staffDistrict: "",
    staffTaluk: "",
    staffVillage: "",
    staffPincode: "",
    staffPassword: "",
    staffConfirm: "",
    role: "",
    status: "Enable",
  });

  const [password, setPassword] = useState({
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");


  // set dropdown



  //  const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => {
  //     const updatedFormData = {
  //       ...prevState,
  //       [name]: value,
  //     };

  //     if (
  //       name === "staffPassword" &&
  //       password.confirmPassword !== "" &&
  //       password.confirmPassword !== value
  //     ) {
  //       setPasswordError("Passwords do not match");
  //     } else if (
  //       name === "staffPassword" &&
  //       password.confirmPassword === value
  //     ) {
  //       setPasswordError("");
  //     }

  //     return updatedFormData;
  //   });
  // };
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    //  MOBILE 
    if (name === "staffMobile") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, staffMobile: "Only numbers are allowed" }));
        return;
      }

      if (value.length > 10) return;

      setErrors((prev) => ({ ...prev, staffMobile: "" }));
      setFormData((prev) => ({ ...prev, staffMobile: value }));
      return;
    }

    // AADHAAR
    if (name === "staffAadhaar") {
      let cleanedValue = value.replace(/\s+/g, "");

      if (!/^\d*$/.test(cleanedValue)) {
        setErrors(prev => ({ ...prev, staffAadhaar: "Only numbers are allowed" }));
        return;
      }

      if (cleanedValue.length > 12) return;

      const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

      if (cleanedValue.length === 12) {
        setErrors(prev => ({ ...prev, staffAadhaar: "" }));
      } else if (cleanedValue.length > 0) {
        setErrors(prev => ({ ...prev, staffAadhaar: "Aadhaar number must be 12 digits" }));
      } else {
        setErrors(prev => ({ ...prev, staffAadhaar: "" }));
      }

      setFormData(prev => ({ ...prev, staffAadhaar: formattedValue }));
      return;
    }

    // STAFF NAME
    if (name === "staffName") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors(prev => ({ ...prev, staffName: "Only letters are allowed" }));
        return;
      }

      setErrors(prev => ({ ...prev, staffName: "" }));
      setFormData(prev => ({ ...prev, staffName: value }));
      return;
    }

    // OTHER FIELDS
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };

      if (
        name === "staffPassword" &&
        password.confirmPassword !== "" &&
        password.confirmPassword !== value
      ) {
        setPasswordError("Passwords do not match");
      } else if (name === "staffPassword" && password.confirmPassword === value) {
        setPasswordError("");
      }

      return updatedFormData;
    });
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => {
      const updatedPassword = {
        ...prevState,
        [name]: value,
      };


      if (value === "") {
        setPasswordError("");
      } else if (value !== formData.staffPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }

      return updatedPassword;
    });
  };



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

  const handleGroupSelect = (groupType) => {
    SetSelectedGroupType(groupType);
  };

  const handleBranch = (branch) => {
    setSelectedBranch(branch);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      staffConfirm: formData.staffPassword,
      staffBranch: selectedBranch ? selectedBranch.value : "",
      staffGroup: selectedGroupType ? selectedGroupType.value : "",
      staffState: selectedState ? selectedState.value : "",
      staffDistrict: selectedDistrict ? selectedDistrict.value : "",
      staffTaluk: selectedTaluk ? selectedTaluk.value : "",
      staffVillage: selectedVillage ? selectedVillage.value : "",
      staffPincode: selectedPincode ? selectedPincode.value : "",
      status: "Enable",
    });
  }, [
    formData.staffPassword,
    selectedGroupType,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
    selectedBranch,
  ]);

  const { cleanText } = Common();
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const result = StaffValidation(formData);
    if (result.isValid && passwordError === "") {
      const newData = {
        ...formData,
        staffName: cleanText(formData.staffName),
        staffEmail: cleanText(formData.staffEmail),
      };
      const res = await dispatch(addStaff(newData));
      if (res.success) {
        dispatch(fetchStaffID());
        clear();
        Toast({ message: "Added Successfully", type: "success" });
      } else {
        const backendErrors = res?.error || {};
        const mappedErrors = {};
        if (backendErrors.staff_email) mappedErrors.staffEmail = backendErrors.staff_email;
        if (backendErrors.staff_mobile) mappedErrors.staffMobile = backendErrors.staff_mobile;
        setErrors((prev) => ({ ...prev, ...mappedErrors }));
      }
      setLoading(false)
    } else {
      setErrors(result.errors);
      setLoading(false)
    }
  };

  const clear = () => {
    setFormData({
      staffId: "",
      staffName: "",
      staffEmail: "",
      staffMobile: "",
      staffAadhaar: "",
      staffAddress: "",
      staffBranch: "",
      staffGroup: "",
      staffState: "",
      staffDistrict: "",
      staffTaluk: "",
      staffVillage: "",
      staffPincode: "",
      staffPassword: "",
      status: "Enable",
    });
    setErrors("");
    setPasswordError("")
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedState(null);
    setSelectedPincode(null);
    setSelectedBranch(null);
    SetSelectedGroupType(null);
    setPassword({
      confirmPassword: "",
    });
  };
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <h4 className="page_heading">New Staff Creation</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12 ">
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Staff ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            name="staffId"
                            value={autoStaffID}
                          />
                          {errors.staffId && (
                            <div className="validation_msg">
                              {errors.staffId}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Staff Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="staffName"
                            value={formData.staffName}
                            onChange={handleChange}
                          />
                          {errors.staffName && (
                            <div className="validation_msg">
                              {errors.staffName}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Email ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="staffEmail"
                            value={formData.staffEmail}
                            onChange={handleChange}
                            autoComplete="new-password"
                          />
                          {errors.staffEmail && (
                            <div className="validation_msg">
                              {errors.staffEmail}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Adhaar Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="staffAadhaar"
                            value={formData.staffAadhaar}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          {errors.staffAadhaar && (
                            <div className="validation_msg">
                              {errors.staffAadhaar}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Phone number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="staffMobile"
                            value={formData.staffMobile}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          {errors.staffMobile && (
                            <div className="validation_msg">
                              {errors.staffMobile}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="staffAddress"
                            value={formData.staffAddress}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          {errors.staffAddress && (
                            <div className="validation_msg">
                              {errors.staffAddress}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">Group Type</label>
                          <GroupDropDown
                            onSelect={handleGroupSelect}
                            selectedGroupType={selectedGroupType}
                          />
                          {errors.staffGroup && (
                            <div className="validation_msg">
                              {errors.staffGroup}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">Branch</label>
                          <BranchDropDown
                            onSelect={handleBranch}
                            selectedBranch={selectedBranch}
                          />
                          {errors.staffBranch && (
                            <div className="validation_msg">
                              {errors.staffBranch}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">State</label>
                          <StateDropDown
                            onSelect={handleStateSelect}
                            selectedState={selectedState}
                          />
                          {errors.staffState && (
                            <div className="validation_msg">
                              {errors.staffState}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">District</label>
                          <DistrictDropDown
                            onSelect={handleDistrictSelect}
                            selectedDistrict={selectedDistrict}
                            filter={selectedState}
                          />
                          {errors.staffDistrict && (
                            <div className="validation_msg">
                              {errors.staffDistrict}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">Taluk</label>
                          <TalukDropDown
                            onSelect={handleTalukSelect}
                            selectedTaluk={selectedTaluk}
                            filter={selectedDistrict}
                          />
                          {errors.staffTaluk && (
                            <div className="validation_msg">
                              {errors.staffTaluk}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">Village</label>
                          <VillageDropDown
                            onSelect={handleVillageSelect}
                            selectedVillage={selectedVillage}
                            filter={selectedTaluk}
                          />
                          {errors.staffVillage && (
                            <div className="validation_msg">
                              {errors.staffVillage}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">Pincode</label>
                          <PincodeDropDown
                            onSelect={handlePincodeSelect}
                            selectedPincode={selectedPincode}
                            filter={selectedVillage}
                          />
                          {errors.staffPincode && (
                            <div className="validation_msg">
                              {errors.staffPincode}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="staffPassword"
                            value={formData.staffPassword}
                            onChange={handleChange}
                          />
                          {errors.staffPassword && (
                            <div className="validation_msg">
                              {errors.staffPassword}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={password.confirmPassword}
                            onChange={handleChangePassword}
                          />
                          {passwordError && (
                            <p
                              className="error-message text-danger"
                              style={{ fontSize: "12px" }}
                            >
                              {passwordError}
                            </p>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label">Status</label>
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
                            <div className="validation_msg">
                              {errors.status}
                            </div>
                          )}
                        </div>

                        <div className="text-end  ">
                          <button
                            className="btn1 me-1"
                            type="button"
                            onClick={clear}
                          >
                            Clear
                          </button>
                          <button type="submit" className="  btn1" disabled={loading} >
                            {loading ? "Adding..." : "Add"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewStaff;
