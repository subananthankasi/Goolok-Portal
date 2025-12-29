import React, { useState } from "react"; 
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function HouseContentWritingDepartment() {

  let navigate = useNavigate();

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
    },
   {
      name: "Meta Tag",
      selector: (row) => row.location,
      wrap: true,
      sortable: true,
    }, {
      name: "Tag",
      selector: (row) => row.location,
      wrap: true,
      sortable: true,
    },
    {
      name: "Language",
      selector: (row) => row.location,
      wrap: true,
      sortable: true,
    }, 
    {
      name: "Description",
      selector: (row) => row.description,
      wrap: true,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-danger delete">
            <DeleteIcon />
          </button>
        </div>
      ),
    },
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

  return (
    <> 
      <section className="section">
        <div className="container">
          <div className="row">
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
                          Amenities
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Description
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Near By
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                          Upload
                        </a>
                      </nav>
                    </div>

                    <div className="p-2" style={{marginLeft:'auto'}}>
                        <button className="btn1"  onClick={() => navigate(-1)}>
                         <ArrowBackIcon/> back
                        </button>
                      </div>

                  </div>
                </div>
                <div className="card-body p-3">
                 
                  {step === 1 && (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Power Back Up
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Lift
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Rain Water Harvesting
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Club House
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Gymnasium
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Park
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Reserved Parking
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Security
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Water Storage
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Service/Goods Lift
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Visitor Parking
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Intercom Facility
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Maintenance Staff
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Waste Disposal
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              DTH Television Facility
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Jogging and Strolling Track
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Flower Gardens
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Kids Play Area
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Multipurpose Courts
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Fire Fighting Equipment
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Power Back Up
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Lift
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Rain Water Harvesting
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              CCTV Camera
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Badminton court
                            </label>
                          </div>
                        </div>
                        {/* <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                             Lift
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                             Rain Water Harvesting
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                            CCTV Camera
                            </label>
                          </div>
                        </div> */}
                      </div>
                      <div className="text-end py-3 px-3">
                        {/* <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button> */}
                        <button className="btn1" onClick={nextStep}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="row">
                      <h4 className="page_heading">Add Description</h4>

                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="card2">
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Meta Tag
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                    />
                                  </div>
                                </div>

                                <div className="mb-3 col-md-12">
                                  <label
                                    className="form-label"
                                    htmlFor="inputState"
                                  >
                                    Tag
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="lastName"
                                  />
                                </div>

                                <div className="mb-3 col-md-12">
                                  <label
                                    className="form-label"
                                    htmlFor="inputState"
                                  >
                                    Select Language
                                  </label>
                                  <select
                                    id="inputState"
                                    className="form-select"
                                  >
                                    <option value="Enable">Tamil</option>
                                    <option value="Disable">English</option>
                                  </select>
                                </div>

                                <div className="mb-3 col-md-12">
                                  <label
                                    className="form-label"
                                    htmlFor="inputState"
                                  >
                                    Discription
                                  </label>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                   
                                  />
                                </div>
                              </form>
                            </div>
                            <div className="text-end py-3 px-3">
                              <button className="  btn1 me-1">Clear</button>
                              <button className="  btn1">Add</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                          <div className="card2">
                            <div className="card-header">
                              <div className="d-flex">
                                <h4 className="page_heading">Report</h4>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="col-lg-12  mb-4">
                                <div className="searchbar mt-3"></div>
                                <DataTable
                                  columns={columns}
                                  data={""}
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
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <div className="container mt-5 mb-3">
                        <div className="row" style={{ maxWidth: "150px" }}>
                          <button className="btn1">
                            <SearchIcon />
                            Search
                          </button>
                        </div>
                      </div>
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <div className="row">
                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Upload 1</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Upload 2</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Upload 3</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Upload 4</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Upload 5</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Upload 6</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1">Submit</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </>
  );
}

export default HouseContentWritingDepartment;
