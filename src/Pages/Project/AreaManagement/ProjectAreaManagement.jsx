import React, { useState } from "react";
import ExportButton from "../../../Utils/ExportButton";
import DataTable from "react-data-table-component";
import { SearchData } from "../../../Utils/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";

function ProjectAreaManagement() {
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
      name: "Plot No",
      selector: (row) => row.plotno,
      sortable: true,
    },
    {
      name: "Plot Sqft",
      selector: (row) => row.plotsqft,
      sortable: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.surveyno,
      sortable: true,
    },
    {
      name: "Dimension in SqFt",
      selector: (row) => row.dimension,
      sortable: true,
      width: "200px",
    },
    {
      name: "Direction",
      selector: (row) => row.direction,
      sortable: true,
    },
    {
      name: "Road Width",
      selector: (row) => row.roadWidth,
      sortable: true,
    },
    {
      name: "Plot Rate",
      selector: (row) => row.rate,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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
              openModal();
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
      plotno: "1001",
      plotsqft: "5000",
      surveyno: "12587",
      dimension: "100*450",
      direction: "North East",
      roadWidth: "60 Feet",
      rate: "5000",
      description: "Description",
      status: "Enable",
    },
    {
      slno: "2",
      date: "10 Apr 2024",
      plotno: "1001",
      plotsqft: "5000",
      surveyno: "12587",
      dimension: "100*450",
      direction: "North East",
      roadWidth: "60 Feet",
      rate: "5000",
      description: "Description",
      status: "Enable",
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
  const searchColumns = [
    "slno",
    "date",
    "plotno",
    "plotsqft",
    "surveyno",
    "dimension",
    "direction",
    "roadWidth",
    "rate",
    "description",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

  const handleEdit = (row) => {
   };

  const handleDelete = (row) => {
   };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Topbar/>
    <section className="section">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-sm-6">
          <div className="card">
            <div className="card-header">
              <h4 className="page_heading">Area Management</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-12 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      Plot No
                    </label>
                    <input type="text" className="form-control" id="lastName" />
                  </div>
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Plot Sq.Ft
                  </label>
                  <input type="number" className="form-control" id="lastName" />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Survey No
                  </label>
                  <input type="number" className="form-control" id="lastName" />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Dimension in SqFt
                  </label>
                  <input type="number" className="form-control" id="lastName" />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Direction
                  </label>
                  <input type="number" className="form-control" id="lastName" />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Road Width
                  </label>
                  <input type="number" className="form-control" id="lastName" />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Plot Rate
                  </label>
                  <input type="number" className="form-control" id="lastName" />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Description
                  </label>
                  <textarea
                    type="number"
                    className="form-control"
                    id="lastName"
                  />
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Status
                  </label>
                  <select id="inputState" className="form-select">
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
        <div className="col-lg-8 col-sm-6">
          <div className="card">
            <div className="card-header">
            <div className="d-flex">
              <h4 className="page_heading">Report</h4>
               <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'property_type.csv'}/></div>
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
                          <label className="form-label">Type</label>
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
                          <label className="form-label">Block</label>
                        </div>
                        <div className="col-5">
                          <select id="inputState" className="form-select">
                                  <option value="Enable">Block 1</option>
                                  <option value="Disable">Block 2</option>
                           </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">Sq.Ft.Rate</label>
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
  </section>
  <Footerbar/>
  </>
  );
}

export default ProjectAreaManagement;
