import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import Common from "../../../../common/Common";
import { useSelector } from "react-redux";

const TicketAssigning = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [getData, setGetData] = useState([]);
  const { disableBeforeDate } = Common();
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Last Followup Date",
      selector: (row) => DateFormatcustom(row.last_follow),
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remark,
      sortable: true,
    },
    {
      name: "Next Followup Date",
      selector: (row) => DateFormatcustom(row.next_follow),
      sortable: true,
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "live"
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
    formik.setFieldValue("lastdate", row.last_follow);
    formik.setFieldValue("nextdate", row.next_follow);
    formik.setFieldValue("remark", row.remark);
    formik.setFieldValue("id", row.id);
  };


  const [postLoading, setPostLoading] = useState(false)
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      eid: eid,
      status: "hub",
    };
    setPostLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/confirmation`,
        payload
      );
      fetch();
      setPostLoading(false)
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
      setPostLoading(false)
    }
  };
  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/confirmation/${eid}/edit`,
        {
          headers: {
            "Gl-Status": "hub",
          },
        }
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
      lastdate: "",
      remark: "",
      nextdate: "",
    },
    validationSchema: yup.object().shape({
      lastdate: yup.string().required("last followed date is required !!"),
      remark: yup.string().required("remark is required !!"),
      nextdate: yup.string().required("next followed date is required !!"),
    }),
    onSubmit,
  });
  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Follow Up Date</h6>
              <div className="d-flex justify-content-end">
                {staffid.logintype == "staff" &&
                  (status === "complete" || status === "pending") &&
                  pagetype !== "reminder" && enquiryDoumentData?.status !== "live" && (
                    <div className="ms-2">
                      <a
                        href="#"
                        onClick={() => setNewDialog(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </a>
                    </div>
                  )}
              </div>
            </div>

            <hr />
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
          </div>
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add "
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
        baseZIndex={400}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Last Followed Date :<span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              placement="topRight"
              name="lastdate"
              value={
                formik.values.lastdate
                  ? dayjs(formik.values.lastdate, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) => {
                formik.setFieldValue(
                  "lastdate",
                  date ? date?.format("YYYY-MM-DD") : ""
                );
                formik.setFieldValue("nextdate", "");
              }}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              //   disabledDate={(current) => current && current > dayjs()}
              onBlur={formik.handleBlur}
            />
            {/* <input
                            type="date"
                            className="form-control"
                            name="lastdate"
                            id="lastdate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastdate}
                        /> */}
            {formik.errors.lastdate && formik.touched.lastdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.lastdate}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">
              Remark:<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <textarea
              type="text"
              className="form-control"
              name="remark"
              id="remark"
              placeholder="text here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remark}
            />
            {formik.errors.remark && formik.touched.remark ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.remark}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">
              {" "}
              Next Followup Date :<span style={{ color: "red" }}>*</span>
            </label>

            <DatePicker
              placement="topRight"
              name="nextdate"
              value={
                formik.values.nextdate
                  ? dayjs(formik.values.nextdate, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) =>
                formik.setFieldValue(
                  "nextdate",
                  date ? date?.format("YYYY-MM-DD") : ""
                )
              }
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              disabledDate={disableBeforeDate(formik.values.lastdate)}
              onBlur={formik.handleBlur}
            />
            {/* <input
              type="date"
              className="form-control"
              name="nextdate"
              id="nextdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nextdate}
            /> */}
            {formik.errors.nextdate && formik.touched.nextdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.nextdate}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(false)}
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Save"}
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
        }}
        baseZIndex={400}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Last Followed Date :<span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              placement="topRight"
              name="lastdate"
              value={
                formik.values.lastdate
                  ? dayjs(formik.values.lastdate, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) => {
                formik.setFieldValue(
                  "lastdate",
                  date ? date?.format("YYYY-MM-DD") : ""
                );
                formik.setFieldValue("nextdate", "");
              }}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              //   disabledDate={(current) => current && current > dayjs()}
              onBlur={formik.handleBlur}
            />
            {/* <input
              type="date"
              className="form-control"
              name="lastdate"
              id="lastdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastdate}
            /> */}
            {formik.errors.lastdate && formik.touched.lastdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.lastdate}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">
              Remark:<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="remark"
              id="remark"
              placeholder="enter remark..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remark}
            />
            {formik.errors.remark && formik.touched.remark ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.remark}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">
              {" "}
              Next Followup Date :<span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              placement="topRight"
              name="nextdate"
              value={
                formik.values.nextdate
                  ? dayjs(formik.values.nextdate, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) =>
                formik.setFieldValue(
                  "nextdate",
                  date ? date?.format("YYYY-MM-DD") : ""
                )
              }
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              disabledDate={disableBeforeDate(formik.values.lastdate)}
              onBlur={formik.handleBlur}
            />

            {/* <input
              type="date"
              className="form-control"
              name="nextdate"
              id="nextdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nextdate}
            /> */}
            {formik.errors.nextdate && formik.touched.nextdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.nextdate}
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

export default TicketAssigning;
