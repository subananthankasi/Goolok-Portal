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
 

function ApartmentFieldSurveyDepartment() {

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
      width:"150px"
    }, 
    {
      name: "Flat no",
      selector: (row) => row["Flat no"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "UDS %",
      selector: (row) => row["UDS %"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "udscost",
      selector: (row) => row["udscost"],
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
      width:"140px",
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row["SD unit"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "Town/village survey",
      selector: (row) => row["Town/village survey"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Common area",
      selector: (row) => row["Common area"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Common are cost",
      selector: (row) => row["Common are cost"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Built up area",
      selector: (row) => row["Built up area"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "sqft charges",
      selector: (row) => row["sqft charges"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Floor no",
      selector: (row) => row["Floor no"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Total floors",
      selector: (row) => row["Total floors"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Door facing",
      selector: (row) => row["Door facing"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bedroom",
      selector: (row) => row["No of bedroom"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bathrooms",
      selector: (row) => row["No of bathrooms"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of balconies",
      selector: (row) => row["No of balconies"],
      sortable: true,
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
      "Project ID": "G24APTO100",
      "Flat no": "FL001",
      "UDS %": 20,
      "udscost": 500000,
      "Survey No": "S001",
      "Sub division": 200,
      "SD unit": "sqft",
      "Town/village survey": "Town A",
      "Common area": "Garden, Pool",
      "Common are cost": 150000,
      "Built up area": 1000,
      "sqft charges": 3000,
      "Floor no": 2,
      "Total floors": 5,
      "Door facing": "North",
      "No of bedroom": 2,
      "No of bathrooms": 2,
      "No of balconies": 1,
      "Amenities": "Gym, Clubhouse",
      "Maintenance": 2000,
       "Status": "Unverify",
    },
    {
      "S.No": 2,
      "Project ID": "G24APTO100",
      "Flat no": "FL002",
      "UDS %": 25,
      "udscost": 600000,
      "Survey No": "S002",
      "Sub division": 200,
      "SD unit": "sqft",
      "Town/village survey": "Village B",
      "Common area": "Park, Playground",
      "Common are cost": 200000,
      "Built up area": 1200,
      "sqft charges": 3500,
      "Floor no": 3,
      "Total floors": 7,
      "Door facing": "East",
      "No of bedroom": 3,
      "No of bathrooms": 3,
      "No of balconies": 2,
      "Amenities": "Swimming Pool, Gym",
      "Maintenance": 2500,
       "Status": "Verify",
    },
    {
      "S.No": 3,
      "Project ID": "G24APTO100",
      "Flat no": "FL003",
      "UDS %": 30,
      "udscost": 700000,
      "Survey No": "S003",
      "Sub division": 200,
      "SD unit": "sqft",
      "Town/village survey": "Town C",
      "Common area": "Gym, Library",
      "Common are cost": 250000,
      "Built up area": 1400,
      "sqft charges": 4000,
      "Floor no": 4,
      "Total floors": 10,
      "Door facing": "South",
      "No of bedroom": 4,
      "No of bathrooms": 4,
      "No of balconies": 3,
      "Amenities": "Community Hall, Gym",
      "Maintenance": 3000,
       "Status": "Dispute",
    },
    // Add more dummy data as needed
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

export default ApartmentFieldSurveyDepartment;
