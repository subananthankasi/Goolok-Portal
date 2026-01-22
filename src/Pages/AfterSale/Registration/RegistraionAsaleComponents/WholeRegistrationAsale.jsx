import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubPropertyType } from "../../../../Redux/Actions/MasterPage/SubPropertyAction";
import { fetchPropertyType } from "../../../../Redux/Actions/MasterPage/PropertyTypeAction";
import { fetchSRODetails } from "../../../../Redux/Actions/MasterPage/SRODetailsAction";
import { fetchState } from "../../../../Redux/Actions/MasterPage/StateAction";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
import customStyle from "../../../../Utils/tableStyle";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import SendIcon from "@mui/icons-material/Send";
import AlertPop from "../../../../Utils/AlertPop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TableChartIcon from "@mui/icons-material/TableChart";
import { IMG_PATH } from "../../../../Api/api";
import { set } from "rsuite/esm/utils/dateUtils";
import { ThreeCircles } from "react-loader-spinner";
import GeneralState from "../../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralSroDropdown from "../../../../Utils/Dropdown/GeneralSroDropdown";




const getFileIcon = (filename) => {
  if (!filename) return <InsertDriveFileIcon sx={{ fontSize: 32 }} />;

  const extension = filename.split(".").pop().toLowerCase();

  switch (extension) {
    case "pdf":
      return <PictureAsPdfIcon sx={{ color: "#d32f2f", fontSize: 30 }} />;
    case "xls":
    case "xlsx":
    case "csv":
      return <TableChartIcon sx={{ color: "#2e7d32", fontSize: 30 }} />;
    case "doc":
    case "docx":
      return <DescriptionIcon sx={{ color: "#1565c0", fontSize: 30 }} />;
    default:
      return <InsertDriveFileIcon sx={{ fontSize: 32 }} />;
  }
};

const tableStyle = {
  width: "70%",
  margin: "20px auto",
  border: "1px solid #000",
};

const headerStyle = {
  backgroundColor: "yellow",
  fontWeight: "bold",
  textAlign: "center",
};

const highlightStyle = {
  backgroundColor: "#9ccddc",
  fontWeight: "bold",
};

const cellStyle = {
  border: "1px solid #000",
  padding: "8px",
};
const WholeRegistrationAsale = ({
  eid,
  id,
  status,
  bookingno,
  bookingid,
  pagetype,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [registerData, setRegisterData] = useState([]);
  const [statusVisible, setStatusVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const property = useSelector((state) => state.PropertyType.PropertyTypeData);
  const subproperty = useSelector(
    (state) => state.SubPropertyType.SubPropertyTypeData
  );
  const SRODetailsData = useSelector(
    (state) => state.SRODetails.SRODetailsData
  );
  const StateNameData = useSelector((state) => state.State.StateNameData);
  const districtData = useSelector((state) => state.District.districtData);
  const TalukData = useSelector((state) => state.Taluk.TalukData);
  const VillageData = useSelector((state) => state.Village.villageData);

  useEffect(() => {
    dispatch(fetchSubPropertyType());
    dispatch(fetchPropertyType());
    dispatch(fetchSRODetails());
    dispatch(fetchState());
    dispatch(fetchDistrict());
    dispatch(fetchTaluk());
    dispatch(fetchVillage());
  }, [dispatch]);

  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setdeleteId(row.id);
  };
  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/confirmation/${deleteId}`
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetch();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("state", row.state);
    formik.setFieldValue("district", row.district);
    formik.setFieldValue("taluk", row.taluk);
    formik.setFieldValue("village", row.village);
    formik.setFieldValue("sro", row.sro_details);
    formik.setFieldValue("property_type", row.property_type);
    formik.setFieldValue("extent_unit", row.extent_units);
    formik.setFieldValue("registration_date", row.reg_date);
    formik.setFieldValue("registration_time", row.reg_time);
    formik.setFieldValue("ownername", row.landowner_name);
    formik.setFieldValue("ownerno", row.landowner_contact);
    formik.setFieldValue("purchaser_name", row.purchaser_name);
    formik.setFieldValue("purchaser_no", row.purchaser_contact);
    formik.setFieldValue("staff_name", row.staff_name);
    formik.setFieldValue("staff_no", row.staff_contact);
    formik.setFieldValue("id", row.id);
  };
  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Registration ID",
      selector: (row) => row.reg_id,
      sortable: true,
      width: "170px",
    },
    {
      name: "State",
      selector: (row) => row.stateName,
      sortable: true,
      width: "170px",
    },
    {
      name: "District",
      selector: (row) => row.districtName,
      sortable: true,
      width: "170px",
    },
    {
      name: "Taluk",
      selector: (row) => row.talukName,
      sortable: true,
      width: "170px",
    },
    {
      name: "Village",
      selector: (row) => row.villageName,
      sortable: true,
      width: "170px",
    },
    {
      name: "Property type",
      selector: (row) => row.property_type,
      sortable: true,
      width: "180px",
    },
    {
      name: "Extent in units",
      selector: (row) => row.extent_units,
      sortable: true,
      width: "180px",
    },
    {
      name: "Registration Date",
      selector: (row) => row.reg_date,
      sortable: true,
      width: "170px",
    },
    {
      name: "Registration Time",
      selector: (row) => row.reg_time,
      sortable: true,
      width: "170px",
    },
    {
      name: "Sro Details",
      selector: (row) => row.sro_title,
      sortable: true,
      width: "170px",
    },
    {
      name: "LandOwner Name",
      selector: (row) => row.landowner_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "LandOwner No",
      selector: (row) => row.landowner_contact,
      sortable: true,
      width: "180px",
    },
    {
      name: "Purchaser Name",
      selector: (row) => row.purchaser_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Purchaser No",
      selector: (row) => row.purchaser_contact,
      sortable: true,
      width: "180px",
    },
    {
      name: "Staff Name",
      selector: (row) => row.staff_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Staff No",
      selector: (row) => row.staff_contact,
      sortable: true,
      width: "180px",
    },

    {
      name: "Document Status",
      selector: (row) => row.doc_status,
      sortable: true,
      width: "180px",
    },
    {
      name: "Registration File",
      cell: (row) =>
        row.doc_status === "Not Collect" || !row.doc_upload_path ? (
          "-"
        ) : (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm btn-link ms-1 p-0"
              onClick={() =>
                window.open(
                  `${IMG_PATH}/regdocument/${row.doc_upload_path}`,
                  "_blank"
                )
              }
              title="View EC Document"
            >
              {getFileIcon(row.doc_upload_path)}
            </button>
          </div>
        ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Collected Reg date",
      selector: (row) =>
        row.doc_status === "Collect" || !row.reg_collect_date
          ? "-"
          : row.reg_collect_date,
      sortable: true,
      width: "180px",
    },
    {
      name: "Registration Status",
      width: "180px",
      omit: pagetype === "reminder",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          {status === "complete" ? (
            <span>{row.reg_status}</span>
          ) : (
            <button
              className="btn1"
              data-tooltip-id="edit"
              onClick={() => setStatusVisible(true)}
            >
              {row.reg_status === null || row.reg_status === ""
                ? "Status"
                : row.reg_status}
            </button>
          )}
        </div>
      ),
      sortable: true,
    },
  ];
  const [postLoading, setPostLoading] = useState(false)

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      rowid: id,
      bid: bookingid,
    };
    setPostLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/registration`,
        payload
      );
      fetch();
      if (editing) {
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
      } else {
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
      }
      formik.resetForm();
      setPostLoading(false)
    } catch (error) {
      Toast({ message: "Failed to save", type: "error" });
      setPostLoading(false)
    }
  };
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/registration/${bookingid}`
      );
      const dataAsArray = Array(response.data);

      setRegisterData(dataAsArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

  };
  useEffect(() => {
    fetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      registration_id: bookingno,
      state: "",
      district: "",
      taluk: "",
      village: "",
      sro: "",
      property_type: "",
      extent_unit: "",
      registration_date: "",
      registration_time: "",
      ownername: "",
      ownerno: "",
      purchaser_name: "",
      purchaser_no: "",
      staff_name: "",
      staff_no: "",
    },
    validationSchema: yup.object().shape({
      state: yup.string().required("state is required !!"),
      district: yup.string().required("district is required !!"),
      taluk: yup.string().required("taluk is required !!"),
      village: yup.string().required("village is required !!"),
      sro: yup.string().required("sro is required !!"),
      property_type: yup.string().required("property type is required !!"),
      extent_unit: yup.string().required("extent in unit is required !!"),
      registration_date: yup
        .string()
        .required("registration date is required !!"),
      registration_time: yup
        .string()
        .required("registration time is required !!"),
      ownername: yup.string().required("land owner name is required !!"),
      ownerno: yup
        .string()
        .required("Land owner number is required!")
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number!"),

      purchaser_name: yup.string().required("purchaser name is required !!"),
      purchaser_no: yup
        .string()
        .required("Land owner number is required!")
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number!"),
      staff_name: yup.string().required("staff name is required !!"),
      staff_no: yup
        .string()
        .required("Land owner number is required!")
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number!"),
    }),
    onSubmit,
  });
  const [visibleLoading, setVisibleLoading] = useState(false)
  const statusSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      rowid: id,
      bid: bookingid,
      id: registerData[0]?.[0]?.id,
    };
    setVisibleLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/regstatus`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (values.registration_status === "Completed") {
        fetch();
        Toast({ message: "Successfully Updated", type: "success" });
        setNewDialog(false);
        setStatusVisible(false);
        formik1.resetForm();
        // navigate("/registeration#Complete");
      } else {
        setStatusVisible(false);
        formik1.resetForm();
        navigate("/registeration_ticket#postpond");
      }
      setVisibleLoading(false)
    } catch (error) {
      Toast({ message: "Failed to save", type: "error" });
      setVisibleLoading(false)
    }
  };

  const formik1 = useFormik({
    initialValues: {
      registration_status: "",
      registration_type: "",
      file: "",
      date: "",
    },
    validationSchema: yup.object({
      registration_status: yup
        .string()
        .required("Registration status is required !!"),

      registration_type: yup.string().when("registration_status", {
        is: "Completed",
        then: () =>
          yup.string().required("Registration document type is required !!"),
        otherwise: () => yup.string().notRequired(),
      }),

      file: yup.mixed().when(["registration_status", "registration_type"], {
        is: (status, type) => status === "Completed" && type === "Collect",
        then: () => yup.mixed().required("Registration file is required !!"),
        otherwise: () => yup.mixed().notRequired(),
      }),

      date: yup
        .date()
        .nullable()
        .when(["registration_status", "registration_type"], {
          is: (status, type) =>
            status === "Completed" && type === "Not Collect",
          then: () =>
            yup
              .date()
              .required("Registration date is required !!")
              .typeError("Invalid date"),
          otherwise: () => yup.date().nullable(),
        }),
    }),
    onSubmit: statusSubmit,
  });
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/completereg`,
        { enqid: eid, id: id, bid: bookingid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/registeration#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setConfirmLoading(false)
    }
  };

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  const [verifyConfirm, setIsVerifyConfirm] = useState(false);

  return (
    <>
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6> Registration </h6>
            </div>
            <hr />

            {loading ? (
              <div className="d-flex justify-content-center mt-5">
                <ThreeCircles
                  visible={true}
                  height="50"
                  width="50"
                  color="#2f4f4f"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) :
              registerData[0]?.length === 0 ? (
                <div className="d-flex justify-content-center">
                  {staffid.logintype == "staff" &&
                    (status === "complete" || status === "pending") &&
                    pagetype !== "reminder" && (
                      <div className="">
                        <button
                          onClick={() => setNewDialog(true)}
                          className="btn1 me-2"
                        >
                          + Create
                        </button>
                      </div>
                    )}
                </div>
              )
                : (
                  <>
                    <DataTable
                      persistTableHead={true}
                      columns={column1}
                      data={registerData[0]}
                      customStyles={customStyle}
                      fixedHeader
                    />
                  </>
                )}
            {registerData[0]?.length > 0 &&
              staffid.logintype === "staff" &&
              status === "pending" &&
              pagetype !== "reminder" && (
                <div className="mt-3 ms-2 mx-4 mb-3 text-end">
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => setIsVerifyConfirm(true)}
                    disabled={confirmLoading}
                  >
                    {confirmLoading ? "Processing..." : "Confirm"}
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "72rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Registration "
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-4">
              <div className="form-group mt-1">
                <label className="form-label">
                  State :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                {/* <select
                  type="text"
                  className="form-select"
                  name="state"
                  id="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                >
                  <option value="">Select State</option>
                  {StateNameData &&
                    StateNameData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.state_name}
                      </option>
                    ))}
                </select> */}
                <GeneralState
                  value={formik.values.state}
                  onChange={(value) => {
                    formik.setFieldValue("state", value);
                    formik.setFieldValue("district", "");
                    formik.setFieldValue("taluk", "");
                    formik.setFieldValue("village", "");
                  }}
                  onBlur={() => formik.setFieldTouched("state", true)}
                />
                {formik.errors.state && formik.touched.state ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.state}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  District :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                {/* <select
                  type="text"
                  className="form-select"
                  name="district"
                  id="district"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.district}
                  disabled={!formik.values.state}
                >
                  <option value="">Select District</option>
                  {districtData ? (
                    districtData
                      ?.filter(
                        (item) => item.state_type === formik.values.state
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.district}
                        </option>
                      ))
                  ) : (
                    <option value="">No district Available</option>
                  )}
                </select> */}
                <GeneralDistrict
                  stateId={formik.values.state}
                  value={formik.values.district}
                  onChange={(value) => {
                    formik.setFieldValue("district", value);
                    formik.setFieldValue("taluk", "");
                    formik.setFieldValue("village", "");
                  }}
                  onBlur={() => formik.setFieldTouched("district", true)}
                />
                {formik.errors.district && formik.touched.district ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.district}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Taluk :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                {/* <select
                  type="text"
                  className="form-select"
                  name="taluk"
                  id="taluk"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taluk}
                  disabled={!formik.values.district}
                >
                  <option value="">Select Taluk</option>
                  {TalukData ? (
                    TalukData?.filter(
                      (item) => item.taluk_district === formik.values.district
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.taluk_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select> */}
                <GeneralTalukDropdown
                  districtId={formik.values.district}
                  value={formik.values.taluk}
                  onChange={(value) => {
                    formik.setFieldValue("taluk", value);
                    formik.setFieldValue("village", "");
                  }}
                  onBlur={() => formik.setFieldTouched("taluk", true)}
                />
                {formik.errors.taluk && formik.touched.taluk ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.taluk}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Village :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                {/* <select
                  type="text"
                  className="form-select"
                  name="village"
                  id="village"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.village}
                  disabled={!formik.values.taluk}
                >
                  <option value="">Select Village</option>
                  {VillageData ? (
                    VillageData?.filter(
                      (item) => item.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.village_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select> */}
                <GeneralVillageDropdown
                  talukId={formik.values.taluk}
                  value={formik.values.village}
                  onChange={(value) => formik.setFieldValue("village", value)}
                  onBlur={() => formik.setFieldTouched("village", true)}
                />
                {formik.errors.village && formik.touched.village ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.village}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Property Type :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="property_type"
                  id="property_type"
                  placeholder="Enter property type ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.property_type}
                />
                {formik.errors.property_type && formik.touched.property_type ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_type}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Extent in Units :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="extent_unit"
                  id="extent_unit"
                  placeholder="Enter extent in unit ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.extent_unit}
                />
                {formik.errors.extent_unit && formik.touched.extent_unit ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.extent_unit}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mt-2">
                <label className="form-label">
                  Registration ID :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="registration_id"
                  id="registration_id"
                  placeholder="Enter registration id ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration_id}
                  disabled
                />
                {formik.errors.registration_id &&
                  formik.touched.registration_id ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_id}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Registration Date :<span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  selected={formik.values.registration_date}
                  onChange={(date) =>
                    formik.setFieldValue("registration_date", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  className="form-control w-100"
                  placeholderText="Select Date"
                  style={{ width: "100%" }}
                />
                {formik.errors.registration_date &&
                  formik.touched.registration_date ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_date}
                  </p>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">
                  {" "}
                  Registration Time :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="registration_time"
                  id="registration_time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration_time}
                />

                {formik.errors.registration_time &&
                  formik.touched.registration_time ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_time}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sro Details :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                {/* <select
                  type="text"
                  className="form-select"
                  name="sro"
                  id="sro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sro}
                >
                  <option value="">Select Sro</option>
                  {SRODetailsData &&
                    SRODetailsData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}
                      </option>
                    ))}
                </select> */}
                <GeneralSroDropdown
                  value={formik.values.sro}
                  onChange={(value) => {
                    formik.setFieldValue("sro", value);
                  }}
                  onBlur={() => formik.setFieldTouched("sro", true)}
                />
                {formik.errors.sro && formik.touched.sro ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sro}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Land Owner Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ownername"
                  id="ownername"
                  placeholder="Enter land owner name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ownername}
                />
                {formik.errors.ownername && formik.touched.ownername ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.ownername}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Land Owner Contact No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ownerno"
                  id="ownerno"
                  placeholder="Enter land owner no ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ownerno}
                />
                {formik.errors.ownerno && formik.touched.ownerno ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.ownerno}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mt-2">
                <label className="form-label">
                  Purchaser Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="purchaser_name"
                  id="purchaser_name"
                  placeholder="Enter Purchaser Name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purchaser_name}
                />
                {formik.errors.purchaser_name &&
                  formik.touched.purchaser_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.purchaser_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Purchaser Contact No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="purchaser_no"
                  id="purchaser_no"
                  placeholder="Enter purchaser no ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purchaser_no}
                />
                {formik.errors.purchaser_no && formik.touched.purchaser_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.purchaser_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Staff Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="staff_name"
                  id="staff_name"
                  placeholder="Enter staff name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.staff_name}
                />
                {formik.errors.staff_name && formik.touched.staff_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.staff_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Staff Contact No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="staff_no"
                  id="staff_no"
                  placeholder="Enter staff contact no ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.staff_no}
                />
                {formik.errors.staff_no && formik.touched.staff_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.staff_no}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(false)}
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "72rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-4">
              <div className="form-group mt-1">
                <label className="form-label">
                  State :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="state"
                  id="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                >
                  <option value="">Select State</option>
                  {StateNameData &&
                    StateNameData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.state_name}
                      </option>
                    ))}
                </select>
                {formik.errors.state && formik.touched.state ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.state}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  District :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="district"
                  id="district"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.district}
                  disabled={!formik.values.state}
                >
                  <option value="">Select District</option>
                  {districtData ? (
                    districtData
                      ?.filter(
                        (item) => item.state_type === formik.values.state
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.district}
                        </option>
                      ))
                  ) : (
                    <option value="">No district Available</option>
                  )}
                </select>
                {formik.errors.district && formik.touched.district ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.district}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Taluk :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="taluk"
                  id="taluk"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taluk}
                  disabled={!formik.values.district}
                >
                  <option value="">Select Taluk</option>
                  {TalukData ? (
                    TalukData?.filter(
                      (item) => item.taluk_district === formik.values.district
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.taluk_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select>
                {formik.errors.taluk && formik.touched.taluk ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.taluk}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Village :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="village"
                  id="village"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.village}
                  disabled={!formik.values.taluk}
                >
                  <option value="">Select Village</option>
                  {VillageData ? (
                    VillageData?.filter(
                      (item) => item.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.village_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select>
                {formik.errors.village && formik.touched.village ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.village}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Property Type :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="property_type"
                  id="property_type"
                  placeholder="Enter property type ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.property_type}
                />
                {formik.errors.property_type && formik.touched.property_type ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_type}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Extent in Units :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="extent_unit"
                  id="extent_unit"
                  placeholder="Enter extent in unit ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.extent_unit}
                />
                {formik.errors.extent_unit && formik.touched.extent_unit ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.extent_unit}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mt-2">
                <label className="form-label">
                  Registration ID :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="registration_id"
                  id="registration_id"
                  placeholder="Enter registration id ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration_id}
                  disabled
                />
                {formik.errors.registration_id &&
                  formik.touched.registration_id ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_id}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Registration Date :<span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  selected={formik.values.registration_date}
                  onChange={(date) =>
                    formik.setFieldValue("registration_date", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  className="form-control w-100"
                  placeholderText="Select Date"
                  style={{ width: "100%" }}
                />
                {formik.errors.registration_date &&
                  formik.touched.registration_date ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_date}
                  </p>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">
                  {" "}
                  Registration Time :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="registration_time"
                  id="registration_time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration_time}
                />

                {formik.errors.registration_time &&
                  formik.touched.registration_time ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_time}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sro Details :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="sro"
                  id="sro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sro}
                >
                  <option value="">Select Sro</option>
                  {SRODetailsData &&
                    SRODetailsData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}
                      </option>
                    ))}
                </select>
                {formik.errors.sro && formik.touched.sro ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sro}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Land Owner Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ownername"
                  id="ownername"
                  placeholder="Enter land owner name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ownername}
                />
                {formik.errors.ownername && formik.touched.ownername ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.ownername}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Land Owner Contact No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ownerno"
                  id="ownerno"
                  placeholder="Enter land owner no ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ownerno}
                />
                {formik.errors.ownerno && formik.touched.ownerno ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.ownerno}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mt-2">
                <label className="form-label">
                  Purchaser Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="purchaser_name"
                  id="purchaser_name"
                  placeholder="Enter extent in unit ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purchaser_name}
                />
                {formik.errors.purchaser_name &&
                  formik.touched.purchaser_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.purchaser_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Purchaser Contact No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="purchaser_no"
                  id="purchaser_no"
                  placeholder="Enter purchaser no ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purchaser_no}
                />
                {formik.errors.purchaser_no && formik.touched.purchaser_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.purchaser_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Staff Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="staff_name"
                  id="staff_name"
                  placeholder="Enter staff name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.staff_name}
                />
                {formik.errors.staff_name && formik.touched.staff_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.staff_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Staff Contact No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="staff_no"
                  id="staff_no"
                  placeholder="Enter staff contact no ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.staff_no}
                />
                {formik.errors.staff_no && formik.touched.staff_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.staff_no}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(true)}
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Update"}
            </Button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row
          </span>
        </div>

        <div className="d-flex justify-content-end mt-3 gap-3">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(false)}
          >
            No
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Dialog>

      <Dialog
        visible={statusVisible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Registration Status"
        modal
        onHide={() => {
          setStatusVisible(false);
          formik1.resetForm();
        }}
      >
        <form onSubmit={formik1.handleSubmit}>
          <div className="form-group mt-2">
            <label className="form-label">
              Registration Status :<span style={{ color: "red" }}>*</span>
            </label>
            <select
              type="text"
              className="form-select"
              name="registration_status"
              id="registration_status"
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.registration_status}
            >
              <option> Select Registration Status</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
            </select>
            {formik1.errors.registration_status &&
              formik1.touched.registration_status ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.registration_status}
              </p>
            ) : null}
          </div>
          {formik1.values.registration_status === "Completed" && (
            <div className="form-group mt-2">
              <label className="form-label">
                Registration Document :<span style={{ color: "red" }}>*</span>
              </label>
              <select
                type="text"
                className="form-select"
                name="registration_type"
                id="registration_type"
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
                value={formik1.values.registration_type}
              >
                <option> Select Type</option>
                <option value="Collect">Collect </option>
                <option value="Not Collect">Not Collect</option>
              </select>
              {formik1.errors.registration_type &&
                formik1.touched.registration_type ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik1.errors.registration_type}
                </p>
              ) : null}
            </div>
          )}

          {formik1.values.registration_type === "Collect" &&
            formik1.values.registration_status === "Completed" && (
              <div className="form-group mt-2">
                <label className="form-label">
                  Registration File :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  id="file"
                  onChange={(event) => {
                    formik1.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  onBlur={formik1.handleBlur}
                />
                {formik1.errors.file && formik1.touched.file ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik1.errors.file}
                  </p>
                ) : null}
              </div>
            )}

          {formik1.values.registration_type === "Not Collect" && (
            <div className="form-group mt-2">
              <label className="form-label">
                Registration Date :<span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                selected={formik1.values.date}
                onChange={(date) => formik1.setFieldValue("date", date)}
                dateFormat="dd/MM/yyyy"
                className="form-control w-100"
                placeholderText="Select Date"
                style={{ width: "100%" }}
              />
              {formik1.errors.date && formik1.touched.date ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik1.errors.date}
                </p>
              ) : null}
            </div>
          )}

          <div className="d-flex justify-content-end mt-3 gap-3">
            {/* <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(false)}
          >
            No
          </Button> */}
            <Button variant="contained" type="submit" disabled={visibleLoading}>
              {visibleLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default WholeRegistrationAsale;
