import React, { useState } from "react"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteIcon from '@mui/icons-material/Delete';   
import EditIcon from '@mui/icons-material/Edit';




import 'react-circular-progressbar/dist/styles.css';

function PendingInvoice() {
    
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
        name: "Age",
        selector: (row) => row.Age,
        wrap: true, 
        sortable: true,
        },
    
    
    {
        name: "Invoice Type",
        selector: (row) => row.InvoiceType, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Invoice Number",
        selector: (row) => row.InvoiceNumber, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Project ID",
        selector: (row) => row.ProjectID, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Project Name",
        selector: (row) => row.CustomerPhoneNumber, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Service Category",
        selector: (row) => row.ServiceCategory, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Service Subcategory",
        selector: (row) => row.ServiceCategory, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Total Amount",
        selector: (row) => row.TotalAmount, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Collected Amount",
        selector: (row) => row.CollectedAmount, 
        sortable: true,
        wrap: true, 
    },  
    {
        name: "Pending Amount",
        selector: (row) => row.PendingAmount, 
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
          slno: 1,
          Date: "2024-05-01",
          Age: 35,
          InvoiceType: "Standard",
          InvoiceNumber: "INV001",
          ProjectID: "PRJ001",
          CustomerPhoneNumber: "Project Alpha",
          ServiceCategory: "Consulting",
          ServiceSubcategory: "IT Consulting",
          TotalAmount: 5000,
          CollectedAmount: 3000,
          PendingAmount: 2000,
        },
        {
          slno: 2,
          Date: "2024-05-02",
          Age: 29,
          InvoiceType: "Recurring",
          InvoiceNumber: "INV002",
          ProjectID: "PRJ002",
          CustomerPhoneNumber: "Project Beta",
          ServiceCategory: "Development",
          ServiceSubcategory: "Web Development",
          TotalAmount: 8000,
          CollectedAmount: 8000,
          PendingAmount: 0,
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
                  <h4 className="page_heading">Pending Invoice</h4>
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

export default PendingInvoice;
