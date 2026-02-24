import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { SearchData } from "../../../Utils/Search";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import ExportButton from "../../../Utils/ExportButton";


function CreditNotes() {

//data table th and td  
  const columns = [
    {
      name: "sl.no",
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
      name: "Voucher ID",
      selector: (row) => row.VoucherID,
      wrap: true, 
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row) => row.PaymentType, 
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "voucher Date",
      selector: (row) => row.voucherDate, 
      wrap: true,
      width: "180px", 
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.CustomerName, 
      wrap: true,
      sortable: true,
    },
    {
      name: "Project ID",
      selector: (row) => row.ProjectID,
      wrap: true, 
      sortable: true,
    }, 
    {
      name: "Pending Amount",
      selector: (row) => row.PendingAmount,
      wrap: true, 
      sortable: true,
    }, 
    {
      name: "Amount",
      selector: (row) => row.Amount,
      wrap: true, 
      sortable: true,
    }, 
    {
      name: "Remarks",
      selector: (row) => row.Remarks,
      wrap: true, 
      sortable: true,
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

//dummy data for data table
const data = [
  {
    slno: "1",
    Date:"06/06/2024",
    VoucherID: "1001",
    PaymentType: "Credit",
    voucherDate: "2023-05-01",
    CustomerName: "John Doe",
    ProjectID: "P001",
    PendingAmount:"2000",
    Amount: "1000",
    Remarks: "First Payment",
    id: 1
  },
  {
    slno: "2",
    Date:"06/06/2024",
    VoucherID: "1002",
    PaymentType: "Debit",
    voucherDate: "2023-05-02",
    CustomerName: "Jane Smith",
    ProjectID: "P002",
    PendingAmount:"2000",
    Amount: "1500",
    Remarks: "Second Payment",
    id: 2
  },
];

//Customise style For data table
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

//After adding data to data table rerender with empty state 
  const [formData, setFormData] = useState({
    VoucherID: "",
      PaymentType: "",
      voucherDate: "",
      CustomerName: "",
      ProjectID: "",
      Amount: "",
      Remarks: "",
  });
//
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
      ...formData,
    };

    setDataList((prevList) => [...prevList, newItem]);
    setFormData({ nearLand: "", location: "", price: "", description: "" });
    toast.success("Successfully Added!");
   };

  const handleDelete = (id) => {
    toast.success("Successfully Deleted!");
    const updatedList = dataList.filter((item) => item.id !== id);
    setDataList(updatedList);
  };

// search function 
   const [filterText, setFilterText] = useState(''); 
   const searchColumns =['slno', 'projectid', 'projectname', 'approvalby']
   const handleFilter = (event) => {
     setFilterText(event.target.value);
   };
//export data excel or csv
  const filterdata = SearchData(data, filterText, searchColumns);


  return (
    <>
     <ToastContainer /> 
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex"> 
                      <h4 className="page_heading">Credit Notes Details</h4>
                  </div>
                </div>
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Voucher Id</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="VoucherId"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Payment Type</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="PaymentType"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Voucher Date</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="VoucherDate"
                                  />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                
          <div className="row">
                <div className="text-end d-flex ">
                  <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'AreaManagement.csv'}/></div>
                    <div className="searchbar">
                      <input
                        type="text"
                        className="search"
                        onChange={handleFilter}
                        placeholder="..Search"
                        ></input>
                    </div>
                </div>
                  <div>
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
                      

                        <div className="container mt-1 mb-3">
                          <form onSubmit={handleSubmit}>
                          <div className="row">
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Customer Name</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="CustomerName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Project ID</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                            <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Pending Amount</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="PendingAmount"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                            <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Amount</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Amount"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-5">
                                <label className="form-label">Remarks</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Remarks"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                   

                              <div className="col text-start mt-5 mb-3 mx-1">
                                <button
                                  type="reset"
                                  className="btn1 me-2"
                                  onClick={() =>
                                    setFormData({
                                      VoucherID: "",
                                      PaymentType: "",
                                      voucherDate: "",
                                      CustomerName: "",
                                      ProjectID: "",
                                      Amount: "",
                                      Remarks: "",
                                    })
                                  }
                                >
                                  Clear
                                </button>
                                <button type="submit" className="btn1">
                                  Add
                                </button>
                              </div>
                              </div>
                              <div className="text-end py-3 px-3">
                          <button className="btn1">Submit</button>
                        </div>
                          </form>
                        </div>

                        {/* <div className="text-end py-3 px-3">
                    
                          <button className="btn1">submit</button>
                        </div> */}
                      </div>
                </div>
              </div>
            </div>
          </div>
        
      </section>
     </>
  );
}

export default CreditNotes;
