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
import PincodeDropDown, {
  usePincodeOptions,
} from "../../../Utils/SelectDropDown/PincodeDropDown";
import { useDispatch } from "react-redux";
import Toast from "../../../Utils/Toast";
import { updateVendor } from "../../../Redux/Actions/MasterPage/VendorAction";
import { ValidationVendor } from "./ValidationVendor";

const NewVendorEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();

  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();
  const pincodeDropDown = usePincodeOptions();


  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, username: "Only letters are allowed" }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    }
    if (name === "vendor_mobile") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, vendor_mobile: "Only numbers are allowed" }));
        return;
      }
      if (value.length > 10) return;

      setErrors((prev) => ({ ...prev, vendor_mobile: "" }));
    }
    if (name === "vendor_aadhaar") {
      let cleanedValue = value.replace(/\s+/g, "");
      if (!/^\d*$/.test(cleanedValue)) {
        setErrors((prev) => ({ ...prev, vendor_aadhaar: "Only numbers are allowed" }));
        return;
      }
      if (cleanedValue.length > 12) return;
      const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      if (cleanedValue.length === 12) {
        setErrors((prev) => ({ ...prev, vendor_aadhaar: "" }));
      } else if (cleanedValue.length > 0) {
        setErrors((prev) => ({ ...prev, vendor_aadhaar: "Aadhaar number must be 12 digits" }));
      } else {
        setErrors((prev) => ({ ...prev, vendor_aadhaar: "" }));
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


  // set the updating data

  const dataSet = () => {

    if (editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.vendor_state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.vendor_district
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === editData.vendor_taluk
      );
      setSelectedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDropDown.find(
        (option) => option.value === editData.vendor_village
      );
      setSelectedVillage(defaultOptionVillage);

      const defaultOptionPincode = pincodeDropDown.find(
        (option) => option.value === editData.vendor_pincode
      );
      setSelectedPincode(defaultOptionPincode);

    }

  }

  useEffect(() => {
    dataSet()
  }, [editData]);

  useEffect(() => {
    setFormData({
      ...formData,
      vendor_state: selectedState ? selectedState.value : "",
      vendor_district: selectedDistrict ? selectedDistrict.value : "",
      vendor_taluk: selectedTaluk ? selectedTaluk.value : " ",
      vendor_village: selectedVillage ? selectedVillage.value : "",
      vendor_pincode: selectedPincode ? selectedPincode.value : "",
    });
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
  ]);

  // name changing for db
  const dbName = {
    vendorId: formData.vendor_id,
    vendorName: formData.username,
    vendorEmail: formData.vendor_email,
    vendorMobile: formData.vendor_mobile,
    vendorAadhaar: formData.vendor_aadhaar,
    vendorAddress: formData.vendor_address,
    vendorState: formData.vendor_state,
    vendorDistrict: formData.vendor_district,
    vendorTaluk: formData.vendor_taluk,
    vendorVillage: formData.vendor_village,
    vendorPincode: formData.vendor_pincode,
    status: formData.status,
  };

  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    const result = ValidationVendor(dbName);
    if (result.isValid) {
      Toast({ message: "Updated Successfully", type: "success" });
      dispatch(updateVendor(editData.id, dbName));
      setErrors("");
      clear();
    } else {
      setErrors(result.errors);
    }
  };

  const clear = () => {
    setFormData(editData);
    closeModal();
    dataSet()
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
            <h4 className="page_subheading m-3">Update Vendor</h4>
            <button type="button" className="close closebutton" onClick={clear}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Vendor ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    readOnly
                    value={formData.vendor_id}
                  />
                  {errors.vendorId && <div className="validation_msg">{errors.vendorId}</div>}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.vendorName && <div className="validation_msg">{errors.vendorName}</div>}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_email"
                    value={formData.vendor_email}
                    onChange={handleChange}
                  />
                  {errors.vendorEmail && <div className="validation_msg">{errors.vendorEmail}</div>}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Adhaar Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_aadhaar"
                    value={formData.vendor_aadhaar}
                    onChange={handleChange}
                  />
                  {errors.vendorAadhaar && <div className="validation_msg">{errors.vendorAadhaar}</div>}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_mobile"
                    value={formData.vendor_mobile}
                    onChange={handleChange}
                  />
                  {errors.vendorMobile && <div className="validation_msg">{errors.vendorMobile}</div>}
                </div>

                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_address"
                    value={formData.vendor_address}
                    onChange={handleChange}
                  />
                  {errors.vendorAddress && <div className="validation_msg">{errors.vendorAddress}</div>}
                </div>





                <div className="col-md-12 col-lg-6  mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    State
                  </label>
                  <StateDropDown
                    onSelect={handleStateSelect}
                    selectedState={selectedState}
                  />
                  {errors.vendorState && <div className="validation_msg">{errors.vendorState}</div>}
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
                  {errors.vendorDistrict && <div className="validation_msg">{errors.vendorDistrict}</div>}
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
                  {errors.vendorTaluk && <div className="validation_msg">{errors.vendorTaluk}</div>}
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
                  {errors.vendorVillage && <div className="validation_msg">{errors.vendorVillage}</div>}
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
                  {errors.vendorPincode && <div className="validation_msg">{errors.vendorPincode}</div>}
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
                  {errors.status && <div className="validation_msg">{errors.status}</div>}
                </div>
              </div>



              <div className="text-end py-3 px-3">
                <button className="btn1 me-1" type="button" onClick={clear}>
                  Close
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

export default NewVendorEdit;
