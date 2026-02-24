import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DataTable from "react-data-table-component";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import customStyle from "../../../../Utils/tableStyle";
import ExportButton from "../../../../Utils/ExportButton";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";

const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

function VillaNewProperty() {
  const { isLoaded } = useJsApiLoader(loaderOptions);
 


  const  columns1 = [
    {
      name: "S.No",
      selector: (row) => row["S.No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Project ID",
      selector: (row) => row["Project ID"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Plot no",
      selector: (row) => row["Plot no"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "sqft",
      selector: (row) => row["sqft"],
      sortable: true,
      wrap: true,
    },  
    
    {
      name: "Survey No",
      selector: (row) => row["Survey No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Sub division",
      selector: (row) => row["Sub division"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row["SD unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "Road width",
      selector: (row) => row["Road width"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Plot facing",
      selector: (row) => row["Plot facing"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "East Dimension",
      selector: (row) => row["East Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "East unit",
      selector: (row) => row["East unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "West Dimension",
      selector: (row) => row["West Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "West unit",
      selector: (row) => row["West unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "South Dimension",
      selector: (row) => row["South Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "South unit",
      selector: (row) => row["South unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "North Dimension",
      selector: (row) => row["North Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "North unit",
      selector: (row) => row["North unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Built up area",
      selector: (row) => row["Built up area"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of floors",
      selector: (row) => row["No of floors"],
      sortable: true,
      wrap: true,
    },   
    {
      name: "Door facing",
      selector: (row) => row["Door facing"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bedroom",
      selector: (row) => row["no of bedroom"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bathrooms",
      selector: (row) => row["no of bathrooms"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of balconies",
      selector: (row) => row["No of balconies"],
      sortable: true,
      wrap: true,
    },  
   
    // {
    //   name: "Plot price per unit",
    //   selector: (row) => row["Plot price per unit"],
    //   sortable: true,
    //   wrap: true,
    // },  
    // {
    //   name: "Built up area cost per unit",
    //   selector: (row) => row["Built up area cost per unit"],
    //   sortable: true,
    //   wrap: true,
    //   width:"130px"
    // },  
    // {
    //   name: "Total cost",
    //   selector: (row) => row["Total cost"],
    //   sortable: true,
    //   wrap: true,
    // }, 
  ];

  let navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  ////for Model
 

  

  // google location -------------------------------------------->
  const autocompleteRef = useRef(null);
  const [propLoc, setPropLoc] = useState([]);
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const latLng = { lat, lng };
      setPropLoc(latLng);
    }
  };

  const [selectedValueArea, setSelectedValueArea] = useState("Select");

  const handleSelectArea = (event) => {
    setSelectedValueArea(event.target.textContent);
  };

  // excel upload ==---------------------------------------------------------->
  const fileUploadRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
 
  const [subStep, setSubStep] = useState(1);
  const [finalData,setFinalData] = useState([])
 
  const handleExcelSubmit =(e)=>{
    e.preventDefault()
     setFinalData(excelData)
  }

  return isLoaded ? (
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
                          onClick={() => setStep(2)}
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
                  <form>
                    {step === 1 && (
                      <div className="row">
                        <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Project ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={"G24VLAO100"}
                            readOnly
                          />
                        </div>

          
                      <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                             Type
                          </label>
                          <select id="inputState" className="form-select">
                              <option value="land">Villa</option> 
                          </select>
                        </div> 

                      
                       

                        <h6 className="mt-4 mb-3">Basic Deatils</h6>
                        <hr />
                        <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>


                        <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Phone No
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="col-md-12 mb-3 col-lg-4">
                          <label htmlFor="lastName" className="form-label">
                            Address 1
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>
                        <div className="mb-3 col-md-12 col-lg-4">
                          <label htmlFor="lastName" className="form-label">
                            Address 2
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

               

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            State
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">TamilNadu</option>
                            <option value="Disable">Kerala</option>
                          </select>
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            District
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">Chengalpattu</option>
                            <option value="Disable">Ariyalur</option>
                            <option value="Disable">Chennai</option>
                          </select>
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Taluk
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">Purasaiwalkam Taluk</option>
                            <option value="Disable">Tondiarpet Taluk</option>
                          </select>
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Village
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">Selvoyil</option>
                            <option value="Disable">Jambuli</option>
                          </select>
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Pincode
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">600005</option>
                            <option value="Disable">600007</option>
                          </select>
                        </div>

                        <h6 className="mt-4 mb-3">Project Deatils</h6>
                        <hr />

                    
 

                        <div className="col-md-12 col-lg-4 mb-3 ">
                       <label htmlFor="lastName" className="form-label">
                            Project Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div> 

                         
                        
                     <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                             Year Built
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>


                       <div className="col-md-12 col-lg-4 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total Project area
                            </label>
                            <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                          </div>

                     
                       <div className="col-md-12 col-lg-4 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total No of units
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>


                         <div className="col-md-12 col-lg-4 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total no of units available for sale
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>
                    
 

                      <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Brochure
                          </label>
                          <input
                            type="File"
                            className="form-control"
                            id="lastName"
                          />
                        </div>
                    
                          <div className="mb-3 col-md-12 col-lg-4">
                            <label className="form-label" htmlFor="inputState">
                              Property Status
                            </label>
                            <select id="inputState" className="form-select">
                              <option value="Enable">Completed</option>
                              <option value="Enable">Under Process</option>
                              <option value="Enable">Fully Furnished</option>
                              <option value="Enable">Semi Furnished</option>
                              <option value="Enable">Unfurnished</option>
                            </select>
                          </div>
                     


                        {/* <div className="col-md-12 col-lg-4 mb-3 d-none">
                          <label htmlFor="lastName" className="form-label">
                            GPS Location
                          </label>
                          <Autocomplete
                            onLoad={(autocomplete) =>
                              (autocompleteRef.current = autocomplete)
                            }
                            onPlaceChanged={handlePlaceChanged}
                          >
                            <input
                              type="text"
                              className="form-control"
                              name="location"
                              autoComplete="off"
                              placeholder="Location"
                            />
                          </Autocomplete>

                          {propLoc.lat && propLoc.lng && (
                            <div className="mt-2" style={{ fontSize: "12px" }}>
                              <span>Latitude: {propLoc.lat}</span> &nbsp;
                              <span>Longitude: {propLoc.lng}</span>
                            </div>
                          )}
                        </div> */}

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
                                <label className="form-label">
                                  DTCP Reg no
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  RERA Approval No.
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  DTCP Approval Copy
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  RERA Approval Copy
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Layout Copy
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property Documents
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property Parent Documents
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property EC
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-5">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property PATTA
                                </label>
                              </div>
                              <div className="col-7">
                                <input type="file" class="form-control" />
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
 
 

                    { step === 3 && (
                      <>
                        <div className="row">
                        <div>
                          <nav className="d-flex">
                            <a
                              className={`tab_custom link11 ${
                                subStep === 1 ? "active2" : ""
                              }`}
                              href="javascript:void(0);"
                              onClick={() => setSubStep(1)}
                            >
                              Upload
                            </a>

                            <a
                              className={`tab_custom link11 ${
                                subStep === 2 ? "active2" : ""
                              }`}
                              href="javascript:void(0);"
                              onClick={() => setSubStep(2)}
                            >
                              Report
                            </a>
                          </nav>
                        </div>

                        {subStep === 1 && (
                          <div className="">
                            <div className="row mt-2">
                              <div className="col-lg-4">
                                <div className="card2">
                                  <div className="p-3 mt-3">
                                    <h4 className="page_heading">
                                      Excel Format
                                    </h4>
                                    <ExportButton
                                      columns={columns1}
                                      data={[]}
                                      type={"Download Format"}
                                      filename={"surveyNo_uploading_format.csv"}
                                    />

                                    <div className="mb-3 mt-3">
                                      <h6 className="page_heading">
                                        Excel Upload
                                      </h6>
                                      <ExcelFileUpload
                                        setExcelData={setExcelData}
                                        fileInputRef={fileUploadRef}
                                      />
                                    </div>

                                    <div className="text-end py-3 px-3">
                                      <button
                                        className="btn1 me-1" 
                                      >
                                        Clear
                                      </button>
                                      <button className="btn1 me-2" onClick={handleExcelSubmit}>
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-8">
                                <div className="card2">
                                  <div className="">
                                  <DataTable
                                  columns={columns1}
                                  data={finalData}
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
                        )}
                        {subStep === 2 && (
                          <div className="mt-5">
                            <DataTable
                              columns={columns1}
                              data={excelData}
                              customStyles={customStyle}
                              pagination
                              // selectableRows
                              persistTableHead={true}
                              fixedHeader
                            />
                          </div>
                        )}

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1 me-2">Submit</button>
                        </div>
                      </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </>
  ) : null;
}

export default VillaNewProperty;
