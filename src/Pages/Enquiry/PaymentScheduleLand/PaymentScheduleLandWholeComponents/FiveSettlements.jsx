import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import axios from "axios";

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
const headerStyle1 = {
  backgroundColor: "lightblue",
  fontWeight: "bold",
  textAlign: "center",
};

const highlightStyle = {
  backgroundColor: "#fce5cd",
  fontWeight: "bold",
};

const cellStyle = {
  border: "1px solid #000",
  padding: "8px",
};

const FiveSettlements = ({
  eid,
  id,
  status,
  bookingno,
  bookingid,
  paymentoption,
  readyCashData,
  fetchData,
  visible,
  setVisible,
}) => {
  const [newDialog1, setNewDialog1] = useState(false);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      paymentoption: paymentoption?.value,
    };
    try {
      await axios.post(`${API_BASE_URL}/transactions`, payload);
      formik.resetForm();
      fetchData();
      setVisible(false);
      Toast({ message: "Succefully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      booking_id: bookingno,
      total_extent: "",
      price_per_unit: "",
      total_cost: "",
      offer: "",
      peyable_amount: "",
      advance: "",
      balance: "",
    },
    validationSchema: yup.object().shape({
      booking_id: yup.string().required("booking id  is required!!"),
      total_extent: yup.string().required("total land extent is required!!"),
      price_per_unit: yup.string().required("price per unit is required!!"),
      total_cost: yup.string().required("total property cost is required!!"),
      offer: yup.string().required("offer & discount is required!!"),
      peyable_amount: yup.string().required("peyable amount is required!!"),
      advance: yup.string().required("advance amount is required!!"),
      balance: yup.string().required("balance payable is required!!"),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (visible && readyCashData.length > 0) {
      formik.setFieldValue("booking_id", bookingno);
      formik.setFieldValue("total_extent", readyCashData[0]?.land_extent || "");
      formik.setFieldValue(
        "price_per_unit",
        readyCashData[0]?.price_unit || ""
      );
      formik.setFieldValue("total_cost", readyCashData[0]?.prop_cost || "");
      formik.setFieldValue("offer", readyCashData[0]?.discount || "");
      formik.setFieldValue(
        "peyable_amount",
        readyCashData[0]?.amt_payable || ""
      );
      formik.setFieldValue("advance", readyCashData[0]?.adv_paid || "");
      formik.setFieldValue("balance", readyCashData[0]?.bal_payable || "");
      formik.setFieldValue("id", readyCashData[0]?.id || "");
    }
  }, [visible, readyCashData]);
  //........................................................

  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [getData, setGetData] = useState([]);
  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Payment Schedule",
      selector: (row) => row.sched_days,
      sortable: true,
    },
    {
      name: "Percentage amount",
      selector: (row) => row.pct_amt,
      sortable: true,
    },
    {
      name: "Payable Amount",
      selector: (row) => row.amt_payable,
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) => row.amt_paid,
      sortable: true,
    },
    {
      name: "Mode of Payment",
      selector: (row) => row.pay_mode,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.pay_date,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      sortable: true,
    },

    ...(staffid.logintype == "staff" &&
    (status === "complete" || status === "pending")
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
  const [paymentData, setPaymentData] = useState([]);
  const fetchPayment = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/${bookingid}/edit`
      );
      setPaymentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);

  const handleAdd = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
    };
    try {
      await axios.post(`${API_BASE_URL}/paymentadd`, payload);
      formik1.resetForm();
      fetchPayment();
      setNewDialog(false);
      setEditDialog(false);
      Toast({ message: "Succefully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };
  const formik1 = useFormik({
    initialValues: {
      sched_days: "",
      pct_amt: "",
      amt_payable: "",
      amt_paid: "",
      pay_mode: "",
      pay_date: "",
      remarks: "",
    },
    validationSchema: yup.object().shape({
      sched_days: yup.string().required(" schedule is required !!"),
      pct_amt: yup.string().required("percentage is required !!"),
      amt_payable: yup.string().required(" amount_payable is required !!"),
      amt_paid: yup.string().required(" paid amount is required !!"),
      pay_mode: yup.string().required(" pay mode is required !!"),
      pay_date: yup.string().required(" payment date is required !!"),
      remarks: yup.string().required(" remarks is required !!"),
    }),
    onSubmit: handleAdd,
  });

  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setdeleteId(row.id);
  };
  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/transactions/${deleteId}`
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetchPayment();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (row) => {
    setEditDialog(true);
    formik1.setFieldValue("sched_days", row.sched_days);
    formik1.setFieldValue("pct_amt", row.pct_amt);
    formik1.setFieldValue("amt_payable", row.amt_payable);
    formik1.setFieldValue("amt_paid", row.amt_paid);
    formik1.setFieldValue("pay_mode", row.pay_mode);
    formik1.setFieldValue("pay_date", row.pay_date);
    formik1.setFieldValue("remarks", row.remarks);
    formik1.setFieldValue("id", row.id);
  };
  return (
    <>
      <div className="container">
        {!visible &&
        readyCashData[0]?.pay_option === "5 Settlements" &&
        readyCashData.length > 0 ? (
          <>
            <table className="table table-bordered w-100" style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="2" style={{ ...cellStyle, ...headerStyle }}>
                    {" "}
                    &nbsp;&nbsp; 5 Settlements
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>Booking ID</td>
                  <td style={cellStyle}>{readyCashData[0]?.book_id} </td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Land Extent</td>
                  <td style={cellStyle}>{readyCashData[0]?.land_extent} </td>
                </tr>
                <tr>
                  <td style={cellStyle}>Price per unit</td>
                  <td style={cellStyle}> {readyCashData[0]?.price_unit}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Property Cost</td>
                  <td style={cellStyle}> {readyCashData[0]?.prop_cost}</td>
                </tr>
                <tr>
                  <td style={{ ...cellStyle, ...highlightStyle }}>
                    Offers & Discount
                  </td>
                  <td style={cellStyle}> {readyCashData[0]?.discount}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>
                    Total Amount Payable (After discount)
                  </td>
                  <td style={cellStyle}> {readyCashData[0]?.amt_payable}</td>
                </tr>
              </tbody>
            </table>
            <table
              className="table table-bordered w-100 mb-5"
              style={tableStyle}
            >
              <tbody>
                <tr>
                  <td style={cellStyle}>Advance Paid</td>
                  <td style={cellStyle}>{readyCashData[0]?.adv_paid} </td>
                </tr>
                <tr>
                  <td style={cellStyle}>Balance Payable</td>
                  <td style={cellStyle}>{readyCashData[0]?.bal_payable} </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          // <form onSubmit={formik.handleSubmit}>
          //   <div className="row">
          //     <div className="col-6">
          //       <div className="row">
          //         <div className="col-4">
          //           <label className="form-label">Booking Id</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="booking_id"
          //             id="booking_id"
          //             className="form-control"
          //             placeholder="Enter booking Id ..."
          //             value={formik.values.booking_id}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //             disabled
          //           />
          //           {formik.errors.booking_id && formik.touched.booking_id ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.booking_id}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //       <div className="row mt-3">
          //         <div className="col-4">
          //           <label className="form-label">Total Land Extent</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="total_extent"
          //             id="total_extent"
          //             className="form-control"
          //             placeholder="Enter total land extent ..."
          //             value={formik.values.total_extent}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.total_extent &&
          //           formik.touched.total_extent ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.total_extent}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //       <div className="row mt-3">
          //         <div className="col-4">
          //           <label className="form-label">Price per unit</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="price_per_unit"
          //             id="price_per_unit"
          //             className="form-control"
          //             placeholder="Enter price per unit ..."
          //             value={formik.values.price_per_unit}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.price_per_unit &&
          //           formik.touched.price_per_unit ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.price_per_unit}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //       <div className="row mt-3">
          //         <div className="col-4">
          //           <label className="form-label">Total Property Cost</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="total_cost"
          //             id="total_cost"
          //             className="form-control"
          //             placeholder="Enter total property Cost  ..."
          //             value={formik.values.total_cost}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.total_cost && formik.touched.total_cost ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.total_cost}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //       <div className="row mt-3">
          //         <div className="col-4">
          //           <label className="form-label">Offers & Discount</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="offer"
          //             id="offer"
          //             className="form-control"
          //             placeholder="Enter offer & discount  ..."
          //             value={formik.values.offer}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.offer && formik.touched.offer ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.offer}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //       <div className="row mt-3">
          //         <div className="col-4">
          //           <label className="form-label">
          //             Total Amount Payable (After discount)
          //           </label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="peyable_amount"
          //             id="peyable_amount"
          //             className="form-control"
          //             placeholder="Enter total amount payable  ..."
          //             value={formik.values.peyable_amount}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.peyable_amount &&
          //           formik.touched.peyable_amount ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.peyable_amount}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //     </div>
          //     <div
          //       className="col-6 border-start"
          //       style={{ borderLeft: "1px solid #ccc" }}
          //     >
          //       <div className="row">
          //         <div className="col-4">
          //           <label className="form-label">Advance Paid</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="advance"
          //             id="advance"
          //             className="form-control"
          //             placeholder="Enter advance paid  ..."
          //             value={formik.values.advance}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.advance && formik.touched.advance ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.advance}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //       <div className="row mt-3">
          //         <div className="col-4">
          //           <label className="form-label">Balance Payable</label>
          //         </div>
          //         <div className="col-8">
          //           <input
          //             type="text"
          //             name="balance"
          //             id="balance"
          //             className="form-control"
          //             placeholder="Enter balance payable amount  ..."
          //             value={formik.values.balance}
          //             onChange={formik.handleChange}
          //             onBlur={formik.handleBlur}
          //           />
          //           {formik.errors.balance && formik.touched.balance ? (
          //             <p style={{ color: "red", fontSize: "12px" }}>
          //               {formik.errors.balance}
          //             </p>
          //           ) : null}
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          //   <div className="d-flex gap-3 justify-content-end mt-3">
          //     <Button
          //       variant="outlined"
          //       color="error"
          //       onClick={() => {
          //         // setBookingVisible(false);
          //         formik.resetForm();
          //       }}
          //     >
          //       Clear
          //     </Button>
          //     <Button variant="contained" type="submit">
          //       {readyCashData.length > 0 ? "Update" : "Submit"}
          //     </Button>
          //   </div>
          // </form>
          <div className="d-flex justify-content-center">
            <button className="btn1" onClick={()=>setNewDialog1(true)}>Create 5 Settelment </button>
          </div>
        )}

        <hr />
        <div className=" mt-4">
          <div className="d-flex justify-content-between">
            <h6>Payment Schedule Details</h6>
            {staffid.logintype == "staff" &&
              (status === "complete" || status === "pending") && (
                <div className="ms-2">
                  {/* <a
                  href="#"
                  onClick={() => setNewDialog(true)}
                  className="btn1 me-2"
                >
                  + Add
                </a> */}
                  <Button
                    variant="contained"
                    onClick={() => setNewDialog(true)}
                  >
                    Add
                  </Button>
                </div>
              )}
          </div>
          {/* <hr /> */}
          <div className="mt-2">
            <table className="table table-bordered w-100" style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Payment Schedule{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Percentage amount{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Payable Amount{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Amount Paid{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Mode of Payment{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Payment Date{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Remarks{" "}
                  </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}>
                    {" "}
                    &nbsp;&nbsp; Actions{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentData.length > 0 ? (
                  paymentData.map((item, index) => (
                    <tr key={index}>
                      <td style={cellStyle}>{item.sched_days}</td>
                      <td style={cellStyle}>{item.pct_amt}</td>
                      <td style={cellStyle}>{item.amt_payable}</td>
                      <td style={cellStyle}>{item.amt_paid}</td>
                      <td style={cellStyle}>{item.pay_mode}</td>
                      <td style={cellStyle}>
                        {DateFormatcustom(item.pay_date)}
                      </td>
                      <td style={cellStyle}>{item.remarks}</td>
                      {staffid.logintype == "staff" &&
                        (status === "complete" || status === "pending") && (
                          <td style={cellStyle}>
                            <div className="d-flex">
                              <button
                                className="btn btn-outline-info me-1 edit"
                                data-tooltip-id="edit"
                                onClick={() => handleEdit(item)}
                              >
                                <EditIcon />
                              </button>
                              <button
                                className="btn btn-outline-danger delete"
                                data-tooltip-id="delete"
                                onClick={() => handleDeleteOpen(item)}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </td>
                        )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-3">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
              {paymentData.length > 0 && (
                <tfoot>
                  <tr>
                    <td style={cellStyle} colSpan={2} className="text-center">
                      <strong>Total Amounts</strong>
                    </td>
                    <td style={cellStyle}>
                      <strong>
                        {paymentData
                          .reduce(
                            (total, item) =>
                              total + parseFloat(item.amt_payable || 0),
                            0
                          )
                          .toFixed(2)}
                      </strong>
                    </td>
                    <td style={cellStyle}>
                      <strong>
                        {paymentData
                          .reduce(
                            (total, item) =>
                              total + parseFloat(item.amt_paid || 0),
                            0
                          )
                          .toFixed(2)}
                      </strong>
                    </td>
                    <td style={cellStyle} colSpan={4}></td>
                  </tr>
                </tfoot>
              )}
            </table>
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
          formik1.resetForm();
        }}
      >
        <form onSubmit={formik1.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Payment Schedule :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="sched_days"
              id="sched_days"
              placeholder="Enter payment schedule..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.sched_days}
            />

            {formik1.errors.sched_days && formik1.touched.sched_days ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.sched_days}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Percentage amount :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="pct_amt"
              id="pct_amt"
              placeholder="Enter percentage amount..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.pct_amt}
            />

            {formik1.errors.pct_amt && formik1.touched.pct_amt ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.pct_amt}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Payable Amount :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="amt_payable"
              id="amt_payable"
              placeholder="Enter payable amount..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.amt_payable}
            />

            {formik1.errors.amt_payable && formik1.touched.amt_payable ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.amt_payable}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Amount Paid :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="amt_paid"
              id="amt_paid"
              placeholder="Enter amount paid..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.amt_paid}
            />

            {formik1.errors.amt_paid && formik1.touched.amt_paid ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.amt_paid}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Mode of Payment :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="pay_mode"
              id="pay_mode"
              placeholder="Enter payment mode ..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.pay_mode}
            />

            {formik1.errors.pay_mode && formik1.touched.pay_mode ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.pay_mode}
              </p>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Payment Date :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="pay_date"
              id="pay_date"
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.pay_date}
            />
            {formik1.errors.pay_date && formik1.touched.pay_date ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.pay_date}
              </p>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <label className="form-label">
              Remark:<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <textarea
              type="text"
              className="form-control"
              name="remarks"
              id="remarks"
              placeholder=" text here..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.remarks}
            />
            {formik1.errors.remarks && formik1.touched.remarks ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.remarks}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end mt-2">
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
        header="Add "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik1.resetForm();
        }}
      >
        <form onSubmit={formik1.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">
              {" "}
              Payment Schedule :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="sched_days"
              id="sched_days"
              placeholder="Enter payment schedule..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.sched_days}
            />

            {formik1.errors.sched_days && formik1.touched.sched_days ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.sched_days}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Percentage amount :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="pct_amt"
              id="pct_amt"
              placeholder="Enter percentage amount..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.pct_amt}
            />

            {formik1.errors.pct_amt && formik1.touched.pct_amt ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.pct_amt}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Payable Amount :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="amt_payable"
              id="amt_payable"
              placeholder="Enter payable amount..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.amt_payable}
            />

            {formik1.errors.amt_payable && formik1.touched.amt_payable ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.amt_payable}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Amount Paid :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="amt_paid"
              id="amt_paid"
              placeholder="Enter amount paid..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.amt_paid}
            />

            {formik1.errors.amt_paid && formik1.touched.amt_paid ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.amt_paid}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Mode of Payment :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="pay_mode"
              id="pay_mode"
              placeholder="Enter payment mode ..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.pay_mode}
            />

            {formik1.errors.pay_mode && formik1.touched.pay_mode ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.pay_mode}
              </p>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <label className="form-label">
              {" "}
              Payment Date :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="pay_date"
              id="pay_date"
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.pay_date}
            />
            {formik1.errors.pay_date && formik1.touched.pay_date ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.pay_date}
              </p>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <label className="form-label">
              Remark:<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <textarea
              type="text"
              className="form-control"
              name="remarks"
              id="remarks"
              placeholder=" text here..."
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              value={formik1.values.remarks}
            />
            {formik1.errors.remarks && formik1.touched.remarks ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik1.errors.remarks}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end mt-2">
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
      <Dialog
        visible={newDialog1}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create 5 Settlements"
        modal
        onHide={() => setNewDialog1(false)}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-4">
                  <label className="form-label">Booking Id</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="booking_id"
                    id="booking_id"
                    className="form-control"
                    placeholder="Enter booking Id ..."
                    value={formik.values.booking_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.errors.booking_id && formik.touched.booking_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.booking_id}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label className="form-label">Total Land Extent</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="total_extent"
                    id="total_extent"
                    className="form-control"
                    placeholder="Enter total land extent ..."
                    value={formik.values.total_extent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.total_extent && formik.touched.total_extent ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_extent}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label className="form-label">Price per unit</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="price_per_unit"
                    id="price_per_unit"
                    className="form-control"
                    placeholder="Enter price per unit ..."
                    value={formik.values.price_per_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.price_per_unit &&
                  formik.touched.price_per_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.price_per_unit}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label className="form-label">Total Property Cost</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="total_cost"
                    id="total_cost"
                    className="form-control"
                    placeholder="Enter total property Cost  ..."
                    value={formik.values.total_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.total_cost && formik.touched.total_cost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_cost}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label className="form-label">Offers & Discount</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="offer"
                    id="offer"
                    className="form-control"
                    placeholder="Enter offer & discount  ..."
                    value={formik.values.offer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.offer && formik.touched.offer ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.offer}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label className="form-label">
                    Total Amount Payable (After discount)
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="peyable_amount"
                    id="peyable_amount"
                    className="form-control"
                    placeholder="Enter total amount payable  ..."
                    value={formik.values.peyable_amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.peyable_amount &&
                  formik.touched.peyable_amount ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.peyable_amount}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className="col-6 border-start"
              style={{ borderLeft: "1px solid #ccc" }}
            >
              <div className="row">
                <div className="col-4">
                  <label className="form-label">Advance Paid</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="advance"
                    id="advance"
                    className="form-control"
                    placeholder="Enter advance paid  ..."
                    value={formik.values.advance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.advance && formik.touched.advance ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.advance}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label className="form-label">Balance Payable</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="balance"
                    id="balance"
                    className="form-control"
                    placeholder="Enter balance payable amount  ..."
                    value={formik.values.balance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.balance && formik.touched.balance ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.balance}
                    </p>
                  ) : null}
                </div>
              </div>
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
              {readyCashData.length > 0 ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default FiveSettlements;
