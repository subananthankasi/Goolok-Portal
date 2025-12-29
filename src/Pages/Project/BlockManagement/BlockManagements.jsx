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

function BlockManagements() {
 
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
      name: "Block Name",
      selector: (row) => row.blockName,
      sortable: true,
    },
    {
      name: "Sq ft Rate",
      selector: (row) => row.rate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
      date: "10 Apr 2024",
      blockName: "Block A",
      rate: "1000",
      status: "Enable",
    },
    {
      slno: "2",
      date: "14 Apr 2024",
      blockName: "Block B",
      rate: "2000",
      status: "Disable",
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
      <Topbar />
      <ToastContainer /> 
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="">
              
                <div className="">
           
                    <div className="row">
                    

                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="card">
                          <div className="card-header">
                  <h4 className="page_heading">Block Deatils</h4>
                </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Block Name
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
                                    Sq ft Rate
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
                                    Status
                                  </label>
                                  <select
                                    id="inputState"
                                    className="form-select"
                                  >
                                    <option value="Enable">Enable</option>
                                    <option value="Disable">Disable</option>
                                  </select>
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
                          <div className="card">
                            <div className="card-header">
                              <div className="d-flex">
                                <h4 className="page_heading">Report</h4>
                                <div style={{ marginLeft: "auto" }}>
                                  <ExportButton
                                    columns={columns}
                                    data={filterdata}
                                    filename={"Block_Report.csv"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="col-lg-12  mb-4">

                              <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">Project Name</label>
                        </div>
                        <div className="col-5">
                        <select id="inputState" className="form-select">
                                  <option value="Enable">Name 1</option>
                                  <option value="Disable">Name 2</option>
                                </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">Project Type</label>
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
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">Commission Type</label>
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
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">Branch</label>
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
                                <div className="searchbar mt-3">
                                  <input
                                    type="text"
                                    className="search"
                                    onChange={handleFilter}
                                    placeholder="..Search"
                                  ></input>
                                </div>
                                <DataTable
                                  columns={columns}
                                  data={filterdata}
                                  customStyles={customStyle}
                                  pagination
                                  // selectableRows
                                  fixedHeader
                                />
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

export default BlockManagements;
