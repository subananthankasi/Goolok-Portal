import React from "react";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Enquiry() {
  return (
    <>
      <Topbar />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <h4 className="page_heading">New Enquiry</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                          Enquiry ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            readOnly
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Mobile Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Email ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Area
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Pincode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>
                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Project Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="mb-3 col-md-12">
                          <label className="form-label" htmlFor="inputState">
                            Status
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">Success</option>
                            <option value="Disable">Dropped</option>
                          </select>
                        </div>

                      </div>

                      <div className="col-md-12 col-lg-6">
                      <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Alternative Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                          Street
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>

                        <div className="mb-3 col-md-12">
                          <label className="form-label" htmlFor="inputState">
                            District
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">Chennai</option>
                            <option value="Disable">Chengalpattu</option>
                          </select>
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Source
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>
                        <div className="mb-3 col-md-12">
                          <label className="form-label" htmlFor="inputState">
                            Type
                          </label>
                          <select id="inputState" className="form-select">
                            <option value="Enable">Cold</option>
                            <option value="Disable">Hot</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-end  ">
                        <button className="  btn1 me-1">Clear</button>
                        <button className="  btn1">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footerbar />
    </>
  );
}

export default Enquiry;
