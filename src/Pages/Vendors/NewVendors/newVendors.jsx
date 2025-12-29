import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import StateDropDown from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown from "../../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown from "../../../Utils/SelectDropDown/VillageDropDown";
import PincodeDropDown from "../../../Utils/SelectDropDown/PincodeDropDown";
import Toast from "../../../Utils/Toast";
import { addVendor, fetchVendor, fetchVendorID } from "../../../Redux/Actions/MasterPage/VendorAction";
import { ValidationVendor } from "./ValidationVendor";
import Common from "../../../common/Common";

function NewStaff() {

  const dispatch = useDispatch();

  const autoVendorID = useSelector((state) => state.vendor.vendorID);


  useEffect(() => {
    dispatch(fetchVendor());
    dispatch(fetchVendorID());
  }, [dispatch]);


  useEffect(() => {
    if (autoVendorID) {
      setFormData((prevData) => ({ ...prevData, vendorId: autoVendorID }));
    }
  }, [autoVendorID]);


  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    vendorEmail: "",
    vendorMobile: " ",
    vendorAadhaar: "",
    vendorAddress: "",
    vendorState: "",
    vendorDistrict: "",
    vendorTaluk: "",
    vendorVillage: "",
    vendorPincode: "",
    status: "Enable",
  });


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vendorMobile") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, vendorMobile: digitsOnly }));

      if (value.length === 0) {
        setErrors(prev => ({ ...prev, vendorMobile: "" }));
      } else if (/\D/.test(value)) {
        setErrors(prev => ({ ...prev, vendorMobile: "Only numbers are allowed" }));
      } else if (digitsOnly.length < 10) {
        setErrors(prev => ({ ...prev, vendorMobile: "Mobile number must be 10 digits" }));
      } else {
        setErrors(prev => ({ ...prev, vendorMobile: "" }));
      }
      return;
    }

    if (name === "vendorAadhaar") {
      const cleaned = value.replace(/\D/g, "").slice(0, 12);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setFormData(prev => ({ ...prev, vendorAadhaar: formatted }));

      if (cleaned.length === 0) {
        setErrors(prev => ({ ...prev, vendorAadhaar: "" }));
      } else if (cleaned.length < 12) {
        setErrors(prev => ({ ...prev, vendorAadhaar: "Aadhaar number must be 12 digits" }));
      } else {
        setErrors(prev => ({ ...prev, vendorAadhaar: "" }));
      }
      return;
    }

    // NAME: allow only letters and spaces. Show error if user typed invalid chars
    if (name === "vendorName") {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, "");
      setFormData(prev => ({ ...prev, vendorName: lettersOnly }));

      if (value.length === 0) {
        setErrors(prev => ({ ...prev, vendorName: "" }));
      } else if (lettersOnly !== value) {
        setErrors(prev => ({ ...prev, vendorName: "Only letters are allowed" }));
      } else {
        setErrors(prev => ({ ...prev, vendorName: "" }));
      }
      return;
    }

    // default: other fields unchanged
    setFormData(prevState => ({ ...prevState, [name]: value }));
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
    setFormData({
      ...formData,
      vendorState: selectedState ? selectedState.value : "",
      vendorDistrict: selectedDistrict ? selectedDistrict.value : "",
      vendorTaluk: selectedTaluk ? selectedTaluk.value : "",
      vendorVillage: selectedVillage ? selectedVillage.value : "",
      vendorPincode: selectedPincode ? selectedPincode.value : "",
      status: "Enable",
    })
  }, [selectedState, selectedDistrict, selectedTaluk, selectedVillage, selectedPincode])


  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false)
  const { cleanText } = Common();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = ValidationVendor(formData)
    if (result.isValid) {
      const newData = {
        ...formData,
        vendorName: cleanText(formData.vendorName),
        vendorEmail: cleanText(formData.vendorEmail),
      };
      const res = await dispatch(addVendor(newData));
      if (res.success) {
        dispatch(fetchVendorID())
        clear()
        Toast({ message: "Added Successfully", type: "success" });
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(result.errors)
    }
  };

  const clear = () => {
    setFormData({
      vendorId: "",
      vendorName: "",
      vendorEmail: "",
      vendorMobile: " ",
      vendorAadhaar: "",
      vendorAddress: "",
      vendorState: "",
      vendorDistrict: "",
      vendorTaluk: "",
      vendorVillage: "",
      vendorPincode: "",
      status: "Enable",
    });
    setErrors("")
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedState(null);
    setSelectedPincode(null);
  }
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
                      <h4 className="page_heading">Add Vendor</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12 ">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Vendor ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            name="vendorId"
                            value={autoVendorID}
                          />
                          {errors.vendorId && <div className="validation_msg">{errors.vendorId}</div>}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Vendor Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="vendorName"
                            value={formData.vendorName}
                            onChange={handleChange}
                          />
                          {errors.vendorName && <div className="validation_msg">{errors.vendorName}</div>}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Email ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="vendorEmail"
                            value={formData.vendorEmail}
                            onChange={handleChange}
                          />
                          {errors.vendorEmail && <div className="validation_msg">{errors.vendorEmail}</div>}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Adhaar Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="vendorAadhaar"
                            value={formData.vendorAadhaar}
                            onChange={handleChange}
                          />
                          {errors.vendorAadhaar && <div className="validation_msg">{errors.vendorAadhaar}</div>}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Phone number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="vendorMobile"
                            value={formData.vendorMobile}
                            onChange={handleChange}
                          />
                          {errors.vendorMobile && <div className="validation_msg">{errors.vendorMobile}</div>}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                          <label htmlFor="lastName" className="form-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="vendorAddress"
                            value={formData.vendorAddress}
                            onChange={handleChange}
                          />
                          {errors.vendorAddress && <div className="validation_msg">{errors.vendorAddress}</div>}
                        </div>


                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label"  >
                            State
                          </label>
                          <StateDropDown
                            onSelect={handleStateSelect}
                            selectedState={selectedState}
                          />
                          {errors.vendorState && <div className="validation_msg">{errors.vendorState}</div>}

                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label"  >
                            District
                          </label>
                          <DistrictDropDown
                            onSelect={handleDistrictSelect}
                            selectedDistrict={selectedDistrict}
                            filter={selectedState}
                          />
                          {errors.vendorDistrict && <div className="validation_msg">{errors.vendorDistrict}</div>}

                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label"  >
                            Taluk
                          </label>
                          <TalukDropDown
                            onSelect={handleTalukSelect}
                            selectedTaluk={selectedTaluk}
                            filter={selectedDistrict}
                          />
                          {errors.vendorTaluk && <div className="validation_msg">{errors.vendorTaluk}</div>}

                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label"  >
                            Village
                          </label>
                          <VillageDropDown
                            onSelect={handleVillageSelect}
                            selectedVillage={selectedVillage}
                            filter={selectedTaluk}
                          />
                          {errors.vendorVillage && <div className="validation_msg">{errors.vendorVillage}</div>}

                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label"  >
                            Pincode
                          </label>
                          <PincodeDropDown
                            onSelect={handlePincodeSelect}
                            selectedPincode={selectedPincode}
                            filter={selectedVillage}
                          />
                          {errors.vendorPincode && <div className="validation_msg">{errors.vendorPincode}</div>}

                        </div>


                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label className="form-label"  >
                            Status
                          </label>
                          <select id="inputState" className="form-select" name="status"
                            value={formData.status}
                            onChange={handleChange}>
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                          </select>
                          {errors.status && <div className="validation_msg">{errors.status}</div>}

                        </div>





                        <div className="text-end  ">
                          <button className="btn1 me-1" type="button" onClick={clear}>Clear</button>
                          <button type="submit" className="  btn1">
                            Add
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
