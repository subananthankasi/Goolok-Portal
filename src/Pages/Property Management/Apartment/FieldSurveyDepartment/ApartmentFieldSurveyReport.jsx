import React, { useState } from "react"; 
 import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";  
import { Tooltip as ReactTooltip } from "react-tooltip"; 
import FieldSurveyStatus from "./FieldSurveyStatus";  
import { Link } from "react-router-dom";
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { SearchData } from "../../../../Utils/Search";
import ExportButton from "../../../../Utils/ExportButton";

function ApartmentFieldSurveyReport() {
  const percentage = 89;
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
          <Link to='/apartment_field_survey_department'
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
      name: "Completion %",
      cell: (row) => (
        <div className="d-flex">
          <div style={{ width: 40, height: 40 }}>
          <CircularProgressbar value={percentage} text={`${percentage}%`}
           styles={buildStyles({ 
            textSize: '26px', 
            pathColor: '#ffae42',
            textColor: 'black',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
           />;
          </div>
        </div>
      ), 
      sortable: true,
      wrap: true,
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
            className="btn btn_pdf btn-outline-danger "  data-tooltip-id="status"
            onClick={() => {
                openModal(); 
            }}
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
      location: "Aavadi",
      propertytype:"Type 1",
      contactDetails:"1234567890",
      bankAcc:"IOB250078",
      sro: "Details 1", 
      land: "Tamilnadu",
      gps: "05874545",
      des: "Description 2",
      price: "25000",
      approvalby: "Kevin",  
    },
    {
        slno: "2",
        Date:"06/06/2024",
        projectid: "1002",
        projectname: "Alpha B",
        location: "Nungambakkam",
        propertytype:"Type 2",
        contactDetails:"1234567890",
        bankAcc:"IOB250078",
        sro: "Details 2", 
        land: "Tamilnadu",
        gps: "05874545",
        des: "Description 2",
        price: "47000",
        approvalby: "Rahul",    
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
  const searchColumns =['slno', 'projectid', 'projectname', 'location','sro','land','gps','des','price','approvalby']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

 

 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
 
  return (
    <>
       <FieldSurveyStatus isOpen={isModalOpen} closeModal={closeModal}/>    
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Apartment Field Survey Report</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'legal_QC_department.csv'}/></div>
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
      <ReactTooltip  id="view" place="bottom" content="View" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="view1" place="bottom" content="View Document" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="status" place="bottom" content="Status" style={{ fontSize: "10px"}} />
     </>
  );
}

export default ApartmentFieldSurveyReport;
