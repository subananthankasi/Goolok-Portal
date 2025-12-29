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
import PrintIcon from '@mui/icons-material/Print';

function RefundCashIssue() {
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
      name: "Project",
      selector: (row) => row.project,
      sortable: true,
    },
    {
      name: "Plot No.",
      selector: (row) => row.plotno,
      sortable: true,
    }, 
    {
      name: "Customer Name",
      selector: (row) => row.customername,
      sortable: true,
      width: "200px",
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobileno, 
      sortable: true,
    },
    {
      name: "Bank",
      selector: (row) => row.bank, 
      sortable: true,
    },

    {
      name: "Cheque No",
      selector: (row) => row.chequeno,
      sortable: true,
    },
    {
      name: "Cheque Date",
      selector: (row) => row.chequedate,
      sortable: true,
    },
    {
        name: "Payments",
        selector: (row) => row.payments,
        sortable: true,
      },
      {
        name: "Refund",
        selector: (row) => row.refund,
        sortable: true,
      },
      {
        name: "Print",
        cell: (row) => (
          <div className="d-flex"> 
            <button className="btn btn_pdf btn-outline-primary delete" data-tooltip-id="delete" >
              <PrintIcon />
            </button>
          </div>
        ),
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
      project: "name",
      plotno: "name xxxx", 
      customername: "branch 1", 
      mobileno: "67000",
      bank: "none",
      chequeno: "7",
      chequedate: "80",
      payments: "10000",
      refund: "1000",
    },
    {
        slno: "2",
        date: "15 May 2015",
        project: "name",
        plotno: "name xxxx", 
        customername: "branch 1", 
        mobileno: "67000",
        bank: "none",
        chequeno: "7",
        chequedate: "80",
        payments: "10000",
        refund: "1000",
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
  const searchColumns =['slno', 'date', 'project', 'plotno', 'customername','mobileno','bank','chequeno','chequedate','payments','refund' ]
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
                  <h4 className="page_heading">Refund Cash Issue</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'Refund_Cash_Issue.csv'}/></div>
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

export default RefundCashIssue;
