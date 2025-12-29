import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { SearchData } from "../../../Utils/Search";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import ExportButton from "../../../Utils/ExportButton";


function ServiceInvoice() {

 //data table th and td  
  const columns = [
    {
      name: "sl.no",
      selector: (row) => row.slno,
      sortable: true, 
      wrap: true,
    },
    {
      name: "Voucher ID",
      selector: (row) => row.InvoiceID,
      wrap: true, 
      sortable: true,
    },
    {
      name: "Service Category",
      selector: (row) => row.ServiceCategory, 
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Service subcategory",
      selector: (row) => row.Servicesubcategory, 
      wrap: true,
      width: "180px", 
      sortable: true,
    },
    {
      name: "GST",
      selector: (row) => row.GST, 
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
      name: "Total Payable Amount",
      selector: (row) => row.TotalPayableAmount,
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
    slno: 1,
    InvoiceID: "INV001",
    ServiceCategory: "Consulting",
    Servicesubcategory: "IT Consulting",
    GST: "18%",
    Remarks: "Completed",
    TotalPayableAmount:"2001"
  },
  {
    slno: 2,
    InvoiceID: "INV002",
    ServiceCategory: "Maintenance",
    Servicesubcategory: "Software Maintenance",
    GST: "18%",
    Remarks: "In Progress",
    TotalPayableAmount:"2300"
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
                      <h4 className="page_heading">Service Invoice</h4>
                  </div>
                </div>
             
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Service Invoice Id</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="ServiceInvoiceId"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Project ID</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="ProjectID"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6 col-lg-4 ">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Customer ID</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="CustomerID"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-2">
                          <div className="form-group mt-2">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Customer GST Number</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="CustomerGSTNumber"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-2">
                          <div className="form-group mt-2">
                            <div className="row">
                              <div className="col-6">
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

                        <div className="col-md-6 col-lg-4 mb-2">
                          <div className="form-group mt-2">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Project Name</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="ProjectName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="form-group mt-1">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Plot Number</label>
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
                        <div className="col-md-6 col-lg-4 ">
                            <div className="d-flex mt-4" >
                            <button  style={{marginLeft:'1%', marginTop:"3%"}}  className="btn   btn-outline-danger  "> <CachedIcon /> </button>
                            <button  style={{marginLeft:'3%', marginTop:"3%"}} className="btn   btn-outline-success  "> <SearchIcon /> </button>
                          
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
                              <div className="col-6">
                                <label className="form-label">Service Category</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="ServiceCategory"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Service subcategory</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Servicesubcategory"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                            <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label"> Amount</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id=" Amount"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                            <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">GST %</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="GST"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
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
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Offer</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Offer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Round Of</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="RoundOf"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                          <div className="col-md-6 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Total Payable Amount</label>
                              </div>
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="TotalPayableAmount"
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
                          <button className="btn1">Create</button>
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

export default ServiceInvoice;
