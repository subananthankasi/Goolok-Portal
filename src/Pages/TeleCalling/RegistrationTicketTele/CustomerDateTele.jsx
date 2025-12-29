import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
// import API_BASE_URL from "../../../../Api/api";
// import Toast from "../../../../Utils/Toast";
// import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
// import customStyle from "../../../../Utils/tableStyle";
import DatePicker from "react-datepicker";
import { ThreeCircles } from "react-loader-spinner";
import { DateFormatcustom } from "../../../Utils/DateFormatcustom";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";

const CustomerDateTele = ({
  eid,
  id,
  status,
  bookingno,
  bookingid,
  pagetype,
}) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: " Date",
      selector: (row) => DateFormatcustom(row.reg_date),
      sortable: true,
    },
    {
      name: "Registration Time",
      selector: (row) => row.reg_time,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remark,
      sortable: true,
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
        `${API_BASE_URL}/ticketbooking/${deleteId}`
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
    formik.setFieldValue("date", row.reg_date);
    formik.setFieldValue("time", row.reg_time);
    formik.setFieldValue("remark", row.remark);
    formik.setFieldValue("id", row.id);
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      type: "customer",
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/regdatecreate`,
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
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/regdateshow/${bookingid}`,
        {
          headers: {
            "Gl-status": "customer",
          },
        }
      );
      setGetData(response.data);
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
      date: "",
      time: "",
      remark: "",
    },
    validationSchema: yup.object().shape({
      date: yup.string().required(" date is required !!"),
      time: yup.string().required(" time is required !!"),
      remark: yup.string().required("remark is required !!"),
    }),
    onSubmit,
  });
  return (
    <>
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
      ) : getData.length === 0 ? (
        <div className="d-flex justify-content-center">
          {staffid.logintype === "staff" &&
            (status === "complete" || status === "pending") &&
            pagetype !== "reminder" && (
              <div className="ms-2 mt-2">
                <button onClick={() => setNewDialog(true)} className="btn1">
                  + Create
                </button>
              </div>
            )}
        </div>
      ) : (
        <div className="mt-2">
          <DataTable
            persistTableHead={true}
            columns={column1}
            data={getData}
            customStyles={customStyle}
            pagination
            fixedHeader
          />
        </div>
      )}
      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Land Owner Date Fixing "
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
              Date :<span style={{ color: "red" }}>*</span>
            </label>
            {/* <input
                            type="date"
                            className="form-control"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                        /> */}
            <DatePicker
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue("date", date)}
              dateFormat="dd/MM/yyyy"
              className="form-control w-100"
              placeholderText="Select Date"
              style={{ width: "100%" }}
            />
            {formik.errors.date && formik.touched.date ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.date}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">
              {" "}
              Time :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="time"
              className="form-control"
              name="time"
              id="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
            />

            {formik.errors.time && formik.touched.time ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.time}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              Remark:<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <textarea
              type="text"
              className="form-control"
              name="remark"
              id="remark"
              placeholder="text here ..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remark}
              style={{ height: "100px" }}
            />
            {formik.errors.remark && formik.touched.remark ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.remark}
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
        header="Land Owner Date Fixing "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Date :<span style={{ color: "red" }}>*</span>
            </label>
            {/* <input
                            type="date"
                            className="form-control"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                        /> */}
            <DatePicker
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue("date", date)}
              dateFormat="dd/MM/yyyy"
              className="form-control w-100"
              placeholderText="Select Date"
              style={{ width: "100%" }}
            />
            {formik.errors.date && formik.touched.date ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.date}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">
              {" "}
              Time :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="time"
              className="form-control"
              name="time"
              id="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
            />

            {formik.errors.time && formik.touched.time ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.time}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-1">
            <label className="form-label">
              Remark:<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <textarea
              type="text"
              className="form-control"
              name="remark"
              id="remark"
              placeholder="text here ..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remark}
              style={{ height: "100px" }}
            />
            {formik.errors.remark && formik.touched.remark ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.remark}
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

export default CustomerDateTele;
