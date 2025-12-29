import React, { useEffect, useState } from "react";
// import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
// import DataTable from "react-data-table-component";
// import customStyle from "../../../Utils/tableStyle";
// import FileViewUtils from "../../../Utils/FileView/FileViewUtils";
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from "yup";
import Spinner from "react-bootstrap/Spinner";
// import Toast from "../../../Utils/Toast";
import DeleteIcon from "@mui/icons-material/Delete";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import FileViewUtils from "../../../../Utils/FileView/FileViewUtils";
import customStyle from "../../../../Utils/tableStyle";
import { DocumentPendingCreate, DocumentPendingGet } from "../../../../Redux/Actions/ApartmentDocument/ApartmentDocPending";
import { useDispatch, useSelector } from "react-redux";
import StateDropDown, { useStateOptions } from "../../../../Utils/SelectDropDown/StateDropDown";
// import { DatePicker } from "rsuite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VillageDropDown, { useVillageOptions } from "../../../../Utils/SelectDropDown/VillageDropDown";
import DistrictDropDown, { useDistrictOptions } from "../../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown, { useTalukOptions } from "../../../../Utils/SelectDropDown/TalukDropDown";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TableFooter } from "@mui/material";
import { fetchUnit } from "../../../../Redux/Actions/MasterPage/UnitAction";
import { Column } from "primereact/column";
import { Row } from "react-bootstrap";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from 'primereact/datatable';

// import ConfirmationModal from "../../../Utils/ConfirmationModal";

const AddMoreApart = ({ isOpen, closeModal, id,enqid,eid }) => {


  const dispatch = useDispatch()

  const [step, setStep] = useState(1);



  const columns = [
    {
      name: "S.no",
      cell: (row, index) => row.sno,
      sortable: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.survey_no,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sub division",
      selector: (row) => row.sub_division,
      sortable: true,
    },
    {
      name: "Hectare-Are",
      selector: (row) => row.hectare,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => {
              openModalConfirm();
              setDeleteId(row.id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const columns1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.survey_no,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sub division",
      selector: (row) => row.sub_division,
      sortable: true,
    },
    {
      name: "Extent",
      selector: (row) => row.extent,
      sortable: true,
    },
    {
      name: "Units",
      selector: (row) => row.units,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => {
              openModalConfirm();
              setDeleteId(row.id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const handleClose = () => {
    closeModal(false);
    setStep(1)
  };

  const [isLoading, setIsLoading] = useState("");

  const onSubmit = (values) => {
    // alert("fgh")
    const payload = {
      ...values,
      enqid: id.eid
    }

    dispatch(DocumentPendingCreate(payload)).then(() => {
      dispatch(DocumentPendingGet(id.eid))
    })
  }

  const formik = useFormik({

    initialValues: {
      id: null,
      projectName: '',
      approval: '',
      rera: '',
      planing: '',
      building: '',
      apartment: '',
      floor: '',
      parking: '',
      builtupArea: '',
      commonArea: '',
      superArea: '',
      udsSize: '',
      bhkCount: '',
      facing: '',
       
       eid:enqid
    },
    // validationSchema: yup.object().shape({
    //   projectName: yup.string().required(" project name is required !!"),
    //   approval: yup.string().required("abroval no is required !!"),
    //   rera: yup.string().required("rera no date is required !!"),
    //   planing: yup.string().required("planning permit no is required !!"),
    //   building: yup.string().required("building permit no is required !!"),
    //   apartment: yup.string().required("apartment no is required !!"),
    //   floor: yup.string().required("floor is required !!"),
    //   parking: yup.string().required("car parking is required !!"),
    //   builtupArea: yup.string().required("built up area is required !!"),
    //   commonArea: yup.string().required("common area is required !!"),
    //   superArea: yup.string().required("supper built up area is required !!"),
    //   udsSize: yup.string().required("uds is required !!"),
    //   bhkCount: yup.string().required("bhk is required !!"),
    //   facing: yup.string().required("facing is required !!"),


    // }),
    onSubmit
  })

  useEffect(() => {

    dispatch(DocumentPendingGet(id.eid));

  }, [])

  const userData = useSelector((state) => state.ApartmentGetReducer?.data?.[0])


  useEffect(() => {
    if (userData) {
      formik.setFieldValue("projectName", userData?.project_name)
      formik.setFieldValue("approval", userData?.approval_no)
      formik.setFieldValue("rera", userData?.rera_no)
      formik.setFieldValue("planing", userData?.planing_permit_no)
      formik.setFieldValue("building", userData?.building_permit_no)
      formik.setFieldValue("apartment", userData?.apartment_no)
      formik.setFieldValue("floor", userData?.floor)
      formik.setFieldValue("parking", userData?.parking)
      formik.setFieldValue("builtupArea", userData?.builtup_area)
      formik.setFieldValue("commonArea", userData?.common_area)
      formik.setFieldValue("superArea", userData?.super_area)
      formik.setFieldValue("udsSize", userData?.uds_size)
      formik.setFieldValue("bhkCount", userData?.bhk_count)
      formik.setFieldValue("facing", userData?.facing)
      formik.setFieldValue("id", userData?.id)

    }

  }, [userData])



  // ===============================
  //   for patta
  // ===============================


  const [previousDataPata, setPreviousdata] = useState();
  const [pattaFormData, setPattaFormData] = useState({
    pid: null,
    eid: id.eid,
    id: id.id,
    pattano: "",
    pattaname: "",
    father_name: "",
    date: "",
    district: "",
    taluk: "",
    village: "",
    classification: "",
    type: "Rural_patta",
    ward: "",
    block: "",
    // property_type: "",
  });
  const handlePattaTypeChange = (e) => {
    const selectedType = e.target.value;
    setPattaFormData((prevData) => ({
      ...prevData,
      type: selectedType,
    }));
  };
  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();


  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);


  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);

  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);

  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);

  };
  useEffect(() => {

    setPattaFormData({
      ...pattaFormData,
      state: selectedState ? selectedState.value : "",
      district: selectedDistrict ? selectedDistrict.value : "",
      taluk: selectedTaluk ? selectedTaluk.value : "",
      village: selectedVillage ? selectedVillage.value : "",
    });

  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,

  ]);
  const [sroData, setSroData] = useState([])

  const fetchSro = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/srodetails`
      );
      setSroData(response?.data || []);
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    fetchSro()
  }, [])


  useEffect(() => {
    if (id) {
      setPattaFormData({
        ...pattaFormData,
        ...previousDataPata,
        id: id.id,
        eid: id.eid
      });
    }
  }, [id, previousDataPata]);


  useEffect(() => {
    if (isOpen && previousDataPata) {

      // const defaultOptionState = stateDropDown.find(
      //   (option) => option.value === previousDataPata.state || " " 

      // );
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === String(previousDataPata.state)
      ) || { value: "", label: "Select State" };


      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === previousDataPata?.district || ""
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === previousDataPata?.taluk || ""
      );
      setSelectedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDropDown.find(
        (option) => option.value === previousDataPata?.village || ""
      );
      setSelectedVillage(defaultOptionVillage);
    }
  }, [isOpen, previousDataPata])

  const handlePattaChange = (e) => {
    const { name, value } = e.target;
    setPattaFormData({
      ...pattaFormData,
      [name]: value,
    });
  };


  const [error, setError] = useState("");

  const handlePattaSubmit = async (e) => {
    e.preventDefault();
    const excludedFields = ["ward", "block"];
    const emptyFields = Object.entries(pattaFormData)
      .filter(([key, value]) => value === "" && !excludedFields.includes(key))
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError("All required fields must be filled.");
      return;
    }

    // const emptyFields = Object.entries(pattaFormData)
    //   .filter(([key, value]) => value === "")
    //   .map(([key]) => key);

    // if (emptyFields.length > 0) {
    //   setError(`All fields are required `);
    //   return;
    // }
    setError("");
    setIsLoading(1);
    // try {
    //   await axios.post(`${API_BASE_URL}/enquirypatta`, pattaFormData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   Toast({ message: "Successfully Updated", type: "success" });
    //   setIsLoading("");
    // } catch (error) {
    //   alert(error);
    // }
    try {
      await axios.post(`${API_BASE_URL}/enquirypatta`, pattaFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Submited", type: "success" });
      setIsLoading("");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/enquirypatta/${id.id}`
        );
        setPreviousdata(response.data);
      } catch (error) { }
      setTimeout(() => {
        setStep(2)

      }, 2000)
    } catch (error) {
      alert(error);
    } finally {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/enquirypatta/${id.id}`
        );
        setPreviousdata(response.data);
      } catch (error) { }
    }
  };

  // get
  useEffect(() => {
    if (id && id.doc_type == "Patta") {
      const fetchPatta = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/enquirypatta/${id.id}`
          );
          setPreviousdata(response.data);
        } catch (error) { }
      };
      fetchPatta();
    }
  }, [id]);
  useEffect(() => {
    fetchPatta();
  }, [id]);

  // patta 2
  const [pattaTwoFormData, setPattaTwoFormData] = useState({
    id: "",
    surveyno: "",
    sub_division: "",
    hectare: "",
    oldSurvey: "",
    oldDivision: "",

  });

  useEffect(() => {
    if (id) {
      setPattaTwoFormData({
        ...pattaTwoFormData,
        id: id.id,
        enqid: id.eid
      });
    }
  }, [id]);

  const handlePattaTwoChange = (e) => {
    const { name, value } = e.target;
    setPattaTwoFormData({
      ...pattaTwoFormData,
      [name]: value,
    });
  };

  const handlePattaTwoSubmit = async (e) => {
    e.preventDefault();
    const pattafield = ["oldSurvey", "oldDivision"]

    const emptyFields = Object.entries(pattaTwoFormData)
      .filter(([key, value]) => value.trim() === "" && !pattafield.includes(key))
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`All fields are required `);

      return;
    }
    setError("");
    setIsLoading(2);
    try {
      await axios.post(`${API_BASE_URL}/pattasurveyadd`, pattaTwoFormData, {

        headers: {
          "Content-Type": "application/json",
        },
      });
      setPattaTwoFormData({

        ...pattaTwoFormData,
        surveyno: "",
        sub_division: "",
        hectare: "",
      });


      fetchPatta();
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading("");
    } catch (error) {
      alert(error);
    }
  };

  const [pattaData, getPattaData] = useState([]);
  useEffect(() => {
    if (id && id.doc_type == "Patta") {
      fetchPatta();
    }
  }, [id]);

  const fetchPatta = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirypatta/${id.id}/edit`
      );
      const data = response?.data?.map((map, index) => ({
        ...map,
        sno: index + 1
      }))
      getPattaData(data);
    } catch (error) { }
  };

  // confirmation
  const [deleteId, setDeleteId] = useState("");
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const openModalConfirm = () => {
    setIsModalConfirm(true);
  };
  const closeModaConfirm = () => {
    setIsModalConfirm(false);
  };
  const handleConfirm = async () => {
    let apiname;
    if (id.doc_type == "Patta") {
      apiname = "enquirypatta"
    } else if (id.doc_type == "Title document") {
      apiname = "enquirydeed"
    }
    try {
      await axios.delete(`${API_BASE_URL}/${apiname}/${deleteId}`);
      Toast({ message: "Successfully Deleted", type: "success" });
      fetchPatta();
      fetchDeed()
    } catch (error) {
      Toast({ message: "Failed to error", type: "error" });
    }
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));





  // ================================
  // -------- Aadhar ----------------
  // ================================
  const [aadharExistingData, setAadharExistingData] = useState()
  const [aadharFormData, setAadharFormData] = useState({
    id: null,
    docid: id.id,
    aadhar_name: "",
    father_name: "",
    aadhar_number: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      setAadharFormData({
        ...aadharFormData,
        ...aadharExistingData,
        docid: id.id,
      });
    }
  }, [id, aadharExistingData]);

  const handleAadharChange = (e) => {
    const { name, value } = e.target;
    setAadharFormData({
      ...aadharFormData,
      [name]: value,
    });
  };


  const handleAadharSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.entries(aadharFormData)
      .filter(([key, value]) => value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`All fields are required `);
      return;
    }
    setError("");
    setIsLoading(3);
    try {
      await axios.post(`${API_BASE_URL}/enqaadhar`, aadharFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading("");
    } catch (error) {
      alert(error);
      setIsLoading("");
    }
  };


  useEffect(() => {
    if (id && id.doc_type == "Aadhaar") {
      const fetchPatta = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/enqaadhar/${id.id}`
          );
          setAadharExistingData(response.data);
        } catch (error) { }
      };
      fetchPatta();
    }
  }, [id]);









  // ================================
  // -------- Title Document ----------------
  // ================================
  const [deedExistingData, setDeedExistingData] = useState()
  const [deedFormData, setDeedFormData] = useState({
    pid: null,
    docid: id.id,
    document: "",
    registerDate: "",
    ownerName: "",
    extent: "",
    type: "",
    state: "",
    district: "",
    taluk: "",
    village: "",
    sro: "",
     
     eid:enqid
    // surveyNo: "",
    // subDivision: "",
  });

  useEffect(() => {
    if (id) {
      setDeedFormData({
        ...deedFormData,
        ...deedExistingData,
        docid: id.id,
      });
    }
  }, [id, deedExistingData]);

  const handleDeedChange = (e) => {
    const { name, value } = e.target;
    setDeedFormData({
      ...deedFormData,
      [name]: value,
    });
  };


  const   handleDeedSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.entries(deedFormData)
      .filter(([key, value]) => value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`All fields are required `);
      return;
    }
    setError("");
    setIsLoading(4);
    try {
      await axios.post(`${API_BASE_URL}/enquirydeed`, deedFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Updated", type: "success" });
      setTimeout(() => {
        setStep(2)
      }, 1000)
      setIsLoading("");
    } catch (error) {
      alert(error);
      setIsLoading("");
    }
  };

  useEffect(() => {
    if (id && id.doc_type == "Title document") {
      const fetchPatta = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/enquirydeed/${id.id}`
          );
          setDeedExistingData(response.data);
        } catch (error) { }
      };
      fetchPatta();
    }
  }, [id]);




  // -------- Title Document 2 ----------------
  const [deedTwoFormData, setDeedTwoFormData] = useState({
    docid: "",
    surveyno: "",
    extent: "",
    units: "",
    division: "",
    //  enqid: eid
    eid:enqid

  });

  useEffect(() => {
    if (id) {
      setDeedTwoFormData({
        ...deedTwoFormData,
        docid: id.id,
      });
    }
  }, [id]);

  const handleDeedTwoChange = (e) => {
    const { name, value } = e.target;
    setDeedTwoFormData({
      ...deedTwoFormData,
      [name]: value,
    });
  };
  const extentTotal = () => {
    let total = 0;

    for (let count of deedData) {
      total += Number(count.extent);
    }

    return total;
  };

  const footerGroup = (
      <ColumnGroup>
        <Row>
          <Column footer="Total Extent:" colSpan={3} footerStyle={{ textAlign: 'right' }} />
          <Column footer={extentTotal} />
        </Row>
      </ColumnGroup>
    );
   const unitData = useSelector(state => state.Unit.Unit);
  
    useEffect(() => {
      dispatch(fetchUnit());
    }, [])

  const handleDeedTwoSubmit = async (e) => {
    e.preventDefault();
    const noError = ["units"]
    const emptyFields = Object.entries(deedTwoFormData)
      .filter(([key, value]) => value.trim() === "" && !noError.includes(key))
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`All fields are required `);
      return;
    }
    setError("");
    setIsLoading(5);
    try {
      await axios.put(`${API_BASE_URL}/enquirydeed/${deedTwoFormData.docid}`, deedTwoFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDeedTwoFormData({
        ...deedTwoFormData,
        surveyno: "",
        units: "",
        extent: "",
        division: "",
      });
      fetchDeed();
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading("");
    } catch (error) {
      alert(error);
    }
  };

  const [deedData, getDeedData] = useState([]);
  useEffect(() => {
    if (id && id.doc_type == "Title document") {
      fetchDeed();
    }
  }, [id]);

  const fetchDeed = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirydeed/${id.id}/edit`
      );
      const data = response?.data?.map((map, index) => ({
        ...map,
        sno: index + 1
      }))
      getDeedData(data);
    } catch (error) { }
  };


  return (
    <>
       <ConfirmationModal
        isOpen={isModalConfirm}
        closeModal={closeModaConfirm}
        onConfirm={handleConfirm}
        message={"Are you sure you want to delete this ?"}
      /> 

      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  handleClose();
                  setError("");
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="card-body">
              <div className="row p-2">
                <div className="col-6">
                  <FileViewUtils
                    fileUrls={`${IMG_PATH}/enquiry/${id.document}`}
                  />
                </div>
                <div className="col-6">
                  <div>
                    {id?.doc_type == "Aadhaar" ? (
                      <h4 className="page_subheading m-3">
                        {id.doc_type} Details
                      </h4>
                    ) : (
                      <nav className="nav">
                        <a
                          style={{ height: "45px", fontSize: "14px" }}
                          className={`nav-link link1 ${step === 1 ? "active1" : ""
                            }`}
                          href="javascript:void(0)"
                          onClick={() => {
                            setStep(1);
                            setError("");
                          }}
                        >
                          {id.doc_type} Details 1
                        </a>
                        <a
                          style={{ height: "45px", fontSize: "14px" }}
                          className={`nav-link link1 ${step === 2 ? "active1" : ""
                            }`}
                          href="javascript:void(0)"
                          onClick={() => {
                            setStep(2);
                            setError("");
                          }}
                        >
                          {id.doc_type} Details 2
                        </a>

                        {id?.doc_type == "Title document" ? <a
                          style={{ height: "45px", fontSize: "14px" }}
                          className={`nav-link link1 ${step === 3 ? "active1" : ""
                            }`}
                          href="javascript:void(0)"
                          onClick={() => {
                            setStep(3);
                            setError("");
                          }}
                        >
                          Project Details
                        </a> : ""}
                      </nav>
                    )}
                    <hr className="m-0 mb-4" />

                    {/* patta  */}

                    {id?.doc_type == "Patta" && (
                      <>
                        {step === 1 && (
                          <>
                            <div className="row">
                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Patta Type
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <select
                                      name="type"
                                      id="type"
                                      className="form-select"
                                      value={pattaFormData.type}
                                      onChange={handlePattaTypeChange}
                                    >
                                      <option value="Rural_patta" >  Rural Patta</option>
                                      <option value="Natham_patta" > Natham Patta </option>
                                      <option value="Town_patta" >Town Patta</option>

                                    </select>
                                  </div>

                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Patta name
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="pattaname"
                                      value={pattaFormData.pattaname}
                                      onChange={handlePattaChange}
                                    />
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Patta no
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="pattaname"
                                      value={pattaFormData.pattano}
                                      // onChange={handlePattaChange}
                                      onChange={(e) => {
                                        const onlyNumbers = e.target.value.replace(/\D/g, "");
                                        handlePattaChange({ target: { name: "pattano", value: onlyNumbers } });
                                      }}
                                    />
                                  </div>

                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Father Name   / Care of
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                      name="father_name"
                                      value={pattaFormData.father_name}
                                      onChange={handlePattaChange}
                                    />
                                  </div>

                                </div>
                              </div>



                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Patta date
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <DatePicker
                                      selected={pattaFormData.date ? new Date(pattaFormData.date) : null}
                                      onChange={(date) =>
                                        handlePattaChange({
                                          target: { name: "date", value: date ? date.toISOString().split("T")[0] : "" },
                                        })
                                      }
                                      dateFormat="dd/MM/yyyy"
                                      className="form-control w-100"
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      State
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <StateDropDown
                                      onSelect={handleStateSelect}
                                      selectedState={selectedState}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      District
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <DistrictDropDown
                                      onSelect={handleDistrictSelect}
                                      selectedDistrict={selectedDistrict}
                                      filter={selectedState}
                                    />
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Taluk
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <TalukDropDown
                                      onSelect={handleTalukSelect}
                                      selectedTaluk={selectedTaluk}
                                      filter={selectedDistrict}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >

                                      {pattaFormData.type === "Town_patta" ? "Town" : "Revenue village "}
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <VillageDropDown
                                      onSelect={handleVillageSelect}
                                      selectedVillage={selectedVillage}
                                      filter={selectedTaluk}
                                      name="village"
                                      value={pattaFormData.village}
                                    />
                                  </div>
                                </div>
                              </div>

                              {pattaFormData.type === "Town_patta" && (
                                <>

                                  <div className="col-md-6 mb-3 ">
                                    <div className="row">
                                      <div className="col-4 mb-3 ">
                                        <label
                                          htmlFor="lastName"
                                          className="form-label"
                                        >
                                          Ward
                                        </label>
                                      </div>
                                      <div className="col-8 mb-3 ">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ward"
                                          value={pattaFormData.ward}
                                          onChange={handlePattaChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 mb-3 ">
                                    <div className="row">
                                      <div className="col-4 mb-3 ">
                                        <label
                                          htmlFor="lastName"
                                          className="form-label"
                                        >
                                          Block
                                        </label>
                                      </div>
                                      <div className="col-8 mb-3 ">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="block"
                                          value={pattaFormData.block}
                                          onChange={handlePattaChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}


                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Land Classification
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="property_type"
                                      value={pattaFormData.classification}
                                      // onChange={handlePattaChange}
                                      onChange={(e) => {
                                        const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        handlePattaChange({ target: { name: "classification", value: onlyText } });
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-6 mb-3 ">
                                {error && (
                                  <div
                                    className="alert alert-danger"
                                    role="alert"
                                  >
                                    {error}
                                  </div>
                                )}
                              </div>

                              <div className="text-end">
                                <button
                                  className="btn1 me-1"
                                  type="button"
                                  onClick={() => {
                                    setPattaFormData({
                                      pattano: "",
                                      pattaname: "",
                                      father_name: "",
                                      date: "",
                                      district: "",
                                      taluk: "",
                                      village: "",
                                      property_type: "",
                                      classification: "",
                                    });
                                    setError("");
                                  }}
                                >
                                  Clear
                                </button>

                                <button
                                  className="btn1"
                                  onClick={handlePattaSubmit}
                                  disabled={isLoading == 1}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                        {step === 2 && (
                          <>
                            {/* <div className="row mt-3">
                              <DataTable
                                persistTableHead={true}
                                columns={columns}
                                data={pattaData}
                                customStyles={customStyle}
                                pagination
                                paginationPerPage={5}
                                // selectableRows
                                fixedHeader
                              />
                            </div> */}
                            <div className="row mt-3">
                              <div className="">
                                <TableContainer component={Paper}>
                                  <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                                    <TableHead style={{ backgroundColor: 'rgb(47, 79, 79)' }}>
                                      <TableRow>
                                        <TableCell style={{ color: "white" }} >S.No</TableCell >
                                        <TableCell align="right" style={{ color: "white" }}>Survey No</TableCell >
                                        <TableCell align="right" style={{ color: "white" }}>Sub Division</TableCell >
                                        {pattaFormData.type === "Town_patta" && (
                                          <>
                                            <TableCell align="right" style={{ color: "white" }}> Old Survey No</TableCell >
                                            <TableCell align="right" style={{ color: "white" }}> Old Sub Division</TableCell ></>

                                        )}
                                        <TableCell align="right" style={{ color: "white" }}>Hectare-Are</TableCell >
                                        <TableCell align="right" style={{ color: "white" }}>
                                    </TableCell >
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {pattaData.map((item, index) => (

                                        <StyledTableRow key={index}>
                                          <TableCell component="th" scope="row">
                                            {index + 1}
                                          </TableCell >
                                          <TableCell align="right">{item.survey_no} </TableCell >
                                          <TableCell align="right">{item.sub_division}</TableCell >
                                          {pattaFormData.type === "Town_patta" && (
                                            <>
                                              <TableCell align="right" > {item.old_survey_no} </TableCell >
                                              <TableCell align="right" >{item.old_sub_division} </TableCell ></>

                                          )}
                                          <TableCell align="right">{item.hectare}</TableCell >
                                          <TableCell align="right"><button
                                            className="btn btn-outline-danger delete"
                                            data-tooltip-id="delete"
                                            onClick={() => {
                                              openModalConfirm();
                                              setDeleteId(item.id);
                                            }}
                                          >
                                            <DeleteIcon />
                                          </button></TableCell >
                                        </StyledTableRow>
                                      ))}
                                    </TableBody>
                                    <TableFooter>

                                      {pattaFormData.type === "Town_patta" ? (
                                        <TableCell align="right" colSpan={'5'} style={{ fontSize: '14px' }}> </TableCell >
                                      ) : (
                                        <TableCell align="right" colSpan={'3'} style={{ fontSize: '14px' }}> </TableCell >
                                      )}
                                      <TableCell colSpan={'2'} className="text-center" style={{ fontSize: '14px' }}>
                                        Sub Total :  {pattaData?.reduce((total, item) => total + Number(item.hectare || 0), 0)}
                                      </TableCell >
                                    </TableFooter>
                                  </Table>
                                </TableContainer>
                              </div>
                            </div>

                            <div className="row mt-4">
                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Survey no
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="surveyno"
                                      autoComplete="off"
                                      value={pattaTwoFormData.surveyno}
                                      onChange={handlePattaTwoChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      sub division
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="sub_division"
                                      value={pattaTwoFormData.sub_division}
                                      onChange={handlePattaTwoChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              {pattaFormData.type === "Town_patta" && (
                                <>

                                  <div className="col-md-6 mb-3 ">
                                    <div className="row">
                                      <div className="col-4 mb-3 ">
                                        <label
                                          htmlFor="lastName"
                                          className="form-label"
                                        >
                                          Old Survey No
                                        </label>
                                      </div>
                                      <div className="col-8 mb-3 ">
                                        <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                          name="oldSurvey"
                                          value={pattaTwoFormData.oldSurvey}
                                          // onChange={handlePattaTwoChange}
                                          onChange={(e) => {
                                            const onlyNumbers = e.target.value.replace(/\D/g, "");
                                            handlePattaTwoChange({ target: { name: "oldSurvey", value: onlyNumbers } });
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 mb-3 ">
                                    <div className="row">
                                      <div className="col-4 mb-3 ">
                                        <label
                                          htmlFor="lastName"
                                          className="form-label"
                                        >
                                          Old Sub Division
                                        </label>
                                      </div>
                                      <div className="col-8 mb-3 ">
                                        <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                          name="oldDivision"
                                          value={pattaTwoFormData.oldDivision}
                                          onChange={handlePattaTwoChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}


                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Hectare-Are
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="hectare"
                                      value={pattaTwoFormData.hectare}
                                      onChange={handlePattaTwoChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Unit
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="unit"
                                      value={pattaTwoFormData.unit}
                                      onChange={handlePattaTwoChange}
                                    />
                                  </div>
                                </div>
                              </div> */}

                              <div className="col-md-6 mb-3">
                                <div className="">
                                  <button
                                    className="btn1 me-1"
                                    type="button"
                                    onClick={() => {
                                      setPattaTwoFormData({
                                        ...pattaTwoFormData,
                                        surveyno: "",
                                        sub_division: "",
                                        hectare: "",
                                        unit: ""
                                      });
                                      setError("");
                                    }}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    className="btn1"
                                    onClick={handlePattaTwoSubmit}
                                    disabled={isLoading == 2}
                                  >
                                    {isLoading == 2 ? (
                                      <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ms-2">
                                          Please wait...
                                        </span>
                                      </>
                                    ) : (
                                      "Add"
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div className="col-6 mb-3 ">
                                {error && (
                                  <div
                                    className="alert alert-danger"
                                    role="alert"
                                  >
                                    {error}
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* chitta  */}
                    {id?.doc_type == "Aadhaar" && (
                      <>
                        <div className="row">
                          <div className="col-md-6 mb-3 ">
                            <div className="row">
                              <div className="col-4 mb-3 ">
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Aadhar name
                                </label>
                              </div>
                              <div className="col-8 mb-3 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  autoComplete="off"
                                  name="aadhar_name"
                                  value={aadharFormData?.aadhar_name}
                                  onChange={handleAadharChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 mb-3 ">
                            <div className="row">
                              <div className="col-4 mb-3 ">
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Father name
                                </label>
                              </div>
                              <div className="col-8 mb-3 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  autoComplete="off"
                                  name="father_name"
                                  value={aadharFormData.father_name}
                                  onChange={handleAadharChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 mb-3 ">
                            <div className="row">
                              <div className="col-4 mb-3 ">
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Aadhar number
                                </label>
                              </div>
                              <div className="col-8 mb-3 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  autoComplete="off"
                                  name="aadhar_number"
                                  value={aadharFormData.aadhar_number}
                                  onChange={handleAadharChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3 ">
                            <div className="row">
                              <div className="col-4 mb-3 ">
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Address
                                </label>
                              </div>
                              <div className="col-8 mb-3 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  autoComplete="off"
                                  name="address"
                                  value={aadharFormData.address}
                                  onChange={handleAadharChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-6 mb-3 ">
                            {error && (
                              <div
                                className="alert alert-danger"
                                role="alert"
                              >
                                {error}
                              </div>
                            )}
                          </div>

                          <div className="text-end">
                            <button className="btn1 me-1" type="button">
                              Clear
                            </button>
                            <button
                              className="btn1"
                              onClick={handleAadharSubmit}
                              disabled={isLoading == 3}
                            >
                              {isLoading == 3 ? (
                                <>
                                  <Spinner animation="border" size="sm" />
                                  <span className="ms-2">
                                    Please wait...
                                  </span>
                                </>
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Title Document  */}
                    {id?.doc_type == "Title document" && (
                      <>
                        {step === 1 && (
                          isLoading == 4 ? (
                            <div className="d-flex justify-content-center "
                              style={{
                                position: 'fixed',
                                width: '50%',
                                height: '85%',
                                color: "white",
                                backgroundColor: "white",
                                opacity: 0.5,
                                zIndex: 9999,
                                alignItems: 'center'
                              }}
                            >
                              <div >
                                <l-waveform
                                  size="35"
                                  stroke="3.5"
                                  speed="1"
                                  color="black"

                                ></l-waveform>
                              </div>

                            </div>

                          ) : (
                          <>
                            <div className="row">
                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Title document name no
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="document"
                                      value={deedFormData.document}
                                      onChange={handleDeedChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Registered date
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="registerDate"
                                      value={deedFormData.registerDate}
                                      onChange={handleDeedChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Present owner name
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="ownerName"
                                      value={deedFormData.ownerName}
                                      onChange={handleDeedChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-md-6 mb-3 ">
                              <div className="row">
                                <div className="col-4 mb-3 ">
                                  <label
                                    htmlFor="lastName"
                                    className="form-label"
                                  >
                                    Total EXTENT (UNITS)
                                  </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                  <input
                                    type="text"
                                    className="form-control" 
                                    autoComplete="off"
                                    name="extent"
                                    value={deedFormData.extent}
                                    onChange={handleDeedChange}
                                  />
                                </div>
                              </div>
                            </div> */}
                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="sro"
                                      className="form-label"
                                    >
                                      Total EXTENT (UNITS)
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      id="sro"
                                      className="form-control"
                                      autoComplete="off"
                                      name="sro"
                                      value={deedFormData.sro}
                                      onChange={handleDeedChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Property type
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="type"
                                      value={deedFormData.type}
                                      onChange={handleDeedChange}
                                    />
                                  </div>
                                </div>
                              </div>
                             
                              <div className="col-md-6 mb-3 ">
                                  <div className="row">
                                    <div className="col-4 mb-3 ">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        State
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <StateDropDown
                                        onSelect={handleStateSelect}
                                        selectedState={selectedState}
                                      />
                                    </div>
                                  </div>
                                </div>

                              {/* <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Taluk
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="taluk"
                                      value={deedFormData.taluk}
                                      onChange={handleDeedChange}
                                    />
                                  </div>
                                </div>
                              </div> */}
                              <div className="col-md-6 mb-3 ">
                                  <div className="row">
                                    <div className="col-4 mb-3 ">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        District
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                     
                                      <DistrictDropDown
                                        onSelect={handleDistrictSelect}
                                        selectedDistrict={selectedDistrict}
                                        filter={selectedState}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 mb-3 ">
                                  <div className="row">
                                    <div className="col-4 mb-3 ">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        Taluk
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                     
                                      <TalukDropDown
                                        onSelect={handleTalukSelect}
                                        selectedTaluk={selectedTaluk}
                                        filter={selectedDistrict}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 mb-3 ">
                                  <div className="row">
                                    <div className="col-4 mb-3 ">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        village
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                     
                                      <VillageDropDown
                                        onSelect={handleVillageSelect}
                                        selectedVillage={selectedVillage}
                                        filter={selectedTaluk}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 mb-3 ">
                                  <div className="row">
                                    <div className="col-4 mb-3 ">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        SRO
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <select
                                        type="text"
                                        className="form-select"
                                        name="sro"
                                        value={deedFormData.sro}
                                        onChange={handleDeedChange}
                                      >
                                        <option value="">Select SRO</option>
                                        {
                                          sroData?.map((item) => (
                                            <option key={item.id} value={item.id}>{item.sro_title} </option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  </div>
                                </div>

                              <div className="col-6 mb-3 ">
                                {error && (
                                  <div
                                    className="alert alert-danger"
                                    role="alert"
                                  >
                                    {error}
                                  </div>
                                )}
                              </div>

                              {/* <div className="text-end">
                                <button className="btn1 me-1" type="button">
                                  Clear
                                </button>
                                <button
                                  className="btn1"
                                  onClick={handleDeedSubmit}
                                  disabled={isLoading == 4}
                                >
                                  {isLoading == 4 ? (
                                    <>
                                      <Spinner animation="border" size="sm" />
                                      <span className="ms-2">
                                        Please wait...
                                      </span>
                                    </>
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                              </div> */}
                              
                              <div className="text-end">
                                  <button className="btn1 me-1" type="button"
                                    onClick={() => {
                                      setDeedFormData({
                                        document: "",
                                        registerDate: "",
                                        ownerName: "",
                                        extent: "",
                                        type: "",
                                        district: "",
                                        taluk: "",
                                        village: "",
                                        sro: ""
                                      });
                                      // setError("");
                                    }}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    className="btn1"
                                    onClick={handleDeedSubmit}
                                    disabled={isLoading == 4}
                                  >
                                   
                                    Save
                                  </button>
                                </div>
                            </div>
                          </>
                          )
                        )}
                        {step === 2 && (
                          <>
                            <div className="row mt-3">
                              {/* <DataTable
                                persistTableHead={true}
                                columns={columns1}
                                data={deedData}
                                customStyles={customStyle}
                                pagination
                                // selectableRows
                                fixedHeader
                              /> */}
                              
                              <DataTable value={deedData} stripedRows footerColumnGroup={footerGroup} tableStyle={{ minWidth: '50rem' }}>
                                <Column
                                  header="S.No"
                                  body={(rowData, options) => options.rowIndex + 1}
                                />
                                <Column field="survey_no" header="Survey No"></Column>
                                <Column field="sub_division" header="Sub Division"></Column>
                                <Column
                                  field="extent"
                                  body={(rowData) => `${rowData.extent} / ${deedData.length > 0 ? deedData[0].units : ''}`}
                                  header="Extents"
                                />
                                <Column
                                  field="units"
                                  header="Units"
                                  // body={() => (deedData.length > 0 ? deedData[0].units : '')}
                                />
                                <Column
                                  header="Action"
                                  body={(rowData) => (
                                    <button
                                      className="btn btn-outline-danger delete"
                                      data-tooltip-id="delete"
                                      onClick={() => {
                                        openModalConfirm();
                                        setDeleteId(rowData.id);
                                      }}>
                                      <DeleteIcon />
                                    </button>
                                  )}
                                />
                              </DataTable>
                            </div>

                            <div className="row mt-4">
                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Survey no
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="surveyno"
                                      value={deedTwoFormData.surveyno}
                                      onChange={handleDeedTwoChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      sub division
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="division"
                                      value={deedTwoFormData.division}
                                      onChange={handleDeedTwoChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="extent"
                                      className="form-label"
                                    >
                                      Extent
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      id="extent"
                                      className="form-control"
                                      autoComplete="off"
                                      name="extent"
                                      value={deedTwoFormData.extent}
                                      onChange={handleDeedTwoChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Units
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="units"
                                      value={deedTwoFormData.units}
                                      onChange={handleDeedTwoChange}
                                    />
                                  </div>
                                </div>
                              </div> */}
                                   <div className="col-md-6 mb-3 ">
                                <div className="row">
                                  <div className="col-4 mb-3 ">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Units
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <select
                                      name="units"
                                      id="units"
                                      onChange={handleDeedTwoChange}
                                      className="form-select"
                                      
                                    >
                                      <option value="">Select Units </option>
                                      {unitData?.map((item) => (
                                        <option key={item.id} value={item.unit}> {item.unit} </option>
                                      ))}

                                    </select>
                                  </div>
                                </div>
                              </div> 


                              <div className="col-6 mb-3 ">
                                {error && (
                                  <div
                                    className="alert alert-danger"
                                    role="alert"
                                  >
                                    {error}
                                  </div>
                                )}
                              </div>


                              <div className="col-md-6 mb-3 ">
                                <div className="text-end">
                                  <button className="btn1 me-1" type="button">
                                    Clear
                                  </button>
                                  <button
                                    className="btn1"
                                    onClick={handleDeedTwoSubmit}
                                    disabled={isLoading == 5}
                                  >
                                    {isLoading == 5 ? (
                                      <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ms-2">
                                          wait...
                                        </span>
                                      </>
                                    ) : (
                                      "Add"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {step === 3 && (
                          <>
                            <form onSubmit={formik.handleSubmit} autoComplete="off">
                              <div className='row'>
                                <div className="col-6">
                                  <label htmlFor="projectname" className="form-label">
                                    Project Name :
                                  </label>
                                  <input
                                    name="projectName"
                                    id='projectname'
                                    className="form-control"
                                    placeholder='Enter Project '
                                    value={formik.values.projectName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {/* {formik.errors.projectName && formik.touched.projectName ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.projectName}</p>
                                  ) : null} */}
                                </div>

                                <div className="col-6 ">
                                  <label htmlFor="abrovalno" className="form-label">
                                    DTCP / CMDA Approval No. :
                                  </label>
                                  <input
                                    name="approval"
                                    id='abrovalno'
                                    className="form-control"
                                    placeholder='Enter Document No'
                                    value={formik.values.approval}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.approval && formik.touched.approval ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.approval}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}
                              <div className='row mt-2'>
                                <div className="col-6">
                                  <label htmlFor="rerano" className="form-label">
                                    RERA No :
                                  </label>
                                  <input
                                    name="rera"
                                    id='rerano'
                                    placeholder='Enter RERA No'
                                    className="form-control"
                                    value={formik.values.rera}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.rera && formik.touched.rera ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.rera}</p>
                                  ) : null}

                                </div>
                                <div className="col-6">
                                  <label htmlFor="planningpermitno" className="form-label">
                                    Planing Permit No :
                                  </label>
                                  <input
                                    name="planing"
                                    placeholder='Enter Planning Permit No'
                                    className="form-control"
                                    value={formik.values.planing}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.planing && formik.touched.planing ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.planing}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}

                              <div className='row mt-2'>
                                <div className="col-6">
                                  <label htmlFor="buildingpermitno" className="form-label">
                                    Building Permit No :
                                  </label>
                                  <input
                                    name="building"
                                    placeholder='Enter Building Permit No'
                                    className="form-control"
                                    value={formik.values.building}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.building && formik.touched.building ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.building}</p>
                                  ) : null}

                                </div>
                                <div className="col-6">
                                  <label htmlFor="apartmentno" className="form-label">
                                    Apartment No :
                                  </label>
                                  <input
                                    name="apartment"
                                    placeholder='Enter Apartment No'
                                    className="form-control"
                                    value={formik.values.apartment}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.apartment && formik.touched.apartment ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.apartment}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}
                              <div className='row mt-2'>
                                <div className=" col-6">
                                  <label htmlFor="floor" className="form-label">
                                    Floor   :
                                  </label>
                                  <input
                                    name="floor"
                                    placeholder='Enter Floor'
                                    className="form-control"
                                    value={formik.values.floor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.floor && formik.touched.floor ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.floor}</p>
                                  ) : null}

                                </div>
                                <div className="col-6">
                                  <label htmlFor="carparking" className="form-label">
                                    Car Parking :
                                  </label>
                                  <select
                                    name="parking"
                                    placeholder='Enter Planning Permit No'
                                    className="form-control"
                                    value={formik.values.parking}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  >
                                    <option value=''>default</option>
                                     <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                  </select>
                                  {formik.errors.parking && formik.touched.parking ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.parking}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}
                              <div className='row mt-2'>
                                <div className="col-6">
                                  <label htmlFor="builtuparea" className="form-label">
                                    Built Up Area :
                                  </label>
                                  <input
                                    name="builtupArea"
                                    placeholder='Enter Built Up Area'
                                    className="form-control"
                                    value={formik.values.builtupArea}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.builtupArea && formik.touched.builtupArea ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.builtupArea}</p>
                                  ) : null}

                                </div>
                                <div className="col-6">
                                  <label htmlFor="commonarea" className="form-label">
                                    Common Area   :
                                  </label>
                                  <select
                                    name="commonArea"
                                    className="form-control"
                                    value={formik.values.commonArea}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  >
                                    <option value=''>default</option>
                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                  </select>
                                  {formik.errors.commonArea && formik.touched.commonArea ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.commonArea}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}
                              <div className='row mt-2'>
                                <div className="col-6">
                                  <label htmlFor="superbuiltuparea" className="form-label">
                                    Super Built up area (Saleable Area) :
                                  </label>
                                  <select
                                    name="superArea"
                                    className="form-control"
                                    value={formik.values.superArea}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  >
                                    <option value=''>default</option>
                                     <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                  </select>
                                  {formik.errors.superArea && formik.touched.superArea ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.superArea}</p>
                                  ) : null}

                                </div>
                                <div className="col-6 ">
                                  <label htmlFor="uds" className="form-label">
                                    UDS :
                                  </label>
                                  <input
                                    name="udsSize"
                                    placeholder='Enter UDS'
                                    className="form-control"
                                    value={formik.values.udsSize}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.udsSize && formik.touched.udsSize ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.udsSize}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}
                              <div className='row mt-2'>
                                <div className="col-6">
                                  <label htmlFor="bhk" className="form-label">
                                    No Of BHK:
                                  </label>
                                  <input
                                    name="bhkCount"
                                    placeholder='Enter BHK'
                                    className="form-control"
                                    value={formik.values.bhkCount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.bhkCount && formik.touched.bhkCount ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.bhkCount}</p>
                                  ) : null}

                                </div>
                                <div className="col-6">
                                  <label htmlFor="facing" className="form-label">
                                    Facing :
                                  </label>
                                  <input
                                    name="facing"
                                    placeholder='Enter Facing'
                                    className="form-control"
                                    value={formik.values.facing}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.facing && formik.touched.facing ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.facing}</p>
                                  ) : null}

                                </div>
                              </div>
                              {/*............................ */}

                              <div className="d-flex justify-content-end mt-1">
                                <button className='btn1' type='submit'> Save</button>
                              </div>
                            </form>
                          </>
                        )

                        }
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMoreApart