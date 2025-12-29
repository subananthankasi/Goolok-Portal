import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function HouseMediaDepartment() {
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
      name: "Date",
      selector: (row) => row.nearLand,
      wrap: true,
      sortable: true,
    },
    {
      name: "Images",
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
                          Image
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Video
                        </a>

                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Map
                        </a>
                      </nav>
                    </div>

                    <div className="p-2"  style={{marginLeft:'auto'}}>
                        <button className="btn1"  onClick={() => navigate(-1)}>
                         <ArrowBackIcon/> back
                        </button>
                      </div>

                  </div>
                </div>
                <div className="card-body p-3">
              
                  {step === 1 && (
                    <div className="row">
                      {/* <h4 className="page_heading">Image Upload</h4> */}
                      <DataTable
                        columns={columns}
                        data={""}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />

                      <div className="container mt-5 mb-3">
                        <div className="row">
                          <div className="col-md-12 col-lg-5">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Image Upload
                                  </label>
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

                          <div className="col-md-12 col-lg-2 mt-3">(OR)</div>
                          <div className="col-md-12 col-lg-5">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">Link</label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-lg-5">
                              <div className="form-group mt-3">
                                <div className="row">
                                  <div className="col-4">
                                    <label className="form-label">
                                      Description
                                    </label>
                                  </div>
                                  <div className="col-5">
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end py-3 px-3">
                            <button className="btn1 me-1">Clear</button>
                            <button className="btn1">Add</button>
                          </div>
                        </div>
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
                  )}

                  {step === 2 && (
                    <div className="row">
                      {/* <h4 className="page_heading">Pricing</h4> */}
                      <DataTable
                        columns={columns}
                        data={""}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />

                      <div className="container mt-5 mb-3">
                        <div className="row">
                          <div className="col-md-12 col-lg-5">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Video Upload
                                  </label>
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

                          <div className="col-md-12 col-lg-2 mt-3">(OR)</div>
                          <div className="col-md-12 col-lg-5">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">Link</label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-lg-5">
                              <div className="form-group mt-3">
                                <div className="row">
                                  <div className="col-4">
                                    <label className="form-label">
                                      Description
                                    </label>
                                  </div>
                                  <div className="col-5">
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end py-3 px-3">
                            <button className="btn1 me-1">Clear</button>
                            <button className="btn1">Add</button>
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
                    <>
                      <div className="row">
                        <div className="col-md-12 ">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-sm-12 col-lg-3">
                                <label className="form-label">
                                  Select Location
                                </label>
                              </div>
                              <div className="col-sm-12 col-lg-7">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14252.453659966828!2d80.21046845935525!3d13.066821016714034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1709963426880!5m2!1sen!2sin"
                                width="100%"
                                height={295}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
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
                    </>
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

export default HouseMediaDepartment;
