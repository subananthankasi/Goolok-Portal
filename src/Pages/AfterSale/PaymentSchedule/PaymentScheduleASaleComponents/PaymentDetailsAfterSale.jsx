import React, {  useState } from "react";
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
import ScheduleDetailsASale from "./ScheduleDetailsASale";
import InvoiceScheduleAsale from "./InvoiceScheduleAsale";
import BankingDetailsAsale from "./BankingDetailsAsale";
import { ThreeCircles } from "react-loader-spinner";

const PaymentDetailsAfterSale = ({
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
  pagetype,
  loading,
  setLoading,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      report_type: "payable",
      paymentoption: paymentoption?.value,
    };
    try {
      await axios.post(`${API_BASE_URL}/transactions`, payload);
      formik.resetForm();
      fetchData();
      setNewDialog(false);
      setEditDialog(false);
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

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("booking_id", bookingno);
    formik.setFieldValue("total_extent", row.land_extent || "");
    formik.setFieldValue("price_per_unit", row.price_unit || "");
    formik.setFieldValue("total_cost", row.prop_cost || "");
    formik.setFieldValue("offer", row.discount || "");
    formik.setFieldValue("peyable_amount", row.amt_payable || "");
    formik.setFieldValue("advance", row.adv_paid || "");
    formik.setFieldValue("balance", row.bal_payable || "");
    formik.setFieldValue("id", row.id || "");
  };

  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: " Booking ID",
      selector: (row) => row.book_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Land Extent",
      selector: (row) => row.land_extent,
      sortable: true,
      width: "170px",
    },
    {
      name: "Price per unit",
      selector: (row) => row.price_unit,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Property Cost",
      selector: (row) => row.prop_cost,
      sortable: true,
      width: "180px",
    },
    {
      name: "Offers & Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "170px",
    },
    {
      name: "Total Amount Payable (After discount)",
      selector: (row) => row.amt_payable,
      sortable: true,
      width: "210px",
    },
    {
      name: "Advance Paid",
      selector: (row) => row.adv_paid,
      sortable: true,
      width: "170px",
    },
    {
      name: "Balance Payable",
      selector: (row) => row.bal_payable,
      sortable: true,
      width: "170px",
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

  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cancelpay/${deleteId}`
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetchData();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-12 mt-4 mb-2">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            {loading?(
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
            ): readyCashData.length > 0 ? (
              <div>
                <DataTable
                  persistTableHead={true}
                  columns={column}
                  data={readyCashData}
                  customStyles={customStyle}
                  //   pagination
                  fixedHeader
                />
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <button
                  className="btn1"
                  onClick={() => {
                    if (paymentoption?.label) {
                      setNewDialog(true);
                    } else {
                      alert("Please select a payment option!");
                    }
                  }}
                >
                  Create {paymentoption?.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {paymentoption?.value && paymentoption?.value !== "Ready Cash" && (
        <ScheduleDetailsASale
          eid={eid}
          id={id}
          status={status}
          bookingno={bookingno}
          bookingid={bookingid}
          readyCashData={readyCashData}
          fetchData={fetchData}
          visible={visible}
          setVisible={setVisible}
          pagetype={pagetype}
        />
      )}
      <InvoiceScheduleAsale
        eid={eid}
        id={id}
        status={status}
        bookingno={bookingno}
        bookingid={bookingid}
        readyCashData={readyCashData}
        fetchData={fetchData}
        visible={visible}
        setVisible={setVisible}
        pagetype={pagetype}
      />

      {paymentoption?.value === "Bank Loan" && (
        <BankingDetailsAsale
          eid={eid}
          id={id}
          status={status}
          bookingno={bookingno}
          bookingid={bookingid}
          readyCashData={readyCashData}
          fetchData={fetchData}
          visible={visible}
          setVisible={setVisible}
          pagetype={pagetype}
        />
      )}

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
      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Create ${paymentoption?.label} Details`}
        modal
        onHide={() => setNewDialog(false)}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="">
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
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Update ${paymentoption?.label} Details`}
        modal
        onHide={() => setEditDialog(false)}
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
              Update
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default PaymentDetailsAfterSale;
