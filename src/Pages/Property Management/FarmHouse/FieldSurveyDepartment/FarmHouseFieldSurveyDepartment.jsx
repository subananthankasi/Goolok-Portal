import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; 
import Amenities from "./amenities";
 

function FarmHouseFieldSurveyDepartment() {


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
      name: "Per sqft ",
      selector: (row) => row.persqft ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Distance Km ",
      selector: (row) => row.DistanceKm ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Mobile No1 ",
      selector: (row) => row.MobileNo1 ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Mobile No2",
      selector: (row) => row.MobileNo2 ,
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


  const columns1 = [
    {
      name: "S.No",
      selector: (row) => row["S.No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Project ID",
      selector: (row) => row["Project ID"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Total Land area",
      selector: (row) => row["Total Land area"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "TLA unit",
      selector: (row) => row["TLA unit"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "East Dimension",
      selector: (row) => row["East Dimension"],
      sortable: true,
      width:"150px",
       wrap: true,
    }, 
    {
      name: "East unit",
      selector: (row) => row["East unit"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "West Dimension",
      selector: (row) => row["West Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "West unit",
      selector: (row) => row["West unit"],
      sortable: true,
       wrap: true,
    }, 
    {
      name: "South Dimension",
      selector: (row) => row["South Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "South unit",
      selector: (row) => row["South unit"],
      sortable: true,
       wrap: true,
    }, 
    {
      name: "North Dimension",
      selector: (row) => row["North Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "North unit",
      selector: (row) => row["North unit"],
      sortable: true, 
      wrap: true,
    },  
    {
      name: "f-line",
      selector: (row) => row["f-line"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "f-line unit",
      selector: (row) => row["f-line unit"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "G-line",
      selector: (row) => row["G-line"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "G-line unit",
      selector: (row) => row["G-line unit"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Survey No",
      selector: (row) => row["Survey No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Sub division",
      selector: (row) => row["Sub division"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row["SD unit"],
      sortable: true, 
      wrap: true,
    }, 
     
    {
      name: "Road width",
      selector: (row) => row["Road width"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Land facing",
      selector: (row) => row["Land facing"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Built up area",
      selector: (row) => row["Built up area"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of floors",
      selector: (row) => row["No of floors"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Door facing",
      selector: (row) => row["Door facing"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of bedroom",
      selector: (row) => row["No of bedroom"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of bathrooms",
      selector: (row) => row["No of bathrooms"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of balconies",
      selector: (row) => row["No of balconies"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    
    {
      name: "Land price per unit",
      selector: (row) => row["Land price per unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Built up area cost per unit ",
      selector: (row) => row["Built up area cost per unit "],
      sortable: true,
      width:"150px",
      wrap: true,
    },   
    {
      name: "Total cost",
      selector: (row) => row["Total cost"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Status",
      selector: (row) => (
     <select name="selectedFruit" defaultValue="orange" className="form-select">
        <option value="apple">Unverify</option>
        <option value="banana">Verify</option> 
        <option value="banana">Dispute</option> 
       </select>
      ),
      wrap: true,
      width: "120px", 
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
      Name: "Arun",
      location: "chennai",
      directions: "2023-05-01",
      persqft: "122",
      DistanceKm:"3",
      MobileNo1:"821541245",
      MobileNo2:"636541245",
      id: 1
    },
    {
      slno: "2",
      Name: "Ebin",
      location: "chennai",
      directions: "2023-05-01",
      persqft: "110",
      DistanceKm:"3",
      MobileNo1:"821541245",
      MobileNo2:"636541245",
      id: 1
    },
  ];

  const data2 = [
    {
      "S.No": 1,
      "Project ID": "PRJ001",
      "Total Land area": 5000,
      "TLA unit": "sqft",
      "East Dimension": 50,
      "East unit": "ft",
      "West Dimension": 50,
      "West unit": "ft",
      "South Dimension": 100,
      "South unit": "ft",
      "North Dimension": 100,
      "North unit": "ft",
      "f-line": 25,
      "f-line unit": "ft",
      "G-line": 30,
      "G-line unit": "ft",
      "Survey No": "S001",
      "Sub division": 2000,
      "SD unit": "sqft",
      "Road width": "30ft",
      "Land facing": "North",
      "Built up area": 4000,
      "No of floors": 2,
      "Door facing": "East",
      "No of bedroom": 4,
      "No of bathrooms": 3,
      "No of balconies": 2,
      "Land price per unit": 1500,
      "Built up area cost per unit ": 2000,
      "Total cost": 13000000,
      "Status": "Unverify"
    },
    {
      "S.No": 2,
      "Project ID": "PRJ002",
      "Total Land area": 6000,
      "TLA unit": "sqft",
      "East Dimension": 60,
      "East unit": "ft",
      "West Dimension": 60,
      "West unit": "ft",
      "South Dimension": 110,
      "South unit": "ft",
      "North Dimension": 110,
      "North unit": "ft",
      "f-line": 26,
      "f-line unit": "ft",
      "G-line": 32,
      "G-line unit": "ft",
      "Survey No": "S002",
      "Sub division": 2500,
      "SD unit": "sqft",
      "Road width": "35ft",
      "Land facing": "East",
      "Built up area": 5000,
      "No of floors": 3,
      "Door facing": "North",
      "No of bedroom": 5,
      "No of bathrooms": 4,
      "No of balconies": 3,
      "Land price per unit": 1600,
      "Built up area cost per unit ": 2100,
      "Total cost": 16000000,
      "Status": "Verify"
    },
    {
      "S.No": 3,
      "Project ID": "PRJ003",
      "Total Land area": 7000,
      "TLA unit": "sqft",
      "East Dimension": 70,
      "East unit": "ft",
      "West Dimension": 70,
      "West unit": "ft",
      "South Dimension": 120,
      "South unit": "ft",
      "North Dimension": 120,
      "North unit": "ft",
      "f-line": 27,
      "f-line unit": "ft",
      "G-line": 34,
      "G-line unit": "ft",
      "Survey No": "S003",
      "Sub division": 3000,
      "SD unit": "sqft",
      "Road width": "40ft",
      "Land facing": "West",
      "Built up area": 6000,
      "No of floors": 4,
      "Door facing": "South",
      "No of bedroom": 6,
      "No of bathrooms": 5,
      "No of balconies": 4,
      "Land price per unit": 1700,
      "Built up area cost per unit ": 2200,
      "Total cost": 19000000,
      "Status": "Dispute"
    },
    // Add more entries as needed
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
  // const filterdata = SearchData(data, filterText, searchColumns);
  // const filterdata2 = SearchData(data2, filterText, searchColumns);
 
  let navigate = useNavigate();

  return (
    <>
       <ToastContainer />
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
                          Field Survey Details
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Market Research
                        </a>
                          <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                        Survey Report
                        </a>
                
                          <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                           Amenities
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
                  {step === 1 && (
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Legal ID</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
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
                              <label className="form-label">Project Name</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control"
                                id="ProjectName"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Project ID</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
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
                              <label className="form-label">SRO Details</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control"
                                id="SRODetails"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">SRO Name</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control"
                                id="SROName"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">SRO Area</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control"
                                id="SROArea"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Location</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Latitude,Longitude</label>
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control"
                                id="Latitude"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
  

                      <div className="text-end py-3 px-3">
                      <button className="btn1 me-2">Save</button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="row">
                      
                      <div className="mt-2">
                      <DataTable
                        columns={columns}
                        data={data}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />
                      </div>
                      <div className="container mt-2 mb-3">
                        <form onSubmit={handleSubmit}>
                          <div className="row">

                        <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Property Owner Name</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="Name"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Location</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="Location"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Direction</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="Direction"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Per Sqft</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="PerSqft"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Distance Km</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="PerSqft"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Mobile No 1</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="PerSqft"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Mobile No 2</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                id="PerSqft"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
             

                            <div className="col text-start mt-4 mx-4">
                              <button
                                type="reset"
                                className="btn1 me-2"
                                onClick={() =>
                                  setFormData({
                                    nearLand: "",
                                    location: "",
                                    price: "",
                                    description: "",
                                  })
                                }
                              >
                                Clear
                              </button>
                              <button className="btn1 me-2">Add</button>
                              
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-2 " onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1 me-2">Save</button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}
                     {step === 3 && (
                    <div className="row">
                      
                      <div className="mt-2">
                      <DataTable
                        columns={columns1}
                        data={data2}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />
                      </div>
                      

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}

                   

                 {step === 4 && (
                    <>
                    <Amenities/>
                       <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1">
                          Save
                        </button>
                      </div></>
                  ) }

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </>
  );
}

export default FarmHouseFieldSurveyDepartment;
