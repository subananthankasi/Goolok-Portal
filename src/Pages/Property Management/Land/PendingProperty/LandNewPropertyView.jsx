import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataTable from "react-data-table-component"; 
import customStyle from "../../../../Utils/tableStyle"; 
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import axios from "axios";
import FileDownloadIcon from '@mui/icons-material/Visibility';
import { fetchVendor } from "../../../../Redux/Actions/MasterPage/VendorAction";
import { useDispatch, useSelector } from "react-redux";
import FileView from "../../../../Utils/FileView/FileView";
import Spinner from 'react-bootstrap/Spinner';

function LandNewPropertyView() {
    let navigate = useNavigate(); 
    const [land,SetLand] = useState([])
    const [doc,SetDoc] = useState([])
    const [survey,SetSurvey] = useState([]) 
 
      // get vendor details 
   const dispatch = useDispatch(); 
   const vendorData = useSelector((state) => state.vendor.vendorData)
   const getVendor = land?.vendor ? vendorData.filter((data) => data.id === land.vendor): [];

    useEffect(()=>{
      dispatch(fetchVendor())
        if(land.project_document){
          const parsedObject = JSON.parse(land.project_document);
          SetDoc(parsedObject)
        }
    },[land.project_document,dispatch])

 
    const [step, setStep] = useState(1); 
    const nextStep = () => {
      setStep((prevStep) => prevStep + 1);
    }; 
    const prevStep = () => {
      setStep((prevStep) => prevStep - 1);
    };




    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search); 
    const id = queryParams.get('id');
    const [loading,setLoading] = useState(true) 


    useEffect(() => {
        axios.get(`${API_BASE_URL}/project/${id}`, {
          headers: { 
            'Gl-Status':'pending',    
          },
      })
          .then(response => {
            SetLand(response.data[0].land);
            SetSurvey(response.data[0].survey); 
            setLoading(false)
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    const columns1 = [
        {
          name: "S.No",
          selector: (row,index) => index+1,
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
          name: "Total Land area",
          selector: (row) => row.glk_totalarea,
          sortable: true,
          width: "150px",
          wrap: true,
        },
        {
          name: "TLA Unit",
          selector: (row) => row.glk_totalunit,
          sortable: true,
          wrap: true,
        },
        {
          name: "f-line",
          selector: (row) => row.glk_fline,
          sortable: true,
          wrap: true,
        },
        {
          name: "f-line Unit",
          selector: (row) => row.glk_fline_unit,
          sortable: true,
          wrap: true,
        },
        {
          name: "G-line",
          selector: (row) => row.glk_gline,
          sortable: true,
          wrap: true,
        },
        {
          name: "Gline Unit",
          selector: (row) => row.glk_glineunit,
          sortable: true,
          wrap: true,
        },
        {
          name: "Land facing",
          selector: (row) => row.glk_landfacing,
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
          name: "SD Unit",
          selector: (row) => row.glk_sdunit,
          sortable: true,
          wrap: true,
        },
    
  
      ];


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
  return   (
    <>
      <FileView isOpen={isModalOpenFile} closeModal={closeModalFile} fileUrls={url}/>  
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
                          href="javascript:void(0);"
                          onClick={() => setStep(1)}
                        >
                          Basic Details
                        </a>

                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="javascript:void(0);"
                          onClick={() =>setStep(2)}
                        >
                          Upload Documents
                        </a>

                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="javascript:void(0);"
                          onClick={() => setStep(3)}
                        >
                          Survey
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

                      <div className="col-md-12 col-lg-4 mb-3">
                        <div className="row">
                            <div className="col-5">
                            <label htmlFor="lastName" className="form-label">
                                Project ID :
                            </label>
                            </div>
                            <div className="col-7">
                            <span className="field_value">{land.project_tid}</span>
                            </div>
                        </div>
                        </div>


                        <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                  Land Type :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.subpro_name}</span>
                                </div>
                            </div>
                            </div>


                            <h6 className="mt-4 mb-3">Vendor Deatils</h6>
                            <hr /> 
                            <div className="row">
                      {getVendor.length > 0 ? (
                        <>
                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                    vendor Name :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].username}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Vendor Mobile :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].mobile}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Email :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].vendor_email}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       State :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].state_name}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       District :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].district}</span>
                                    </div>
                                </div>
                                </div>


                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Village :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].village_name}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Taluk :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].taluk_name}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Pincode :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].pincode}</span>
                                    </div>
                                </div>
                                </div>


                                </>
                       ) :  (
                        <>
                             <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label text-danger">
                                        empty Data
                                    </label>
                                    </div>
                              
                                </div>
                                </div>

                        </>
                       )}
                      </div>
 

                        <h6 className="mt-4 mb-3">Basic Deatils</h6>
                        <hr /> 

                        <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                 Name :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_name}</span>
                                </div>
                            </div>
                            </div>


                     

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Phone No :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_mobile}</span>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Address 1 :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_address}</span>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                 Address 2 :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_addressf}</span>
                                </div>
                            </div>
                            </div>

       
 
                   

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                State :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.state_name}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                District :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.district}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Taluk :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.taluk_name}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Village :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.village_name}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Pincode :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.pincode}</span>
                                </div>
                            </div>
                            </div>

                      
             


                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2">Clear</button>
                          <button className="btn1" onClick={(e) => { e.preventDefault(); nextStep() }}>
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={step === 2 ? "d-block" : "d-none"}>
                      <div className="row">
                        
  
               
                      {doc?.map((data, index) => (
                        <div className="col-md-12 col-lg-6" key={index}>
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">{data.label}</label>
                              </div>
                              <div className="col-7">
                                <div className="">
                                {/* <a href={`${IMG_PATH}/land/${data.file}`} className="btn1" download>
                                    <FileDownloadIcon />
                                  </a> */}

                                  <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}/land/${data.file}`)}>
                                    <FileDownloadIcon />
                                  </button>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}


                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2" onClick={(e) => { e.preventDefault(); prevStep(); }}>
                            Previous
                          </button>
                          <button className="btn1"  onClick={(e) => { e.preventDefault(); nextStep(); }}>
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={step === 3 ? "d-block" : "d-none"}>
                      <div className="row">
                     
                        <div>
                          <div className="row mt-2"> 
                            <div className="col-lg-12">
                              <div className="card2">
                                <div className="">
                                  <DataTable
                                    columns={columns1}
                                    data={survey}
                                    customStyles={customStyle}
                                    pagination
                                    // selectableRows
                                    persistTableHead={true}
                                    fixedHeader
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                   

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={(e) => { e.preventDefault(); prevStep();}}>
                            Previous
                          </button> 
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          }
          </div>
        </div>
      </section>
    </>
  )  
}
export default LandNewPropertyView;
