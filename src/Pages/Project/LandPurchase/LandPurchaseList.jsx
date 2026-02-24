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

function LandPurchaseList() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Land Name",
      selector: (row) => row.landname,
      sortable: true,
    },
    {
      name: "Village",
      selector: (row) => row.village,
      sortable: true,
    }, 
    {
      name: "No.of Acres",
      selector: (row) => row.noacres,
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row) => row.rate, 
      sortable: true,
    },
    {
      name: "Land Value",
      selector: (row) => row.landvalue, 
      sortable: true,
    },

    {
      name: "Advance",
      selector: (row) => row.advance,
      sortable: true,
    },
    {
      name: "Part Payment",
      selector: (row) => row.partpayment,
      sortable: true,
    },

      
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
        name: "Balance",
        selector: (row) => row.balance,
        sortable: true,
      },
      {
        name: "Adv.Date",
        selector: (row) => row.addate,
        sortable: true,
      },
    //   {
    //     name: "Option",
    //     selector: (row) => row.option,
    //     sortable: true,
    //   },
  ];

  const data = [
    {
      slno: "1",
      branch: "Branch 1",
      landname: "alpha",
      village: "Avadi", 
      noacres: "11", 
      rate: "67000",
      landvalue: "78000",
      advance: "7000",
      partpayment: "8000", 
      balance: "67000",
      addate: "23 May 2022",
      option: "Enable",
      total: "582000",
    },
    {
      slno: "2",
      branch: "Branch 1",
      landname: "alpha",
      village: "Avadi", 
      noacres: "11", 
      rate: "67000",
      landvalue: "78000",
      advance: "7000",
      partpayment: "8000", 
      balance: "67000",
      addate: "23 May 2022",
      option: "Enable",
      total: "582000", 
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
  const searchColumns =['slno', 'branch', 'landname', 'village', 'noacres','rate','landvalue','advance','partpayment','balance','addate','option','total']
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
                  <h4 className="page_heading">Land Purchase List</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'Land_Purchase_List.csv'}/></div>
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

export default LandPurchaseList;
