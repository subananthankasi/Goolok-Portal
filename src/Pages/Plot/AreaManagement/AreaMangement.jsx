import React, { useState } from "react";  
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteIcon from '@mui/icons-material/Delete';   
import EditIcon from '@mui/icons-material/Edit';
import 'react-circular-progressbar/dist/styles.css';

function AreaManagement() {
  
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
      wrap: true,
      sortable: true,
    },
    {
      name: "Project ID",
      selector: (row) => row.ProjectID,
      wrap: true,
      sortable: true,
    },
     
     
    {
      name: "Project Name",
      selector: (row) => row.ProjectName,
      wrap: true, 
      sortable: true,
    },
   
   
  {
    name: "Plot No",
    selector: (row) => row.PlotNo, 
    sortable: true,
    wrap: true, 
  },  
  
  {
    name: "Plot Sq.Ft",
    selector: (row) => row.PlotSqFt, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Survey No",
    selector: (row) => row.SurveyNo, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Dimension",
    selector: (row) => row.Dimension, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Direction",
    selector: (row) => row.Direction, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Road Width",
    selector: (row) => row.RoadWidth, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Plot Rate",
    selector: (row) => row.PlotRate, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Status",
    selector: (row) => row.Status, 
    sortable: true,
    wrap: true, 
  },  
 
  {
    name: "Actions",
    cell: (row) => (
      <div className="d-flex">
      <button className="btn  btn-outline-info me-1 edit"  data-tooltip-id="edit"><EditIcon/></button>
     <button className="btn btn-outline-danger delete" data-tooltip-id="delete"><DeleteIcon/></button>
   </div>
    ),
  }, 
  ];
 
  const data = [
    {
      slno: "1",
      Date:"12/11/2024",
      ProjectID: "P001",
      ProjectName: "Project Alpha",
      PlotNo: "A1",
      PlotSqFt: 1200,
      SurveyNo: "1234",
      Dimension: "30x40",
      Direction: "North",
      RoadWidth: "30ft",
      PlotRate: 2000,
      Status: "Available",
    },
    {
      slno: "2",
      Date:"12/11/2024",
      ProjectID: "P002",
      ProjectName: "Project Beta",
      PlotNo: "B2",
      PlotSqFt: 1500,
      SurveyNo: "5678",
      Dimension: "35x43",
      Direction: "South",
      RoadWidth: "25ft",
      PlotRate: 2500,
      Status: "Sold",
    },
    {
      slno: "3",
      Date:"12/11/2024",
      ProjectID: "P003",
      ProjectName: "Project Gamma",
      PlotNo: "C3",
      PlotSqFt: 1800,
      SurveyNo: "9101",
      Dimension: "40x45",
      Direction: "East",
      RoadWidth: "20ft",
      PlotRate: 3000,
      Status: "Available",
    },
    {
      slno: "4",
      Date:"12/11/2024",
      ProjectID: "P004",
      ProjectName: "Project Delta",
      PlotNo: "D4",
      PlotSqFt: 2000,
      SurveyNo: "1121",
      Dimension: "45x50",
      Direction: "West",
      RoadWidth: "35ft",
      PlotRate: 3500,
      Status: "Booked",
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

  // const handleEdit = (row) => {
   // };
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => {
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);  
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [isModalOpenStatus, setIsModalOpenStatus] = useState(false); 
  const openModalStatus = ( ) => { 
    setIsModalOpenStatus(true);
  };
  const closeModalStatus = () => {
    setIsModalOpenStatus(false);
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
                  <h4 className="page_heading">Area Management Details</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'AreaManagement.csv'}/></div>
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
    
   
     </>
  );
}

export default AreaManagement;
