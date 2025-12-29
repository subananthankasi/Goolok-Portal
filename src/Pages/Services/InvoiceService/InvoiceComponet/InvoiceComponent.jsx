import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import customStyle from "../../../../Utils/tableStyle";
import API_BASE_URL from "../../../../Api/api";
import axios from "axios";
import Toast from "../../../../Utils/Toast";
import { Calendar } from "primereact/calendar";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DownloadIcon from "@mui/icons-material/Download";
import logo from "../../../../Assets/images/Goolok Final Logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceDownload from "../../../Enquiry/Reusable/InvoiceDownload";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";

const InvoiceComponent = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const contentRef = useRef(null);

  const calculateTotals = () => {
    const subtotal = getData?.reduce((acc, item) => {
      const chargesTotal = Number(item.amount) || 0;
      return acc + chargesTotal;
    }, 0);
    const gst = subtotal * 0;
    // const total = subtotal + gst;
    const total = subtotal;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      subtotal: currencyFormatter.format(subtotal),
      gst: currencyFormatter.format(gst),
      total: currencyFormatter.format(total),
    };
  };
  const showEditColumn =
    staffid.logintype === "staff" &&
    pagetype !== "reminder" &&
    enquiryDoumentData?.status !== "live" &&
    getData[0]?.status !== "success";
  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Invoice date",
      selector: (row) => DateFormatcustom(row.invoice_date),
      sortable: true,
    },
    {
      name: "Invoice ID",
      selector: (row) => row.invoiceid,
      sortable: true,
    },
    {
      name: "Particular",
      selector: (row) => row.particular,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Payment Status",
      cell: (row) => (
        <div
          className="d-flex justify-content-center mt-3"
          style={{ textAlign: "center" }}
        >
          <p
            className={`badge ${row.status === "pending" ? "bg-danger" : "bg-success"
              }`}
            style={{ fontSize: "15px" }}
          >
            {row.status}
          </p>
        </div>
      ),
    },
    {
      name: "Download",
      cell: (row) => (
        <>
          <div className="d-flex">
            <button
              className="btn btn-outline-success me-1 edit"
              data-tooltip-id="edit"
              onClick={() => generatePdf(row)}
            >
              <DownloadIcon />
            </button>
          </div>
        </>
      ),
      sortable: true,
    },
    ...(showEditColumn
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
              </div>
            </>
          ),
          sortable: true,
        },
      ]
      : []),
  ];
  const generatePdf = () => {
    const input = contentRef.current;
    if (!input) {
      console.error("contentRef is not available");
      return;
    }

    input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
      input.style.display = "none";
    });
  };
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("invoicedate", row.invoice_date);
    formik.setFieldValue("particular", row.particular);
    formik.setFieldValue("amount", row.amount);
    formik.setFieldValue("id", row.id);
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      invoice: id,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/serviceinvoice`,
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
      setLoading(false);
    } catch (error) {
      Toast({ message: "Failed to save", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/serviceinvoice/${eid}/edit`
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
      invoicedate: "",
      particular: "",
      amount: "",
    },
    validationSchema: yup.object().shape({
      invoicedate: yup.string().required("invoicedate is required!!"),
      particular: yup.string().required("particular is required!!"),
      amount: yup
        .number()
        .typeError("amount must be a number")
        .required("amount is required!!"),
    }),
    onSubmit,
  });

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Invoice </h6>
            </div>

            <hr />
            <div>
              <div className="mt-2">
                {staffid.logintype === "staff" &&
                  (status === "complete" || status === "pending") &&
                  pagetype !== "reminder" &&
                  getData.length === 0 && (
                    <div className="d-flex justify-content-center mb-3">
                      <div className="ms-2">
                        <a
                          href="#"
                          className="btn1 me-2"
                          onClick={() => setNewDialog(true)}
                        >
                          + Create invoice
                        </a>
                      </div>
                    </div>
                  )}
                {getData.length !== 0 && (
                  <DataTable
                    persistTableHead={true}
                    columns={column1}
                    data={getData}
                    customStyles={customStyle}
                    pagination
                    fixedHeader
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Invoice "
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
            <label htmlFor="date" className="form-label">
              {" "}
              Invoice Date : <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              placement="topRight"
              name="invoicedate"
              value={
                formik.values.invoicedate
                  ? dayjs(formik.values.invoicedate, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) => {
                formik.setFieldValue(
                  "invoicedate",
                  date ? date?.format("YYYY-MM-DD") : ""
                );
                // formik.setFieldValue("closedate", "");
              }}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              //   disabledDate={(current) => current && current > dayjs()}
              onBlur={formik.handleBlur}
            />

            {/* <DatePicker
              selected={
                formik.values.invoicedate
                  ? new Date(formik.values.invoicedate)
                  : null
              }
              onChange={(date) => {
                if (date) {
                  const formattedDate = date
                    .toLocaleDateString("en-GB")
                    .split("/")
                    .reverse()
                    .join("-");
                  formik.setFieldValue("invoicedate", formattedDate);
                } else {
                  formik.setFieldValue("invoicedate", "");
                }
              }}
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
              className="form-control w-100"
              name="invoicedate"
            /> */}
            {formik.errors.invoicedate && formik.touched.invoicedate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.invoicedate}
              </p>
            ) : null}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="date" className="form-label">
              {" "}
              Amount : <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="amount"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              placeholder="Enter amount..."
            />
            {formik.errors.amount && formik.touched.amount ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.amount}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="date" className="form-label">
              {" "}
              Particular : <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="particular"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.particular}
              placeholder="text here..."
              style={{ height: "100px" }}
            />
            {formik.errors.particular && formik.touched.particular ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.particular}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(false)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Save"}
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Invoice "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
        baseZIndex={400}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              {" "}
              Invoice Date : <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              placement="topRight"
              name="invoicedate"
              value={
                formik.values.invoicedate
                  ? dayjs(formik.values.invoicedate, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) => {
                formik.setFieldValue(
                  "invoicedate",
                  date ? date?.format("YYYY-MM-DD") : ""
                );
                // formik.setFieldValue("closedate", "");
              }}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              //   disabledDate={(current) => current && current > dayjs()}
              onBlur={formik.handleBlur}
            />
            {/* <DatePicker
              selected={
                formik.values.invoicedate
                  ? new Date(formik.values.invoicedate)
                  : null
              }
              onChange={(date) => {
                if (date) {
                  const formattedDate = date
                    .toLocaleDateString("en-GB")
                    .split("/")
                    .reverse()
                    .join("-");
                  formik.setFieldValue("invoicedate", formattedDate);
                } else {
                  formik.setFieldValue("invoicedate", "");
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="form-control w-100"
              name="invoicedate"
            /> */}
            {formik.errors.invoicedate && formik.touched.invoicedate ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.invoicedate}
              </p>
            ) : null}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="date" className="form-label">
              {" "}
              Amount : <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="amount"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              placeholder="Enter amount..."
            />
            {formik.errors.amount && formik.touched.amount ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.amount}
              </p>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="date" className="form-label">
              {" "}
              Particular : <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="particular"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.particular}
              placeholder="text here..."
              style={{ height: "100px" }}
            />
            {formik.errors.particular && formik.touched.particular ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.particular}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(true)}
              disabled={loading}
            >
              {loading ? "submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* <article className="p-5 mt-5" ref={contentRef} style={{ background: "#fff", display: "none" }} >
                <h2 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h2>
                <hr />
                <div className="d-flex justify-content-between ">
                    <div className="mt-3 mb-5">
                        <img src={logo} alt="goolok" style={{ width: "150px", height: "35px" }} />
                        <div className="m-0">
                            <p className='p-0 m-0' style={{ fontSize: "20px" }} ><b>  Goolok Pvt ltd </b></p>
                            <p className='p-0 m-0' style={{ fontSize: "20px" }}> <b>2nd Floor, 129,</b></p>
                            <p className='p-0 m-0' style={{ fontSize: "20px" }}> <b>Nungambakkam, Chennai,</b> </p>
                            <p className='p-0 m-0' style={{ fontSize: "20px" }}> <b>Tamil Nadu 600034 </b></p>
                        </div>
                    </div>

                    <div className="mt-3 mb-5">
                        <p className="p-0 m-0" style={{ fontSize: "20px" }}><b>Invoice no : </b> {getData[0]?.invoiceid}  </p>
                        <p className="p-0 m-0" style={{ fontSize: "20px" }}><b> Name: </b> {getData[0]?.customer}  </p>
                        <p className="p-0 m-0" style={{ fontSize: "20px" }}><b> Date:</b> {getData[0]?.invoice_date} </p>
                        <p className="p-0 m-0" style={{ fontSize: "20px" }}><b>  Email:</b>{getData[0]?.email_id} </p>
                        <p className="p-0 m-0" style={{ fontSize: "20px" }}><b>  Mobile:</b>{getData[0]?.mobile} </p>

                    </div>

                </div>
                <section className="line-items  ">
                    <table className="items--table w-100 mt-5 p-2 table-bordered">
                        <thead className="p-1">
                            <tr className="p-1">
                                <th className="p-1 text-center" style={{ fontSize: "20px" }}>S.NO</th>
                                <th className='text-center' style={{ fontSize: "20px" }}>Qty</th>
                                <th className='text-center' style={{ fontSize: "20px" }}>Description</th>
                                <th className='text-center' style={{ fontSize: "20px" }}> Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getData?.map((item, index) => (
                                <>
                                    <tr className="p-1">
                                        <td className="p-1 text-center" style={{ fontSize: "20px" }}> 1</td>
                                        <td className='text-center' style={{ fontSize: "20px" }}>1</td>
                                        <td className='text-center' style={{ fontSize: "20px" }}>{item.particular} </td>
                                        <td className='text-center' style={{ fontSize: "20px" }}>₹ {item.amount} </td>
                                    </tr>
                                </>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className='text-end p-1' style={{ fontSize: "20px" }}>Sub Total</td>
                                <td colSpan="2" className='text-center' style={{ fontSize: "20px" }}>{calculateTotals().subtotal} </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className='text-end p-1' style={{ fontSize: "20px" }}> GST(0%)</td>
                                <td colSpan="2" className='text-center' style={{ fontSize: "20px" }}>0.00 </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className='text-end p-1' style={{ fontWeight: "600", fontSize: "20px" }}>Total</td>
                                <td colSpan="2" className='text-center' style={{ fontWeight: "600", fontSize: "20px" }}>{calculateTotals().total} </td>
                            </tr>

                        </tfoot>
                    </table>
                    <div className="mt-5 mb-5 w-50">
                        <p className="p-0 m-0 fw-bold" style={{ fontSize: "18px" }}>Terms & Conditions</p>
                        <p className='p-0 m-0' style={{ fontSize: "18px" }}>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
                    </div>
                </section>

            </article> */}
      <InvoiceDownload
        ref={contentRef}
        invoiceData={getData}
        calculateTotals={calculateTotals}
      />
    </>
  );
};

export default InvoiceComponent;
