import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import DataTable from "react-data-table-component";  
import DeleteIcon from "@mui/icons-material/Delete";  
import Toast from "../../../../Utils/Toast";
import "react-toastify/dist/ReactToastify.css";
import AmenitiesCharges from "./AmenitiesCharges";
import PropertyDetails from "./PropertyDetails"; 
import FileDownloadIcon from "@mui/icons-material/Visibility"; 
import { validateBankFormData, validateContactFormData } from "./validation";
import ViewContactDetails from "./viewContactDetails";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewBankDetails from "./viewBankDetails";
import Spinner from 'react-bootstrap/Spinner';
import customStyle from "../../../../Utils/tableStyle";
import FileView from "../../../../Utils/FileView/FileView";


function LayoutOwner() {
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
 });

   const [loading,setLoading] = useState(true) 
  const [fieldDetails,setFieldDetails] = useState([]) 
  const [surveyDetails,setSurveyDetails] = useState([]) 
 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const status = queryParams.get("status");
    
    const staffid = JSON.parse(localStorage.getItem('token')); 
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/agreement/${id}`, {
          headers: {
            'Gl-Status': status,
            'Gl-Type':staffid.logintype, 
            'Gl-Out':staffid.loginid,  
            'Gl-Root':'Layout',  
          },
        }); 
         setFieldDetails(response.data[0].land);
         setSurveyDetails(response.data[0].survey);
         setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id,status]);

  const [ownerData, setOwnerData] = useState({
    id: id,
    days: "",
    startduration: "",
    endduration: "",
    advance: "",
    document: "",
});
 
 

const [doc,SetDoc] = useState([])

useEffect(() => {
  if (fieldDetails) {
    setOwnerData(prevOwnerData => ({
      ...prevOwnerData,
      days: fieldDetails.agree_days,
      advance: fieldDetails.agree_advance,
      download:fieldDetails.agree_document,
      startduration: fieldDetails.agree_startduration,
      endduration: fieldDetails.agree_endduration,
    }));
  }

  if(fieldDetails.project_document){
    const parsedObject = JSON.parse(fieldDetails.project_document);
    SetDoc(parsedObject)
  }
}, [fieldDetails,fieldDetails.project_document]);

const ownerChange = (e) => {
  const { name, value } = e.target;
  setOwnerData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const [errors, setErrors] = useState([]);  
const handleFileChange = (event, index) => {
  const file = event.target.files[0];  
 
  const allowedTypes = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
  ];


  if (file && allowedTypes.includes(file.type)) {
    setErrors('')
  setOwnerData( prevState => ({
    ...prevState, 
    document:file
  })); 
  }
  else {
    setErrors('Please upload a valid file (xls, pdf, xlsx, docx, doc, png, jpeg, jpg).') 
  }
};

  //data table
  const columns1 = [
    {
      name: "sl.no",
      selector: (row,index) =>index +1,
      sortable: true,
      wrap: true,
    },

    {
      name: "Name",
      selector: (row) => row.contact_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.contact_phone,
      wrap: true, 
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remark,
      wrap: true,
      sortable: true,
    },
    ...(staffid.logintype === "admin" || status ==="pending" || status ==="complete"
      ? []: [
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex"> 
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ]
),
];

  const columns2 = [
    {
      name: "sl.no",
      selector: (row,index) => index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Account Name",
      selector: (row) => row.account_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => row.account_no,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "IFSC Code",
      selector: (row) => row.account_ifsc,
      wrap: true,
      sortable: true,
    },
    {
      name: "Bank Name",
      selector: (row) => row.account_bank,
      wrap: true,
      sortable: true,
    },
    {
      name: "Bank Branch",
      selector: (row) => row.account_branch,
      wrap: true,
      sortable: true,
    },
    ...(staffid.logintype === "admin" || status ==="pending" || status ==="complete"
      ? []: [
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex"> 
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDeleteBank(row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
       ),
      },
    ]
  ),
];
 

 


  
 


 
 

  /////navigation
  let navigate = useNavigate();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
 


  const handleDateChange = (range) => {
     if (Array.isArray(range) && range[0] && range[1]) {
      setOwnerData((prevData) => ({
        ...prevData,
        startduration: Moment(range[0]).format('YYYY-MM-DD'),
        endduration: Moment(range[1]).format('YYYY-MM-DD'),
      }));
    } else {
       alert('Invalid date range selected');
    }
  };
  
  

 const [ownerError,setOwnerError] = useState([]) 
  const ownerSave = async (e) => {
    e.preventDefault();
    
    const errors = {};

    // Validate form fields
    if (!ownerData.id) {
      errors.id = "ID is required";
    }

    if (!ownerData.advance || isNaN(ownerData.advance)) {
      errors.advance = "Advance is required and must be a number";
    }

    if (!ownerData.startduration) {
      errors.startduration = "Start duration is required";
    }

    if (!ownerData.endduration) {
      errors.endduration = "End duration is required";
    }

    if (!ownerData.document && !ownerData.download) {
      errors.document = "Document is required";
    }

    if (!ownerData.days || isNaN(ownerData.days)) {
      errors.days = "Days must be a valid number";
    }

    // If there are errors, set the errors and return early
    if (Object.keys(errors).length > 0) {
      setOwnerError(errors);
      return;
    }

    const formDataField = {
      id:ownerData.id,
      advance:ownerData.advance,
      startduration:ownerData.startduration,
      endduration:ownerData.endduration,
      document:ownerData.document,
      days:ownerData.days,
      olddocument:ownerData.download
    }
   
    try{
      const response = await axios.post(`${API_BASE_URL}/landowneradd`, formDataField, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      Toast({ message: "Successfully Updated", type: "success" }); 
      setOwnerError("");
    }catch(error){
      alert("error on updating")
    }
  }







// contact details 
const [formDataContact,setFormDataContact] = useState({
    contact_name:"",
    contact_phone:"",
    remark:"",
})
const handleChangeContact = (e) => {
  const { name, value } = e.target;
  setFormDataContact((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const [contactErrors, setContactErrors] = useState({}); 
const [dataList, setDataList] = useState([]);

const handleContactAdd = (e) => {
  e.preventDefault(); 

  const result = validateContactFormData(formDataContact)
  if (result.isValid) {
  const newItem = {
    id: dataList.length + 1, 
    projectid:fieldDetails.project_pid,
    agreeid:id,
    status:"active",
    ...formDataContact,
  };
  setDataList((prevList) => [...prevList, newItem]);
  setFormDataContact({
    contact_name:"",
    contact_phone:"",
    remark:"",
  }) 
  setContactErrors("")
}else{
  setContactErrors(result.errors)
 }
};

const handleDelete = (id) => {  
  const updatedList = dataList.filter((item) => item.id !== id);
  setDataList(updatedList);
};

 
const handleContactSave = async (e) => {
  e.preventDefault(); 

  if (dataList.length === 0) {
    alert("Please Add Contact Details");
    return;
  }
  const updatedArray = dataList.map(({ id, ...rest }) => rest);
  
  try {
        await axios.post(`${API_BASE_URL}/ownercontact`, updatedArray, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setDataList([]);     
    Toast({ message: "Successfully Updated", type: "success" });
  } catch (error) {
    alert("Error updating");
  }
};









//bank details
const [formData, setFormData] = useState({
  account_name: "",
  account_no: "",
  account_ifsc: "",
  account_bank: "",
  account_branch: "", 
});

const handleChangeBank = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


const [bankErrors, setBankErrors] = useState({}); 
const [dataListBank, setDataListBank] = useState([]);  

const handleBankDetailsAdd = (e) => {
  e.preventDefault(); 
  const result = validateBankFormData(formData)
  if (result.isValid) {
  const newItem = {
    id: dataListBank.length + 1, 
    projectid:fieldDetails.project_pid,
    agreeid:id,
    status:"active",
    ...formData,
  };
  setDataListBank((prevList) => [...prevList, newItem]);
  setFormData({
    account_name: "",
    account_no: "",
    account_ifsc: "",
    account_bank: "",
    account_branch: "",
  }) 
  setBankErrors("")
}else{
  setBankErrors(result.errors)
 }
};
const handleDeleteBank = (id) => {  
  const updatedList = dataListBank.filter((item) => item.id !== id);
  setDataListBank(updatedList);
};


const handleBankSave = async (e) => {
  e.preventDefault(); 

  if (dataListBank.length === 0) {
    alert("Please Add Bank Details");
    return;
  }
  const updatedArray = dataListBank.map(({ id, ...rest }) => rest);
  
  try {
        await axios.post(`${API_BASE_URL}/ownerbank`, updatedArray, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setDataListBank([]);     
    Toast({ message: "Successfully Updated", type: "success" });
  } catch (error) {
    alert("Error updating");
  }
};





// view model open 
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => { 
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
};


const [isModalOpenBank, setIsModalOpenBank] = useState(false);
const openModalBank = () => { 
  setIsModalOpenBank(true);
};
const closeModalBank = () => {
  setIsModalOpenBank(false);
};



// Bank view on admin 
const [bankData, setBankData] = useState([]);
useEffect(() => { 
    const fetchData = async () => { 
      try {
        const response = await axios.get(`${API_BASE_URL}/bankdetails/${id}`);
        setBankData(response.data);
      } catch (err) {
        console.error(err.message);
      }  
    };

    fetchData(); 
}, [id]);   

// Contact view on admin 
const [contactData, setContactkData] = useState([]);
useEffect(() => { 
    const fetchData = async () => { 
      try {
        const response = await axios.get(`${API_BASE_URL}/contactdetails/${id}`);
        setContactkData(response.data);
      } catch (err) {
        console.error(err.message);
      }  
    };

    fetchData(); 
}, [id]);   



// view file 
const [url,setUrl] = useState('') 
const viewFileUrl = (url)=>{
   setUrl(url)
   openModalFile()
}
const [isModalOpenFile, setIsModalOpenfile] = useState(false);
const openModalFile = () => {
  setIsModalOpenfile(true);
};
const closeModalFile = () => {
  setIsModalOpenfile(false);
};
  return (
    <>
         <FileView isOpen={isModalOpenFile} closeModal={closeModalFile} fileUrls={url}/> 

    <ViewContactDetails  isOpen={isModalOpen}
        closeModal={closeModal}
        id={id} />

<ViewBankDetails  isOpen={isModalOpenBank}
        closeModal={closeModalBank}
        id={id} />

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
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(1)}
                        >
                          Land Owner
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Documents
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Amenities Charges
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                          Property Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 5 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(5)}
                        >
                          Contact Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 6 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(6)}
                        >
                          Bank Account
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
         
             
                   
                        <div className={step === 1 ? "d-block" : "d-none"}>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Project ID
                                  </label>
                                </div>
                                <div className="col-5">
                                 
                                    {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                <>
                                <span>{fieldDetails.project_tid}</span>
                                </>
                              ):(
                                <>
                                 <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={fieldDetails.project_tid}
                                    readOnly disabled
                                  />
                                </>
                              )}

                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                   Type
                                  </label>
                                </div>
                                <div className="col-5">
                              

                                    {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                    <>
                                    <span>{fieldDetails.subpro_name}</span>
                                    </>
                                  ):(
                                    <>
                                      <select id="inputState" className="form-select" disabled>
                                        <option value="">{fieldDetails.subpro_name}</option> 
                                      </select>
                                    </>
                                  )}
                             
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Project Name
                                  </label>
                                </div>
                                <div className="col-5">
                                 
                                    {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                <>
                                <span>{fieldDetails.project_name}</span>
                                </>
                              ):(
                                <>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={fieldDetails.project_name}
                                    readOnly disabled
                                  />
                                </>
                              )}
                             
                                </div>
                              </div>
                            </div>
                          </div>
 

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Total days
                                  </label>
                                </div>
                                <div className="col-5"> 

                                    {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                        <>
                                        <span>{ownerData.days}</span>
                                        </>
                                      ):(
                                        <>
                                       <input
                                            type="text" value={ownerData.days}
                                            className="form-control"
                                            name="days"onChange={ownerChange} 
                                          />
                                        </>
                                      )}
                                  {ownerError.days && <div className="validation_msg">{ownerError.days}</div>} 
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Duration From - To
                                  </label>
                                </div>
                                <div className="col-5">
                                {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                 <>
                                    <span>{`${ownerData.startduration} to ${ownerData.endduration}`}</span>
                                    </>
                                  ):(
                                    <>
                                       <DateRangePicker  onChange={handleDateChange}  value={[
                                      new Date(ownerData.startduration),
                                      new Date(ownerData.endduration),
                                    ]} block />
                                    </>
                                  )}
                                  {ownerError.startduration && <div className="validation_msg">{ownerError.startduration}</div>}  
                                 
                                 </div>
                              </div>
                            </div>
                          </div>

                        

                  

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Advance given
                                  </label>
                                </div>
                                <div className="col-5">

                            {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                <>
                                <span>{ownerData.advance}</span>
                                </>
                              ):(
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="advance" value={ownerData.advance} onChange={ownerChange}
                                  />
                                </>
                              )}
                                {ownerError.advance && <div className="validation_msg">{ownerError.advance}</div>} 
                                </div>
                              </div>
                            </div>
                          </div>

                 
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Aggrement document
                                  </label>
                                </div>
                                <div className="col-5">

                                {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                <>
                                  {ownerData.download &&
                                      <div className="mt-2 d-flex w-100"  >
                                      {/* <a
                                        href={`${IMG_PATH}/agreement/${ownerData.download}`}
                                        className="btn1 me-auto"
                                        download
                                      >
                                        <FileDownloadIcon />
                                      </a> */}
                                      <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}/agreement/${ownerData.download}`)}>
                                        <FileDownloadIcon />
                                      </button>
                                      </div> }
                                </>
                              ):(
                                <>
                                     <input
                                    type="file"
                                    className="form-control" name="document"
                                    accept=".xls,.pdf,.xlsx,.docx,.doc,.png,.jpeg,.jpg"
                                    id="lastName" onChange={handleFileChange}
                                  />
                            {errors && <p className="validation_msg text-danger">{errors}</p>}

                                {ownerData.download &&
                                      <div className="mt-2 d-flex w-100"  >
                                      {/* <a
                                        href={`${IMG_PATH}/agreement/${ownerData.download}`}
                                        className="btn1 ms-auto"
                                        download
                                      >
                                        <FileDownloadIcon />
                                      </a> */}
                                      <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}/agreement/${ownerData.download}`)}>
                                          <FileDownloadIcon />
                                        </button>
                                      </div> }
                                </>
                              )}


                                   {ownerError.document && <div className="validation_msg">{ownerError.document}</div>} 

                          


                                </div>
                              
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-end py-3 px-3">
                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete"? " " : (   <a className="btn1 me-2" onClick={ownerSave}>
                            Save
                          </a>)} 

                       
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                        </div>

              
                        <div className={step === 2 ? "d-block" : "d-none"}>

                        <div className="row">
                        
                        {doc.map((data, index) => (
                        <div className="col-md-12 col-lg-6" key={index}>
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">{data.label}</label>
                              </div>
                              <div className="col-7">
                                <div className="">
                                 <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}layout/${data.file}`)}>
                                    <FileDownloadIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                            
 
                          <div className="text-end py-3 px-3">
                            <button className="btn1 me-2" onClick={prevStep}>
                              Previous
                            </button>
                            <button className="btn1" onClick={nextStep}>
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                   
                      <div className={step === 3 ? "d-block" : "d-none"}>

                        <AmenitiesCharges basicDetails={fieldDetails} surveyDetails={surveyDetails} propertyID={id} statusType={status}/>

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                    </div>


                    <div className={step === 4 ? "d-block" : "d-none"}>

                      <div className="mt-1">
                         
                       <PropertyDetails  basicDetails={fieldDetails} surveyDetails={surveyDetails} propertyID={id} statusType={status}/>

                       <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div> 

                      </div>
                    </div>



                    <div className={step === 5 ? "d-block" : "d-none"}> 
                      <div className="card-body p-3">

            
                      <div>
                      {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : (  
                       <div className="d-flex"> 
                            <button className="btn1 me-2"  onClick={openModal}  ><VisibilityIcon/></button>
                        </div>
                      )}
                      </div> 


                        <div className="row mt-2">
                          {/* <div className="text-end d-flex ">
                            <div style={{ marginLeft: "auto" }}>
                              <ExportButton
                                columns={columns1}
                                data={dataList}
                                filename={"Landowner_data1.csv"}
                              />
                            </div>
                            <div className="searchbar">
                              <input
                                type="text"
                                className="search"
                                onChange={handleFilter}
                                placeholder="..Search"
                              ></input>
                            </div>
                          </div> */}
                          <div>
                            <DataTable
                              columns={columns1}
                              data={staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? contactData: dataList}
                              customStyles={customStyle}
                              pagination
                              persistTableHead={true}
                              // selectableRows
                              fixedHeader
                            />
                          </div>
                        </div>

                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : (  
                        <div className="container mt-1 mb-3">
                          <form >
                            <div className="row">
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group mt-3">
                                  <div className="row">
                                    <div className="col-5">
                                      <label className="form-label">Name</label>
                                    </div>
                                    <div className="col-10">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="contact_name"
                                        onChange={handleChangeContact}
                                        value={formDataContact.contact_name}
                                      />
                                    </div>
                                    {contactErrors.contact_name && <div className="validation_msg">{contactErrors.contact_name}</div>}
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 col-lg-6">
                                <div className="form-group mt-3">
                                  <div className="row">
                                    <div className="col-5">
                                      <label className="form-label">
                                        Phone Number
                                      </label>
                                    </div>
                                    <div className="col-10">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="contact_phone"
                                        onChange={handleChangeContact}
                                        value={formDataContact.contact_phone}
                                      />
                                    </div>
                                    {contactErrors.contact_phone && <div className="validation_msg">{contactErrors.contact_phone}</div>}

                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group mt-3">
                                  <div className="row">
                                    <div className="col-5">
                                      <label className="form-label">
                                        Remarks
                                      </label>
                                    </div>
                                    <div className="col-10">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="remark"
                                        onChange={handleChangeContact}
                                        value={formDataContact.remark}
                                      />
                                    </div>
                                    {contactErrors.remark && <div className="validation_msg">{contactErrors.remark}</div>}

                                  </div>
                                </div>
                              </div>
                              <div className="col text-start mt-5 mb-3 mx-1">
                                <button
                                  type="reset"
                                  className="btn1 me-2"
                                  onClick={() =>
                                    setFormDataContact({
                                      contact_name:"",
                                      contact_phone:"",
                                      remark:"",
                                    })
                                  }
                                >
                                  Clear
                                </button>
                                <button type="submit" className="btn1" onClick={handleContactAdd}>
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        )}

                        <div className="text-end py-3 px-3">
                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : (  
                        <button className="btn1 me-1" onClick={handleContactSave}>
                           Save
                          </button>
                        )}
                        <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </div>
                   </div>


               <div className={step === 6  ? "d-block" : "d-none"}> 
                      <div className="card-body pt-2">
                      {staffid.logintype === "admin" || status ==="pending" || status ==="complete"? " " : ( 
                      <div className="d-flex"> 
                            <button className="btn1 me-2 mb-3"  onClick={openModalBank}  ><VisibilityIcon/></button>
                        </div>)}

                        <div className="col-md-12 col-lg-12">
                          <div className="row">
                            {/* <div className="text-end d-flex ">
                              <div style={{ marginLeft: "auto" }}>
                                <ExportButton
                                  columns={columns2}
                                  data={filterdata2}
                                  filename={"LandOwner_data2.csv"}
                                />
                              </div>
                              <div className="searchbar">
                                <input
                                  type="text"
                                  className="search"
                                  onChange={handleFilter}
                                  placeholder="..Search"
                                ></input>
                              </div>
                            </div> */}
                            <div>
                              <DataTable
                                columns={columns2}
                                data={staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? bankData: dataListBank}
                                // data={dataListBank}
                                customStyles={customStyle}
                                pagination
                                persistTableHead={true}
                                // selectableRows
                                fixedHeader
                              />
                            </div>
                          </div>
                          {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : ( 
                          <div className="container mt-1 mb-3">
                            <form >
                              <div className="row">
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Account Name
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="account_name"
                                          onChange={handleChangeBank}
                                          value={formData.account_name}
                                        />
                                      </div>
                                      {bankErrors.account_name && <div className="validation_msg">{bankErrors.account_name}</div>}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Account Number
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="account_no"
                                          onChange={handleChangeBank}
                                          value={formData.account_no}
                                        />
                                      </div>
                                      {bankErrors.account_no && <div className="validation_msg">{bankErrors.account_no}</div>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          IFSC Code
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="account_ifsc"
                                          onChange={handleChangeBank}
                                          value={formData.account_ifsc}
                                        />
                                      </div>
                                      {bankErrors.account_ifsc && <div className="validation_msg">{bankErrors.account_ifsc}</div>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Bank Name
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="account_bank"
                                          onChange={handleChangeBank}
                                          value={formData.account_bank}
                                        />
                                          {bankErrors.account_bank && <div className="validation_msg">{bankErrors.account_bank}</div>}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Bank Branch
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="account_branch"
                                          onChange={handleChangeBank}
                                          value={formData.account_branch}
                                        />
                                      </div>
                                      {bankErrors.account_branch && <div className="validation_msg">{bankErrors.account_branch}</div>}
                                    </div>
                                  </div>
                                </div>

                                <div className="col text-start mt-5 mb-3 mx-1">
                                  <button
                                    type="reset"
                                    className="btn1 me-2"
                                    onClick={() =>
                                      setFormData({
                                        account_name: "",
                                        account_no: "",
                                        account_ifsc: "",
                                        account_bank: "",
                                        account_branch: "", 
                                      })
                                    }
                                  >
                                    Clear
                                  </button>
                                  <button type="submit" className="btn1" onClick={handleBankDetailsAdd}>
                                    Add
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          )}

                        </div>
                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                           {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : (    <button className="btn1" onClick={handleBankSave}>Submit</button>)}
                        </div>
                      </div>
               </div>
                
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>
     </>
  );
}

export default LayoutOwner;
