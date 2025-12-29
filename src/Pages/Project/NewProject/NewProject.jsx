import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "react-toastify/dist/ReactToastify.css"; 
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";

function NewProject() {
  
  return (
    <>
      <Topbar />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header mb-3">
                    <h4 className="page_heading">New Project</h4>
                  </div>
                
                <div className="card-body p-3">
             
              
                    <div className="row">
                      <h4 className="page_heading ticket-heading">
                        Project Details
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Short Name</label>
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
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Full Name</label>
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
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Land Mark</label>
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
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Project Start Date
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Project Types
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">Plots</option>
                                  <option value="Disable">Apartment</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Marketing Type
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">Own</option>
                                  <option value="Disable">Others</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Commission Type
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">Type 1</option>
                                  <option value="Disable">Type 2</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Branch</label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">Branch 1</option>
                                  <option value="Disable">Branch 2</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Project Incharge
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">Staff 1</option>
                                  <option value="Disable">Staff 2</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Project Budget
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">Budget 1</option>
                                  <option value="Disable">Budget 2</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Constituency
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">
                                    Chennai – North
                                  </option>
                                  <option value="Disable">
                                    Chennai – Central
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Guide Line Value
                                </label>
                              </div>
                              <div className="col-5 d-flex">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
                                <span className="align-item-center">
                                  &nbsp;&nbsp;&nbsp;/sq.ft
                                </span>
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
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Blocking Validity Days
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Advance Amount
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Advance Refund %
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                  Refund Days
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Validity Days
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Validity Paid %
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Settlement /sq.ft
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="lastName"
                                  value="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" >
                          Clear
                        </button>
                        <button className="btn1"  >
                          Submit
                        </button>
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

export default NewProject;
