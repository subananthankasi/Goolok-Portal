import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../../../Property Management/propertyManagement.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import AmenitiesCharges from "./AmenitiesCharges";
import PropertyCharges from "./PropertyCharges"; 
import API_BASE_URL from "../../../../Api/api";
import axios from "axios";
import Toast from "../../../../Utils/Toast";
import Spinner from 'react-bootstrap/Spinner';

function LandAdminDepartment() {
  let navigate = useNavigate();

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  
 
 


// get the data details 
const [statusUrl, setStatusUrl] = useState({
  status: ""
}); 

const location = useLocation(); 
const params = new URLSearchParams(location.search);
const id = params.get("id"); 

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const statusParam = params.get('status'); 
  setStatusUrl(prevState => ({
      ...prevState,
      status: statusParam
  }));
}, [location.search]);

const staffid = JSON.parse(localStorage.getItem('token'));

const [landData, setLandData] = useState([]); 
const [surveyData, setSurveyData] = useState([]); 
const [loading,setLoading] = useState(true)
 
 
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/admindpt/${id}`, {
              headers: { 
                'Gl-Status':statusUrl.status,  
                'Gl-Type':staffid.logintype, 
                'Gl-Out':staffid.loginid,  
                'Gl-Root':'Land', 
              },
          });
          setLandData(response.data[0].land);
          setSurveyData(response.data[0].survey);
          setLoading(false) 
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  if (statusUrl.status) {  
      fetchData();
  }
}, [statusUrl]);



const [formData,setFormData]=useState({
  blocking_amt:"",
  validity_days:"",
  total_installment:"", 
  booking_amt:"",
  validity:"",
  installment:"",
  document_value:"",
  document_comm:"",
  document_fees:"",
  writer_fees:"",
  computer_fees:"",
  division_fees:"",
  registration_gift:"",
  dd_comm:"",
  customer_gift:"",
  cd_feees:"",
  ec_fees:"",
  expense_fees:"",
  mot_fees:"",
  sales_fees:"",
  expense_other:"" , 
})

useEffect(() => {
  if (landData) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      blocking_amt: landData.blocking_amt ? landData.blocking_amt : "",
      validity_days: landData.validity_days ? landData.validity_days : "",
      total_installment: landData.total_installment ? landData.total_installment : "",
      booking_amt: landData.booking_amt ? landData.booking_amt : "",
      validity: landData.validity ? landData.validity : "",
      installment: landData.installment ? landData.installment : "",
      document_value: landData.document_value ? landData.document_value : "",
      document_comm: landData.document_comm ? landData.document_comm : "",
      document_fees: landData.document_fees ? landData.document_fees : "",
      writer_fees: landData.writer_fees ? landData.writer_fees : "",
      computer_fees: landData.computer_fees ? landData.computer_fees : "",
      division_fees: landData.division_fees ? landData.division_fees : "",
      registration_gift: landData.registration_gift ? landData.registration_gift : "",
      dd_comm: landData.dd_comm ? landData.dd_comm : "",
      customer_gift: landData.customer_gift ? landData.customer_gift : "",
      cd_feees: landData.cd_feees ? landData.cd_feees : "",
      ec_fees: landData.ec_fees ? landData.ec_fees : "",
      expense_fees: landData.expense_fees ? landData.expense_fees : "",
      mot_fees: landData.mot_fees ? landData.mot_fees : "",
      sales_fees: landData.sales_fees ? landData.sales_fees : "",
      expense_other: landData.expense_other ? landData.expense_other : "",
      id: id
    }));
  }
}, [landData, id]);


const handleChange = (e) => {
  const { name, value } = e.target; 
  if (/^\d*$/.test(value)) {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};
 
const [errors, setErrors] = useState({});
 
const handleSubmitFees = async(e) => {
  e.preventDefault();
  
  let newErrors = {};
  let isValid = true;

 
  const fieldsToValidate = [
    'blocking_amt',
    'validity_days',
    'total_installment',
    'booking_amt',
    'validity',
    'installment',
    'document_value',
    'document_comm',
    'document_fees',
    'writer_fees',
    'computer_fees',
    'division_fees',
    'registration_gift',
    'dd_comm',
    'customer_gift',
    'cd_feees',
    'ec_fees',
    'expense_fees',
    'mot_fees',
    'sales_fees',
    'expense_other'
  ];
 
  fieldsToValidate.forEach((key) => {
    if (!formData[key] || !/^\d+$/.test(formData[key])) {
      newErrors[key] = "* required";
      isValid = false;
    }
  });


  setErrors(newErrors);

  if (isValid) { 
    const data =[formData]
    try {
        await axios.put(`${API_BASE_URL}/admindpt/${id}`,data, {
          headers: { 
            'Content-Type':'application/json',   
          },
      });
      Toast({ message: "Added Successfully", type: "success" });
  } catch (error) {
    Toast({ message: "Error to add", type: "error" });

  } 
  }  
};
  return (
    <>
 

      <section className="section">
        <div className="container">
          <div className="row">
          {loading ? 
          <div style={{height:"32vh",display:"flex",justifyContent:"center"}}>
             <Spinner className="mt-auto"/> 
          </div>
          :
            <div className="col-12">
              <div className="card">
                <div className="card-heaer mb-3">
                  <div className="d-flex bottom1">
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(1)}
                        >
                          Project Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Amenities Charges
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Property Charges
                        </a>
                      </nav>
                    </div>

                    <div className="p-2" style={{ marginLeft: "auto" }}>
                      <button className="btn1" onClick={() => navigate(-1)}>
                        <ArrowBackIcon /> back
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  {step === 1 && (
                    <div className="row">
                      <h4 className="page_heading ticket-heading">
                        Project Details
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Project ID</label>
                              </div>
                              <div className="col-5">
                              <span>{landData.project_tid}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Project Name
                                </label>
                              </div>
                              <div className="col-5">
                                <span>{landData.project_name}</span>  
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property Location
                                </label>
                              </div>
                              <div className="col-5">
                                <span>{landData.project_address}</span>  
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property Types
                                </label>
                              </div>
                              <div className="col-5">
                                 <span>{landData.subpro_name}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Address 1</label>
                              </div>
                              <div className="col-5">
                                <span>{landData.project_address}</span> 
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Address 2</label>
                              </div>
                              <div className="col-5">
                                <span>{landData.project_addressf}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">State</label>
                              </div>
                              <div className="col-5">
                                 <span>{landData.state_name}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Distric</label>
                              </div>
                              <div className="col-5">
                                 <span>{landData.district}</span>  
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Taluk</label>
                              </div>
                              <div className="col-5">
                                <span>{landData.taluk_names}</span>  
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Village</label>
                              </div>
                              <div className="col-5">
                                <span>{landData.village_name}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Pincode</label>
                              </div>
                              <div className="col-5">
                                <span>{landData.pincode}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-5" />

                      <h4 className="page_heading ticket-heading">
                        Payment Details
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Blocking Amount
                                </label>
                              </div>
                              <div className="col-6">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.blocking_amt}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName" 
                                  onChange={handleChange} 
                                  name="blocking_amt"
                                  value={formData.blocking_amt}
                                />)}
                                  {errors.blocking_amt && <div className="validation_msg">{errors.blocking_amt}</div>}  
                               </div>

                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Total Validity Days
                                </label>
                              </div>
                              <div className="col-6">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.validity_days}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="validity_days"
                                  value={formData.validity_days}
                                />)}
                                  {errors.validity_days && <div className="validation_msg">{errors.validity_days}</div>}   
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Total Installment
                                </label>
                              </div>
                              <div className="col-6">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.total_installment}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="total_installment"
                                  value={formData.total_installment}
                                />)}
                                 {errors.total_installment && <div className="validation_msg">{errors.total_installment}</div>}   
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Booking Amount
                                </label>
                              </div>
                              <div className="col-6">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.booking_amt}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="booking_amt"
                                  value={formData.booking_amt}
                                />)}
                                 {errors.booking_amt && <div className="validation_msg">{errors.booking_amt}</div>}   
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Validity</label>
                              </div>
                              <div className="col-6">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.validity}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="validity"
                                  value={formData.validity}
                                />)}
                                    {errors.validity && <div className="validation_msg">{errors.validity}</div>}   
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Installment
                                </label>
                              </div>
                              <div className="col-6">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.installment}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="installment"
                                  value={formData.installment}
                                />
                              )}
                                {errors.installment && <div className="validation_msg">{errors.installment}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-5" />
                      <h4 className="page_heading ticket-heading">
                        Registration Expenses
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Document Value %
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.document_value}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="document_value"
                                  value={formData.document_value}
                                />)}
                                {errors.document_value && <div className="validation_msg">{errors.document_value}</div>} 
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Document Comm. %
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.document_comm}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="document_comm"
                                  value={formData.document_comm}
                                />)}
                                {errors.document_comm && <div className="validation_msg">{errors.document_comm}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Document Fees %
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.document_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="document_fees"
                                  value={formData.document_fees}
                                />)}
                                {errors.document_fees && <div className="validation_msg">{errors.document_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Doc.Writer Fees %
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.writer_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="writer_fees"
                                  value={formData.writer_fees}
                                />)}
                                {errors.writer_fees && <div className="validation_msg">{errors.writer_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Computer Fees
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.computer_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="computer_fees"
                                  value={formData.computer_fees}
                                />)}
                                {errors.computer_fees && <div className="validation_msg">{errors.computer_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Sub Division Fees
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.division_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="division_fees"
                                  value={formData.division_fees}
                                />)}
                                {errors.division_fees && <div className="validation_msg">{errors.division_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Registration Gift
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.registration_gift}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="registration_gift"
                                  value={formData.registration_gift}
                                />)}
                                {errors.registration_gift && <div className="validation_msg">{errors.registration_gift}</div>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">D.D. Comm.</label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.dd_comm}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="dd_comm"
                                  value={formData.dd_comm}
                                />)}
                                {errors.dd_comm && <div className="validation_msg">{errors.dd_comm}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Customer Gift
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.customer_gift}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="customer_gift"
                                  value={formData.customer_gift}
                                />)}
                                {errors.customer_gift && <div className="validation_msg">{errors.customer_gift}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">CD</label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.cd_feees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="cd_feees"
                                  value={formData.cd_feees}
                                />)}
                                {errors.cd_feees && <div className="validation_msg">{errors.cd_feees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">EC</label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.ec_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="ec_fees"
                                  value={formData.ec_fees}
                                />)}
                                {errors.ec_fees && <div className="validation_msg">{errors.ec_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Reg.Expense
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.expense_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="expense_fees"
                                  value={formData.expense_fees}
                                />)}
                                {errors.expense_fees && <div className="validation_msg">{errors.expense_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">MOT</label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.mot_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="mot_fees"
                                  value={formData.mot_fees}
                                />)}
                                {errors.mot_fees && <div className="validation_msg">{errors.mot_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Sales Agreement
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.sales_fees}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="sales_fees"
                                  value={formData.sales_fees}
                                />)}
                                {errors.sales_fees && <div className="validation_msg">{errors.sales_fees}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Reg. Exp. Other
                                </label>
                              </div>
                              <div className="col-5">
                              {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (
                                <>
                                <span>{formData.expense_other}</span>
                                </>
                              ):(
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleChange} 
                                  name="expense_other"
                                  value={formData.expense_other}
                                />)}
                                {errors.expense_other && <div className="validation_msg">{errors.expense_other}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-end py-3 px-3">
                      {staffid.logintype === "admin" || statusUrl.status ==="pending" || statusUrl.status ==="complete"? (""):(
                        <button className="btn1 me-2" onClick={handleSubmitFees}>
                          Save
                        </button>)}
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="row">
                      <AmenitiesCharges  basicDetails={landData} surveyDetails={surveyData} propertyID={id} statusType={statusUrl.status}/>

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="row">
                      <PropertyCharges  basicDetails={landData} surveyDetails={surveyData} propertyID={id} statusType={statusUrl.status}/>
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button> 
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </section>
     </>
  );
}

export default LandAdminDepartment;
