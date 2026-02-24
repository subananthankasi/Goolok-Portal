import React, { useState } from "react";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { SearchData } from "../../../Utils/Search";

function Block() {
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Name ",
      selector: (row) => row.Name ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Directions",
      selector: (row) => row.directions,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "per sqft ",
      selector: (row) => row.persqft ,
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

  const data = [
    {
      slno: "1",
      Name: "1001",
      location: "Credit",
      directions: "2023-05-01",
      persqft: "John Doe",
      id: 1
    },
    {
      slno: "2",
      Name: "1001",
      location: "Credit",
      directions: "2023-05-01",
      persqft: "John Doe",
      id: 1
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

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [formData, setFormData] = useState({
    nearLand: "",
    location: "",
    price: "",
    description: "",
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
 
  let navigate = useNavigate();

  return (
    <>
      <Topbar />
      <ToastContainer />
      <section className="section">
        <div className="container">
        <div className="row">
        <div className="card">
                      <h4 className="page_heading mt-3 mx-2">Block Details</h4>

                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                       
                     <div className="card-body">
                      <form>
                       <div className="row">

                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Block Name</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"Name1"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Plot Sq ft Rate</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"125"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label"> Offer</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"Festival"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">  Offer By</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"Goolok"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label"> Offer value</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"20%"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label"> Offer Amount</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"20,000"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Selling Price</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"1,00,000"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                         <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Validity</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                value={"22/07/2024"}
                                className="form-control"
                                id="ProjectID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                              </form>
                            </div>

                            <div className="text-end py-3 px-3">
                              <button className="  btn1 me-1">Clear</button>
                              <button className="  btn1">Add</button>
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

export default Block;
