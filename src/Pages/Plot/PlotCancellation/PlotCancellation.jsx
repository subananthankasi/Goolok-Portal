import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";

function PlotCancellation() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Receipt",
      selector: (row) => row.receipt,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Paymode",
      selector: (row) => row.paymode,
      sortable: true,
    },
    {
      name: "Narration",
      selector: (row) => row.narration,
      sortable: true,
    },
    {
      name: "A/C Type",
      selector: (row) => row.actype,
      sortable: true,
    },
     
  ];

  const data = [
    {
      slno: "1",
      date: "10 Apr 2024",
      receipt: "Block A",
      amount: "1000",
      type: "online",
      paymode: "online",
      narration: "narration",
      actype: "saving", 
    },
    {
      slno: "1",
      date: "10 Apr 2024",
      receipt: "Block A",
      amount: "1000",
      type: "online",
      paymode: "online",
      narration: "narration",
      actype: "saving", 
    },
  ];
  const columns1 = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "Marketer ID",
      selector: (row) => row.marketer,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },  
  ];

  const data1 = [
    {
      slno: "1",
      designation: "Sales Executive",
      marketer: "marketer",
      name: "Arul",
      mobile: "12345678990", 
    },
    {
      slno: "2",
      designation: "Sales Executive",
      marketer: "marketer",
      name: "Arul",
      mobile: "12345678990", 
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
 

  const handleEdit = (row) => {
   };

  const handleDelete = (row) => {
   };

  return (
    <>
      <Topbar />
      <ToastContainer />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="">
                <div className="">
                  <div className="row">
                    <div className="row">
                      <div className="col-lg-5  ">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="page_heading">Plot Cancellation</h4>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <h4 className="page_heading ticket-heading">
                                Plot Details
                              </h4>

                              <div className="row">
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                          Project
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <select
                                          id="inputState"
                                          className="form-select"
                                        >
                                          <option value="Enable">
                                            Project 1
                                          </option>
                                          <option value="Disable">
                                            Project 2
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                          Full Name
                                        </label>
                                      </div>
                                      <div className="col-8">
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
                                Cancel Details
                              </h4>
                              <div className="row">
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                          Reason
                                        </label>
                                      </div>
                                      <div className="col-8">
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

                              <hr className="mt-5" />

                              <h4 className="page_heading ticket-heading mb-5">
                                Payment History
                              </h4>
                              <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyle}
                                pagination
                                // selectableRows
                                fixedHeader
                              />
                            </div>
                          </div>
                          <div className="text-end py-3 px-3">
                            <button className="  btn1 me-1">Clear</button>
                            <button className="  btn1">Add</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7  ">
                        <div className="card">
                   
                          <div className="card-body">
                            <div className="col-lg-12  mb-4">
                              <div className="row">
                              <h4 className="page_heading ticket-heading">
                                Customer Details
                              </h4>
                                <div className="col-md-12 col-lg-6"> 
                                  <div className="form-group mt-3"> 
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                        Customer Name
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                         Mobile
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
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
                                        <label className="form-label">
                                        Alternate Mobile
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                         Phone
                                        </label>
                                      </div>
                                      <div className="col-8">
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
                              <hr className="mt-5" />
                              <h4 className="page_heading ticket-heading">
                                Marketer Details
                              </h4>
                                <div className="col-md-12 col-lg-6"> 
                                  <div className="form-group mt-3"> 
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                        Marketer ID
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                         Name
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
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
                                        <label className="form-label">
                                        Designation
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                         Mobile
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="lastName"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DataTable className="mt-4"
                                columns={columns1}
                                data={data1}
                                customStyles={customStyle}
                                pagination
                                // selectableRows
                                fixedHeader
                              />
                              </div> 
                       
                              <div className="row">
                              <hr className="mt-5" />
                              <h4 className="page_heading ticket-heading">
                                Plot Summary
                              </h4>
                                <div className="col-md-12 col-lg-4"> 
                                  <div className="form-group mt-3"> 
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                       SqFt Rate
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                         Plot Size
                                        </label>
                                      </div>
                                      <div className="col-8">
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
                                        SqFt
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            
                              </div>
                              <div className="row">
                               
                                <div className="col-md-12 col-lg-6"> 
                                  <div className="form-group mt-3"> 
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                       Block
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                        Total Value
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
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
                                        <label className="form-label">
                                         GL.Rate
                                        </label>
                                      </div>
                                      <div className="col-8">
                                         <input  type="text"  className="form-control"  id="lastName" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">
                                         GL.Balance
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
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
                                        <label className="form-label">
                                        Paid
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
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
                                        <label className="form-label">
                                        Payable
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          type="text"
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
                                        <label className="form-label">
                                        Description
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <textarea  type="text" className="form-control" id="lastName"  />
                                      </div>
                                    </div>
                                  </div>
                                </div> 


                              </div> 
                            </div>
                          </div>
                        </div>
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

export default PlotCancellation;
