import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import { IMG_PATH } from "../../../../Api/api";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import SendIcon from "@mui/icons-material/Send";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TableChartIcon from "@mui/icons-material/TableChart";

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

const WholeAfterSaleLandComponent = ({
  eid,
  id,
  status,
  shortform,
  bookingid,
  pagetype,
}) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [registerData, setRegisterData] = useState({});
  const [editDialog, setEditDialog] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  const navigate = useNavigate();

  const [filePreviews, setFilePreviews] = useState({
    sale_deed_softcopy: null,
    patta_application: null,
    file: null,
    patta: null,
  });

  const dispatch = useDispatch();

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
  const requiredFields = [
    "reg_id",
    "reg_date",
    "categoryName",
    "sub_catName",
    "extent_units",
    "ec_doc",
    "sd_no",
    "sd_name",
    "sd_soft_copy",
    "sd_hard_copy",
    "tracking_id",
    "patta_app_no",
    "patta_app",
    "patta_no",
    "patta_name",
    "survey_no",
    "area",
    "patta_doc",
  ];

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Completion",
      selector: (row) => {
        const total = requiredFields.length;
        let filled = 0;

        requiredFields.forEach((key) => {
          if (row[key] && row[key] !== "-") filled++;
        });

        const percentage = Math.round((filled / total) * 100);
        return `${percentage}%`;
      },
      sortable: true,
      width: "120px",
    },

    {
      name: "Registration ID",
      selector: (row) => row.reg_id,
      sortable: true,
      width: "170px",
    },
    {
      name: "Registration Date",
      selector: (row) => {
        const date = new Date(row.reg_date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      sortable: true,
      width: "170px",
    },
    {
      name: "Category",
      selector: (row) => row.categoryName || "-",
      sortable: true,
      width: "160px",
    },
    {
      name: "Sub Category",
      selector: (row) => row.sub_catName || "-",
      sortable: true,
      width: "160px",
    },
    {
      name: "Property Type",
      selector: (row) => row.categoryName || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Extent in Units",
      selector: (row) => row.extent_units || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "EC Document",
      cell: (row) =>
        row.ec_doc ? (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm btn-link ms-1 p-0"
              onClick={() =>
                window.open(`${IMG_PATH}/regdocument/${row.ec_doc}`, "_blank")
              }
              title="View EC Document"
            >
              {/* <span className="ms-1">{row.ec_doc}</span> */}
              {getFileIcon(row.ec_doc)}
            </button>
          </div>
        ) : (
          "-"
        ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Sale Deed No",
      selector: (row) => row.sd_no || "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Sale Deed Name",
      selector: (row) => row.sd_name || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "Sale Deed Soft Copy",
      cell: (row) =>
        row.sd_soft_copy ? (
          <div className="d-flex align-items-center">
            {/* <span>{row.sd_soft_copy}</span> */}
            <button
              className="btn btn-sm btn-link ms-1 p-0"
              onClick={() =>
                window.open(
                  `${IMG_PATH}/regdocument//${row.sd_soft_copy}`,
                  "_blank"
                )
              }
              title="View Sale Deed Soft Copy"
            >
              {getFileIcon(row.sd_soft_copy)}
            </button>
          </div>
        ) : (
          "-"
        ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Sale Deed Hard Copy",
      selector: (row) => row.sd_hard_copy || "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Tracking ID",
      selector: (row) => row.tracking_id || "-",
      sortable: true,
      width: "160px",
    },
    {
      name: "Patta Application No",
      selector: (row) => row.patta_app_no || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "Patta Application",
      cell: (row) =>
        row.patta_app ? (
          <div className="d-flex align-items-center">
            {/* <span>{row.patta_app}</span> */}
            <button
              className="btn btn-sm btn-link ms-1 p-0"
              onClick={() =>
                window.open(
                  `${IMG_PATH}/regdocument/${row.patta_app}`,
                  "_blank"
                )
              }
              title="View Patta Application"
            >
              {getFileIcon(row.patta_app)}
            </button>
          </div>
        ) : (
          "-"
        ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Patta No",
      selector: (row) => row.patta_no || "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Patta Name",
      selector: (row) => row.patta_name || "-",
      sortable: true,
      width: "160px",
    },
    {
      name: "Survey No",
      selector: (row) => row.survey_no || "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Area",
      selector: (row) => row.area || "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Patta Document",
      cell: (row) =>
        row.patta_doc ? (
          <div className="d-flex align-items-center">
            {/* <span>{row.patta_doc}</span> */}
            <button
              className="btn btn-sm btn-link ms-1 p-0"
              onClick={() =>
                window.open(
                  `${IMG_PATH}/regdocument/${row.patta_doc}`,
                  "_blank"
                )
              }
              title="View Patta Document"
            >
              {getFileIcon(row.patta_doc)}
            </button>
          </div>
        ) : (
          "-"
        ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Actions",
      omit: staffid.logintype == "admin",
      cell: (row) => (
        <div className="d-flex gap-2">
          <>
            <button
              className="editButton"
              onClick={() => handleEdit(row)}
              title="Edit"
            >
              <EditIcon fontSize="small" />
            </button>
          </>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

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
    setRegisterData(row);
    setEditDialog(true);
    setEditing(true);
    // Format the date for the date picker
    const regDate = row.reg_date ? new Date(row.reg_date) : null;

    // Set file previews
    setFilePreviews({
      sale_deed_softcopy: row.sd_soft_copy
        ? `${IMG_PATH}/regdocument/${row.sd_soft_copy}`
        : null,
      patta_application: row.patta_app
        ? `${IMG_PATH}/regdocument/${row.patta_app}`
        : null,
      file: row.ec_doc ? `${IMG_PATH}/regdocument/${row.ec_doc}` : null,
      patta: row.patta_doc ? `${IMG_PATH}/regdocument/${row.patta_doc}` : null,
    });

    // Set form values
    formik.setValues({
      registration_id: row.reg_id || "",
      registration_date: regDate,
      category: row.category || "",
      subcategory: row.sub_cat || "",
      property_type: row.prop_type || "",
      extent_unit: row.extent_units || "",
      sale_deed_no: row.sd_no || "",
      sale_deed_name: row.sd_name || "",
      sale_deed_hardcopy: row.sd_hard_copy || "",
      patta_apl_no: row.patta_app_no || "",
      patta_no: row.patta_no || "",
      patta_name: row.patta_name || "",
      surveyno: row.survey_no || "",
      area: row.area || "",
      tracking_id: row.tracking_id || "",
      id: row.id || "",
      // Old file names
      sale_deed_softcopy_old: row.sd_soft_copy || "",
      patta_application_old: row.patta_app || "",
      file_old: row.ec_doc || "",
      patta_old: row.patta_doc || "",
    });
  };

  const handleFileChange = (fieldName, event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue(fieldName, file);

      // Create preview for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews((prev) => ({
            ...prev,
            [fieldName]: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, just show the file name
        setFilePreviews((prev) => ({
          ...prev,
          [fieldName]: file.name,
        }));
      }
    }
  };

  const openFilePreview = (url) => {
    window.open(url, "_blank");
  };

  const onSubmit = async (values) => {
    const formData = new FormData();

    // Format the date
    let formattedDate = "";
    if (values.registration_date) {
      const date = new Date(values.registration_date);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      formattedDate = `${year}/${month}/${day}`;
    }

    // Append all form values to formData
    Object.keys(values).forEach((key) => {
      if (key === "registration_date") {
        formData.append(key, formattedDate);
      } else if (
        key === "sale_deed_softcopy_old" ||
        key === "patta_application_old" ||
        key === "file_old" ||
        key === "patta_old"
      ) {
        // These are handled separately
      } else if (
        key !== "sale_deed_softcopy" &&
        key !== "patta_application" &&
        key !== "file" &&
        key !== "patta" &&
        key !== "id"
      ) {
        formData.append(key, values[key]);
      }
    });

    // Append old file names if no new files are provided
    if (
      !(values.sale_deed_softcopy instanceof File) &&
      values.sale_deed_softcopy_old
    ) {
      formData.append("sale_deed_softcopy_old", values.sale_deed_softcopy_old);
    }
    if (
      !(values.patta_application instanceof File) &&
      values.patta_application_old
    ) {
      formData.append("patta_application_old", values.patta_application_old);
    }
    if (!(values.file instanceof File) && values.file_old) {
      formData.append("file_old", values.file_old);
    }
    if (!(values.patta instanceof File) && values.patta_old) {
      formData.append("patta_old", values.patta_old);
    }

    // Conditionally append files if they exist (for update, files are optional)
    if (values.sale_deed_softcopy instanceof File) {
      formData.append("sale_deed_softcopy", values.sale_deed_softcopy);
    }
    if (values.patta_application instanceof File) {
      formData.append("patta_application", values.patta_application);
    }
    if (values.file instanceof File) {
      formData.append("file", values.file);
    }
    if (values.patta instanceof File) {
      formData.append("patta", values.patta);
    }

    // Add additional fields
    formData.append("enqid", eid);
    formData.append("bid", bookingid);
    formData.append("shortform", shortform);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let response;
      if (editing && values.id) {
        // Update existing record
        response = await axios.put(
          `${API_BASE_URL}/aftersaledpt/${values.id}`,
          formData,
          config
        );
        Toast({ message: "Successfully Updated", type: "success" });
        setRegisterData((prev) => ({
          ...prev,
          ...response.data,
        }));
      } else {
        // Create new record
        response = await axios.post(
          `${API_BASE_URL}/aftersaledpt`,
          formData,
          config
        );
        Toast({ message: "Successfully Submitted", type: "success" });
      }

      fetch();
      setEditDialog(false);
      setNewDialog(false);
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      Toast({ message: "Failed to save", type: "error" });
    }
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/aftersaledpt/${bookingid}`
      );
      const dataAsArray = Array(response.data);
      setRegisterData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleConfirm = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/confirmreg`,
        { enqid: eid, id: id, bid: bookingid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/after_sale_land#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
    }
  };

  const validationSchema = yup.object().shape({
    registration_id: yup.string().required("Registration ID is required"),
    registration_date: yup.date().required("Registration date is required"),
    category: yup.string().required("Category is required"),
    subcategory: yup.string().required("Subcategory is required"),
    property_type: yup.string().required("Property type is required"),
    extent_unit: yup.string().required("Extent unit is required"),
    sale_deed_no: yup.string().required("Sale deed number is required"),
    sale_deed_name: yup.string().required("Sale deed name is required"),
    sale_deed_hardcopy: yup
      .string()
      .required("Sale deed hardcopy status is required"),
    patta_apl_no: yup.string().required("Patta application number is required"),
    patta_no: yup.string().required("Patta number is required"),
    patta_name: yup.string().required("Patta name is required"),
    surveyno: yup.string().required("Survey number is required"),
    area: yup.string().required("Area is required"),
    tracking_id: yup.string().when("sale_deed_hardcopy", {
      is: "Couriered",
      then: (schema) =>
        schema.required("Tracking ID is required when status is Couriered"),
    }),
    // File validations - only required when creating new records or when no old file exists
    sale_deed_softcopy: yup
      .mixed()
      .test(
        "sale_deed_softcopy",
        "Sale deed softcopy is required",
        function (value) {
          const { sale_deed_softcopy_old } = this.parent;
          if (sale_deed_softcopy_old) return true; // Skip validation if old file exists
          return value instanceof File; // Require file if no old file exists
        }
      ),
    file: yup.mixed().test("file", "EC file is required", function (value) {
      const { file_old } = this.parent;
      if (file_old) return true;
      return value instanceof File;
    }),
    patta: yup
      .mixed()
      .test("patta", "Patta file is required", function (value) {
        const { patta_old } = this.parent;
        if (patta_old) return true;
        return value instanceof File;
      }),
    patta_application: yup
      .mixed()
      .test(
        "patta_application",
        "Patta application file is required",
        function (value) {
          const { patta_application_old } = this.parent;
          if (patta_application_old) return true;
          return value instanceof File;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      registration_id: "",
      registration_date: null,
      category: "",
      subcategory: "",
      property_type: "",
      extent_unit: "",
      sale_deed_no: "",
      sale_deed_name: "",
      sale_deed_softcopy: null,
      sale_deed_hardcopy: "",
      patta_apl_no: "",
      patta_no: "",
      patta_name: "",
      surveyno: "",
      area: "",
      tracking_id: "",
      file: null,
      patta: null,
      patta_application: null,
      // Old file names
      sale_deed_softcopy_old: "",
      patta_application_old: "",
      file_old: "",
      patta_old: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
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
              <h6> After Sale </h6>
            </div>
            <hr />
            {Object.keys(registerData).length === 0 ? (
              <div className="d-flex justify-content-center">
                {staffid.logintype == "staff" &&
                  (status === "complete" || status === "pending") &&
                  pagetype !== "reminder" && (
                    <div className="">
                      <a
                        href="#"
                        onClick={() => setNewDialog(true)}
                        className="btn1 me-2 mt-5 mb-5"
                      >
                        + Create Documents
                      </a>
                    </div>
                  )}
              </div>
            ) : (
              <>
                <DataTable
                  persistTableHead={true}
                  columns={column1}
                  data={registerData}
                  customStyles={customStyle}
                  fixedHeader
                />
              </>
            )}
            {Object.keys(registerData).length > 0 && staffid.logintype === "staff" && status === "pending" && (
              <div className="mt-3 ms-2 mx-4 mb-3 text-end">
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => setIsVerifyConfirm(true)}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog
        visible={newDialog}
        style={{ width: "72rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Registration"
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
              <div className="form-group">
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
              <div className="form-group mt-1">
                <label className="form-label">
                  Category:<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="category"
                  id="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="">Select Category</option>
                  {property &&
                    property.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.property_type}
                      </option>
                    ))}
                </select>
                {formik.errors.category && formik.touched.category ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.category}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Sub Category :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="subcategory"
                  id="subcategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subcategory}
                  disabled={!formik.values.category}
                >
                  <option value="">Select Sub Category</option>
                  {subproperty ? (
                    subproperty
                      ?.filter(
                        (item) => item.property === formik.values.category
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.subproperty}
                        </option>
                      ))
                  ) : (
                    <option value="">No Sub Category Available</option>
                  )}
                </select>
                {formik.errors.subcategory && formik.touched.subcategory ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.subcategory}
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
                  Sale Deed No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sale_deed_no"
                  id="sale_deed_no"
                  placeholder="Enter land owner name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_deed_no}
                />
                {formik.errors.sale_deed_no && formik.touched.sale_deed_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sale Deed Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sale_deed_name"
                  id="sale_deed_name"
                  placeholder="Enter land owner name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_deed_name}
                />
                {formik.errors.sale_deed_name &&
                formik.touched.sale_deed_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  SALE DEED SOFT COPY :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="sale_deed_softcopy"
                  id="sale_deed_softcopy"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "sale_deed_softcopy",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.sale_deed_softcopy &&
                formik.touched.sale_deed_softcopy ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_softcopy}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sale deep hard Copy :<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="sale_deed_hardcopy"
                  id="sale_deed_hardcopy"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_deed_hardcopy}
                >
                  <option> Select Status</option>
                  <option value="Couriered">COURIERED</option>
                  <option value="Pending">PENDING</option>
                </select>
                {formik.errors.sale_deed_hardcopy &&
                formik.touched.sale_deed_hardcopy ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_hardcopy}
                  </p>
                ) : null}
              </div>
              {formik.values.sale_deed_hardcopy === "Couriered" && (
                <div className="form-group mt-2">
                  <label className="form-label">
                    TRACKING ID :<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tracking_id"
                    id="tracking_id"
                    placeholder="Enter Tracking ID ..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tracking_id}
                  />
                  {formik.errors.tracking_id && formik.touched.tracking_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.tracking_id}
                    </p>
                  ) : null}
                </div>
              )}
              <div className="form-group mt-2">
                <label className="form-label">
                  PATTA APPLICATION NO :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patta_apl_no"
                  id="patta_apl_no"
                  placeholder="Enter Patta Application No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patta_apl_no}
                />
                {formik.errors.patta_apl_no && formik.touched.patta_apl_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_apl_no}
                  </p>
                ) : null}
              </div>

              <div className="form-group mt-2">
                <label className="form-label">
                  Patta Application :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="patta_application"
                  id="patta_application"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "patta_application",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.patta_application &&
                formik.touched.patta_application ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_application}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mt-2">
                <label className="form-label">
                  EC:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  id="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.file && formik.touched.file ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.file}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  PATTA NO :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patta_no"
                  id="patta_no"
                  placeholder="Enter Patta No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patta_no}
                />
                {formik.errors.patta_no && formik.touched.patta_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  PATTA NAME :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patta_name"
                  id="patta_name"
                  placeholder="Enter Patta name No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patta_name}
                />
                {formik.errors.patta_name && formik.touched.patta_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  SURVEY NO/ SUB DIVISION:
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="surveyno"
                  id="surveyno"
                  placeholder="Enter survey No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surveyno}
                />
                {formik.errors.surveyno && formik.touched.surveyno ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.surveyno}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  AREA:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  id="area"
                  placeholder="Enter Patta Application No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                />
                {formik.errors.area && formik.touched.area ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.area}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Patta Application :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="patta"
                  id="patta"
                  onChange={(event) => {
                    formik.setFieldValue("patta", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.patta && formik.touched.patta ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta}
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
            >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        visible={editDialog}
        style={{ width: "72rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update Registration"
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
          setFilePreviews({
            sale_deed_softcopy: null,
            patta_application: null,
            file: null,
            patta: null,
          });
          fetch();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-4">
              <div className="form-group">
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
              <div className="form-group mt-1">
                <label className="form-label">
                  Category:<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="category"
                  id="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="">Select Category</option>
                  {property &&
                    property.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.property_type}
                      </option>
                    ))}
                </select>
                {formik.errors.category && formik.touched.category ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.category}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Sub Category :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="subcategory"
                  id="subcategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subcategory}
                  disabled={!formik.values.category}
                >
                  <option value="">Select Sub Category</option>
                  {subproperty ? (
                    subproperty
                      ?.filter(
                        (item) => item.property === formik.values.category
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.subproperty}
                        </option>
                      ))
                  ) : (
                    <option value="">No Sub Category Available</option>
                  )}
                </select>
                {formik.errors.subcategory && formik.touched.subcategory ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.subcategory}
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
                  Sale Deed No :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sale_deed_no"
                  id="sale_deed_no"
                  placeholder="Enter land owner name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_deed_no}
                />
                {formik.errors.sale_deed_no && formik.touched.sale_deed_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sale Deed Name :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sale_deed_name"
                  id="sale_deed_name"
                  placeholder="Enter land owner name ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_deed_name}
                />
                {formik.errors.sale_deed_name &&
                formik.touched.sale_deed_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  SALE DEED SOFT COPY :<span style={{ color: "red" }}>*</span>
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="file"
                    className="form-control"
                    name="sale_deed_softcopy"
                    id="sale_deed_softcopy"
                    onChange={(event) =>
                      handleFileChange("sale_deed_softcopy", event)
                    }
                    onBlur={formik.handleBlur}
                  />
                  {filePreviews.sale_deed_softcopy && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link ms-2"
                      onClick={() =>
                        openFilePreview(filePreviews.sale_deed_softcopy)
                      }
                      title="View file"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                  )}
                </div>
                {formik.errors.sale_deed_softcopy &&
                formik.touched.sale_deed_softcopy ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_softcopy}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sale deep hard Copy :<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="sale_deed_hardcopy"
                  id="sale_deed_hardcopy"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_deed_hardcopy}
                >
                  <option> Select Status</option>
                  <option value="Couriered">COURIERED</option>
                  <option value="Pending">PENDING</option>
                </select>
                {formik.errors.sale_deed_hardcopy &&
                formik.touched.sale_deed_hardcopy ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.sale_deed_hardcopy}
                  </p>
                ) : null}
              </div>
              {formik.values.sale_deed_hardcopy === "Couriered" && (
                <div className="form-group mt-2">
                  <label className="form-label">
                    TRACKING ID :<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tracking_id"
                    id="tracking_id"
                    placeholder="Enter Tracking ID ..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tracking_id}
                  />
                  {formik.errors.tracking_id && formik.touched.tracking_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.tracking_id}
                    </p>
                  ) : null}
                </div>
              )}
              <div className="form-group mt-2">
                <label className="form-label">
                  PATTA APPLICATION NO :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patta_apl_no"
                  id="patta_apl_no"
                  placeholder="Enter Patta Application No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patta_apl_no}
                />
                {formik.errors.patta_apl_no && formik.touched.patta_apl_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_apl_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Patta Application :<span style={{ color: "red" }}>*</span>
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="file"
                    className="form-control"
                    name="patta_application"
                    id="patta_application"
                    onChange={(event) =>
                      handleFileChange("patta_application", event)
                    }
                    onBlur={formik.handleBlur}
                  />
                  {filePreviews.patta_application && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link ms-2"
                      onClick={() =>
                        openFilePreview(filePreviews.patta_application)
                      }
                      title="View file"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                  )}
                </div>
                {formik.errors.patta_application &&
                formik.touched.patta_application ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_application}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mt-2">
                <label className="form-label">
                  EC:<span style={{ color: "red" }}>*</span>
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    id="file"
                    onChange={(event) => handleFileChange("file", event)}
                    onBlur={formik.handleBlur}
                  />
                  {filePreviews.file && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link ms-2"
                      onClick={() => openFilePreview(filePreviews.file)}
                      title="View file"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                  )}
                </div>
                {formik.errors.file && formik.touched.file ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.file}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  PATTA NO :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patta_no"
                  id="patta_no"
                  placeholder="Enter Patta No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patta_no}
                />
                {formik.errors.patta_no && formik.touched.patta_no ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_no}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  PATTA NAME :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patta_name"
                  id="patta_name"
                  placeholder="Enter Patta name No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patta_name}
                />
                {formik.errors.patta_name && formik.touched.patta_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta_name}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  SURVEY NO/ SUB DIVISION:
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="surveyno"
                  id="surveyno"
                  placeholder="Enter survey No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surveyno}
                />
                {formik.errors.surveyno && formik.touched.surveyno ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.surveyno}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  AREA:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  id="area"
                  placeholder="Enter Patta Application No ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                />
                {formik.errors.area && formik.touched.area ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.area}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Patta Document :<span style={{ color: "red" }}>*</span>
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="file"
                    className="form-control"
                    name="patta"
                    id="patta"
                    onChange={(event) => handleFileChange("patta", event)}
                    onBlur={formik.handleBlur}
                  />
                  {filePreviews.patta && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link ms-2"
                      onClick={() => openFilePreview(filePreviews.patta)}
                      title="View file"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                  )}
                </div>
                {formik.errors.patta && formik.touched.patta ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.patta}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="contained" type="submit">
              Update
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
    </>
  );
};

export default WholeAfterSaleLandComponent;
