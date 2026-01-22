import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Toast from "../../../../Utils/Toast";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const BankingDetailsAsale = ({
  eid,
  status,
  bookingid,
  pagetype,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [bankingData, setBankingData] = useState([]);

  const fetchBanking = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ddshow/${bookingid}`);
      setBankingData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBanking();
  }, []);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
    };
    try {
      await axios.post(`${API_BASE_URL}/ddadd`, payload);
      formik.resetForm();
      fetchBanking();
      setNewDialog(false);
      setEditDialog(false);
      Toast({ message: "Succefully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      loan_status: "",
      loan_no: "",
      dd_no: "",
      dd_value: "",
    },
    validationSchema: yup.object().shape({
      loan_status: yup.string().required("loan_approval_status  is required!!"),
      loan_no: yup.string().required("loan_approval_no  is required!!"),
      dd_no: yup.string().required("dd_no  is required!!"),
      dd_value: yup.string().required("dd_value  is required!!"),
    }),
    onSubmit,
  });

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("loan_status", row.approval_status || "");
    formik.setFieldValue("loan_no", row.approval_no || "");
    formik.setFieldValue("dd_no", row.dd_no || "");
    formik.setFieldValue("dd_value", row.dd_value || "");
    formik.setFieldValue("id", row.id || "");
  };
  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/ddremove/${deleteId}`
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetchBanking();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const column2 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: " Bank loan approval status",
      selector: (row) => row.approval_status,
      sortable: true,
      width: "190px",
    },
    {
      name: "Bank loan approval No.",
      selector: (row) => row.approval_no,
      sortable: true,
      width: "180px",
    },
    {
      name: "DD No",
      selector: (row) => row.dd_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "DD Value",
      selector: (row) => row.dd_value,
      sortable: true,
      width: "180px",
    },

    ...(staffid.logintype === "staff" &&
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
  return (
    <>
      <div className="col-12 mt-4 mb-2">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Banking Details</h6>
               {(status === "pending"||status === "complete") && staffid.Login === "staff" && pagetype !== "reminder" && (
              <button
                className="btn1 text-end"
                onClick={() => setNewDialog(true)}
              >
                Add
              </button>
              )}
            </div>
            <hr />

            <DataTable
              persistTableHead={true}
              columns={column2}
              data={bankingData}
              customStyles={customStyle}
              fixedHeader
            />
          </div>
        </div>
      </div>
      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Details"
        modal
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Bank loan approval status </label>
            </div>
            <div className="col-8">
              <select
                type="text"
                name="loan_status"
                id="loan_status"
                className="form-select"
                value={formik.values.loan_status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select loan approval status</option>
                <option value="Approved">Approved</option>
                <option value="Not Approved">Not Approved</option>
              </select>
              {formik.errors.loan_status && formik.touched.loan_status ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.loan_status}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Bank loan approval No. </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="loan_no"
                id="loan_no"
                className="form-control"
                placeholder="Enter bank loan approval no ..."
                value={formik.values.loan_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.loan_no && formik.touched.loan_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.loan_no}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label"> DD No</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="dd_no"
                id="dd_no"
                className="form-control"
                placeholder="Enter DD no  ..."
                value={formik.values.dd_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dd_no && formik.touched.dd_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dd_no}
                </p>
              ) : null}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">DD Value </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="dd_value"
                id="dd_value"
                placeholder="Enter DD value  ..."
                className="form-control"
                value={formik.values.dd_value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dd_value && formik.touched.dd_value ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dd_value}
                </p>
              ) : null}
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-end mt-3">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                // setBookingVisible(false);
                formik.resetForm();
              }}
            >
              Clear
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update Details"
        modal
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Bank loan approval status </label>
            </div>
            <div className="col-8">
              <select
                type="text"
                name="loan_status"
                id="loan_status"
                className="form-select"
                value={formik.values.loan_status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select loan approval status</option>
                <option value="Approved">Approved</option>
                <option value="Not Approved">Not Approved</option>
              </select>
              {formik.errors.loan_status && formik.touched.loan_status ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.loan_status}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Bank loan approval No. </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="loan_no"
                id="loan_no"
                className="form-control"
                placeholder="Enter bank loan approval no ..."
                value={formik.values.loan_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.loan_no && formik.touched.loan_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.loan_no}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label"> DD No</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="dd_no"
                id="dd_no"
                className="form-control"
                placeholder="Enter DD no  ..."
                value={formik.values.dd_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dd_no && formik.touched.dd_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dd_no}
                </p>
              ) : null}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">DD Value </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="dd_value"
                id="dd_value"
                placeholder="Enter DD value  ..."
                className="form-control"
                value={formik.values.dd_value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dd_value && formik.touched.dd_value ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dd_value}
                </p>
              ) : null}
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-end mt-3">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                // setBookingVisible(false);
                formik.resetForm();
              }}
            >
              Clear
            </Button>
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
          <ErrorOutlineIcon sx={{ color: "red", fontSize: 23 }} />
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the data ..?
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

export default BankingDetailsAsale;
