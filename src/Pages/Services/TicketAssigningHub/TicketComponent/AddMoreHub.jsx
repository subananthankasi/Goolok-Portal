import  { useEffect, useState } from "react";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import FileViewUtils from "../../../../Utils/FileView/FileViewUtils";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import Toast from "../../../../Utils/Toast";
import "react-datepicker/dist/react-datepicker.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TableFooter } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchUnit } from "../../../../Redux/Actions/MasterPage/UnitAction";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import Common from "../../../../common/Common";


const AddMoreHub = ({ isOpen, closeModal, id }) => {
  const [step, setStep] = useState(1);
  const staffid = JSON.parse(localStorage.getItem("token"));
  const { classification } = Common();


  const [isLoading, setIsLoading] = useState("");

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
    state: "",
    district: "",
    taluk: "",
    village: "",
    classification: "",
    type: "Rural_patta",
    ward: "",
    block: "",
    // property_type: "",
  });
  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const handleClose = () => {
    closeModal(false);
    setStep(1);
    fetchPatta();
  };


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

  // useEffect(() => {

  //     setPattaFormData({
  //         ...pattaFormData,
  //         state: selectedState ? selectedState.value : "",
  //         district: selectedDistrict ? selectedDistrict.value : "",
  //         taluk: selectedTaluk ? selectedTaluk.value : "",
  //         village: selectedVillage ? selectedVillage.value : "",
  //     });

  // }, [
  //     selectedState,
  //     selectedDistrict,
  //     selectedTaluk,
  //     selectedVillage,

  // ]);
  useEffect(() => {
    if (selectedState || selectedDistrict || selectedTaluk || selectedVillage) {
      setPattaFormData({
        ...pattaFormData,
        state: selectedState ? selectedState.value : "",
        district: selectedDistrict ? selectedDistrict.value : "",
        taluk: selectedTaluk ? selectedTaluk.value : "",
        village: selectedVillage ? selectedVillage.value : "",
      });
    }
  }, [selectedState, selectedDistrict, selectedTaluk, selectedVillage]);

  useEffect(() => {
    if (id) {
      setPattaFormData({
        ...pattaFormData,
        ...previousDataPata,
        id: id.id,
        eid: id.eid,
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
  }, [isOpen, previousDataPata]);

  const handlePattaChange = (e) => {
    const { name, value } = e.target;
    setPattaFormData({
      ...pattaFormData,
      [name]: value,
    });
  };
  // useEffect(()=>{
  //     const response =  axios.get(
  //         `${API_BASE_URL}/enquirypatta/${id.id}`
  //     );
  //     setPreviousdata(response.data);
  // },[])

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
        setPattaFormData({
          pattano: "",
          pattaname: "",
          father_name: "",
          date: "",
          state: "",
          district: "",
          taluk: "",
          village: "",
          classification: "",
          type: "Rural_patta",
          ward: "",
          block: "",
        });
        setSelectedState(null);
        setSelectedDistrict(null);
        setSelectedTaluk(null);
        setSelectedVillage(null);
      } catch (error) { }
      setTimeout(() => {
        setStep(2);
      }, 2000);
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
  const [getLoading, SetGetLoading] = useState(false);
  useEffect(() => {
    if (id && id.doc_type == "Patta Copy") {
      const fetchPatta = async () => {
        SetGetLoading(true);
        try {
          const response = await axios.get(
            `${API_BASE_URL}/enquirypatta/${id.id}`
          );

          setPreviousdata(response.data);
        } catch (error) {
          console.error(error);
          if (error.response && error.response.data.status === 404) {
            setPreviousdata("");
            setPattaFormData({
              pattano: "",
              pattaname: "",
              father_name: "",
              date: "",
              state: "",
              district: "",
              taluk: "",
              village: "",
              classification: "",
              type: "Rural_patta",
              ward: "",
              block: "",
            });
            setPreviousdata([]);
            setSelectedState(null);
            setSelectedDistrict(null);
            setSelectedTaluk(null);
            setSelectedVillage(null);
            setPattaData([]);
          } else {
            console.error("Error fetching patta:", error);
          }
        } finally {
          SetGetLoading(false);
        }
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
    oldSurvey: "",
    oldDivision: "",
    hectare: "",
  });

  useEffect(() => {
    if (id) {
      setPattaTwoFormData({
        ...pattaTwoFormData,
        id: id.id,
        enqid: id.eid,
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
    const excludedFields = ["oldSurvey", "oldDivision"];
    const emptyFields = Object.entries(pattaTwoFormData)
      .filter(
        ([key, value]) => value.trim() === "" && !excludedFields.includes(key)
      )
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
        oldDivision: "",
        oldSurvey: "",
        hectare: "",
      });
      fetchPatta();
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading("");
    } catch (error) {
      alert(error);
    }
  };

  const [pattaData, setPattaData] = useState([]);

  const fetchPatta = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirypatta/${id.id}/edit`
      );
      const data = response?.data?.map((map, index) => ({
        ...map,
        sno: index + 1,
      }));
      setPattaData(data);
    } catch (error) { }
  };

  useEffect(() => {
    if (id.doc_type === "Patta Copy") {
      fetchPatta();
    }
  }, [id]);
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
    if (id.doc_type == "Patta Copy") {
      apiname = "enquirypatta";
    } else if (id.doc_type == "Title document") {
      apiname = "enquirydeed";
    }
    try {
      await axios.delete(`${API_BASE_URL}/${apiname}/${deleteId}`);
      Toast({ message: "Successfully Deleted", type: "success" });
      fetchPatta();
      fetchDeed();
    } catch (error) {
      Toast({ message: "Failed to error", type: "error" });
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // ================================
  // -------- Aadhar ----------------
  // ================================
  const [aadharExistingData, setAadharExistingData] = useState();
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
  // -------- Title document ----------------
  // ================================
  const [deedExistingData, setDeedExistingData] = useState();
  const [deedFormData, setDeedFormData] = useState({
    pid: null,
    docid: id.id,
    document: "",
    registerDate: "",
    ownerName: "",
    // extent: "",
    type: "",
    state: "",
    district: "",
    taluk: "",
    village: "",
    sro: "",
    // surveyNo: "",
    // subDivision: "",
  });

  const stateDeedDropDown = useStateOptions();
  const districtDeedDropDown = useDistrictOptions();
  const talukDeedDropDown = useTalukOptions();
  const villageDeedDropDown = useVillageOptions();

  const [selectedDeedState, setSelectedDeedState] = useState(null);
  const [selectedDeedDistrict, setSelectedDeedDistrict] = useState(null);
  const [selectedDeedTaluk, setSelectedDeedTaluk] = useState(null);
  const [selectedDeedVillage, setSelectedDeedVillage] = useState(null);

  const handleDeedStateSelect = (state) => {
    setSelectedDeedState(state);
    setSelectedDeedDistrict(null);
    setSelectedDeedTaluk(null);
    setSelectedDeedVillage(null);
  };

  const handleDeedDistrictSelect = (district) => {
    setSelectedDeedDistrict(district);
    setSelectedDeedTaluk(null);
    setSelectedDeedVillage(null);
  };

  const handleDeedTalukSelect = (taluk) => {
    setSelectedDeedTaluk(taluk);
    setSelectedDeedVillage(null);
  };

  const handleDeedVillageSelect = (village) => {
    setSelectedDeedVillage(village);
  };

  useEffect(() => {
    setDeedFormData({
      ...deedFormData,
      state: selectedDeedState ? selectedDeedState.value : "",
      district: selectedDeedDistrict ? selectedDeedDistrict.value : "",
      taluk: selectedDeedTaluk ? selectedDeedTaluk.value : "",
      village: selectedDeedVillage ? selectedDeedVillage.value : "",
    });
  }, [
    selectedDeedState,
    selectedDeedDistrict,
    selectedDeedTaluk,
    selectedDeedVillage,
  ]);

  const [sroData, setSroData] = useState([]);

  const fetchSro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/srodetails`);
      setSroData(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSro();
  }, []);

  useEffect(() => {
    if (id) {
      setDeedFormData({
        ...deedFormData,
        ...deedExistingData,
        docid: id.id,
        eid: id.eid,
      });
    }
  }, [id, deedExistingData]);

  useEffect(() => {
    if (deedExistingData) {
      // const defaultOptionState = stateDeedDropDown.find(
      //   (option) => option.value === deedExistingData.state || " "

      // );
      const defaultOptionDeedState = stateDeedDropDown.find(
        (option) => option.value === String(deedExistingData.state)
      ) || { value: "", label: "Select State" };

      setSelectedDeedState(defaultOptionDeedState);

      const defaultOptionDeedDistrict = districtDeedDropDown.find(
        (option) => option.value === deedExistingData?.district || ""
      );
      setSelectedDeedDistrict(defaultOptionDeedDistrict);

      const defaultOptionTaluk = talukDeedDropDown.find(
        (option) => option.value === deedExistingData?.taluk || ""
      );
      setSelectedDeedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDeedDropDown.find(
        (option) => option.value === deedExistingData?.village || ""
      );
      setSelectedDeedVillage(defaultOptionVillage);
    }
  }, [deedExistingData]);

  const handleDeedChange = (e) => {
    const { name, value } = e.target;
    setDeedFormData({
      ...deedFormData,
      [name]: value,
    });
  };

  const handleDeedSubmit = async (e) => {
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
        setStep(2);
      }, 1000);
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

  // -------- Title document 2 ----------------

  const dispatch = useDispatch();
  const [deedTwoFormData, setDeedTwoFormData] = useState({
    docid: "",
    surveyno: "",
    units: "",
    division: "",
    extent: "",
  });

  // const extentTotal = () => {
  //   let total = 0;

  //   for (let count of deedData) {
  //     total += Number(count.extent);
  //   }

  //   return deedData.units ? total / deedData.units : total;
  // };

  const extentTotal = () => {
    let total = 0;

    for (let count of deedData) {
      total += Number(count.extent);
    }

    return `${total} / ${deedData?.[0]?.units || ""}`;
  };

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Total Extent:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
          className="p-3"
        />
        <Column footer={extentTotal} />
        <Column colSpan={2} />
      </Row>
    </ColumnGroup>
  );

  const unitData = useSelector((state) => state.Unit.Unit);

  useEffect(() => {
    dispatch(fetchUnit());
  }, []);

  useEffect(() => {
    if (id) {
      setDeedTwoFormData({
        ...deedTwoFormData,
        docid: id.id,
        eid: id.eid,
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
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const handleDeedTwoSubmit = async (e) => {
    e.preventDefault();

    const noError = ["units"];

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
      await axios.put(
        `${API_BASE_URL}/enquirydeed/${deedTwoFormData.docid}`,
        deedTwoFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDeedTwoFormData({
        ...deedTwoFormData,
        surveyno: "",
        units: "",
        division: "",
        extent: "",
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
        sno: index + 1,
      }));
      getDeedData(data);
    } catch (error) { }
  };

  const handlePattaTypeChange = (e) => {
    const selectedType = e.target.value;
    setPattaFormData((prevData) => ({
      ...prevData,
      type: selectedType,
    }));
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
        style={{ zIndex: 400 }}
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
                        // onClick={() => {
                        //   if (!previousDataPata) {
                        //     Toast({ message: "Please fill in the details and proceed to Next!", type: "error" });
                        //     return;
                        //   }
                        //   setStep(2);
                        //   setError("");
                        // }}
                        >
                          {id.doc_type} Details 2
                        </a>
                      </nav>
                    )}
                    <hr className="m-0" />

                    {/* patta  */}

                    {id?.doc_type == "Patta Copy" && (
                      <>
                        {step === 1 &&
                          (getLoading ? (
                            <div
                              className="d-flex justify-content-center "
                              style={{
                                position: "fixed",
                                width: "50%",
                                height: "85%",
                                color: "white",
                                backgroundColor: "white",
                                opacity: 0.5,
                                zIndex: 9999,
                                alignItems: "center",
                              }}
                            >
                              <div>
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
                              <div className="row mt-4">
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
                                        <option value="Rural_patta">
                                          {" "}
                                          Rural Patta
                                        </option>
                                        <option value="Natham_patta">
                                          {" "}
                                          Natham Patta{" "}
                                        </option>
                                        <option value="Town_patta">
                                          Town Patta
                                        </option>
                                      </select>
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
                                        name="pattano"
                                        value={pattaFormData.pattano}
                                        onChange={(e) => {
                                          const onlyNumbers =
                                            e.target.value.replace(/\D/g, "");
                                          handlePattaChange({
                                            target: {
                                              name: "pattano",
                                              value: onlyNumbers,
                                            },
                                          });
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
                                        Patta name
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="pattaname"
                                        value={pattaFormData.pattaname}
                                        onChange={(e) => {
                                          const onlyText =
                                            e.target.value.replace(
                                              /[^A-Za-z\s]/g,
                                              ""
                                            );
                                          handlePattaChange({
                                            target: {
                                              name: "pattaname",
                                              value: onlyText,
                                            },
                                          });
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
                                        Father Name / Care of
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="father_name"
                                        value={pattaFormData.father_name}
                                        onChange={(e) => {
                                          const onlyText =
                                            e.target.value.replace(
                                              /[^A-Za-z\s]/g,
                                              ""
                                            );
                                          handlePattaChange({
                                            target: {
                                              name: "father_name",
                                              value: onlyText,
                                            },
                                          });
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
                                        Patta date
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <DatePicker
                                        placement="topRight"
                                        name="date"
                                        value={
                                          pattaFormData.date
                                            ? dayjs(
                                              pattaFormData.date,
                                              "YYYY-MM-DD"
                                            )
                                            : null
                                        }
                                        onChange={(data) =>
                                          handlePattaChange({
                                            target: {
                                              name: "date",
                                              value: data
                                                ? data?.format("YYYY-MM-DD")
                                                : "",
                                            },
                                          })
                                        }
                                        format="DD/MM/YYYY"
                                        style={{ width: "100%" }}
                                        disabledDate={(current) =>
                                          current && current > dayjs()
                                        }
                                      />
                                      {/* <DatePicker
                                        selected={
                                          pattaFormData.date
                                            ? new Date(pattaFormData.date)
                                            : null
                                        }
                                        onChange={(date) =>
                                          handlePattaChange({
                                            target: {
                                              name: "date",
                                              value: date
                                                ? date
                                                    .toISOString()
                                                    .split("T")[0]
                                                : "",
                                            },
                                          })
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control w-100"
                                        style={{ width: "100%" }}
                                      /> */}
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
                                        {pattaFormData.type === "Town_patta"
                                          ? "Town"
                                          : "Revenue village "}
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
                                      <Select
                                        placeholder="Select Classification"
                                        style={{ width: "100%" }}
                                        options={classification}
                                        value={pattaFormData.classification}
                                        onChange={(value) => {
                                          handlePattaChange({
                                            target: {
                                              name: "classification",
                                              value: value,
                                            },
                                          });
                                        }}
                                      />

                                      {/* <input
                                        type="text"
                                        className="form-control"
                                        name="classification"
                                        value={pattaFormData.classification}
                                        onChange={(e) => {
                                          const onlyText =
                                            e.target.value.replace(
                                              /[^A-Za-z\s]/g,
                                              ""
                                            );
                                          handlePattaChange({
                                            target: {
                                              name: "classification",
                                              value: onlyText,
                                            },
                                          });
                                        }}
                                      /> */}
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
                                  {staffid.Login === "staff" &&
                                    (id.status === "pending" ||
                                      id.status === "verify") && enquiryDoumentData?.status !== "live" && (
                                      <>
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
                                      </>
                                    )}
                                </div>
                              </div>
                            </>
                          ))}
                        {step === 2 && (
                          <>
                            <div className="row mt-3">
                              <div className="">
                                <TableContainer component={Paper}>
                                  <Table
                                    sx={{ minWidth: 700 }}
                                    aria-label="customized table"
                                  >
                                    <TableHead
                                      style={{
                                        backgroundColor: "rgb(47, 79, 79)",
                                      }}
                                    >
                                      <TableRow>
                                        <TableCell style={{ color: "white" }}>
                                          S.No
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          style={{ color: "white" }}
                                        >
                                          Survey No
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          style={{ color: "white" }}
                                        >
                                          Sub Division
                                        </TableCell>
                                        {pattaFormData.type ===
                                          "Town_patta" && (
                                            <>
                                              <TableCell
                                                align="right"
                                                style={{ color: "white" }}
                                              >
                                                {" "}
                                                Old Survey No
                                              </TableCell>
                                              <TableCell
                                                align="right"
                                                style={{ color: "white" }}
                                              >
                                                {" "}
                                                Old Sub Division
                                              </TableCell>
                                            </>
                                          )}
                                        <TableCell
                                          align="right"
                                          style={{ color: "white" }}
                                        >
                                          Hectare-Are
                                        </TableCell>
                                        {staffid.Login === "staff" &&
                                          (id.status === "pending" ||
                                            id.status === "verify") && (
                                            <TableCell
                                              align="right"
                                              style={{ color: "white" }}
                                            >
                                              Action
                                            </TableCell>
                                          )}
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {pattaData.map((item, index) => (
                                        <StyledTableRow key={index}>
                                          <TableCell component="th" scope="row">
                                            {index + 1}
                                          </TableCell>
                                          <TableCell align="right">
                                            {item.survey_no}
                                          </TableCell>
                                          <TableCell align="right">
                                            {item.sub_division}
                                          </TableCell>
                                          {pattaFormData.type ===
                                            "Town_patta" && (
                                              <>
                                                <TableCell align="right">
                                                  {" "}
                                                  {item.old_survey_no}{" "}
                                                </TableCell>
                                                <TableCell align="right">
                                                  {item.old_sub_division}{" "}
                                                </TableCell>
                                              </>
                                            )}
                                          <TableCell align="right">
                                            {item.hectare}
                                          </TableCell>
                                          {staffid.Login === "staff" &&
                                            (id.status === "pending" ||
                                              id.status === "verify") && (
                                              <TableCell align="right">
                                                <button
                                                  className="btn btn-outline-danger delete"
                                                  data-tooltip-id="delete"
                                                  onClick={() => {
                                                    openModalConfirm();
                                                    setDeleteId(item.id);
                                                  }}
                                                >
                                                  <DeleteIcon />
                                                </button>
                                              </TableCell>
                                            )}
                                        </StyledTableRow>
                                      ))}
                                    </TableBody>
                                    <TableFooter>
                                      {pattaFormData.type === "Town_patta" ? (
                                        <TableCell
                                          align="right"
                                          colSpan={"5"}
                                          style={{ fontSize: "14px" }}
                                        >
                                          {" "}
                                        </TableCell>
                                      ) : (
                                        <TableCell
                                          align="right"
                                          colSpan={"3"}
                                          style={{ fontSize: "14px" }}
                                        >
                                          {" "}
                                        </TableCell>
                                      )}
                                      <TableCell
                                        colSpan={"2"}
                                        className="text-center"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Sub Total :{" "}
                                        {pattaData?.reduce(
                                          (total, item) =>
                                            total + Number(item.hectare || 0),
                                          0
                                        )}
                                      </TableCell>
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
                                      onChange={(e) => {
                                        const onlyNumbers =
                                          e.target.value.replace(/\D/g, "");
                                        handlePattaTwoChange({
                                          target: {
                                            name: "surveyno",
                                            value: onlyNumbers,
                                          },
                                        });
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
                                            const onlyNumbers =
                                              e.target.value.replace(/\D/g, "");
                                            handlePattaTwoChange({
                                              target: {
                                                name: "oldSurvey",
                                                value: onlyNumbers,
                                              },
                                            });
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
                                      // onChange={(e) => {
                                      //   const onlyNumbers = e.target.value.replace(/[^0-9.]/g, "");
                                      //   const sanitizedValue = onlyNumbers.replace(/(\..*)\./g, "$1");
                                      //   handlePattaTwoChange({ target: { name: "hectare", value: sanitizedValue } });
                                      // }}
                                      onChange={(e) => {
                                        const onlyAllowedChars =
                                          e.target.value.replace(
                                            /[^0-9./,]/g,
                                            ""
                                          );
                                        handlePattaTwoChange({
                                          target: {
                                            name: "hectare",
                                            value: onlyAllowedChars,
                                          },
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb-3 ">
                                <div className="">
                                  {staffid.Login === "staff" &&
                                    (id.status === "pending" ||
                                      id.status === "verify") && enquiryDoumentData?.status !== "live" && (
                                      <>
                                        <button
                                          className="btn1 me-1"
                                          type="button"
                                          onClick={() => {
                                            setPattaTwoFormData({
                                              ...pattaTwoFormData,
                                              surveyno: "",
                                              sub_division: "",
                                              hectare: "",
                                              units: "",
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
                                              <Spinner
                                                animation="border"
                                                size="sm"
                                              />
                                              <span className="ms-2">
                                                Please wait...
                                              </span>
                                            </>
                                          ) : (
                                            "Add"
                                          )}
                                        </button>
                                      </>
                                    )}
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
                        <div className="row mt-4">
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
                                  // onChange={handleAadharChange}
                                  onChange={(e) => {
                                    let value = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    value = value.slice(0, 12);
                                    value = value.replace(
                                      /(\d{4})(\d{0,4})?(\d{0,4})?/,
                                      (_, p1, p2, p3) =>
                                        [p1, p2, p3].filter(Boolean).join(" ")
                                    );
                                    handleAadharChange({
                                      target: { name: "aadhar_number", value },
                                    });
                                  }}
                                  maxLength="14"
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
                                <textarea
                                  type="text"
                                  className="form-control"
                                  autoComplete="off"
                                  name="address"
                                  value={aadharFormData.address}
                                  onChange={handleAadharChange}
                                  style={{ height: "100px" }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-6 mb-3 ">
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                {error}
                              </div>
                            )}
                          </div>
                          {staffid.Login === "staff" &&
                            (id.status === "pending" ||
                              id.status === "verify") && (
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
                            )}
                        </div>
                      </>
                    )}

                    {/* Title document  */}
                    {id?.doc_type == "Title document" && (
                      <>
                        {step === 1 &&
                          (isLoading == 4 ? (
                            <div
                              className="d-flex justify-content-center "
                              style={{
                                position: "fixed",
                                width: "50%",
                                height: "85%",
                                color: "white",
                                backgroundColor: "white",
                                opacity: 0.5,
                                zIndex: 9999,
                                alignItems: "center",
                              }}
                            >
                              <div>
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
                              <div className="row mt-4">
                                <div className="col-md-6 mb-3 ">
                                  <div className="row">
                                    <div className="col-4 mb-3 ">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        Title document no
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
                                      {/* <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                          name="registerDate"
                                          value={deedFormData.registerDate}
                                          onChange={handleDeedChange}
                                        /> */}
                                      <DatePicker
                                        placement="topRight"
                                        name="registerDate"
                                        value={
                                          deedFormData.registerDate
                                            ? dayjs(
                                              deedFormData.registerDate,
                                              "YYYY-MM-DD"
                                            )
                                            : null
                                        }
                                        onChange={(date) =>
                                          handleDeedChange({
                                            target: {
                                              name: "registerDate",
                                              value: date
                                                ? date?.format("YYYY-MM-DD")
                                                : "",
                                            },
                                          })
                                        }
                                        format="DD/MM/YYYY"
                                        style={{ width: "100%" }}
                                        disabled={(current) =>
                                          current && current > dayjs()
                                        }
                                      />
                                      {/* <DatePicker
                                        selected={
                                          deedFormData.registerDate
                                            ? new Date(
                                                deedFormData.registerDate
                                              )
                                            : null
                                        }
                                        onChange={(registerDate) =>
                                          handleDeedChange({
                                            target: {
                                              name: "registerDate",
                                              value: registerDate
                                                ? registerDate
                                                    .toISOString()
                                                    .split("T")[0]
                                                : "",
                                            },
                                          })
                                        }
                                        maxDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control w-100"
                                        style={{ width: "100%" }}
                                      /> */}
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
                                        // onChange={handleDeedChange}
                                        onChange={(e) => {
                                          const onlyText =
                                            e.target.value.replace(
                                              /[^A-Za-z\s]/g,
                                              ""
                                            );
                                          handleDeedChange({
                                            target: {
                                              name: "ownerName",
                                              value: onlyText,
                                            },
                                          });
                                        }}
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
                                        // onChange={handleDeedChange}
                                        onChange={(e) => {
                                          const onlyText =
                                            e.target.value.replace(
                                              /[^A-Za-z\s]/g,
                                              ""
                                            );
                                          handleDeedChange({
                                            target: {
                                              name: "type",
                                              value: onlyText,
                                            },
                                          });
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
                                        State
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <StateDropDown
                                        onSelect={handleDeedStateSelect}
                                        selectedState={selectedDeedState}
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
                                      {/* <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                          name="district"
                                          value={deedFormData.district}
                                          onChange={(e) => {
                                            const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                            handleDeedChange({ target: { name: "district", value: onlyText } });
                                          }}
                                        /> */}
                                      <DistrictDropDown
                                        onSelect={handleDeedDistrictSelect}
                                        selectedDistrict={selectedDeedDistrict}
                                        filter={selectedDeedState}
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
                                      {/* <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                          name="taluk"
                                          value={deedFormData.taluk}
                                          onChange={(e) => {
                                            const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                            handleDeedChange({ target: { name: "taluk", value: onlyText } });
                                          }}
                                        /> */}
                                      <TalukDropDown
                                        onSelect={handleDeedTalukSelect}
                                        selectedTaluk={selectedDeedTaluk}
                                        filter={selectedDeedDistrict}
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
                                      {/* <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                          name="village"
                                          value={deedFormData.village}
                                          onChange={(e) => {
                                            const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                            handleDeedChange({ target: { name: "village", value: onlyText } });
                                          }}
                                        /> */}
                                      <VillageDropDown
                                        onSelect={handleDeedVillageSelect}
                                        selectedVillage={selectedDeedVillage}
                                        filter={selectedDeedTaluk}
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
                                        {sroData?.map((item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.sro_title}{" "}
                                          </option>
                                        ))}
                                      </select>
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
                                        Sub division
                                      </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                      <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="subDivision"
                                        value={deedFormData.subDivision}
                                        onChange={handleDeedChange}
                                      />
                                    </div>
                                  </div>
                                </div> */}

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
                                {staffid.Login === "staff" &&
                                  (id.status === "pending" ||
                                    id.status === "verify") && (
                                    <div className="text-end">
                                      <button
                                        className="btn1 me-1"
                                        type="button"
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
                                            sro: "",
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
                                        {/* {isLoading == 4 ? (
                                      <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ms-2">
                                          Please wait...
                                        </span>
                                      </>
                                    ) : (
                                      "Save"
                                    )} */}
                                        Save
                                      </button>
                                    </div>
                                  )}
                              </div>
                            </>
                          ))}
                        {step === 2 && (
                          <>
                            <div className="row mt-3">
                              {/* <DataTable
                                  persistTableHead={true}
                                  columns={columns1}
                                  data={deedData}
                                  customStyles={customStyle}
                                  pagination
                                  fixedHeader
                                /> */}
                              <DataTable
                                value={deedData}
                                stripedRows
                                footerColumnGroup={footerGroup}
                                tableStyle={{ minWidth: "50rem" }}
                              >
                                <Column
                                  header="S.No"
                                  body={(rowData, options) =>
                                    options.rowIndex + 1
                                  }
                                />
                                <Column
                                  field="survey_no"
                                  header="Survey No"
                                  className="p-2"
                                ></Column>
                                <Column
                                  field="sub_division"
                                  header="Sub Division"
                                ></Column>
                                <Column field="extent" header="Extent"></Column>
                                <Column field="units" header="Units"></Column>
                                {staffid.Login === "staff" &&
                                  (id.status === "pending" ||
                                    id.status === "verify") && (
                                    <Column
                                      header="Action"
                                      body={(rowData) => (
                                        <button
                                          className="btn btn-outline-danger delete"
                                          data-tooltip-id="delete"
                                          onClick={() => {
                                            openModalConfirm();
                                            setDeleteId(rowData.id);
                                          }}
                                        >
                                          <DeleteIcon />
                                        </button>
                                      )}
                                    />
                                  )}
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
                                      // onChange={handleDeedTwoChange}
                                      onChange={(e) => {
                                        const onlyNumbers =
                                          e.target.value.replace(/\D/g, "");
                                        handleDeedTwoChange({
                                          target: {
                                            name: "surveyno",
                                            value: onlyNumbers,
                                          },
                                        });
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
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Extent
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      name="extent"
                                      value={deedTwoFormData.extent}
                                      // onChange={handleDeedTwoChange}
                                      onChange={(e) => {
                                        const onlyNumbers =
                                          e.target.value.replace(/\D/g, "");
                                        handleDeedTwoChange({
                                          target: {
                                            name: "extent",
                                            value: onlyNumbers,
                                          },
                                        });
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
                                      Units
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3 ">
                                    <select
                                      name="units"
                                      id="units"
                                      onChange={handleDeedTwoChange}
                                      className="form-select"
                                      value={deedTwoFormData.units}
                                    // disabled={deedData.length > 0 && deedData[0].units}
                                    >
                                      <option value="">Select Units </option>
                                      {unitData?.map((item) => (
                                        <option key={item.id} value={item.unit}>
                                          {" "}
                                          {item.unit}{" "}
                                        </option>
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
                                {staffid.Login === "staff" &&
                                  (id.status === "pending" ||
                                    id.status === "verify") && (
                                    <div className="text-end">
                                      <button
                                        className="btn1 me-1"
                                        type="button"
                                      >
                                        Clear
                                      </button>
                                      <button
                                        className="btn1"
                                        onClick={handleDeedTwoSubmit}
                                        disabled={isLoading == 5}
                                      >
                                        {isLoading == 5 ? (
                                          <>
                                            <Spinner
                                              animation="border"
                                              size="sm"
                                            />
                                            <span className="ms-2">
                                              wait...
                                            </span>
                                          </>
                                        ) : (
                                          "Add"
                                        )}
                                      </button>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </>
                        )}
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
  );
};

export default AddMoreHub;
