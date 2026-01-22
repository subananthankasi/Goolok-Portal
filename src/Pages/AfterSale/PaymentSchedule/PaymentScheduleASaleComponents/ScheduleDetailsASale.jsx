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

const ScheduleDetailsASale = ({
  eid,
  status,
  bookingid,
  pagetype,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [amountDetails, setAmountDetails] = useState([]);
  const [deleteDialog1, setDeleteDialog1] = useState(false);
  const [newDialog1, setNewDialog1] = useState(false);
  const [editDialog1, setEditDialog1] = useState(false);

  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: " Payment Schedule",
      selector: (row) => row.sched_days,
      sortable: true,
      width: "170px",
    },
    {
      name: "Percentage of Amount",
      selector: (row) => `${row.pct_amt}%`,
      sortable: true,
      width: "170px",
    },
    {
      name: "Payable Amount",
      selector: (row) => row.amt_payable,
      sortable: true,
      width: "170px",
    },
    {
      name: "Payable Date",
      selector: (row) => row.pay_date,
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
                    onClick={() => handleScheduleEdit(row)}
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

  const handleAdd = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      type: "paid",
    };
    try {
      await axios.post(`${API_BASE_URL}/paymentadd`, payload);
      formik1.resetForm();
      fetchAmount();
      setNewDialog1(false);
      setEditDialog1(false);
      Toast({ message: "Succefully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };
  const formik1 = useFormik({
    initialValues: {
      paid_amount: "",
      payment_mode: "",
      payment_date: "",
      remark: "",
    },
    validationSchema: yup.object().shape({
      paid_amount: yup.string().required("amount paid is required!!"),
      payment_mode: yup.string().required("mode of payment is required!!"),
      payment_date: yup.string().required("date of payment is required!!"),
      remark: yup.string().required("remark is required!!"),
    }),
    onSubmit: handleAdd,
  });

  const handleAmountEdit = (row) => {

    setEditDialog1(true);
    formik1.setFieldValue("paid_amount", row.amt_paid || "");
    formik1.setFieldValue("payment_mode", row.pay_mode || "");
    formik1.setFieldValue("payment_date", row.pay_date || "");
    formik1.setFieldValue("remark", row.remarks || "");
    formik1.setFieldValue("id", row.id || "");
  };
  const fetchAmount = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/${bookingid}/edit`,
        {
          headers: {
            "Gl-Status": "paid",
          },
        }
      );
      setAmountDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleDeleteOpen1 = async (row) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/transactions/${row.id}`,
        {
          headers: {
            "Gl-Status": "paid",
          },
        }
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetchAmount();
      setDeleteDialog1(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSchdeuleAdd = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      type: "payable",
    };
    try {
      await axios.post(`${API_BASE_URL}/paymentadd`, payload);
      formik2.resetForm();
      fetchSchedule();
      setNewDialog(false);
      setEditDialog(false);
      Toast({ message: "Succefully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };
  const formik2 = useFormik({
    initialValues: {
      Schedule: "",
      percentage: "",
      payment_date: "",
      payable_amount: "",
    },
    validationSchema: yup.object().shape({
      Schedule: yup.string().required("Schedule is required!!"),
      percentage: yup
        .number()
        .typeError("Percentage must be a number")
        .required("Percentage is required!!"),
      payment_date: yup.string().required("date of payable is required!!"),
      payable_amount: yup.string().required("payable amount is required!!"),
    }),
    onSubmit: handleSchdeuleAdd,
  });
  const handleScheduleEdit = (row) => {
    setEditDialog(true);
    formik2.setFieldValue("Schedule", row.sched_days || "");
    formik2.setFieldValue("percentage", row.pct_amt || "");
    formik2.setFieldValue("payment_date", row.pay_date || "");
    formik2.setFieldValue("payable_amount", row.amt_payable || "");
    formik2.setFieldValue("id", row.id || "");
  };
  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleSchduleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/transactions/${deleteId}`,
        {
          headers: {
            "Gl-Status": "payable",
          },
        }
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetchSchedule();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSchedule();
  }, []);
  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/${bookingid}/edit`,
        {
          headers: {
            "Gl-Status": "payable",
          },
        }
      );
      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="col-12 mt-4 mb-2">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Payment Schedule Details</h6>
               {(status === "pending"||status === "complete") && staffid.Login === "staff" && (
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
              columns={column}
              data={scheduleData}
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
        header="Create Payment Schedule  Details"
        modal
        onHide={() => {
          setNewDialog(false);
          formik2.resetForm();
        }}
      >
        <form onSubmit={formik2.handleSubmit}>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payment Schedule </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="Schedule"
                id="Schedule"
                className="form-control"
                placeholder="Enter payment Schedule  ..."
                value={formik2.values.Schedule}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.Schedule && formik2.touched.Schedule ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.Schedule}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payment Percentage</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="percentage"
                id="percentage"
                className="form-control"
                placeholder="Enter payment Percentage  ..."
                value={formik2.values.percentage}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.percentage && formik2.touched.percentage ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.percentage}
                </p>
              ) : null}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payable Amount</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="payable_amount"
                id="payable_amount"
                className="form-control"
                placeholder="Enter payable amount  ..."
                value={formik2.values.payable_amount}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.payable_amount &&
              formik2.touched.payable_amount ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.payable_amount}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payable Date</label>
            </div>
            <div className="col-8">
              <input
                type="date"
                name="payment_date"
                id="payment_date"
                className="form-control"
                value={formik2.values.payment_date}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.payment_date && formik2.touched.payment_date ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.payment_date}
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
                formik2.resetForm();
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
        header="Update Payment Schedule  Details"
        modal
        onHide={() => {
          setEditDialog(false);
          formik2.resetForm();
        }}
      >
        <form onSubmit={formik2.handleSubmit}>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payment Schedule </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="Schedule"
                id="Schedule"
                className="form-control"
                placeholder="Enter payment Schedule  ..."
                value={formik2.values.Schedule}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.Schedule && formik2.touched.Schedule ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.Schedule}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payment Percentage</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="percentage"
                id="percentage"
                className="form-control"
                placeholder="Enter payment Percentage  ..."
                value={formik2.values.percentage}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.percentage && formik2.touched.percentage ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.percentage}
                </p>
              ) : null}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payable Amount</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="payable_amount"
                id="payable_amount"
                className="form-control"
                placeholder="Enter payable amount  ..."
                value={formik2.values.payable_amount}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.payable_amount &&
              formik2.touched.payable_amount ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.payable_amount}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="form-label">Payable Date</label>
            </div>
            <div className="col-8">
              <input
                type="date"
                name="payment_date"
                id="payment_date"
                className="form-control"
                value={formik2.values.payment_date}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
              {formik2.errors.payment_date && formik2.touched.payment_date ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik2.errors.payment_date}
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
                formik2.resetForm();
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
          <Button variant="contained" onClick={handleSchduleDelete}>
            Yes
          </Button>
        </div>
      </Dialog>
    
    </>
  );
};

export default ScheduleDetailsASale;
