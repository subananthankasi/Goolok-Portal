import React, { useState } from "react"; 
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";    
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";

function ProjectList() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row) => row.shortname,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    }, 
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Budget",
      selector: (row) => row.budget, 
      sortable: true,
    },
    {
      name: "GV",
      selector: (row) => row.gv, 
      sortable: true,
    },

    {
      name: "No.of Blocks",
      selector: (row) => row.noblock,
      sortable: true,
    },
    {
      name: "No.of Plots",
      selector: (row) => row.noplot,
      sortable: true,
    },

      
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-info me-1 edit"  data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row); 
            }}
          >
            <EditIcon />
          </button>
          <button className="btn btn-outline-danger delete" data-tooltip-id="delete" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      slno: "1",
      date: "15 May 2015",
      shortname: "name",
      fullname: "name xxxx", 
      branch: "branch 1", 
      budget: "67000",
      gv: "none",
      noblock: "7",
      noplot: "80", 
      status: "Enable",
    },
    {
        slno: "2",
        date: "15 May 2015",
        shortname: "name",
        fullname: "name xxxx", 
        branch: "branch 1", 
        budget: "67000",
        gv: "none",
        noblock: "7",
        noplot: "80", 
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
  const [filterText, setFilterText] = useState(''); 
  const searchColumns =['slno', 'date', 'staffid', 'staffname', 'grouptype','branch','adhaar','phone','email','address','area','city','pincode','state','password','status']
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
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Project List</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'Staff_Report.csv'}/></div>
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
      <ReactTooltip  id="edit" place="bottom" content="Edit" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="delete" place="bottom" content="Delete" style={{ fontSize: "10px"}} />
      <Footerbar />
    </>
  );
}

export default ProjectList;
