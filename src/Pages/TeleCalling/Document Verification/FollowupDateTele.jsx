import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { Skeleton } from "primereact/skeleton";

const FollowupDateTele = ({ eid, id, status, telePageType }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));

  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [detailsData, setDetailsData] = useState([]);

  const token = localStorage.getItem("token");
  const parsedUser = token ? JSON.parse(token) : null;
  const userId = parsedUser ? parsedUser.loginid : null;

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Staff Name",
      selector: (row) => row.staff_name,
      sortable: true,
    },
    {
      name: "Last followup date",
      selector: (row) => row.last_followup,
      sortable: true,
    },
    {
      name: "Next followup date",
      selector: (row) => row.next_followup,
      sortable: true,
    },
    // {
    //   name: "Remarks",
    //   selector: (row) => row.remark,
    //   sortable: true,

    // },
    {
      name: "Remarks",
      selector: (row) => row.remark,
      sortable: true,
      cell: (row) => (
        <div
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.4",
            fontSize: "13px",
            padding: "5px",
          }}
        >
          {row.remark}
        </div>
      ),
    },

    ...(staffid.Login === "staff" &&
    (status === "pending" || status === "complete")
      ? [
          {
            name: "Action",
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
                    onClick={() => handleDelete(row)}
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
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/telecalldocument/${eid}/${userId}`,
        {
          headers: {
            "Gl-Status": telePageType,
          },
        }
      );
      const data = response.data;
      setDetailsData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      type: telePageType,
      userid: userId,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/telecalldocument`,
        payload
      );
      fetch();
      formik.resetForm();
      setNewDialog(false);
      Toast({ message: "Successfully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      lastfollowupdate: "",
      nextfollowupdate: "",
      remark: "",
    },
    validationSchema: yup.object().shape({
      lastfollowupdate: yup
        .string()
        .required("last followup date is required!!"),
      nextfollowupdate: yup
        .string()
        .required("next followup date isrequired!!"),
      remark: yup.string().required("remarks is required!!"),
    }),
    onSubmit,
  });
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };

  const handleDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const DeleteRow = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/ownerdelete/${deleteId}`,
        {}
      );
      Toast({ message: "Successfully Deleted", type: "success" });
      fetch();
    } catch (error) {
      console.error(error);
    } finally {
      fetch();
    }
    setDeleteDialog(false);
  };

  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button
        variant="outlined"
        color="error"
        onClick={() => setDeleteDialog(false)}
      >
        No
      </Button>
      <Button variant="contained" color="success" onClick={DeleteRow}>
        Yes
      </Button>
    </div>
  );
  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
  };
  const editHide = () => {
    setEditDialog(false);
    formik.resetForm();
  };

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("period", row.agree_period);
    formik.setFieldValue("startdate", row.agree_startdate);
    formik.setFieldValue("closedate", row.agree_closedate);
    formik.setFieldValue("extperiod", row.agree_extperiod);
    formik.setFieldValue("id", row.id);
  };
  return (
    <>
      {loading ? (
        <div className="col-lg-12 mb-4 mt-4">
          <Skeleton height="13rem" width="100%" className="mb-1 " />
        </div>
      ) : (
        <div className="col-12 mt-4">
          <div className="card shadow border-0 mb-4">
            <div className="card shadow border-0 p-4">
              <div className="d-flex justify-content-between">
                <h6>Followup details</h6>
                {staffid.Login === "staff" && (
                  <button className="btn1" onClick={() => setNewDialog(true)}>
                    {" "}
                    + Add
                  </button>
                )}
              </div>
              <hr />
              <DataTable
                persistTableHead={true}
                columns={columns}
                data={detailsData}
                customStyles={customStyle}
                pagination
                // selectableRows
                fixedHeader
              />
            </div>
          </div>
        </div>
      )}

      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Followup Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group mt-2">
            <label htmlFor="period" className="form-label">
              Last followup date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="lastfollowupdate"
              className="form-control"
              value={formik.values.lastfollowupdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Agreement lastfollowupdate"
            />

            {formik.errors.lastfollowupdate &&
            formik.touched.lastfollowupdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.lastfollowupdate}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="startdate" className="form-label">
              Next followup date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="nextfollowupdate"
              type="date"
              name="nextfollowupdate"
              className="form-control"
              value={formik.values.nextfollowupdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.nextfollowupdate &&
            formik.touched.nextfollowupdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.nextfollowupdate}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="closedate" className="form-label">
              Remarks <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="remark"
              className="form-control"
              value={formik.values.remark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.remark && formik.touched.remark ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.remark}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={() => setEditing(false)}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Dialog>
      {/**Delete */}
      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUnitsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="d-flex gap-2">
          <HelpOutlineIcon />
          <p>Are you sure you want to delete the selected row?</p>
        </div>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Land Owner Details"
        modal
        className="p-fluid"
        onHide={editHide}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group mt-2">
            <label htmlFor="period" className="form-label">
              Agreement Period <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="days"
              type="text"
              name="period"
              className="form-control"
              value={formik.values.period}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Agreement Period"
            />

            {formik.errors.period && formik.touched.period ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.period}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="startdate" className="form-label">
              Agreement Starting Date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="startdate"
              type="date"
              name="startdate"
              className="form-control"
              value={formik.values.startdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.startdate && formik.touched.startdate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.startdate}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="closedate" className="form-label">
              Agreement Closing Date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="closedate"
              type="date"
              name="closedate"
              className="form-control"
              value={formik.values.closedate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.closedate && formik.touched.closedate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.closedate}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="extperiod" className="form-label">
              Agreement Extending Period <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="extperiod"
              type="text"
              name="extperiod"
              className="form-control"
              value={formik.values.extperiod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Extending Period"
            />

            {formik.errors.extperiod && formik.touched.extperiod ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.extperiod}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={() => setEditing(true)}
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default FollowupDateTele;
