import React, { useEffect, useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerData,
  fetchCustomerID, 
} from "../../Redux/Actions/Customer/CustomerAction";
import DistrictDropDown from "../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown from "../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown from "../../Utils/SelectDropDown/VillageDropDown";
import PincodeDropDown from "../../Utils/SelectDropDown/PincodeDropDown";
import StateDropDown from "../../Utils/SelectDropDown/StateDropDown"; 
 

function Customer() {
  // for tab
  let navigate = useNavigate();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  }; 
 
  const dispatch = useDispatch(); 

  const customerID = useSelector((state) => state.Customer.customerID); 
 
  const [formData, setFormData] = useState({
    customer_id: "",
    customer: "",
    customer_sex: "",
    customer_dob: "",
    customer_mobile: "",
    customer_email: "",
    customer_address: "",
    customer_state: "",
    customer_district: "",
    customer_taluk: "",
    customer_village: "",
    customer_pincode: "",
    status: "",
    gst_number: "",
    gst_name: "",
    aadhar: "",
    pan_number: "",
    aadhar_pic: "",
    acc_name: "",
    acc_number: "",
    bank_name: "",
    ifsc_code: "",
    branch: "",
    passbook_pic: "",
  });
  

  useEffect(() => {
    dispatch(fetchCustomerID());
  }, [dispatch]);

  

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
      customer_id:customerID ? customerID :"", 
      customer_state: selectedState ? selectedState.value : "",
      customer_district: selectedDistrict ? selectedDistrict.value : "",
      customer_taluk: selectedTaluk ? selectedTaluk.value : "",
      customer_village: selectedVillage ? selectedVillage.value : "",
      customer_pincode: selectedPincode ? selectedPincode.value : "",
      status: "Enable",
    });
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
    customerID
  ]);

   

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
 
    const handleSubmit = (e) => {
      e.preventDefault();   
        dispatch(addCustomerData(formData)) 
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
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="javascript:void(0)"
                          onClick={() => setStep(1)}
                        >
                          Add Customer
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="javascript:void(0)"
                          onClick={() => setStep(2)}
                        >
                          Customer Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="javascript:void(0)"
                          onClick={() => setStep(3)}
                        >
                          Account Details
                        </a>
                      </nav>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <button className="btn1" onClick={() => navigate(-1)}>
                        <ArrowBackIcon /> back
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <form>
                    {step === 1 && (
                      <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Customer ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            name="customer_id"
                            value={formData.customer_id}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-12 col-lg-6  mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            value={formData.customer}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Sex
                          </label> 
                          <select
                            id="inputState"
                            className="form-select"
                            name="customer_sex"
                            value={formData.customer_sex}
                            onChange={handleChange}
                          >
                            <option disable value="">
                              --Select Sex--
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6 ">
                          <label className="form-label" htmlFor="inputState">
                            DOB
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="customer_dob"
                            value={formData.customer_dob}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-12">
                          <label className="form-label" htmlFor="inputState">
                            Mobile Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="customer_mobile"
                            value={formData.customer_mobile}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                          <label className="form-label" htmlFor="inputState">
                            Email Id
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Address 1
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="customer_address"
                            value={formData.customer_address}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6 ">
                          <label className="form-label" htmlFor="inputState">
                            State
                          </label>
                          <StateDropDown
                            onSelect={handleStateSelect}
                            selectedState={selectedState}
                          />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-12">
                          <label htmlFor="lastName" className="form-label">
                            District
                          </label>
                          <DistrictDropDown
                            onSelect={handleDistrictSelect}
                            selectedDistrict={selectedDistrict}
                            filter={selectedState}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6 ">
                          <label className="form-label" htmlFor="inputState">
                            Taluk
                          </label>
                          <TalukDropDown
                            onSelect={handleTalukSelect}
                            selectedTaluk={selectedTaluk}
                            filter={selectedDistrict}
                          />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-12">
                          <label htmlFor="lastName" className="form-label">
                            Village
                          </label>
                          <VillageDropDown
                            onSelect={handleVillageSelect}
                            selectedVillage={selectedVillage}
                            filter={selectedTaluk}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6 ">
                          <label className="form-label" htmlFor="inputState">
                            Pincode
                          </label>
                          <PincodeDropDown
                            onSelect={handlePincodeSelect}
                            selectedPincode={selectedPincode}
                            filter={selectedVillage}
                          />
                        </div>

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2">Clear</button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="row">
                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">GST Number</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="gst_number"
                                  value={formData.gst_number}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Aadhar Number
                                </label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="aadhar"
                                  value={formData.aadhar}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Aadhar Upload
                                </label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="file"
                                  className="form-control"
                                  name="aadhar_pic"
                                  onChange={handleChange}
                                />
                              </div>

                           
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">GST Name</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="gst_name"
                                  value={formData.gst_name}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">PAN number</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="pan_number"
                                  value={formData.pan_number}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2" onClick={prevStep}>
                            Previous
                          </button>

                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="row">
                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Account Name
                                </label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="acc_name"
                                  value={formData.acc_name}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Bank Name</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bank_name"
                                  value={formData.bank_name}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Branch</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="branch"
                                  value={formData.branch}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">
                                  Account Number
                                </label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="acc_number"
                                  value={formData.acc_number}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">IFSC Code</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="ifsc_code"
                                  value={formData.ifsc_code}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">
                                  Upload Passbook
                                </label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="file"
                                  className="form-control"
                                  name="passbook_pic"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        <div className="text-end mt-3 py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={handleSubmit}>
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </>
  );
}

export default Customer;
