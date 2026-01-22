import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
// import API_BASE_URL from "../../../../../Api/api";
// import Toast from "../../../../../Utils/Toast";
// import customStyle from "../../../../../Utils/tableStyle";

const PhaseCostPricingCom = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));

  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [getData, setGetData] = useState([]);

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Block No",
      selector: (row) => row.phase,
      sortable: true,
    },
    {
      name: "No. of Shops",
      selector: (row) => row.no_of_plots,
      sortable: true,
       width:"150px"
    },
    {
      name: "Basic Cost",
      selector: (row) => row.basic_cost,
      sortable: true,
    },
    {
      name: "Association Cost",
      selector: (row) => row.association_cost,
      sortable: true,
      width:"150px"
    },
    {
      name: "Registration Cost",
      selector: (row) => row.registration_cost,
      sortable: true,
       width:"150px"
    },
    {
      name: "Total Shop Cost",
      selector: (row) => row.total_plot_cost,
      sortable: true,
       width:"150px"
    },
    ...(staffid.logintype == "staff" &&
    (status === "complete" || status === "pending") &&
    pagetype !== "reminder"
      ? [
          {
            name: "Actions",
            cell: (row) => (
              <>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-info me-1 edit"
                    data-tooltip-id="edit"
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="btn btn-outline-danger delete"
                    data-tooltip-id="delete"
                    onClick={() => handleDeleteOpen(row)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </>
            ),
            sortable: true,
          },
        ]
      : []),
  ];
  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setdeleteId(row.id);
  };
  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deletephasecost/${deleteId}`
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
    formik.setFieldValue("phase", row.phase);
    formik.setFieldValue("total_plot_cost", row.total_plot_cost);
    formik.setFieldValue("registration_cost", row.registration_cost);
    formik.setFieldValue("association_cost", row.association_cost);
    formik.setFieldValue("basic_cost", row.basic_cost);
    formik.setFieldValue("no_of_plots", row.no_of_plots);
    formik.setFieldValue("id", row.id);
  };
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/phasecostcreate  `,
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
    } catch (error) {
      Toast({ message: "Failed to save", type: "error" });
    }
  };
  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/viewphasecost/${eid}`
      );
      setGetData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      phase: "",
      no_of_plots: "",
      basic_cost: "",
      association_cost: "",
      registration_cost: "",
      total_plot_cost: "",
    },
    validationSchema: yup.object().shape({
      phase: yup.string().required("phase is required !!"),
      no_of_plots: yup.string().required("no of plots is required !!"),
      basic_cost: yup.string().required("basic cost is required !!"),
      association_cost: yup
        .string()
        .required("association cost is required !!"),
      registration_cost: yup
        .string()
        .required("registration cost is required !!"),
      total_plot_cost: yup.string().required("total plot cost is required !!"),
    }),
    onSubmit,
  });

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Phase Details</h6>
              {staffid.logintype === "staff" &&
                (status === "complete" || status === "pending") &&
                pagetype !== "reminder" && (
                  <div className="d-flex justify-content-end">
                    <div className="ms-2">
                      <a
                        href="#"
                        onClick={() => setNewDialog(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </a>
                    </div>
                  </div>
                )}
            </div>

            <hr />
            <div className="mt-2">
              <DataTable
                persistTableHead={true}
                columns={column1}
                data={getData}
                customStyles={customStyle}
                pagination
                // selectableRows
                fixedHeader
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Shop Cost"
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Block No: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="phase"
              id="phase"
              placeholder="Enter phase..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phase}
            />
            {formik.errors.phase && formik.touched.phase ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.phase}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              No. of Shops: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="no_of_plots"
              id="no_of_plots"
              placeholder="Enter no of plots..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.no_of_plots}
            />
            {formik.errors.no_of_plots && formik.touched.no_of_plots ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.no_of_plots}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Basic Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="basic_cost"
              id="basic_cost"
              placeholder="Enter basic cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.basic_cost}
            />
            {formik.errors.basic_cost && formik.touched.basic_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.basic_cost}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Association Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="association_cost"
              id="association_cost"
              placeholder="Enter association cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.association_cost}
            />
            {formik.errors.association_cost &&
            formik.touched.association_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.association_cost}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Registration Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="registration_cost"
              id="registration_cost"
              placeholder="Enter registration cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registration_cost}
            />
            {formik.errors.registration_cost &&
            formik.touched.registration_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.registration_cost}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Total Shop Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="total_plot_cost"
              id="total_plot_cost"
              placeholder="Enter total plot cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.total_plot_cost}
            />
            {formik.errors.total_plot_cost && formik.touched.total_plot_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.total_plot_cost}
              </p>
            ) : null}
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
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update"
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Block No: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="phase"
              id="phase"
              placeholder="Enter phase..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phase}
            />
            {formik.errors.phase && formik.touched.phase ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.phase}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              No. of Shops: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="no_of_plots"
              id="no_of_plots"
              placeholder="Enter no of plots..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.no_of_plots}
            />
            {formik.errors.no_of_plots && formik.touched.no_of_plots ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.no_of_plots}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Basic Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="basic_cost"
              id="basic_cost"
              placeholder="Enter basic cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.basic_cost}
            />
            {formik.errors.basic_cost && formik.touched.basic_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.basic_cost}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Association Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="association_cost"
              id="association_cost"
              placeholder="Enter association cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.association_cost}
            />
            {formik.errors.association_cost &&
            formik.touched.association_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.association_cost}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Registration Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="registration_cost"
              id="registration_cost"
              placeholder="Enter registration cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registration_cost}
            />
            {formik.errors.registration_cost &&
            formik.touched.registration_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.registration_cost}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              {" "}
              Total Shop Cost: <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="total_plot_cost"
              id="total_plot_cost"
              placeholder="Enter total plot cost..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.total_plot_cost}
            />
            {formik.errors.total_plot_cost && formik.touched.total_plot_cost ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.total_plot_cost}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(true)}
            >
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

export default PhaseCostPricingCom;
