import React, { useState } from "react"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteIcon from '@mui/icons-material/Delete';   
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from "@mui/icons-material/Visibility";
import 'react-circular-progressbar/dist/styles.css';
import ViewCancelPayment from "./ViewCancelPayment";


  ////for Model

  

function CancelPayment() {

  

  const columns1 = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Age",
      selector: (row) => row.Age,
      wrap: true,
      sortable: true,
    },
     
     
    {
      name: "Booking date",
      selector: (row) => row.Bookingdate,
      wrap: true, 
      sortable: true,
    },
   
   
  {
    name: "Project ID",
    selector: (row) => row.ProjectID, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Project Name",
    selector: (row) => row.ProjectName, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Customer Name",
    selector: (row) => row.CustomerName, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Customer Phone number",
    selector: (row) => row.CustomerPhonenumber, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Booked Amount",
    selector: (row) => row.BookedAmount, 
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
    name: "Received Amount",
    selector: (row) => row.ReceivedAmount, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Balance Amount",
    selector: (row) => row.BalanceAmount, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Last Payment Date",
    selector: (row) => row.LastPaymentDate, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Overdue Days",
    selector: (row) => row.OverdueDays, 
    sortable: true,
    wrap: true, 
  },  
  {
    name: "Payments",
    cell: (row) => (
        <div className="d-flex">
        <button type="button" className="btn1 me-3 mt-4 mb-4"  data-tooltip-id="add" onClick={openModal}><VisibilityIcon /></button>
     </div>
      ),
  },  
  {
    name: "Status",
    wrap: true,
    sortable: true,
    cell: (row) => (
      <div>
        <button className="btn btn_pdf light btn-danger">New</button>
      </div>
    ),
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
      Age: 25,
      Bookingdate: "2023-05-15",
      ProjectID: "P001",
      ProjectName: "Project Alpha",
      CustomerName: "John Doe",
      CustomerPhonenumber: "123-456-7890",
      BookedAmount: 5000,
      TotalAmount: 20000,
      ReceivedAmount: 10000,
      BalanceAmount: 10000,
      LastPaymentDate: "2023-05-20",
      OverdueDays: 10,  
    },
    {
      slno: "2",
      Age: 30,
      Bookingdate: "2023-06-10",
      ProjectID: "P002",
      ProjectName: "Project Beta",
      CustomerName: "Jane Smith",
      CustomerPhonenumber: "098-765-4321",
      BookedAmount: 7000,
      TotalAmount: 25000,
      ReceivedAmount: 15000,
      BalanceAmount: 10000,
      LastPaymentDate: "2023-06-15",
      OverdueDays: 5,

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

  const handleEdit = (row) => {
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
       <ViewCancelPayment isOpen={isModalOpen} closeModal={closeModal} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Cancel Payment Details</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns1} data={filterdata} filename={'CancelPayment.csv'}/></div>
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
                      columns={columns1}
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

export default CancelPayment;
