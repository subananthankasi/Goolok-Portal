import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit"; 
import "../../../Property Management/propertyManagement.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AmenitiesCharges from "./AmenitiesCharges";
import PropertyCharges from "./PropertyCharges";
import { SearchData } from "../../../../Utils/Search";

function VillaAdminDepartment() {
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
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Block Name",
      selector: (row) => row.BlockName,
      sortable: true,
    },
    {
      name: " Plot Sq ft Rate",
      selector: (row) => row.PlotRate,
      sortable: true,
    },
    {
      name: "Offer",
      selector: (row) => row.Offer,
      sortable: true,
    },
    {
      name: "Offer By",
      selector: (row) => row.OfferBy,
      sortable: true,
    },
    {
      name: "Offer Value",
      selector: (row) => row.OfferValue,
      sortable: true,
    },
    {
      name: "Offer Amount",
      selector: (row) => row.OfferAmount,
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => row.SellingPrice,
      sortable: true,
    },
    {
      name: "Valitidy",
      selector: (row) => row.Valitidy,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row);
            }}
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(row)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      slno: "1",
      BlockName: "BlockName1",
      PlotRate: "Block A",
      Offer: "Block b",
      OfferBy: "Block c",
      OfferValue: "Block d",
      OfferAmount: "Block e",
      SellingPrice: "Block f",
      Valitidy: "1000",
    },
    {
      slno: "2",
      BlockName: "BlockName2",
      PlotRate: "Block A",
      Offer: "Block b",
      OfferBy: "Block c",
      OfferValue: "Block d",
      OfferAmount: "Block e",
      SellingPrice: "Block f",
      Valitidy: "1000",
    },
  ];

 

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["slno", "date", "blockName", "rate", "status"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

  const handleEdit = (row) => {
   };

  const handleDelete = (row) => {
   };

  return (
    <>
       <ToastContainer />

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
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  value={"G24VLAO100"}
                                  readOnly
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
                                  Project Name
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  value={"Alpha 1"}
                                  readOnly
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
                                  Property Location
                                </label>
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
                                <label className="form-label">
                                  Property Types
                                </label>
                              </div>
                              <div className="col-5">
                                <select id="inputState" className="form-select">
                                  <option value="Enable">DTCP</option>
                                  <option value="Disable">
                                    Unapproval Ploat
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
                                <label className="form-label">Address 1</label>
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
                                <label className="form-label">Address 2</label>
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
                                <label className="form-label">State</label>
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
                                <label className="form-label">Distric</label>
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
                                <label className="form-label">Taluk</label>
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
                                <label className="form-label">Village</label>
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
                                <label className="form-label">Pincode</label>
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
                                  Total Validity Days
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="Total"
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
                                  Total Installment
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="TotalInstallment"
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
                                  Booking Amount
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
                                <label className="form-label">Validity</label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="Total"
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
                                  Installment
                                </label>
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="Total"
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
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="row">
                      <AmenitiesCharges />

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
                      <PropertyCharges />
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1">save</button>
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

export default VillaAdminDepartment;
