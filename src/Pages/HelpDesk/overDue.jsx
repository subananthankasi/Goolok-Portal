import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchData } from "../../../src/Utils/Search";
import ExportButton from "../../../src/Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import "./help.css";
import Dropdown from "react-bootstrap/Dropdown";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';

function OverDue() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      wrap: true,
      sortable: true, 
    },
    {
      name: "Tickets Details",
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div className="pt-2 pb-2">
        <div>Esse distinctio impedit repellat commodi.</div>
        <div className="ticket-info d-flex mt-2">
          <div className="data-info">
            <span>#SP-27</span>
          </div>
          <div className="data-info">
            <span>
              <CalendarMonthIcon className="text-info" /> &nbsp;&nbsp;25 Apr,
              2024
            </span>
          </div>
          <div className="data-info">
            <QueryBuilderIcon className="text-danger" /> &nbsp;&nbsp;3 days
            ago
          </div>
          <div className="data-info">
            <div className="priority"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High priority
            </div>
          </div>
          <div className="data-info">
          <CategoryIcon className="text-warning" /> &nbsp;&nbsp;Category
          </div>
        </div>
      </div>
      ), 
      width:'550px',  
    },
    {
      name: "User",
      selector: (row) => row.user,
      wrap: true,
      sortable: true, 
    },
    {
      name: "Status",
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div>
          <button className="btn11 btn_pdf light btn-primarys">Over Due</button>
        </div>
      ), 
    },

    {
      name: "Assign To",
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" className="btn_pdf" id="dropdown-basic">
              Assign
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Self Assign</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Other Assign</Dropdown.Item> 
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ), 
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
                   <Link to="/View_tickets"> 
            <button
              data-tooltip-id="edit"
              className="btn btn-outline-primary me-1 edit"
              onClick={() => {
                handleEdit(row);
              }}
            >
              <VisibilityIcon />
            </button> 
          </Link>
          <button
            className="btn btn-outline-danger edit"
            data-tooltip-id="delete"
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
      user: "Amal raj",
    },
    {
      slno: "2",
      user: "Mohan",
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
        borderRight: "1px solid #e2e2e2",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        borderRight: "1px solid #e2e2e2",
      },
    },
  };

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = [
    "slno", 
    "user",
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

  return (
    <> 
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Over Due Tickets</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={filterdata}
                        filename={"OverDue_Tickets.csv"}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="searchbar">
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
      <ReactTooltip
        id="edit"
        place="bottom"
        content="view"
        style={{ fontSize: "10px" }}
      />
      <ReactTooltip
        id="delete"
        place="bottom"
        content="Delete"
        style={{ fontSize: "10px" }}
      />
     </>
  );
}

export default OverDue;
