import React, { useState } from "react"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";   
import { Tooltip as ReactTooltip } from "react-tooltip";
import AmenitiesModal from "./AmenitiesModal";
import DescriptionModal from "./DescriptionModal";
import NearByModal from "./NearByModal";
import UploadModal from "./UploadModal";
import StatusUpdate from "./StatusUpdate";
import { Link } from "react-router-dom";
import { SearchData } from "../../../../Utils/Search";
import ExportButton from "../../../../Utils/ExportButton";

function ApartmentContentDepartmentReport() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => row.Date, 
      sortable: true,
      wrap: true, 
    },
    {
      name: "Project ID",
      cell: (row) => (
        <div className="d-flex">
          <Link to='/apartment_Content_writing_department'
            className="btn btn_pdf light btn-warning text-dark"  
          >
             G24APTO100
          </Link>
         
        </div>
      ),
      wrap: true,
      sortable: true, 
    },
    {
      name: "Project Name",
      selector: (row) => row.projectname,
      wrap: true,
      sortable: true,
    },
    {
      name: "Property Location",
      selector: (row) => row.location,
      wrap: true, 
      sortable: true,
    },
   
   
  {
    name: "Property Type",
    selector: (row) => row.propertytype, 
    sortable: true,
    wrap: true, 
  },  
     
    {
      name: "Status",
      cell: (row) => (
        <div className="d-flex">
          <button  
            className="btn btn_pdf btn-outline-danger "  data-tooltip-id="status" onClick={() =>openModalStatus()}
          >
            Status
          </button>
    
        </div>
      ),
      sortable: true,
    }, 
  ];
 
  const data = [
    {
      slno: "1",
      Date:"06/06/2024",
      projectid: "1001",
      projectname: "Alpha A", 
      propertytype: "Kevin", 
      location:"Chennai", 
    },
    {
      slno: "1",
      Date:"06/06/2024",
      projectid: "1001",
      projectname: "Alpha A", 
      propertytype: "Kevin", 
      location:"Chennai",    
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
  const searchColumns =['slno', 'projectid', 'projectname', 'approvalby']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

  
  const [isModalOpenStatus, setIsModalOpenStatus] = useState(false);
  const openModalStatus = () => {
    setIsModalOpenStatus(true);
  };
  const closeModalStatus = () => {
    setIsModalOpenStatus(false);
  };


  return (
    <>
  
      <StatusUpdate isOpen={isModalOpenStatus} closeModal={closeModalStatus} />  
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Apartment Content writing Report</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'Content_QC_department.csv'}/></div>
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
      <ReactTooltip  id="view" place="bottom" content="View" style={{ fontSize: "10px"}} /> 
      <ReactTooltip  id="status" place="bottom" content="Status" style={{ fontSize: "10px"}} />
     </>
  );
}

export default ApartmentContentDepartmentReport;
