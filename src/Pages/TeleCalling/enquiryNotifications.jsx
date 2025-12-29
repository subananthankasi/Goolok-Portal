import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Toast from "../../Utils/Toast";
import dummy from "../../Assets/images/dummyProfile.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileView from "../../Utils/FileView/FileView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DataTable from "react-data-table-component";
import customStyle from "../../Utils/tableStyle";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";


function EnquiryNotifications() {
  
  const { eid } = useParams();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetchTelecomData(eid);
  }, [eid]);

  const fetchTelecomData = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/telecall/${id}`);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching telecom data:", error);
    }
  };

  const [fileErrors, setFileErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    pid: eid,
    staffid: staffid.loginid,
    id: [],
    document: [],
  });
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  // document upload
  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const validTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (file && validTypes.includes(file.type)) {
      setFormData((prevData) => {
        const idIndex = prevData.id.indexOf(name);

        if (idIndex !== -1) {
          const updatedDocuments = [...prevData.document];
          updatedDocuments[idIndex] = file;

          return {
            ...prevData,
            document: updatedDocuments,
          };
        } else {
          return {
            ...prevData,
            id: [...prevData.id, name],
            document: [...prevData.document, file],
          };
        }
      });

      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(fileErrors).some((error) => error !== "");
    const hasAllFiles =
      formData.id.length > 0 && formData.document.length === formData.id.length;

    if (hasErrors || !hasAllFiles) {
      alert("Please fill in all fields or upload a valid file");
      return;
    }

    setLoadingSubmit(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/telecallupdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingSubmit(false);
      Toast({ message: "Document successfully Updated", type: "success" });
      fetchTelecomData(eid);
    } catch (error) {
      Toast({ message: "Failed! Please try again later!", type: "error" });
      setLoadingSubmit(false);
    }
  };

  // base on status
  const renderBasedOnDocumentType = () => {
    switch (data.docstatus) {
      case "pending":
      case "redo":
        return (
          <>
            <div className="row mt-4">
              <label className="mb-2" style={{ fontSize: "10px" }}>
                <b>Note :</b> Please upload a file in PDF, PNG, JPEG, or JPG
                format only!
              </label>

              {data?.body?.map((doc) => (
                <>
                  <div className="d-flex mb-3" key={doc.id}>
                    <div className="me-4">
                      <label
                        style={{ fontSize: "14px" }}
                        className="mb-1 text-dark"
                      >
                        <b> {doc.doc_type} :</b>
                      </label>
                    </div>
                    <div className="">
                      {data.notifstatus === "complete" ? (
                        <a
                          onClick={() =>
                            viewFileUrl(`${IMG_PATH}/enquiry/${doc.document}`)
                          }
                          className="btn btn-warning ms-2"
                          download
                        >
                          <RemoveRedEyeIcon />
                        </a>
                      ) : (
                        <>
                          <input
                            type="file"
                            name={doc.docid}
                            className="form-control"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpeg,.jpg"
                            key={`${doc.docid}-${data.docstatus}`} // Unique key for re-rendering
                          />
                          {fileErrors[doc.docid] && (
                            <p className="validation_msg">
                              {fileErrors[doc.docid]}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {data.notifstatus == "complete" ? (
                      ""
                    ) : (
                      <div className="ms-4">
                        <a
                          href="#0"
                          onClick={handleSubmit}
                          className="btn1 me-2"
                        >
                          {loadingSubmit ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2">Please wait...</span>
                            </>
                          ) : (
                            "Update"
                          )}
                        </a>
                      </div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </>
        );

      // case "verify":
      //   return (
      //     <>
      //       <div style={{minHeight:"200px"}}>
      //         <h5>{data.title}</h5>
      //         <p><i style={{ fontSize: "15px", fontWeight: "500" }}>Note:</i> {data.message}</p>
      //       </div>
      //     </>
      //   );

      default:
        return <p>Unknown status.</p>;
    }
  };

  // view file
  const [url, setUrl] = useState("");
  const viewFileUrl = (url) => {
    setUrl(url);
    openModalFile();
  };
  const [isModalOpenFile, setIsModalOpenfile] = useState(false);
  const openModalFile = () => {
    setIsModalOpenfile(true);
  };
  const closeModalFile = () => {
    setIsModalOpenfile(false);
  };
  const navigate = useNavigate();

  return (
    <>
      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            {loading ? (
              <div
                style={{
                  height: "32vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spinner className="mt-auto" />
              </div>
            ) : (
              <>
                {/* <div className="col-lg-3 col-12 mt-4">
              <div className="card shadow border-0">
                 <div className="p-2 mt-4 text-center">
                   <img src={dummy} alt="image"style={{height:"auto",maxWidth:"100px"}}/>  
                   <h6 className='text-center mt-2'>{data.customer}</h6>
                   <p className="mb-1" style={{fontSize:"12px"}}>{data.mobile}</p>
                   <p className="mb-0" style={{fontSize:"12px"}}>{data.email_id}</p>
                 </div>
                 
                 <div className='mt-2 ps-3 pb-4'>
                   <p className="mb-3" style={{fontSize:"13px"}}><b>Type :</b> {data.enqtype}</p> 
                   <p className="mb-3" style={{fontSize:"13px"}}><b>Property Type :</b> {data.property}</p> 
                   <p className="mb-3" style={{fontSize:"13px"}}><b>Subproperty Type :</b> {data.subproperty}</p> 
                   <p className="mb-3" style={{fontSize:"13px"}}><b>Enquiry Status :</b> {data.docstatus}</p>  
                 </div>
              </div>
           </div> */}

                {/* <div className="col-lg-8 col-12 mt-4">
              <div className="card shadow border-0">
              <div className="card shadow border-0 p-5">
                   <h5>{data.title}</h5>
                   <p style={{fontSize:"13px"}}>{data.message}</p>

               

                 <div className='mt-2'>
                         {data?.type === "document" && renderBasedOnDocumentType()}   
                 </div>
              </div>
              </div>
           </div> */}

                <div className="col-12">
                  <div className="d-flex justify-content-end">
                    <div
                      className="p-2 d-flex align-items-center mb-2 text-white"
                      style={{
                        cursor: "pointer",
                        background: "#2f4f4f",
                        clipPath: `polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)`,
                        justifyContent: "center",
                        width: "100px",
                        fontSize: "13px",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      <ArrowBackIcon /> back
                    </div>
                    {/* <div className="p-2" style={{cursor:"pointer"}} ><ArrowForwardIcon /></div>  */}
                  </div>
                  <div className="card shadow border-0">
                    <div className="row p-3 align-items-center">
                      <div className="col-4 text-center">
                        <img
                          src={dummy}
                          alt="image"
                          style={{ height: "auto", maxWidth: "100px" }}
                        />
                        <h6 className="text-center mt-2">Deva</h6>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Enquiry ID :</b> ENQID001
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Mobile :</b> 98565899974
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Email :</b> email@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Enquiry Date :</b> 24/05/2024
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Property Type :</b> Land
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Subproperty Type :</b> Commercial land
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                      <h6>Document Notifications</h6>
                      <hr />

                      <div className="col-lg-8 col-12 mt-4">
                        <h5>{data.title}</h5>
                        <p style={{ fontSize: "13px" }}>{data.message}</p>

                        <div className="mt-2">
                          {data?.type === "document" &&
                            renderBasedOnDocumentType()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



           
             <InvoiceDetails />


             <LocationSelect />

              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default EnquiryNotifications;




const InvoiceDetails = () => { 

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Invoice Date",
      selector: (row) =>  row.created_at ,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Payment status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 bg-success`}
            style={{ width: "60px" }}
           
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
    }, 
  ];

  const data = [
    {
      "created_at": "2024-01-15",
      "name": "Alice Brown",
      "age": 29,
      "amount": 12000,
      "status": "Paid"
    }
    
  ]

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <h6>Invoice & Payments</h6>
            <hr />

            <DataTable
              persistTableHead={true}
              columns={columns}
              data={data}
              customStyles={customStyle}
              pagination
              // selectableRows
              fixedHeader
            />
          </div>
        </div>
      </div>
    </>
  );
};



const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};

const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const LocationSelect = ({}) => {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const autocompleteRef = useRef(null);
  const [mapMove, setMapMove] = useState(null);
  const [Location, setLocation] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const latLngs = `${event.latLng.lat()}, ${event.latLng.lng()}`;
    setClickedLatLng(latLng);
    setLocation(latLngs);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const latLng = { lat, lng };
      setMapMove(latLng);
    }
  };

  const handleSearch = () => {
    if (mapMove) {
      setClickedLatLng(mapMove);
      if (map) {
        map.panTo(mapMove);
      }
    }
  };

  const [formData, setFormData] = useState({
    map_view: "",
    street_view: "",
  });

  useEffect(() => {
    if (Location) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: Location,
      }));
    }
  }, [Location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.map_view || !formData.street_view || !formData.location) {
    //   alert("Please fill all fields");
    //   return;
    // }

    // setIsLoading(true);
    // try {
    //   await axios.put(`${API_BASE_URL}/media/${id}`, formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   Toast({ message: "Successfully Updated", type: "success" });
    //   setIsLoading(false);
    // } catch (error) {
    //   alert("Error updating");
    // }
  };

   

  return isLoaded ? (

    <div className="col-12 mt-4">
    <div className="card shadow border-0">
      <div className="card shadow border-0 p-4">
        <h6>Google map location mapping notification</h6>
        <hr />
      
          <div className="form-group mt-3">
            <div className="row mb-3 align-items-center">
              <div className="col-2">
                <label className="form-label">Location (lat, lng)</label>
              </div>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control"
                  value={Location}
                />
              </div>
 
              <div className="col-1">
                <div className="text-end py-3">
                  <button
                    className="btn1 me-2"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">Please wait...</span>
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
      
    
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        >
          {clickedLatLng && <Marker position={clickedLatLng} />}
        </GoogleMap>
      </div>
    </div>
  </div> 
  ) : null;
};