import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import DataTable from "react-data-table-component"; 
import "react-toastify/dist/ReactToastify.css"; 
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton"; 
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import SearchIcon from '@mui/icons-material/Search';

function CancelPlotRefundApprovel() {
 
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Member ID",
      selector: (row) => row.memberid,
      sortable: true,
    },
    {
      name: "Member Name",
      selector: (row) => row.membername,
      sortable: true,
    },
    {
      name: "Cash",
      selector: (row) => row.cash,
      sortable: true,
    },
    {
      name: "Cheque",
      selector: (row) => row.cheque,
      sortable: true,
    },
  
  ];

  const data = [
    {
      slno: "1",
      memberid: "1001",
      membername: "Rahul",
      cash: "100000",
      cheque: "Cheque",
    },
    {
        slno: "1",
        memberid: "1001",
        membername: "Rahul",
        cash: "100000",
        cheque: "Cheque",
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
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["slno", "memberid", "membername", "cash", "cheque"];
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
        <div className="container">
          <div className="row">
            <div className="col-12"> 
               
                      <div className="row"> 
                        <div className=" ">
                          <div className="card">
                            <div className="card-header">
                              <div className="d-flex">
                                <h4 className="page_heading">Cancel Plot Refund Approval</h4>
                                <div style={{ marginLeft: "auto" }}>
                                  {/* <ExportButton
                                    columns={columns}
                                    data={filterdata}
                                    filename={"Vp_Commission_Updation.csv"}
                                  /> */}
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="col-lg-12  mb-4">

                              <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">Project </label>
                        </div>
                        <div className="col-5">
                        <select id="inputState" className="form-select">
                                  <option value="Enable">Name 1</option>
                                  <option value="Disable">Name 2</option>
                                </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group mt-3">
                      <div className="row">
                        <div className="col-4">
                        <button className="btn1"><SearchIcon/>&nbsp;&nbsp;&nbsp;View</button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
 


           
                                {/* <div className="searchbar mt-3">
                                  <input
                                    type="text"
                                    className="search"
                                    onChange={handleFilter}
                                    placeholder="..Search"
                                  ></input>
                                </div> */}
                                {/* <DataTable
                                  columns={columns}
                                  data={filterdata}
                                  customStyles={customStyle}
                                  pagination
                                  // selectableRows
                                  fixedHeader
                                /> */}
                              </div>
                            </div>
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

export default CancelPlotRefundApprovel;
