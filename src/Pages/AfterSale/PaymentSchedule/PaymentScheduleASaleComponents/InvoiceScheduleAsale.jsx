import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Toast from "../../../../Utils/Toast";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "primereact/dialog";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import { ThreeCircles } from "react-loader-spinner";

const InvoiceScheduleAsale = ({ eid, bookingid, status,pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [invoiceData, setInvoiceData] = useState([]);
  const [fillView, setFillView] = useState(false);
  const [editFillView, setEditFillView] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payinvoice/${bookingid}`
      );
      setInvoiceData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);
  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Invoice",
      selector: (row) => {
        const fileExtension = row.invoice_doc?.split(".").pop().toLowerCase();
        return row.invoice_doc ? (
          <button
            className="btn btn-outline-success me-1"
            onClick={() =>
              window.open(`${IMG_PATH}/payment/${row.invoice_doc}`, "_blank")
            }
          >
            {fileExtension === "pdf" ? <DescriptionIcon /> : <ImageIcon />}
          </button>
        ) : (
          "-"
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Add Details",
      selector: (row) => {
        return row.status === "recived" ? (
          <button
            className="btn1"
            onClick={() => {
              handleAmountEdit(row);
              setRowData(row);
            }}
          >
            <EditIcon /> Edit Details
          </button>
        ) : (
          <button
            className="btn1"
            onClick={() => {
              setFillView(true);
              setRowData(row);
            }}
          >
            <AddIcon /> Add Details
          </button>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Amount Paid",
      selector: (row) => row.paid_amount ?? "_",
      sortable: true,
      width: "150px",
    },
    {
      name: "Mode of Payment",
      selector: (row) => row.payment_mode ?? "_",
      sortable: true,
      width: "170px",
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date ?? "_",
      sortable: true,
      width: "150px",
    },
    {
      name: "Remarks",
      selector: (row) => row.remark ?? "_",
      sortable: true,
      width: "160px",
    },
  ];
  const handleAmountEdit = (row) => {
    setEditFillView(true);
    formik1.setFieldValue("paid_amount", row.paid_amount || "");
    formik1.setFieldValue("payment_mode", row.payment_mode || "");
    formik1.setFieldValue("payment_date", row.payment_date || "");
    formik1.setFieldValue("remark", row.remark || "");
    formik1.setFieldValue("id", row.id || "");
  };
  const handleAdd = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      id: rowData?.id,
    };
    try {
      await axios.post(`${API_BASE_URL}/invoicepaydetail`, payload);
      formik1.resetForm();
      fetchInvoice();
      setFillView(false);
      setEditFillView(false);
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

  return (
    <>
      <div className="col-12 mt-4 mb-2">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Invoice</h6>
            </div>
            <hr />
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
            ) : (
              <DataTable
                persistTableHead={true}
                columns={column}
                data={invoiceData}
                customStyles={customStyle}
                fixedHeader
              />
            )}
          </div>
        </div>
      </div>

      <Dialog
        visible={fillView}
        style={{ width: "62rem", height: "90vh" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Amount Details"
        modal
        onHide={() => {
          setFillView(false);
          formik1.resetForm();
        }}
      >
        <div className="row">
          <div className="col-6">
            <div className="mt-1">
              {rowData?.invoice_doc ? (
                <div className="card" style={{ width: "100%", height: "100%" }}>
                  {(() => {
                    const fileExtension = rowData.invoice_doc
                      .split(".")
                      .pop()
                      .toLowerCase();
                    const fileUrl = `${IMG_PATH}/payment/${rowData.invoice_doc}`;

                    return fileExtension === "pdf" ? (
                      <div className="">
                        <iframe
                          src={fileUrl}
                          title="PDF Preview"
                          style={{
                            border: "none",
                            height: "70vh",
                            width: "100%",
                          }}
                        />
                      </div>
                    ) : (
                      <img
                        src={fileUrl}
                        alt="invoice"
                        className="rounded"
                        style={{
                          height: "456px",
                          objectFit: "cover",
                        }}
                        onClick={() => window.open(fileUrl, "_blank")}
                      />
                    );
                  })()}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-6">
            <div>
              <form onSubmit={formik1.handleSubmit}>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Amount Paid</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      name="paid_amount"
                      id="paid_amount"
                      className="form-control"
                      placeholder="Enter amount paid  ..."
                      value={formik1.values.paid_amount}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.paid_amount &&
                    formik1.touched.paid_amount ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.paid_amount}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Mode of Payment</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      name="payment_mode"
                      id="payment_mode"
                      className="form-control"
                      placeholder="Enter mode of payment  ..."
                      value={formik1.values.payment_mode}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.payment_mode &&
                    formik1.touched.payment_mode ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.payment_mode}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Payment Date</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      name="payment_date"
                      id="payment_date"
                      className="form-control"
                      value={formik1.values.payment_date}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.payment_date &&
                    formik1.touched.payment_date ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.payment_date}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Remarks</label>
                  </div>
                  <div className="col-8">
                    <textarea
                      name="remark"
                      id="remark"
                      className="form-control"
                      placeholder="text here......"
                      value={formik1.values.remark}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.remark && formik1.touched.remark ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.remark}
                      </p>
                    ) : null}
                  </div>
                </div>
                {(status == "pending" || status == "complete") &&
                  staffid.Login == "staff" && (
                    <div className="d-flex gap-3 justify-content-end mt-3">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          formik1.resetForm();
                        }}
                      >
                        Clear
                      </Button>
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </div>
                  )}
              </form>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={editFillView}
        style={{ width: "62rem", height: "90vh" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update Amount Details"
        modal
        onHide={() => {
          setEditFillView(false);
          formik1.resetForm();
        }}
      >
        <div className="row">
          <div className="col-6">
            <div className="mt-1">
              {rowData?.invoice_doc ? (
                <div className="card" style={{ width: "100%", height: "100%" }}>
                  {(() => {
                    const fileExtension = rowData.invoice_doc
                      .split(".")
                      .pop()
                      .toLowerCase();
                    const fileUrl = `${IMG_PATH}/payment/${rowData.invoice_doc}`;

                    return fileExtension === "pdf" ? (
                      <div className="">
                        <iframe
                          src={fileUrl}
                          title="PDF Preview"
                          style={{
                            border: "none",
                            height: "70vh",
                            width: "100%",
                          }}
                        />
                      </div>
                    ) : (
                      <img
                        src={fileUrl}
                        alt="invoice"
                        className="rounded"
                        style={{
                          height: "456px",
                          objectFit: "cover",
                        }}
                        onClick={() => window.open(fileUrl, "_blank")}
                      />
                    );
                  })()}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-6">
            <div>
              <form onSubmit={formik1.handleSubmit}>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Amount Paid</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      name="paid_amount"
                      id="paid_amount"
                      className="form-control"
                      placeholder="Enter amount paid  ..."
                      value={formik1.values.paid_amount}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.paid_amount &&
                    formik1.touched.paid_amount ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.paid_amount}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Mode of Payment</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      name="payment_mode"
                      id="payment_mode"
                      className="form-control"
                      placeholder="Enter mode of payment  ..."
                      value={formik1.values.payment_mode}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.payment_mode &&
                    formik1.touched.payment_mode ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.payment_mode}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Payment Date</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      name="payment_date"
                      id="payment_date"
                      className="form-control"
                      value={formik1.values.payment_date}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.payment_date &&
                    formik1.touched.payment_date ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.payment_date}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className="form-label">Remarks</label>
                  </div>
                  <div className="col-8">
                    <textarea
                      name="remark"
                      id="remark"
                      className="form-control"
                      placeholder="text here......"
                      value={formik1.values.remark}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                    />
                    {formik1.errors.remark && formik1.touched.remark ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik1.errors.remark}
                      </p>
                    ) : null}
                  </div>
                </div>
                {(status === "pending" || status === "complete") &&
                  staffid.Login === "staff" && pagetype !== "reminder" && (
                    <div className="d-flex gap-3 justify-content-end mt-3">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          // setBookingVisible(false);
                          formik1.resetForm();
                        }}
                      >
                        Clear
                      </Button>
                      <Button variant="contained" type="submit">
                        Update
                      </Button>
                    </div>
                  )}
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default InvoiceScheduleAsale;
