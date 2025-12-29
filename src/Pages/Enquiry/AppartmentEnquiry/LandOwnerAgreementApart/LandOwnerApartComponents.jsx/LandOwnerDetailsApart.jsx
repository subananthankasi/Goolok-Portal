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
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const LandOwnerDetailsApart = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [detailsData, setDetailsData] = useState([]);
  const [postLoading, setPostLoading] = useState(false)
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Agreement Period",
      selector: (row) => row.agree_period,
      sortable: true,
    },

    {
      name: "Agreement Starting Date",
      selector: (row) => row.agree_startdate,
      sortable: true,
    },
    {
      name: "Agreement Closing Date",
      selector: (row) => row.agree_closedate,
      sortable: true,
    },
    {
      name: "Agreement Excending Period",
      selector: (row) => row.agree_extperiod,
      sortable: true,
    },
    ...(staffid.logintype == "staff" &&
      (status === "pending" || status === "complete") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
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

  const fetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allowner/${eid}`);
      const data = response.data;
      setDetailsData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  // const onSubmit = async (values) => {
  //   if (editing) {
  //     setPostLoading(true)
  //     try {
  //       const response = await axios.post(
  //         `${API_BASE_URL}/enquirylandowner/add`,
  //         values,
  //         {}
  //       );
  //       Toast({ message: "Successfully Updated", type: "success" });
  //       setEditDialog(false);
  //       formik.resetForm();
  //       setPostLoading(false)
  //     } catch (error) {
  //       console.error(error);
  //       setPostLoading(false)
  //     } finally {
  //       fetch();
  //       setPostLoading(false)
  //     }
  //   } else {
  //     setPostLoading(true)
  //     try {
  //       const response = await axios.post(
  //         `${API_BASE_URL}/enquirylandowner/add`,
  //         values,
  //         {}
  //       );
  //       Toast({ message: "Successfully Added", type: "success" });
  //       setPostLoading(false)
  //     } catch (error) {
  //       console.error(error);
  //       setPostLoading(false)
  //     } finally {
  //       fetch();
  //       setPostLoading(false)
  //     }

  //     setNewDialog(false);
  //     formik.resetForm();
  //   }
  // };


  const onSubmit = async (values) => {

    setPostLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/enquirylandowner/add`,
        values,
        {}
      );
      Toast({ message: "Successfully Added", type: "success" });
      setPostLoading(false)
      setNewDialog(false);
      setEditing(false)
      formik.resetForm();
    } catch (error) {
      console.error(error);
      setPostLoading(false)
    } finally {
      fetch();
      setPostLoading(false)
    }



  };


  const formik = useFormik({
    initialValues: {
      period: "",
      startdate: "",
      closedate: "",
      extperiod: "",
      enqid: eid,
      id: null,
    },
    validationSchema: yup.object().shape({
      period: yup.string().required("agreement period is required!!"),
      startdate: yup.string().required("agreement starting date isrequired!!"),
      closedate: yup.string().required("agreement closing date is required!!"),
      extperiod: yup
        .string()
        .required("agreement extending period is required!!"),
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
    setEditing(false)
  };
  const editHide = () => {
    setEditDialog(false);
    formik.resetForm();
  };

  const handleEdit = (row) => {
    // setEditDialog(true);
    setNewDialog(true);
    setEditing(true)
    formik.setFieldValue("period", row.agree_period);
    formik.setFieldValue("startdate", row.agree_startdate);
    formik.setFieldValue("closedate", row.agree_closedate);
    formik.setFieldValue("extperiod", row.agree_extperiod);
    formik.setFieldValue("id", row.id);
  };
  const disableBeforeDate = (date) => (current) => {
    if (!date) return false;
    const start = dayjs(date, "YYYY-MM-DD");
    return current && current <= start;
  };

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-4">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Land Owner Agreement Details</h6>
              {staffid.logintype == "staff" &&
                (status === "complete" || status === "pending") &&
                pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" ? (
                <button className="btn1" onClick={() => setNewDialog(true)}>
                  {" "}
                  + Add{" "}
                </button>
              ) : null}
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

      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Land Owner Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
        baseZIndex={100}
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

            <DatePicker
              placement="topRight"
              name="startdate"
              value={
                formik.values.startdate
                  ? dayjs(formik.values.startdate, "YYYY-MM-DD")
                  : null
              }
              onChange={(startdate) => {
                formik.setFieldValue(
                  "startdate",
                  startdate ? startdate?.format("YYYY-MM-DD") : ""
                );
                formik.setFieldValue("closedate", "");
              }}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              //   disabledDate={(current) => current && current > dayjs()}
              onBlur={formik.handleBlur}
            />
            {/* 
            <input
              id="startdate"
              type="date"
              name="startdate"
              className="form-control"
              value={formik.values.startdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /> */}

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

            <DatePicker
              placement="topRight"
              name="closedate"
              value={
                formik.values.closedate
                  ? dayjs(formik.values.closedate, "YYYY-MM-DD")
                  : null
              }
              onChange={(closedate) =>
                formik.setFieldValue(
                  "closedate",
                  closedate ? closedate?.format("YYYY-MM-DD") : ""
                )
              }
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              disabledDate={disableBeforeDate(formik.values.startdate)}
              onBlur={formik.handleBlur}
            />
            {/* <input
              id="closedate"
              type="date"
              name="closedate"
              className="form-control"
              value={formik.values.closedate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /> */}

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
              // onClick={() => setEditing(false)}
              type="submit"
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : editing ? "Update" : "Save"}
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

    </>
  );
};

export default LandOwnerDetailsApart;
