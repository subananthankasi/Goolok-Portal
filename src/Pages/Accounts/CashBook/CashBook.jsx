import React, { useState } from "react"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";  
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { DatePicker } from 'rsuite';

function CashBook() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Transaction Date",
      selector: (row) => row.transactiondate,
      wrap: true,
      width:'200px',
      sortable: true,
    },
    {
        name: "Transaction Type",
        selector: (row) => row.transactiontype,
        cell: (row) => ( 
             <div>
                {row.transactiontype}<br/>
                <button className="btn btn_pdf btn-outline-danger ps-3 pe-3 p-1 mt-1" style={{fontWeight:'600'}}>PDF</button>
             </div>  
        ),
        width:'200px',
        wrap: true,
        sortable: true,
      },
    {
      name: "Transaction Number",
      selector: (row) => row.transactionnumber,
      width:'200px',
      wrap: true,
      sortable: true,
    },
    {
        name: "Transaction Details",
        selector: (row) => row.details,
        width:'300px',
        wrap: true, 
        sortable: true,
      },
    {
      name: "Debit Amount (DR)",
      selector: (row) => row.debit,
      width:'200px',
      sortable: true,
      wrap: true,
    },
    {
      name: "Credit Amount (CR)",
      selector: (row) => row.credit,
      width:'200px',
      wrap: true,
      sortable: true,
    },
    {
      name: "Balance (INR)",
      selector: (row) => row.balance,
      width:'200px',
      wrap: true,
      sortable: true,
    }, 
  ];

  const data = [
    {
      slno: "1",
      transactiondate: "10/04/2023 08:12:45",
      transactiontype: "Invoice",
      transactionnumber: "trnsGT6587454",
      details: "Invoice Number:100047 Custom Invoice Created Trans ID:trnsGT6587454 ",
      debit: "5500",
      credit: "2000",
      balance: "3500"
    },
    {
        slno: "2",
        transactiondate: "15/04/2023 04:47:08",
        transactiontype: "Credit Note",
        transactionnumber: "trnsGT6587554",
        details: "Invoice Number:100047 Custom Invoice Created Trans ID:trnsGT6587454 ",
        debit: "8000",
        credit: "5000",
        balance: "3000"
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
  const searchColumns =['slno', 'transactiondate', 'transactiontype', 'transactionnumber','details','debit','credit','balance']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

 

 

  return (
    <>
       <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Cash Book</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'CashBook.csv'}/></div>
                  </div>
                </div>
                <div className="card-body">
                <div className="row">
                <div className="col-md-4 col-lg-4"> 
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                Duration From 
                                </label>
                              </div>
                              <div className="col-5">
                              <DatePicker block />
                              </div>
                            </div>
                          </div>
                        </div>
                <div className="col-md-4 col-lg-4"> 
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                Duration To 
                                </label>
                              </div>
                              <div className="col-5">
                              <DatePicker block />
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
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
     </>
  );
}

export default CashBook;
