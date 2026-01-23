import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSRODetails } from "../../../Redux/Actions/MasterPage/SRODetailsAction";
import VillageDropDown from "../../../Utils/SelectDropDown/VillageDropDown";
import PincodeDropDown from "../../../Utils/SelectDropDown/PincodeDropDown";
import StateDropDown, {
} from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown, {
} from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown, {
} from "../../../Utils/SelectDropDown/TalukDropDown";
import { FormValidation } from "./FormValidation";
import Toast from "../../../Utils/Toast";
import Common from "../../../common/Common";

const SRODetailsAdd = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const { cleanText } = Common();
  const [formData, setFormData] = useState({
    sroTitle: "",
    sroLandline: "",
    sroMobile: "",
    sroAddress: "",
    sroEmail: "",
    sroState: "",
    sroDistrict: "",
    sroTaluk: "",
    sroLocation: "",
    sroArea: "",
    sroPincode: "",
    status: "",
  });

  // set dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);

  const addLoading = useSelector((state) => state.SRODetails.addLoading);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
  };

  const handlePincodeSelect = (pincode) => {
    setSelectedPincode(pincode);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      sroState: selectedState ? selectedState.value : "",
      sroDistrict: selectedDistrict ? selectedDistrict.value : "",
      sroTaluk: selectedTaluk ? selectedTaluk.value : "",
      sroArea: selectedVillage ? selectedVillage.value : "",
      sroPincode: selectedPincode ? selectedPincode.value : "",
    });
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sroMobile") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      if (value && /\D/.test(value)) {
        setErrors((prev) => ({ ...prev, sroMobile: "Only numbers allowed" }));
      } else if (numericValue.length > 0 && numericValue.length < 10) {
        setErrors((prev) => ({ ...prev, sroMobile: "Must be 10 digits" }));
      } else if (numericValue.length === 10) {
        setErrors((prev) => ({ ...prev, sroMobile: "" }));
      } else {
        setErrors((prev) => ({ ...prev, sroMobile: "" }));
      }

      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      sroEmail: cleanText(formData.sroEmail),
      sroMobile: cleanText(formData.sroMobile),
    };
    const validationResult = FormValidation(newData);

    if (validationResult.isValid) {
      const res = await dispatch(addSRODetails(newData));
      if (res.success) {
        Toast({ message: "Added successfully", type: "success" });
        clearForm();
        setErrors({});
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };

  const clearForm = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
    closeModal();
    setErrors({});

    setFormData({
      sroTitle: "",
      sroLandline: "",
      sroMobile: "",
      sroAddress: "",
      sroEmail: "",
      sroState: "",
      sroDistrict: "",
      sroTaluk: "",
      sroLocation: "",
      sroArea: "",
      sroPincode: "",
      status: "",
    });
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
            <h4 className="page_subheading m-3">Add SRO Details</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={clearForm}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 col-lg-6 mb-3">
                  <label htmlFor="sroTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sroTitle"
                    name="sroTitle"
                    value={formData.sroTitle}
                    onChange={handleChange}
                  />
                  {errors.sroTitle && (
                    <div className="validation_msg">{errors.sroTitle}</div>
                  )}
                </div>
                <div className="col-md-12 col-lg-6 mb-3">
                  <label htmlFor="sroLandline" className="form-label">
                    Landline
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sroLandline"
                    name="sroLandline"
                    value={formData.sroLandline}
                    onChange={handleChange}
                  />
                  {errors.sroLandline && (
                    <div className="validation_msg">{errors.sroLandline}</div>
                  )}
                </div>
                <div className="col-md-12 col-lg-6 mb-3">
                  <label htmlFor="sroMobile" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sroMobile"
                    name="sroMobile"
                    value={formData.sroMobile}
                    onChange={handleChange}
                  />
                  {errors.sroMobile && (
                    <div className="validation_msg">{errors.sroMobile}</div>
                  )}
                </div>
                <div className="col-md-12 col-lg-6 mb-3">
                  <label htmlFor="sroEmail" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sroEmail"
                    name="sroEmail"
                    value={formData.sroEmail}
                    onChange={handleChange}
                  />
                  {errors.sroEmail && (
                    <div className="validation_msg">{errors.sroEmail}</div>
                  )}
                </div>
                <div className="col-md-12 col-lg-6 mb-3">
                  <label htmlFor="sroAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sroAddress"
                    value={formData.sroAddress}
                    onChange={handleChange}
                  />
                  {errors.sroAddress && (
                    <div className="validation_msg">{errors.sroAddress}</div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6 mb-3">
                  <label htmlFor="sroLocation" className="form-label">
                    Geo Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sroLocation"
                    name="sroLocation"
                    value={formData.sroLocation}
                    onChange={handleChange}
                  />
                  {errors.sroLocation && (
                    <div className="validation_msg">{errors.sroLocation}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="sroArea">
                    State
                  </label>
                  <StateDropDown
                    onSelect={handleStateSelect}
                    selectedState={selectedState}
                  />
                  {errors.sroState && (
                    <div className="validation_msg">{errors.sroState}</div>
                  )}
                </div>
                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="sroDistrict">
                    District
                  </label>
                  <DistrictDropDown
                    onSelect={handleDistrictSelect}
                    selectedDistrict={selectedDistrict}
                    filter={selectedState}
                  />
                  {errors.sroDistrict && (
                    <div className="validation_msg">{errors.sroDistrict}</div>
                  )}
                </div>
                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="sroDistrict">
                    Taluk
                  </label>
                  <TalukDropDown
                    onSelect={handleTalukSelect}
                    selectedTaluk={selectedTaluk}
                    filter={selectedDistrict}
                  />
                  {errors.sroTaluk && (
                    <div className="validation_msg">{errors.sroTaluk}</div>
                  )}
                </div>
                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="sroDistrict">
                    Village
                  </label>
                  <VillageDropDown
                    onSelect={handleVillageSelect}
                    selectedVillage={selectedVillage}
                    filter={selectedTaluk}
                  />
                  {errors.sroArea && (
                    <div className="validation_msg">{errors.sroArea}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label htmlFor="sroPincode" className="form-label">
                    Pincode
                  </label>
                  <PincodeDropDown
                    onSelect={handlePincodeSelect}
                    selectedPincode={selectedPincode}
                    filter={selectedVillage}
                  />
                  {errors.sroPincode && (
                    <div className="validation_msg">{errors.sroPincode}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12 col-lg-6">
                  <label className="form-label" htmlFor="status">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option disable>---Select The Status---</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>

                  {errors.status && (
                    <div className="validation_msg">{errors.status}</div>
                  )}
                </div>
              </div>
              <div className="text-end py-3 px-3">
                <button type="button" className="btn1 me-1" onClick={clearForm}>
                  Cancel
                </button>
                <button type="submit" className="btn1" disabled={addLoading}>
                  {addLoading ? "processing..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRODetailsAdd;
