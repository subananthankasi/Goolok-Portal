import React, { useState } from "react"; 
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";  
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";


function CancelPayments() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "User ID",
      selector: (row) => row.userid,
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
      name: "Payment ID",
      selector: (row) => row.paymentid,
      wrap: true,
      sortable: true,
    },
    {
        name: "Amount",
        selector: (row) => row.amount,
        wrap: true, 
        sortable: true,
      },
    {
      name: "Phone Number",
      selector: (row) => row.phonenumber,
      sortable: true,
      wrap: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyname,
      wrap: true,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
      wrap: true,
      sortable: true,
    },
    {
      name: "status",
      cell: (row) => ( 
          <button className="btn btn_pdf btn-outline-warning p-2">
               {row.status}
          </button>
       
      ),
    }, 
  ];

  const data = [
    {
      slno: "1",
      userid: "1001",
      date: "12 March 2024",
      paymentid: "6587454",
      amount: "5000",
      phonenumber: "89745632140",
      companyname: "Alpha A",
      email: "email@gmail.com",
      status: "cancel" 
    },
    {
        slno: "1",
        userid: "1002",
        date: "20 Apr 2024",
        paymentid: "98521475",
        amount: "25000",
        phonenumber: "9874563210",
        companyname: "Alpha b",
        email: "email01@gmail.com",
        status: "cancel" 
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
  const searchColumns =['slno', 'userid', 'date', 'paymentid','amount','phonenumber','companyname','email','status']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

 

 

  return (
    <>
      <Topbar /> 
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Cancel Payment Report</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'canceled_payment.csv'}/></div>
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
      <Footerbar />
    </>
  );
}

export default CancelPayments;
