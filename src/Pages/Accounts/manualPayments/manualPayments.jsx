import React, { useState } from "react";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ManualPayments() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.id,
      sortable: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "Particular",
      selector: (row) => row.particular,
      wrap: true,
      width: "200px",
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymentType,
      width: "200px",
      wrap: true,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      width: "200px",
      wrap: true,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-danger delete"  onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  // const data = [
  //   {
  //     slno: "1",
  //     particular: "10/04/2023 08:12:45",
  //     payment: "Offline",
  //     amount: "7500",
  //   },
  //   {
  //     slno: "2",
  //     particular: "10/04/2023 08:12:45",
  //     payment: "Online",
  //     amount: "8500",
  //   },
  // ];

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
  //   const [filterText, setFilterText] = useState('');
  //   const searchColumns =['slno', 'transactiondate', 'transactiontype', 'transactionnumber','details','debit','credit','balance']
  //   const handleFilter = (event) => {
  //     setFilterText(event.target.value);
  //   };
  //   const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

  const [formData, setFormData] = useState({
    particular: "",
    paymentType: "",
    amount: "",
  });
  const [dataList, setDataList] = useState([]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    const newItem = {
      id: dataList.length + 1,  
      ...formData
    };
    setDataList((prevList) => [...prevList, newItem]);
    setFormData({ particular: "", paymentType: "", amount: "" });
    toast("Successfully Added!") 
   };

  const handleDelete = (id) => { 
    toast("Successfully Deleted!")
    const updatedList = dataList.filter((item) => item.id !== id);  
    setDataList(updatedList);
  };

  return (
    <>
      <Topbar />
      <ToastContainer />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Manual Payments</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="container mt-3 mb-3">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <div className="mb-3">
                            <select id="inputState" className="form-select">
                              <option value="Enable">Type</option>
                              <option value="Enable">Avadi</option>
                              <option value="Disable">Ambattur</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-4">
                          <div className="mb-3">
                            <select id="inputState" className="form-select">
                              <option value="Enable">Name</option>
                              <option value="Enable">Suresh</option>
                              <option value="Disable">Ramesh</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <div className="mb-3">
                            <select id="inputState" className="form-select">
                              <option value="Enable">Property ID</option>
                              <option value="Enable">10025</option>
                              <option value="Disable">10028</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="searchbar">
                      <input
                        type="text"
                        className="search"
                        onChange={handleFilter}
                        placeholder="..Search"
                      ></input>
                    </div> */}
                    <DataTable
                      columns={columns}
                      data={dataList}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      persistTableHead={true}
                      fixedHeader
                    />

                    <div className="col text-end">
                      {/* <button className="btn1 me-2">Close</button> */}
                      <button className="btn1">Add</button>
                    </div>

                    <hr />
                    <div className="container mt-5 mb-3">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                value={formData.particular}
                                onChange={handleChange}
                                placeholder="Particular"
                                name="particular"
                              />
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-4">
                            <div className="mb-3">
                              <select
                                id="inputState"
                                className="form-select"
                                value={formData.paymentType}
                                onChange={handleChange}
                                name="paymentType"
                              >
                                <option value="">Payment Type</option>
                                <option value="Offline">Offline</option>
                                <option value="Online">Online</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-4">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="amount"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={handleChange}
                                name="amount"
                              />
                            </div>
                          </div>

                          <div className="col text-end">
                            <button
                              type="button"
                              className="btn1  me-2"
                              onClick={() =>
                                setFormData({
                                  particular: "",
                                  paymentType: "",
                                  amount: "",
                                })
                              }
                            >
                              Clear
                            </button>
                            <button type="submit" className="btn1  ">
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
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

export default ManualPayments;
