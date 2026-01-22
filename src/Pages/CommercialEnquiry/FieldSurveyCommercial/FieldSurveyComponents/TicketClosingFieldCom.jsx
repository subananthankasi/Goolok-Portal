import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { useSelector } from "react-redux";


const TicketClosingFieldCom = ({ eid, marketid, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [customerdata, setCustomerdata] = useState([]);
  const [newDialog, setNewDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setloading] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
   const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("loc", row.location);
    formik.setFieldValue("facing_width", row.facing_width);
    formik.setFieldValue("road_width", row.road_width);
    formik.setFieldValue("amenities", row.amenities);
    formik.setFieldValue("location_advantages", row.advantages);
    formik.setFieldValue("transportation_feasibility", row.feasibility);
    formik.setFieldValue("corner_property", row.corner_property);
    formik.setFieldValue("water_level", row.water_level);
    formik.setFieldValue("price_per_unit", row.unit);
    formik.setFieldValue("new_developments", row.developments);
    formik.setFieldValue("road_types", row.road_types);
    formik.setFieldValue("land_classification", row.classification);
    formik.setFieldValue("land_fertility", row.fertility);
    formik.setFieldValue("soil_type", row.soil_type);
    formik.setFieldValue("vegetation", row.vegetation);
    formik.setFieldValue("contact_no", row.contact);
    formik.setFieldValue("direction", row.direction);
    formik.setFieldValue("distance", row.distance);
    formik.setFieldValue("facing", row.facing);
    formik.setFieldValue("rumors", row.rumors);
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
      name: "Road Facing Width",
      selector: (row) => row.facing_width,
      sortable: true,
      width: "180px",
    },
    {
      name: "Road Width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "150px",
    },
    {
      name: "Amenities",
      selector: (row) => row.amenities,
      sortable: true,
      // width: "150px",
    },
    {
      name: "Facing",
      selector: (row) => row.facing,
      sortable: true,
      // width: "150px",
    },
    {
      name: "Corner Property",
      selector: (row) => row.corner_property,
      sortable: true,
      width: "180px",
    },
    {
      name: "Remark",
      selector: (row) => row.remark ?? "-",
      sortable: true,
      width: "180px",
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
  const onSubmit = async (values) => {
    if (editing) {
      const payload = {
        ...values,
        marketid: marketid,
      };
      try {
        await axios.post(`${API_BASE_URL}/customerprop`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Gl-Status": "customer",
          },
        });
        setEditDialog(false);
        fetchCustomerData();
        Toast({ message: "Successfully add", type: "success" });
        formik.resetForm();
      } catch (error) {
        Toast({ message: "Failed to add", type: "error" });
      }
    } else {
      const payload = {
        ...values,
        marketid: marketid,
      };
      try {
        await axios.post(`${API_BASE_URL}/customerprop`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Gl-Status": "customer",
          },
        });
        setloading(false);
        setNewDialog(false);
        fetchCustomerData();
        Toast({ message: "Successfully add", type: "success" });
        formik.resetForm();
      } catch (error) {
        Toast({ message: "Failed to add", type: "error" });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      facing_width: "",
      road_width: "",
      amenities: "",
      corner_property: "",
      facing: "",
      remark:"",
      enqid: eid,
      staff_id: staffid.loginid,
      id: null,
    },
    validationSchema: yup.object().shape({
      facing_width: yup
        .string()
        .required("facing_width is required !!")
        .max(100),
      road_width: yup.string().required("road_width is required !!").max(100),
      corner_property: yup
        .string()
        .required("corner_property is required !!")
        .max(100),
      amenities: yup
        .string()
        .required("amenities is required !!")
        .matches(
          /^[A-Za-z\s]+$/,
          "amenities must contain only letters and spaces"
        ),
      facing: yup
        .string()
        .required("facing is required !!")
        .matches(
          /^[A-Za-z\s]+$/,
          "facing must contain only letters and spaces"
        ),
        remark: yup.string().required("remark is required !!"),
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
          <div className="d-flex justify-content-between">
            <h6>Ticket Closing</h6>
            {staffid.logintype == "staff" &&
            (status === "pending" || status === "complete") &&
            pagetype !== "reminder" &&
            customerdata.length === 0 ? (
              <a
                href="#0"
                onClick={() => setNewDialog(true)}
                className="btn1 me-2"
              >
                + Add customer Property
              </a>
            ) : null}
          </div>
          <hr />

          {customerdata.length > 0 && (
            <DataTable
              persistTableHead={true}
              columns={customerColumns}
              data={customerdata}
              customStyles={customStyle}
              fixedHeader
            />
          )}
        </div>
      </div>

      <Dialog
        visible={editDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Ticket Closing"
        modal
        className="p-fluid"
        onHide={() => setEditDialog(false)}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
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
                    maxLength="100"
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

            {/* Amenities */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="amenities" className="form-label">
                    Amenities
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="amenities"
                    name="amenities"
                    value={formik.values.amenities}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.amenities && formik.touched.amenities ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.amenities}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Facing */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing" className="form-label">
                    Facing
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="facing"
                    name="facing"
                    value={formik.values.facing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.facing && formik.touched.facing ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Corner Property */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="corner_property" className="form-label">
                    Corner Property
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="corner_property"
                    name="corner_property"
                    value={formik.values.corner_property}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.corner_property &&
                  formik.touched.corner_property ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.corner_property}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
             {/* Remark  */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="corner_property" className="form-label">
                    Remark
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <textarea
                    type="text"
                    className="form-control"
                    id="remark"
                    name="remark"
                    value={formik.values.remark}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.remark &&
                  formik.touched.remark ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.remark}
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
            >
              Update
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

export default TicketClosingFieldCom;
