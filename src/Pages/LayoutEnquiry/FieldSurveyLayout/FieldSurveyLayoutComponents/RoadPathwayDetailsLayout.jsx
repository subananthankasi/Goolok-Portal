import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { useSelector } from "react-redux";


const RoadPathwayDetailsLayout = ({ eid, marketid, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [customerdata, setCustomerdata] = useState([]);
  const [newDialog, setNewDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
   const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("access", row.access);
    formik.setFieldValue("surveyno", row.survey_no);
    formik.setFieldValue("facing_width", row.facing_width);
    formik.setFieldValue("road_width", row.road_width);
    formik.setFieldValue("road_frontage", row.road_frontage);
    formik.setFieldValue("property_type", row.property_type);
    formik.setFieldValue("road_types", row.road_types);
    formik.setFieldValue("boundary", row.boundary);
    formik.setFieldValue("plotstone", row.plot_stone);
    formik.setFieldValue("developments", row.development);
    formik.setFieldValue("id", row.id);
  };
  const openDelete = (id) => {
    setDeleteDialog(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/customerprop/${deleteId}`);
      Toast({ message: "Successfully deleted", type: "success" });
      setDeleteDialog(false);
      formik.resetForm();
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchCustomerData();
    }
  };

  const customerColumns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "150px",
    },
    {
      name: "Access",
      selector: (row) => row.access,
      sortable: true,
      width: "150px",
    },
    {
      name: "Survey No",
      selector: (row) => row.survey_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road Facing",
      selector: (row) => row.facing_width,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road Frontage",
      selector: (row) => row.road_frontage,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road Width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "150px",
    },

    {
      name: "Property Type",
      selector: (row) => row.property_type,
      sortable: true,
      width: "150px",
    },

    {
      name: "Boundary Wall",
      selector: (row) => row.boundary,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road Types",
      selector: (row) => row.road_types,
      sortable: true,
      width: "150px",
    },
    {
      name: "Plot stone",
      selector: (row) => row.plot_stone,
      sortable: true,
      width: "150px",
    },
    {
      name: "Project development",
      selector: (row) => row.development,
      sortable: true,
      width: "190px",
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        // ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex gap-2">
              {/* <button
                  className="btn btn-outline-danger delete"
                  data-tooltip-id="delete"
                  onClick={() => openDelete(row.id)}
                >
                  <DeleteIcon />
                </button> */}
              <button
                className="btn btn-outline-primary delete"
                data-tooltip-id="delete"
                onClick={() => handleEdit(row)}
              >
                <EditIcon />
              </button>
            </div>
          ),
        },
      ]
      : []),
  ];

  const [postLoading, setPostLoading] = useState(false)
  const onSubmit = async (values) => {
    if (editing) {
      const payload = {
        ...values,
        marketid: marketid,
      };
      setPostLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/plotpathwaycreate`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Gl-Status": "customer",
          },
        });
        setEditDialog(false);
        fetchCustomerData();
        Toast({ message: "Successfully add", type: "success" });
        formik.resetForm();
        setPostLoading(false)
      } catch (error) {
        Toast({ message: "Failed to add", type: "error" });
        setPostLoading(false)
      }
    } else {
      const payload = {
        ...values,
        marketid: marketid,
      };
      setPostLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/plotpathwaycreate`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Gl-Status": "customer",
          },
        });
        setPostLoading(false)
        setNewDialog(false);
        fetchCustomerData();
        Toast({ message: "Successfully add", type: "success" });
        formik.resetForm();
      } catch (error) {
        Toast({ message: "Failed to add", type: "error" });
        setPostLoading(false)
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      access: "",
      surveyno: "",
      facing_width: "",
      road_frontage: "",
      property_type: "",
      road_width: "",
      road_types: "",
      boundary: "",
      developments: "",
      plotstone: "",
      enqid: eid,
      staff_id: staffid.loginid,
      id: null,
    },
    validationSchema: yup.object().shape({
      access: yup.string().required("Access is required !!"),
      //   surveyno: yup.string().required("survey no is required !!"),
      road_frontage: yup
        .string()
        .required("Road Frontage is required !!")
        .max(100),
      property_type: yup
        .string()
        .required("Property Type is required !!")
        .max(100),
      facing_width: yup
        .string()
        .required("facing_width is required !!")
        .max(100),
      road_width: yup.string().required("road_width is required !!").max(100),
      road_types: yup
        .string()
        .required("road_types is required !!")
        .matches(
          /^[A-Za-z\s]+$/,
          "road_types must contain only letters and spaces"
        ),

      developments: yup
        .string()
        .required("project developments is required !!"),
      plotstone: yup.string().required("plot stone is required !!"),
      boundary: yup.string().required("boundary wall is required !!"),
    }),
    onSubmit,
  });
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}`, {
        headers: {
          "Gl-Status": "customer",
        },
      });
      setCustomerdata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [marketid]);

  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <button className="btn1" onClick={() => setDeleteDialog(false)}>
        No
      </button>
      <button className="btn1" onClick={handleDelete}>
        yes
      </button>
    </div>
  );

  return (
    <>
      <div className="card shadow border-0 mt-3">
        <div className="card shadow border-0 p-4">
          <div className="d-flex justify-content-start">
            <h6 className="text-center">Road Pathway Details</h6>
          </div>
          <hr />

          <DataTable
            persistTableHead={true}
            columns={customerColumns}
            data={customerdata}
            customStyles={customStyle}
            fixedHeader
          />
        </div>
      </div>

      <Dialog
        visible={editDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Customer Properties"
        modal
        className="p-fluid"
        onHide={() => { setEditDialog(false); formik.resetForm(); }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            {/* Access */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Access
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <select
                    type="text"
                    className="form-select"
                    id="access"
                    name="access"
                    value={formik.values.access}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Access </option>
                    <option value="Available">Available </option>
                    <option value="Not available">Not available </option>
                  </select>
                  {formik.errors.access && formik.touched.access ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.access}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Access */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Survey No
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="surveyno"
                    name="surveyno"
                    value={formik.values.surveyno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter survey no..."
                  />

                  {formik.errors.surveyno && formik.touched.surveyno ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.surveyno}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Road Frontage */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing_width" className="form-label">
                    Road Frontage
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="road_frontage"
                    name="road_frontage"
                    value={formik.values.road_frontage}
                    placeholder="Enter Road Frontage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // maxLength='100'
                  />
                  {formik.errors.road_frontage &&
                    formik.touched.road_frontage ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_frontage}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Property Type */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Property Type
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <select
                    type="text"
                    className="form-select"
                    id="property_type"
                    name="property_type"
                    value={formik.values.property_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Property Type </option>
                    <option value="Corner">Corner </option>
                    <option value="Not Corner">Not Corner </option>
                  </select>
                  {formik.errors.property_type &&
                    formik.touched.property_type ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.property_type}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Facing Width */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing_width" className="form-label">
                    Road Facing Width
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="facing_width"
                    name="facing_width"
                    value={formik.values.facing_width}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // maxLength='100'
                  />
                  {formik.errors.facing_width && formik.touched.facing_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing_width}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Width */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="road_width" className="form-label">
                    Road Width
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="road_width"
                    name="road_width"
                    value={formik.values.road_width}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // maxLength='100'
                  />
                  {formik.errors.road_width && formik.touched.road_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_width}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Types */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="road_types" className="form-label">
                    Road Types
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <select
                    type="text"
                    className="form-select"
                    id="road_types"
                    name="road_types"
                    value={formik.values.road_types}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Type</option>
                    <option value="Mud">Mud</option>
                    <option value=" Black top road"> Black top road</option>
                  </select>
                  {formik.errors.road_types && formik.touched.road_types ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_types}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Boundary wall */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Boundary Wall
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="boundary"
                    name="boundary"
                    value={formik.values.boundary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.boundary && formik.touched.boundary ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.boundary}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Plot Stone */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Plot Stone
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="plotstone"
                    name="plotstone"
                    value={formik.values.plotstone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotstone && formik.touched.plotstone ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotstone}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Project development */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Project development
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <select
                    type="text"
                    className="form-select"
                    id="developments"
                    name="developments"
                    value={formik.values.developments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Development </option>
                    <option value="Developed">Developed </option>
                    <option value="Undeveloped">Undeveloped </option>
                  </select>
                  {formik.errors.developments && formik.touched.developments ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.developments}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn1"
              type="submit"
              onClick={() => setEditing(true)}
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUnitsDialogFooter}
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row ?
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default RoadPathwayDetailsLayout;
