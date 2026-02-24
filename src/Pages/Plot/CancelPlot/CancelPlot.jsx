import React, { useState } from "react";  
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteIcon from '@mui/icons-material/Delete';   
import EditIcon from '@mui/icons-material/Edit';




import 'react-circular-progressbar/dist/styles.css';

function CancelPlot() {
  
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
      name: "Booking date",
      selector: (row) => row.Bookingdate,
      wrap: true, 
      sortable: true,
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
    name: "Age",
    selector: (row) => row.Age,
    wrap: true,
    sortable: true,
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
      Age: "25",
      Date:"06/06/2024",
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
    },
    {
      slno: "2",
      Date:"06/06/2024",
      Age: "30",
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
    },
    {
      slno: "3",
      Date:"06/06/2024",
      Age: "28",
      Bookingdate: "2023-04-25",
      ProjectID: "P003",
      ProjectName: "Project Gamma",
      CustomerName: "Mike Johnson",
      CustomerPhonenumber: "555-555-5555",
      BookedAmount: 4000,
      TotalAmount: 15000,
      ReceivedAmount: 8000,
      BalanceAmount: 7000,
      LastPaymentDate: "2023-05-01",
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
                  <h4 className="page_heading">Cancel Plot Report</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'CancelPlot.csv'}/></div>
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

export default CancelPlot;
