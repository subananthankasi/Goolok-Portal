import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataTable from "react-data-table-component";
import customStyle from "../../../../Utils/tableStyle";
import ExportButton from "../../../../Utils/ExportButton";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";
import StateDropDown, {
  useStateOptions,
} from "../../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown, {
  useDistrictOptions,
} from "../../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown, {
  useTalukOptions,
} from "../../../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown, {
  useVillageOptions,
} from "../../../../Utils/SelectDropDown/VillageDropDown";
import PincodeDropDown, {
  usePincodeOptions,
} from "../../../../Utils/SelectDropDown/PincodeDropDown";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyDocument } from "../../../../Redux/Actions/MasterPage/PropertyDocumentAction";
import { editLandNewProperty } from "../../../../Redux/Actions/PropertyManagement/Land/LandNewPropertyActions";
import Spinner from "react-bootstrap/Spinner";
import { fetchVendor } from "../../../../Redux/Actions/MasterPage/VendorAction";
import Select from "react-select";
import { validateLandFormData } from "../NewProperty/validationLand";
import FileDownloadIcon from "@mui/icons-material/Visibility";
import FileView from "../../../../Utils/FileView/FileView";
 
function LandNewPropertyEdit() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [land, SetLand] = useState([]);
  const [doc, SetDoc] = useState([]);
  const [survey, SetSurvey] = useState([]);

 
  useEffect(() => {
    if (land.project_document) {
      const parsedObject = JSON.parse(land.project_document);
      SetDoc(parsedObject);
    }
  }, [land.project_document]);

  const defaultColumn = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Project ID",
      selector: (row) => row.glk_projectid,
      sortable: true,
      wrap: true,
    },
    {
      name: "Total Land area",
      selector: (row) => row.glk_totalarea,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "TLA Unit",
      selector: (row) => row.glk_totalunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "f-line",
      selector: (row) => row.glk_fline,
      sortable: true,
      wrap: true,
    },
    {
      name: "f-line Unit",
      selector: (row) => row.glk_fline_unit,
      sortable: true,
      wrap: true,
    },
    {
      name: "G-line",
      selector: (row) => row.glk_gline,
      sortable: true,
      wrap: true,
    },
    {
      name: "Gline Unit",
      selector: (row) => row.glk_glineunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "Land facing",
      selector: (row) => row.glk_landfacing,
      sortable: true,
      wrap: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.glk_surveyno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sub division",
      selector: (row) => row.glk_division,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "SD Unit",
      selector: (row) => row.glk_sdunit,
      sortable: true,
      wrap: true,
    },
  ];

  const updatedColumn = [
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
      width: "150px",
      wrap: true,
    },
    {
      name: "TLA Unit",
      selector: (row) => row["TLA Unit"],
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
      name: "f-line Unit",
      selector: (row) => row["f-line Unit"],
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
      name: "Gline Unit",
      selector: (row) => row["Gline Unit"],
      sortable: true,
      wrap: true,
    },
    {
      name: "Land facing",
      selector: (row) => row["Land facing"],
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
      width: "150px",
      wrap: true,
    },
    {
      name: "SD Unit",
      selector: (row) => row["SD Unit"],
      sortable: true,
      wrap: true,
    },
  ];

  let navigate = useNavigate();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [loading,setLoading] = useState(true) 

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/project/${id}`, {
        headers: {
          'Gl-Status':'pending', 
        },
      })
      .then((response) => {
        SetLand(response.data[0].land);
        SetSurvey(response.data[0].survey);
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // get vendor details
  const vendorData = useSelector((state) => state.vendor.vendorData);
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  const enableVendor = vendorData.filter((data) => data.current_status === "Enable");
  const initialVendor = enableVendor.filter((data) => data.id === land.vendor)[0];

  const VendorOptions = enableVendor.map((data) => ({
    value: data.id,
    label: `${data.vendor_id} - ${data.username}`,
  }));

  // excel upload ==---------------------------------------------------------->
  const fileUploadRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [finalCol, setFinalCol] = useState([]);

  const handleExcelSubmit = (e) => {
    e.preventDefault();
    if (excelData.length > 0) {
      setFinalData(excelData);
      setFinalCol(updatedColumn);
    } else {
      alert("Please select a file to upload");
    }
  };

  // set dropdown
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState("");

 
  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setSelectedPincode(null);
  };

  const handlePincodeSelect = (pincode) => {
    setSelectedPincode(pincode);
  };

  const handleSelectVendor = (data) => {
    setSelectedVendor(data);
  };
  const handleChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  const initialState = useStateOptions().filter(
    (data) => data.value === land?.project_state
  )[0];
  const initialDist = useDistrictOptions().filter(
    (data) => data.value === land?.project_district
  )[0];
  const initialTaluk = useTalukOptions().filter(
    (data) => data.value === land?.project_taluk
  )[0];
  const initialVillage = useVillageOptions().filter(
    (data) => data.value === land?.project_village
  )[0];
  const initialPincode = usePincodeOptions().filter(
    (data) => data.value === land?.project_pincode
  )[0];

  // get peoject id and Land type
  const [landtype, setType] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/landtype`)
      .then((response) => {
        setType(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // form data manage
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [currentFile,setCurrentFile] = useState([])
 
useEffect(() => {
   if (oldFiles && land.project_document) {
    try {
      const format = JSON.parse(land.project_document); 
       const filesRemove = format.filter((data) => {
        return !oldFiles.some((old) => data.file === old); 
      });

      setCurrentFile(filesRemove);
     } catch (error) {
      console.error("Error parsing project_document:", error);
    }
  }
}, [oldFiles, land.project_document]);


   const [formData, setFormData] = useState({
    id: "",
    projectid: "",
    property: "",
    contactname: "",
    project_mobile: "",
    address: "",
    addressf: "",
    satename: "",
    district: "",
    taluk: "",
    village: "",
    pincode: "",
    document: "",
    property: "",
    survey: "",
    vendor: "", 
    currentfile: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    if (name === 'project_mobile') {
       const regex = /^[0-9]{0,10}$/; 
       if (regex.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
       setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } 
    // setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({});

  const firstPage = () => {
    const result = validateLandFormData(formData);
    if (result.isValid) {
      setErrors("");
      setStep(2);
    } else {
      setErrors(result.errors);
    }
  };

  const secondPage = () => {
    setStep((prevStep) => prevStep + 1); 
  };

  // document upload dynamically
  const PropertyDocumentData = useSelector(
    (state) => state.PropertyDocument.PropertyDocumentData
  );
  const filteredData = PropertyDocumentData.filter(
    (data) => data.subproperty == selectedProperty
  );
  useEffect(() => {
    dispatch(fetchPropertyDocument());
  }, [dispatch]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const documentName = filteredData[index].document;
    
    const format = JSON.parse(land.project_document)
    const oldfileget = format
    .map((data) => data.label === documentName ? data.file : null)
    .filter((file) => file !== null);
    
    setOldFiles((prevFiles) => [
      ...prevFiles,
      oldfileget[0] || null,
    ]);

    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
    ];

    if (file && allowedTypes.includes(file.type)) {
    setErrors(prevErrors => ({ ...prevErrors, [index]: '' }));
    setSelectedFiles((prevState) => {
       let updatedFiles = [...prevState]; 
       updatedFiles = updatedFiles.filter((fileEntry) => fileEntry?.filename !== documentName); 
       while (updatedFiles.length <= index) {
        updatedFiles.push(null);  
      } 
       updatedFiles[index] = { filename: documentName, document: file }; 
      return updatedFiles;
    });
    
   }
  else {
    setErrors(prevErrors => ({
      ...prevErrors,
      [index]: 'Please upload a valid file (xls, pdf, xlsx, docx, doc, png, jpeg, jpg).',
    }));
  }
  };

  // excel data name change to add
  const [nameChangeData, setNameChangeData] = useState([]);
  useEffect(() => {
    if (finalData) {
      const nameChange = finalData.map((item, index) => ({
        glk_projectid: land.project_tid,
        glk_surveyno: item["Survey No"] ? item["Survey No"] : "",
        glk_totalarea: item["Total Land area"] ? item["Total Land area"] : "",
        glk_totalunit: item["TLA Unit"] ? item["TLA Unit"] : "",
        glk_fline: item["f-line"] ? item["f-line"] : "",
        glk_fline_unit: item["f-line Unit"] ? item["f-line Unit"] : "",
        glk_landfacing: item["Land facing"] ? item["Land facing"] : "",
        glk_division: item["Sub division"] ? item["Sub division"] : "",
        glk_sdunit: item["SD Unit"] ? item["SD Unit"] : "",
        glk_gline: item["G-line"] ? item["G-line"] : "",
        glk_glineunit: item["Gline Unit"] ? item["Gline Unit"] : "",
      }));
      setNameChangeData(nameChange);
    }
  }, [finalData]);

  useEffect(() => {
    setFormData({
      ...formData,
      satename: selectedState ? selectedState.value : "",
      district: selectedDistrict ? selectedDistrict.value : "",
      taluk: selectedTaluk ? selectedTaluk.value : "",
      village: selectedVillage ? selectedVillage.value : "",
      pincode: selectedPincode ? selectedPincode.value : "",
      property: selectedProperty ? selectedProperty : "",
      document: selectedFiles ? selectedFiles : "",
      vendor: selectedVendor ? selectedVendor.value : "",  
      survey: nameChangeData.length > 0 ? nameChangeData : survey,
    });
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
    selectedProperty,
    selectedFiles,
    nameChangeData,
    selectedVendor,
    survey,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const result = validateLandFormData(formData);
    if (result.isValid) {
      setIsLoading(true);
      const form = new FormData();
      form.append("id", formData.id);
      form.append("projectid", formData.projectid);
      form.append("property", formData.property);
      form.append("contactname", formData.contactname);
      form.append("mobile", formData.project_mobile);
      form.append("address", formData.address);
      form.append("addressf", formData.addressf);
      form.append("satename", formData.satename);
      form.append("district", formData.district);
      form.append("taluk", formData.taluk);
      form.append("village", formData.village);
      form.append("pincode", formData.pincode);
      form.append("vendor", formData.vendor);
      form.append(
        "oldfile",
        oldFiles.length > 0 ? oldFiles : []
      );
      form.append(
        "currentfile",
        currentFile.length > 0
          ? JSON.stringify(currentFile)
          : JSON.stringify([])
      );

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((doc, index) => {
           if (doc && doc.filename && doc.document) {
            form.append("filename[]", doc.filename);
            form.append("document[]", doc.document);
          } else {
             console.error(`Invalid document object at index ${index}:`, doc);
          }
        });
      } else {
         form.append("filename[]", []);
        form.append("document[]", []);
      }
      

      formData.survey.forEach((survey, index) => {
        Object.keys(survey).forEach((key) => {
          form.append(`survey[${index}][${key}]`, survey[key]);
        });
      });


      try {
        await dispatch(editLandNewProperty(form));
      } catch (error) {
        alert("error on adding");
      } finally {
          window.location.reload()
          setIsLoading(false);
      }
    } else {
      alert("Validation Error...Please Check all fields");
    }
  };

  // display vendor details
  const getVendor = selectedVendor?.value
    ? enableVendor.filter((data) => data.id === selectedVendor.value)
    : [];

  // set update data for dropdown
  useEffect(() => {
    if (land) {
      setSelectedProperty(land.project_property);
      setFormData({
        contactname: land.project_name,
        project_mobile: land.project_mobile,
        address: land.project_address,
        addressf: land.project_addressf,
        id: land.id,
        survey: survey.length > 0 ? survey : [],
        projectid: land.project_tid,
      });
    }

    if (initialVendor) {
      setSelectedVendor({
        value: initialVendor.id,
        label: `${initialVendor.vendor_id} - ${initialVendor.username}`,
      });

      if (initialState) {
        setSelectedState(initialState);
      }
      if (initialDist) {
        setSelectedDistrict(initialDist);
      }
      if (initialTaluk) {
        setSelectedTaluk(initialTaluk);
      }
      if (initialVillage) {
        setSelectedVillage(initialVillage);
      }
      if (initialPincode) {
        setSelectedPincode(initialPincode);
      }
    }
  }, [land, initialVendor, survey]);

  const typeBase = selectedProperty == land.project_property;



  // view file 
const [url,setUrl] = useState('') 
const viewFileUrl = (url)=>{
   setUrl(url)
   openModalFile()
}
const [isModalOpenFile, setIsModalOpenfile] = useState(false);
const openModalFile = () => {
  setIsModalOpenfile(true);
};
const closeModalFile = () => {
  setIsModalOpenfile(false);
};
  return (
    <>
   <FileView isOpen={isModalOpenFile} closeModal={closeModalFile} fileUrls={url}/>  
      <section className="section">
        <div className="container">
          <div className="row">
          {loading ? 
          <div style={{height:"32vh",display:"flex",justifyContent:"center"}}>
             <Spinner className="mt-auto"/> 
          </div>
          :
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
                          href="javascript:void(0);"
                          onClick={() => setStep(1)}
                        >
                          Basic Details
                        </a>

                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="javascript:void(0);"
                          onClick={() => firstPage()}
                        >
                          Upload Documents
                        </a>

                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="javascript:void(0);"
                          onClick={() => setStep(3)}
                        >
                          Survey
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
                     <div className={step === 1 ? "d-block" : "d-none"}>
                      <div className="row">
                        <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Project ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={land.project_tid}
                            readOnly
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Land Type
                          </label>
                          <select
                            id="inputState"
                            className="form-select"
                            onChange={handleChange}
                            value={selectedProperty}
                          >
                            <option value="">Select property type</option>
                            {landtype.map((landtypeItem, index) => (
                              <option key={index} value={landtypeItem.id}>
                                {landtypeItem.subpro_name}
                              </option>
                            ))}
                          </select>
                          {errors.property && (
                            <div className="validation_msg">
                              {errors.property}
                            </div>
                          )}
                        </div>

                        <h6 className="mt-4 mb-3">Vendor Deatils</h6>
                        <hr />
                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Select Vendor
                          </label>
                          <Select
                            options={VendorOptions}
                            onChange={handleSelectVendor}
                            value={selectedVendor}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "#e7e7e7"
                                  : "#e7e7e7",
                                fontSize: "13px",
                              }),
                              option: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: "12px",
                                color: "black",
                              }),
                            }}
                          />
                          {errors.vendor && (
                            <div className="validation_msg">
                              {errors.vendor}
                            </div>
                          )}
                        </div>

                        <div className="row">
                          {getVendor.length > 0 && (
                            <>
                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      vendor Name :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].username}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Vendor Mobile :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].mobile}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Email :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].vendor_email}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      State :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].state_name}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      District :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].district}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Village :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].village_name}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Taluk :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].taluk_name}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                  <div className="col-5">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Pincode :
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    <span className="field_value">
                                      {getVendor[0].pincode}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <h6 className="mt-4 mb-3">Basic Deatils</h6>
                        <hr />
                        <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={formData.contactname}
                            name="contactname"
                            onChange={handleChangeForm}
                          />
                          {errors.contactname && (
                            <div className="validation_msg">
                              {errors.contactname}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 col-lg-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Phone No
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={formData.project_mobile}
                            name="project_mobile"
                            onChange={handleChangeForm}
                            maxLength="10"
                          />
                        </div>

                        <div className="col-md-12 mb-3 col-lg-4">
                          <label htmlFor="lastName" className="form-label">
                            Address 1
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={formData.address}
                            name="address"
                            onChange={handleChangeForm}
                          />
                        </div>
                        <div className="mb-3 col-md-12 col-lg-4">
                          <label htmlFor="lastName" className="form-label">
                            Address 2
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="addressf"
                            value={formData.addressf}
                            onChange={handleChangeForm}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            State
                          </label>
                          <StateDropDown
                            onSelect={handleStateSelect}
                            selectedState={selectedState}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            District
                          </label>
                          <DistrictDropDown
                            onSelect={handleDistrictSelect}
                            selectedDistrict={selectedDistrict}
                            filter={selectedState}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Taluk
                          </label>
                          <TalukDropDown
                            onSelect={handleTalukSelect}
                            selectedTaluk={selectedTaluk}
                            filter={selectedDistrict}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Village
                          </label>
                          <VillageDropDown
                            onSelect={handleVillageSelect}
                            selectedVillage={selectedVillage}
                            filter={selectedTaluk}
                          />
                        </div>

                        <div className="mb-3 col-md-12 col-lg-4">
                          <label className="form-label" htmlFor="inputState">
                            Pincode
                          </label>
                          <PincodeDropDown
                            onSelect={handlePincodeSelect}
                            selectedPincode={selectedPincode}
                            filter={selectedVillage}
                          />
                        </div>

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-2">Clear</button>
                          <button
                            className="btn1"
                            onClick={(e) => {
                              e.preventDefault();
                              firstPage();
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={step === 2 ? "d-block" : "d-none"}>
                      <div className="row">
                        {filteredData.map((filter, index) => {
                          const matchedDocs = doc.filter(
                            (data) => data.label === filter.document
                          );

                          return (
                            <div className="col-md-12 col-lg-6" key={index}>
                              <div className="form-group mt-5">
                                <div className="row">
                                  <div className="col-4">
                                    <label className="form-label">
                                      {filter.document}
                                    </label>
                                  </div>
                                  <div className="col-7">
                                    {matchedDocs.length > 0 ? (
                                      matchedDocs.map((data, docIndex) => (
                                        <div key={docIndex}>
                                          <input
                                            type="file"
                                            className="form-control"
                                            accept=".xls,.pdf,.xlsx,.docx,.doc,.png,.jpeg,.jpg"
                                            onChange={(event) =>
                                              handleFileChange(event, index)
                                            }
                                          />
                                          {errors[index] && <p className="validation_msg text-danger">{errors[index]}</p>} 
                                          <div
                                            className={`mt-2 d-flex align-items-end ${
                                              typeBase == false
                                                ? "d-none"
                                                : "d-block;"
                                            }`}
                                          >
                                            {/* <a
                                              href={`${IMG_PATH}/land/${data.file}`}
                                              className="btn1"
                                              download
                                            >
                                              <FileDownloadIcon />
                                            </a> */}
                                             <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}/land/${data.file}`)}>
                                              <FileDownloadIcon />
                                            </button>
                                            <span
                                              className="ms-2"
                                              style={{ fontSize: "11px" }}
                                            >
                                              {data.file}
                                            </span>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div>
                                        <input
                                          type="file"
                                          className="form-control"
                                          accept=".xls,.pdf,.xlsx,.docx,.doc,.png,.jpeg,.jpg"
                                          onChange={(event) =>
                                            handleFileChange(event, index)
                                          }
                                        />
                                      {errors[index] && <p className="validation_msg text-danger">{errors[index]}</p>} 
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="mt-3">
                          {errors.document && (
                            <div className="validation_msg">
                              {errors.document}
                            </div>
                          )}
                        </div>

                        <div className="text-end py-3 px-3">
                          <button
                            className="btn1 me-2"
                            onClick={(e) => {
                              e.preventDefault();
                              prevStep();
                            }}
                          >
                            Previous
                          </button>
                          <button
                            className="btn1"
                            onClick={(e) => {
                              e.preventDefault();
                              secondPage();
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={step === 3 ? "d-block" : "d-none"}>
                      <div className="row">
                        <div>
                          <div className="row mt-2">
                            <div className="col-lg-4">
                              <div className="card2">
                                <div className="p-3 mt-3">
                                  <h4 className="page_heading">Excel Format</h4>
                                  <ExportButton
                                    columns={defaultColumn}
                                    data={survey}
                                    type={"Download Format"}
                                    filename={"surveyNo_uploading_format.csv"}
                                  />

                                  <div className="mb-3 mt-3">
                                    <h6 className="page_heading">
                                      Updated Excel Upload
                                    </h6>
                                    <ExcelFileUpload
                                      setExcelData={setExcelData}
                                      fileInputRef={fileUploadRef}
                                    />
                                  </div>

                                  <div className="text-end py-3 px-3">
                                    <button className="btn1 me-1">Clear</button>
                                    <button
                                      className="btn1 me-2"
                                      onClick={handleExcelSubmit}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-8">
                              <div className="card2">
                                <div className="">
                                  <DataTable
                                    columns={
                                      finalCol.length > 0
                                        ? finalCol
                                        : defaultColumn
                                    }
                                    data={
                                      finalData.length > 0 ? finalData : survey
                                    }
                                    customStyles={customStyle}
                                    pagination
                                    persistTableHead={true}
                                    fixedHeader
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-end py-3 px-3">
                          <button
                            className="btn1 me-1"
                            onClick={(e) => {
                              e.preventDefault();
                              firstPage();
                            }}
                          >
                            Previous
                          </button>
                          {/* <button className="btn1 me-2" onClick={(e) => {  handleSubmit(e) }}>Submit</button> */}
                          <button
                            className="btn1 me-2"
                            onClick={(e) => {
                              handleSubmit(e);
                            }}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">Please wait...</span>
                              </>
                            ) : (
                              "Update"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          }
          </div>
        </div>
      </section>
    </>
  );
}

export default LandNewPropertyEdit;
