import React, { useState } from "react";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Add from "../Funnel/add";
import { Link } from "react-router-dom";
import View from "../Funnel/view";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Status from "../Funnel/status";

function Success() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      wrap: true,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      wrap: true,
      sortable: true,
    },
    {
      name: "Enquiry ID",
      selector: (row) => row.enquiryid ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name ,
      wrap: true,
      sortable: true,
    },

    {
      name: "Mobile Number",
      selector: (row) => row.mobilenumber ,
      wrap: true,
      sortable: true,
      width: "200px",
    },
    {
      name: "Alternative Number",
      selector: (row) => row.alternative ,
      wrap: true,
      sortable: true,
      width: "200px",
    },

    {
      name: "Email ID",
      selector: (row) => row.email,
      wrap: true,
      sortable: true,
    },
    {
      name: "Street",
      selector: (row) => row.street ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Area",
      selector: (row) => row.area,
      wrap: true,
      sortable: true,
    },
    {
      name: "District",
      selector: (row) => row.district ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
      wrap: true,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.source ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.projectname  ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type  ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      wrap: true,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-outline-success me-1 edit" data-tooltip-id="add" onClick={() => {handleDelete(row);   openModal();}}>
            <AddIcon />
          </button>
          <button className="btn btn-outline-info me-1 edit" data-tooltip-id="view" onClick={() =>{ handleDelete(row);openModalView();}}>
            <VisibilityIcon />
          </button>
          <button className="btn btn-outline-primary me-1 edit" data-tooltip-id="status" onClick={() =>{ handleDelete(row);openModalStatus();}}>
            <BatteryUnknownIcon />
          </button>
          <Link to="/enquiry">  <button data-tooltip-id="edit"
            className="btn btn-outline-warning me-1 edit"
            onClick={() => {
              handleEdit(row); 
            }}
          >
            <EditIcon />
          </button></Link>
          <button className="btn btn-outline-danger edit" data-tooltip-id="delete" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  const data = [
    {
      slno: "1",
      date: "15 May 2024",
      enquiryid: "12",
      name: "Alia",
      mobilenumber: "1234569875",
      alternative: "123456789",
      email: "@gmail.com",
      street: "chennai,Tamilnadu",
      area: "Aavadi",
      district: "chennai",
      pincode: "369854",
      source: "Tamilnadu",
      projectname: "Alpha 1",
      type: "Cold", 
      status: "Success",
    },
    {
        slno: "2",
        date: "22 May 2024",
        enquiryid: "12",
        name: "Alia",
        mobilenumber: "1234569875",
        alternative: "123456789",
        email: "@gmail.com",
        street: "chennai,Tamilnadu",
        area: "Aavadi",
        district: "chennai",
        pincode: "369854",
        source: "Tamilnadu",
        projectname: "Alpha 3",
        type: "Hot", 
        status: "Success",
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
    "enquiryid",
    "name",
    "mobilenumber",
    "alternative",
    "email",
    "street",
    "area",
    "district",
    "pincode",
    "source",
    "projectname",
    "type",
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

  const [isModalOpenview, setisModalOpenview] = useState(false);
  const openModalView = () => {
    setisModalOpenview(true);
  };
  const closeModalView = () => {
    setisModalOpenview(false);
  };

  const [isModalOpenStatus, setisModalOpenStatus] = useState(false);
  const openModalStatus = () => {
    setisModalOpenStatus(true);
  };
  const closeModalStatus = () => {
    setisModalOpenStatus(false);
  };

  return (
    <>
      <Topbar />
      <Add isOpen={isModalOpen} closeModal={closeModal}/>
      <View isOpen={isModalOpenview} closeModal={closeModalView}/>
      <Status isOpen={isModalOpenStatus} closeModal={closeModalStatus}/>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Success Funnel Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={filterdata}
                        filename={"Success_funnel.csv"}
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
      <ReactTooltip  id="add"  place="bottom"  variant="success" content="Add" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="view"  place="bottom"  variant="info" content="View" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="status"  place="bottom"  content="Status" style={{ fontSize: "10px"}}/>
      <ReactTooltip  id="edit"  place="bottom"   variant="warning" content="Edit" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="delete"  place="bottom"    content="Delete" style={{ fontSize: "10px"}}/>
      <Footerbar />
    </>
  );
}

export default Success;
