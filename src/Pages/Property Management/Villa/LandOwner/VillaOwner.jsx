import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component"; 
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { ToastContainer, toast } from "react-toastify";
import AmenitiesCharges from "./AmenitiesCharges";
import PropertyDetails from "./PropertyDetails";
import ExportButton from "../../../../Utils/ExportButton";
import { SearchData } from "../../../../Utils/Search";

function VillaOwner() {
  //data table
  const columns1 = [
    {
      name: "sl.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },

    {
      name: "Name",
      selector: (row) => row.Name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.PhoneNumber,
      wrap: true,
      width: "180px",
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
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];
  const columns2 = [
    {
      name: "sl.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Account Name",
      selector: (row) => row.AccountName,
      wrap: true,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => row.AccountNumber,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "IFSC Code",
      selector: (row) => row.IFSCCode,
      wrap: true,
      sortable: true,
    },
    {
      name: "Bank Name",
      selector: (row) => row.BankName,
      wrap: true,
      sortable: true,
    },
    {
      name: "Bank Branch",
      selector: (row) => row.BankBranch,
      wrap: true,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];
 

  const data1 = [
    {
      slno: 1,
      Name: "John Doe",
      PhoneNumber: "123-456-7890",
      Remarks: "New customer",
    },
    {
      slno: 2,
      Name: "Jane Smith",
      PhoneNumber: "098-765-4321",
      Remarks: "Pending approval",
    },
  ];

  const data2 = [
    {
      slno: 1,
      AccountName: "John Doe",
      AccountNumber: "John Doe",
      IFSCCode: "John Doe",
      BankName: "123-456-7890",
      BankBranch: "New customer",
    },
    {
      slno: 2,
      AccountName: "John Doe",
      AccountNumber: "John Doe",
      IFSCCode: "John Doe",
      BankName: "123-456-7890",
      BankBranch: "New customer",
    },
    {
      slno: 3,
      AccountName: "John Doe",
      AccountNumber: "John Doe",
      IFSCCode: "John Doe",
      BankName: "123-456-7890",
      BankBranch: "New customer",
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

  /////navigation
  let navigate = useNavigate();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["slno", "projectid", "projectname", "approvalby"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  //export data excel or csv
  const filterdata1 = SearchData(data1, filterText, searchColumns);
  const filterdata2 = SearchData(data2, filterText, searchColumns);




  // product details colums change on type 
  const [category, seCategory] = useState("agriland");
  const handleCategoryChange = (event) => {
    seCategory(event.target.value);
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
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(1)}
                        >
                          Land Owner
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Documents
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Amenities Charges
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                          Property Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 5 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(5)}
                        >
                          Contact Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 6 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(6)}
                        >
                          Bank Account
                        </a>
                      </nav>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <button className="btn1" onClick={() => navigate(-1)}>
                        <ArrowBackIcon /> back
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <form>
                    {step === 1 && (
                      <>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Project ID
                                  </label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={"G24VLAO100"}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                   Type
                                  </label>
                                </div>
                                <div className="col-5">
                                <select id="inputState" className="form-select">
                                    <option value="land">Villa</option> 
                                </select>
                                </div>
                              </div>
                            </div>
                          </div>

 

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Project Name
                                  </label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={"Alpha 1"}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Land Owner Name
                                  </label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nearLand"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Total days
                                  </label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="totaldays"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Duration From - To
                                  </label>
                                </div>
                                <div className="col-5">
                                  <DateRangePicker block />
                                </div>
                              </div>
                            </div>
                          </div>

                        

                  

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Advance given
                                  </label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="advancegiven"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                 
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Aggrement doccument
                                  </label>
                                </div>
                                <div className="col-5">
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="lastName"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-end py-3 px-3">
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    DTCP Reg no
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    RERA Approval No.
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    DTCP Approval Copy
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    RERA Approval Copy
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Layout Copy
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Property Documents
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Property Parent Documents
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Property EC
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-5">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Property PATTA
                                  </label>
                                </div>
                                <div className="col-7">
                                  <input type="file" class="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end py-3 px-3">
                            <button className="btn1 me-2" onClick={prevStep}>
                              Previous
                            </button>
                            <button className="btn1" onClick={nextStep}>
                              Next
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <AmenitiesCharges />

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Submit & Next
                          </button>
                        </div>
                      </>
                    )}
                    {step === 4 && (
                      <div className="mt-1">
                         
                       <PropertyDetails type={category} />

                       <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                          Submit & Next
                          </button>
                        </div> 

                      </div>
                    )}
                    {step === 5 && (
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="text-end d-flex ">
                            <div style={{ marginLeft: "auto" }}>
                              <ExportButton
                                columns={columns1}
                                data={filterdata1}
                                filename={"Landowner_data1.csv"}
                              />
                            </div>
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
                              columns={columns1}
                              data={filterdata1}
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
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group mt-3">
                                  <div className="row">
                                    <div className="col-5">
                                      <label className="form-label">Name</label>
                                    </div>
                                    <div className="col-10">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 col-lg-6">
                                <div className="form-group mt-3">
                                  <div className="row">
                                    <div className="col-5">
                                      <label className="form-label">
                                        Phone Number
                                      </label>
                                    </div>
                                    <div className="col-10">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="PhoneNumber"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group mt-3">
                                  <div className="row">
                                    <div className="col-5">
                                      <label className="form-label">
                                        Remarks
                                      </label>
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
                          </form>
                        </div>

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                    {step === 6 && (
                      <div className="card-body p-3">
                        <div className="col-md-12 col-lg-12">
                          <div className="row">
                            <div className="text-end d-flex ">
                              <div style={{ marginLeft: "auto" }}>
                                <ExportButton
                                  columns={columns2}
                                  data={filterdata2}
                                  filename={"LandOwner_data2.csv"}
                                />
                              </div>
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
                                columns={columns2}
                                data={filterdata2}
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
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Account Name
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="AccountName"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Account Number
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="AccountNumber"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          IFSC Code
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="IFSCCode"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Bank Name
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="BankName"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                  <div className="form-group mt-3">
                                    <div className="row">
                                      <div className="col-5">
                                        <label className="form-label">
                                          Bank Branch
                                        </label>
                                      </div>
                                      <div className="col-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="BankBranch"
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
                            </form>
                          </div>
                        </div>
                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1">Submit</button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </>
  );
}

export default VillaOwner;
