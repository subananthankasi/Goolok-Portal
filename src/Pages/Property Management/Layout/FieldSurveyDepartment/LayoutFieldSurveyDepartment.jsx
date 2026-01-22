import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component"; 
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom"; 
import Amenities from "./amenities";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchSRODetails } from "../../../../Redux/Actions/MasterPage/SRODetailsAction";
import Select from 'react-select';    
import Toast from "../../../../Utils/Toast";
import { validateMarketResearchFormData } from "./Validation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewMarketResearch from "./ViewMarketResearch";
import Spinner from 'react-bootstrap/Spinner';

function LayoutFieldSurveyDepartment() {

    //  get the data base on status  
    const [fieldDetails,setFieldDetails] = useState([])
    const [surveyDetails,setSurveyDetails] = useState([])
    const [loading,setLoading] = useState(true)
 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const pid = queryParams.get("pid");
    const status = queryParams.get("status");
    
    const staffid = JSON.parse(localStorage.getItem('token')); 
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/survey/${pid}`, {
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

  


  const columns = [
    {
      name: "S.no",
      selector: (row,index) => index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Name ",
      selector: (row) => row.owner_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Directions",
      selector: (row) => row.direction,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Per sqft ",
      selector: (row) => row.per_sqft,
      wrap: true,
      sortable: true,
    },
    {
      name: "Distance Km ",
      selector: (row) => row.distance ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Mobile No 1",
      selector: (row) => row.mobile,
      wrap: true,
      sortable: true,
    },
    {
      name: "Mobile No 2",
      selector: (row) => row.mobilef,
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
                  onClick={() => handleDelete(row.id)}
                  data-tooltip-id="delete"
                >
                  <DeleteIcon />
                </button>
              </div>
            ),
          },
        ]
      ),
  ];

  
  const columns1 = [
    {
      name: "S.No",
      selector: (row,index) =>index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Project ID",
      selector: (row) => row.glk_projectid,
      sortable: true,
      wrap: true,
    },
    {
      name: "Plot no",
      selector: (row) => row.glk_plotno,
      sortable: true,
      wrap: true,
    },
    {
      name: "sqft",
      selector: (row) => row.glk_sqft,
      sortable: true,
      wrap: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.glk_surveyno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sub division",
      selector: (row) => row.glk_division,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "SD unit",
      selector: (row) => row.glk_sdunit,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "Road width",
      selector: (row) => row.glk_roadwidth,
      sortable: true,
      wrap: true,
    },
    {
      name: "Plot facing",
      selector: (row) => row.glk_landfacing,
      sortable: true,
      wrap: true,
    },
    {
      name: "East Dimension",
      selector: (row) => row.glk_east_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "East unit",
      selector: (row) => row.glk_eastunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "West Dimension",
      selector: (row) => row.glk_west_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "West unit",
      selector: (row) => row.glk_westunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "South Dimension",
      selector: (row) => row.glk_south_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "South unit",
      selector: (row) => row.glk_southunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "North Dimension",
      selector: (row) => row.glk_north_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "North unit",
      selector: (row) => row.glk_northunit,
      sortable: true,
      wrap: true,
    },  
    {
      name: "Status",
      selector: (row) => (
        (staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? row.status : ( 
          <select
          name="selectedStatus" 
          value={selectedStatus[row.id]?.status || row.status}
          className="form-select"
          onChange={(e) => handleStatusChange(e, row.id)}  
        >
          <option value="unverify">Unverify</option>
          <option value="verify">Verify</option>
          <option value="dispute">Dispute</option>
        </select>
        ))
       
      ),
      wrap: true,
      width: "120px",
      sortable: true,
    }
   
  ];

  
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#2f4f4f",
        color: "white",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "600",
        textTransform: "capitalize",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [formData, setFormData] = useState({
      owner_name: "",
      location: "",
      direction: "",
      per_sqft: "",
      distance: "",
      mobile: "",
      mobilef: "",
  });

  const [dataList, setDataList] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



const [marketErrors, setMarketErrors] = useState({});  
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validateMarketResearchFormData(formData)
    if (result.isValid) {
    const newItem = {
      id: dataList.length + 1,
      surveyid: id,
      ...formData,
    };
    setDataList((prevList) => [...prevList, newItem]);
    setFormData({
      owner_name: "",
      location: "",
      direction: "",
      per_sqft: "",
      distance: "",
      mobile: "",
      mobilef: "",
    }) 
    setMarketErrors("")
  }else{
    setMarketErrors(result.errors)
   }
  };

  const handleDelete = (id) => {  
    const updatedList = dataList.filter((item) => item.id !== id);
    setDataList(updatedList);
  };
 
 
  let navigate = useNavigate();


 


  ///////get a sro details////////
  const [selectedSro, setSelectedSro] = useState(null); 
  const handleSelectSro = (data) =>{
    setSelectedSro(data)
  }

  const SRODetailsData = useSelector((state) => state.SRODetails.SRODetailsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSRODetails());
  }, [dispatch]);
  const enableSRO = SRODetailsData.filter((data) => data.status === "Enable") 
  const initialSro = enableSRO.filter((data) => data.id === fieldDetails.sro_details)[0];
 
  const sroOptions = enableSRO.map((data) => ({
    value: data.id,
    label: data.sro_title,
  }));

// old sro dropdown set 
useEffect(()=>{
  if(initialSro){
    setSelectedSro({
      value: initialSro.id,
      label: initialSro.sro_title,
    })
  }
},[initialSro])

// display sro details after select
const getSro = selectedSro?.value ? enableSRO.filter((data) => data.id === selectedSro.value): [];
 
 
// handle submit 1st page
const [errors, setErrors] = useState({}); 
const handleSubmitField = async (e) =>{
  e.preventDefault();
  let validationErrors = {};
  if(!selectedSro){
    validationErrors.sro = "Please select a sro.";
  }
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  } else{
    setErrors("")
  }  

  const formDataField = {
     id:id,
     sroid:selectedSro?selectedSro.value:""
  }
 
  try{
    const response = await axios.post(`${API_BASE_URL}/sroadd`, formDataField, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }); 
    Toast({ message: "Successfully Updated", type: "success" }); 
  }catch(error){
    alert("error on updating")
  }
}




// handle submit 2nd page
const handleMarketResearchSave = async (e) => {
  e.preventDefault(); 

  if (dataList.length === 0) {
    alert("Please add market research");
    return;
  }

  const data = {
    market: dataList,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/survey`, data, {
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


// view model open 
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => {
   setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
};



const [selectedStatus, setSelectedStatus] = useState({});

const handleStatusChange = async(e, rowId) => {
  const { value } = e.target; 
  setSelectedStatus((prevStatus) => ({
    ...prevStatus,   
    [rowId]: { id: rowId, status: value }  
  }));
 
  const updateData = {
    status: value,
    id:rowId
  }

 try{
    await axios.post(`${API_BASE_URL}/surveyverify`,updateData,{
      headers: {
          'Content-Type': 'multipart/form-data'
        }
     });
     Toast({ message: "Successfully Updated", type: "success" })
  }catch(error){
  alert(error)
  }
};


// Aminites save 
const [triggerChild, setTriggerChild] = useState(false); 
const handleButtonClick = () => { 
  setTriggerChild(prev => !prev);  
};


// market research view on admin 
const [marketResearch, setMarketResearch] = useState([]);
useEffect(() => { 
    const fetchData = async () => { 
      try {
        const response = await axios.get(`${API_BASE_URL}/market/${id}`);
        setMarketResearch(response.data);
      } catch (err) {
        console.error(err.message);
      }  
    };

    fetchData(); 
}, [id]);   
 
  return (
    <> 
    <ViewMarketResearch  isOpen={isModalOpen}
        closeModal={closeModal}
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
                          Field Survey Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Market Research
                        </a>
                          <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                        Survey Report
                        </a>
                
                          <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                           Amenities
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
                              <label className="form-label">Legal ID</label>
                            </div>
                            <div className="col-5">
                              {staffid.logintype === "admin" || status ==="pending" || status ==="complete"  ? (
                                <>
                                <span>{`LEGL00`+fieldDetails.id}</span>
                                </>
                              ):(
                                <>
                                <input
                                type="text"
                                className="form-control"
                                id="ProjectID"
                                readOnly
                                value={`LEGL00`+fieldDetails.id}
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
                              <label className="form-label">Project Name</label>
                            </div>
                            <div className="col-5">


                            {staffid.logintype === "admin" || status ==="pending" || status ==="complete"? (
                                <>
                                <span>{fieldDetails.project_name}</span>
                                </>
                              ):(
                                <>
                                 <input
                                type="text"
                                className="form-control"
                                id="ProjectName"
                                readOnly
                                value={fieldDetails.project_name}
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
                              <label className="form-label">Project ID</label>
                            </div>
                            <div className="col-5">
                            {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? (
                                <>
                                <span>{fieldDetails.project_tid}</span>
                                </>
                              ):(
                                <>
                                <input
                                type="text"
                                className="form-control"
                                readOnly
                                value={fieldDetails.project_tid}
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
                              <label className="form-label">  {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? "" : "SRO Details"}</label>
                            </div>
                            <div className="col-5">

                            {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? (
                                <>
                                <span></span>
                                </>
                              ):(
                                <>
                                 <Select
                            options={sroOptions}
                            onChange={handleSelectSro}
                            value={selectedSro}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused
                                        ? "#e7e7e7"
                                        : "#e7e7e7",
                                    fontSize: "13px",
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: "12px",
                                    color: "black",
                                }),
                            }} 
                        />
                           {errors.sro && <div className="validation_msg">{errors.sro}</div>}
                                </>
                              )}





                          

                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedSro && (
                        <>
                      <h6 className="mt-4 mb-3">Sro Deatils</h6>
                      <hr />
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">SRO Title</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_title}</span>
                               </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">SRO Address</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Mobile Number</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_mobile}</span>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Email</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_email}</span>
                              </div>
                          </div>
                        </div>
                      </div> 
                      </>
                      )}

                      <div className="text-end py-3 px-3">
                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete"? " " : (  <button className="btn1 me-2" onClick={handleSubmitField}>Save</button>)} 
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                    </div>

                    <div className={step === 2 ? "d-block" : "d-none"}>
                    
                    {staffid.logintype === "admin" || status ==="pending" || status ==="complete"? " " : ( 
                      <div>
                       <div className="d-flex"> 
                            <button className="btn1 me-2"  onClick={openModal}  ><VisibilityIcon/></button>
                        </div>
                      </div>)}


                    <div className="row">
                      
                      <div className="mt-2">
                      <DataTable
                        columns={columns}
                        data={staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? marketResearch: dataList}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />
                      </div>
                      {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : ( 
                      <div className="container mt-2 mb-3">
                        
                          <div className="row">

                        <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Property Owner Name</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="owner_name"
                                value={formData.owner_name}
                                onChange={handleChange}
                              />
                              {marketErrors.owner_name && <div className="validation_msg">{marketErrors.owner_name}</div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Location</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                              />
                              {marketErrors.location && <div className="validation_msg">{marketErrors.location}</div>}

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Direction</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="direction"
                                value={formData.direction}
                                onChange={handleChange}
                              />
                               {marketErrors.direction && <div className="validation_msg">{marketErrors.direction}</div>} 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Per Sqft</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="per_sqft"
                                value={formData.per_sqft}
                                onChange={handleChange}
                              />
                                {marketErrors.per_sqft && <div className="validation_msg">{marketErrors.per_sqft}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Distance Km</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="distance"
                                value={formData.distance}
                                onChange={handleChange}
                              />
                                 {marketErrors.distance && <div className="validation_msg">{marketErrors.distance}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Mobile No 1</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                              />
                                {marketErrors.mobile && <div className="validation_msg">{marketErrors.mobile}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Mobile No 2</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                name="mobilef"
                                value={formData.mobilef}
                                onChange={handleChange}
                              />
                                {marketErrors.mobilef && <div className="validation_msg">{marketErrors.mobilef}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
             

                      <div className="col text-start mt-4 mx-4">
                            <button
                              type="reset"
                              className="btn1 me-2"
                              onClick={() =>
                                setFormData({
                                  owner_name: "",
                                  location: "",
                                  direction: "",
                                  per_sqft: "",
                                  distance: "",
                                  mobile: "",
                                  mobilef: "",
                                })
                              }
                            >
                              Clear
                            </button>
                            <button className="btn1 me-2" onClick={handleSubmit}>Add</button>
                          </div> 
                          </div>
                      
                      </div>
                      )}
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-2 " onClick={prevStep}>
                          Previous
                        </button>
                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? " " : (   <button className="btn1 me-2" onClick={handleMarketResearchSave}>Save</button>)}
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                   </div>
                  </div>

                  <div className={step === 3 ? "d-block" : "d-none"}>
                    <div className="row">
                      
                      <div className="mt-2">
                      <DataTable
                        columns={columns1}
                        data={surveyDetails}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />
                      </div>
                      

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                 </div>

                   

                 <div className={step === 4 ? "d-block" : "d-none"}>
                    <>
                    <Amenities id={id} save={triggerChild} oldData={fieldDetails.survey_amenities} status={status}/>
                       <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete"? " " : (   <button className="btn1" onClick={handleButtonClick}>
                          Save
                        </button>)}
                      </div></>
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

export default LayoutFieldSurveyDepartment;
