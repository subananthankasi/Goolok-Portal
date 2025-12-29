import React, { useState } from "react"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteIcon from '@mui/icons-material/Delete';   
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";




import 'react-circular-progressbar/dist/styles.css';

function BlockManagement() {
  
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Project ID",
      cell: (row) => (
        <div className="d-flex">
          <Link to='/Block'
            className="btn btn_pdf light btn-warning text-dark"  
          >
             PR0001
          </Link> 
        </div>
      ),
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
    name: "Block Name",
    selector: (row) => row.BlockName, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Plot Sq ft Rate",
    selector: (row) => row.PlotSqftRate, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Offer",
    selector: (row) => row.Offer, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Offer By",
    selector: (row) => row.OfferBy, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Offer Value",
    selector: (row) => row.OfferValue, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Offer Amount",
    selector: (row) => row.OfferAmount, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Salling Price",
    selector: (row) => row.SallingPrice, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Valitidy",
    selector: (row) => row.Valitidy, 
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
      ProjectID: "1001",
      ProjectName: "Alpha A",
      BlockName: "Block 1",
      PlotSqftRate: 1500,
      Offer: "Summer Sale",
      OfferBy: "Admin",
      OfferValue: "10%",
      OfferAmount: 50000,
      SallingPrice: 450000,
      Valitidy: "2024-06-30",
    },
    {
      slno: "2",
      ProjectID: "1002",
      ProjectName: "Alpha B",
      BlockName: "Block 2",
      PlotSqftRate: 1600,
      Offer: "Winter Sale",
      OfferBy: "Admin",
      OfferValue: "15%",
      OfferAmount: 60000,
      SallingPrice: 340000,
      Valitidy: "2024-12-31",
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
                  <h4 className="page_heading">Block Details</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'BlockManagement.csv'}/></div>
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

export default BlockManagement;
