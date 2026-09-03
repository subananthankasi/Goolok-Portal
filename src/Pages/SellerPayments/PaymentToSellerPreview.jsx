import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { SearchData } from "../../Utils/Search";
import CustomLoder from "../../Components/customLoader/CustomLoder";
import customStyle from "../../Utils/tableStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import StarsIcon from '@mui/icons-material/Stars';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Progress } from "antd";
import { bankGetThunk } from "../../Redux/Actions/MasterPage/BankThunk/BankThunk";
import { PaymentModeGetThunk } from "../../Redux/Actions/MasterPage/PaymentModeThunk/PaymentModeThunk";
import { useParams } from "react-router-dom";
import { decryptData } from "../../Utils/encrypt";
import Toast from "../../../src/Utils/Toast";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewPaymentDetails from "./ViewPaymentDetails";



function PaymentToSellerPreview() {
    const { eid } = useParams()
    const decryEid = decryptData(eid)
    const [newDialog, setNewDialog] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [getData, setGetData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [postLoading, setPostLoading] = useState(true)
    const [editDialog, setEditDialog] = useState(false);
    const [dataView, setDataView] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);


    const fetch = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                `${API_BASE_URL}/sellerpayment/${id}`);
            setIsLoading(false)
            setGetData(response.data);
        } catch (error) {
            setIsLoading(false)


        }
    };
    useEffect(() => {
        if (decryEid) {
            fetch(decryEid);
        }
    }, [decryEid]);


    // edit
    const [editData, setEditData] = useState();
    const formatDate = (date) => {
        if (!date) return "";

        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };


    const handleEdit = (row) => {
        setEditDialog(true);
        setEditData(row);
        formik.setFieldValue("date", formatDate(row.Date));
        formik.setFieldValue("prop_id", row.Prop_ID);
        formik.setFieldValue("seller_name", row.Seller_Name);
        formik.setFieldValue("mobile_no", row.Mobile_No);
        formik.setFieldValue("category", row.Category);
        formik.setFieldValue("sub_category", row.Sub_Category);
        formik.setFieldValue("total_seller_amount", row.Amount);
        // formik.setFieldValue("paid_amount", row.paid_amount);
        // formik.setFieldValue("balance_amount", row.balance_amount);
        // formik.setFieldValue("payment_type", row.payment_type);
        // formik.setFieldValue("payment_mode", row.payment_mode);
        // formik.setFieldValue("bank_name", row.bank_name);
        // formik.setFieldValue("transaction_id", row.transaction_id);
        // formik.setFieldValue("status", row.status);
        // formik.setFieldValue("attachment", row.attachment);
        formik.setFieldValue("id", row.id);

        const balance =
            Number(row.balance_amount) > 0
                ? Number(row.balance_amount)
                : Number(row.Amount);

        setAvailableAmount(balance);

        formik.setFieldValue("balance_amount", balance);

    };

    // delete
    const handleDelete = (row) => {

    };

    const openDelete = (row) => {
        // setDeleteDialog(true);
        // setDeleteId(row.id);
    };
    const [viewModal, setViewModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const handleViewPdf = (row) => {
        setPdfUrl(`${IMG_PATH}/sellerpayment/${row.attachment}`);
        setViewModal(true);
    };

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            wrap: true,
        },
        {
            name: "Date",
            selector: (row) => row.Date,
            sortable: true,
            wrap: true,
            width: "170px",
            // cell: (row) =>
            //     new Date(row.Date).toLocaleDateString("en-GB", {
            //         day: "2-digit",
            //         month: "short",
            //         year: "numeric",
            //     }),
        },
        {
            name: "Seller Name",
            selector: (row) => row.Seller_Name,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Mobile Number",
            selector: (row) => row.Mobile_No,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Category",
            selector: (row) => row.Category,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Sub Category",
            selector: (row) => row.Sub_Category,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Total Seller Amount",
            selector: (row) => row.Amount,
            wrap: true,
            sortable: true,
            width: "170px",
        },

        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex">
                    {row.payment_status !== "Completed" && (
                        <button
                            className="btn btn-outline-info me-1 edit"
                            data-tooltip-id="edit"
                            onClick={() => handleEdit(row)}
                        >
                            <EditIcon />
                        </button>
                    )}
                    <button
                        className="btn btn-outline-success delete"
                        data-tooltip-id="view"
                        onClick={() => setDataView(true)}
                    // onClick={() => openDelete(row)}
                    >
                        <VisibilityIcon />
                    </button>
                </div>
            ),
        },
    ];



    useEffect(() => {
        dispatch(bankGetThunk());
        dispatch(PaymentModeGetThunk());

    }, []);
    const bankData = useSelector(
        (state) => state.bankData?.get?.data
    );
    const paymentModeData = useSelector(
        (state) => state.paymentmodeData?.get?.data
    );

    const [availableAmount, setAvailableAmount] = useState(0);


    const validationSchema = yup.object({

        date: yup.string()
            .required("Date is required"),

        // paid_amount: yup.number()
        //     .typeError("Paid Amount must be a number")
        //     .required("Paid Amount is required")
        //     .min(0, "Paid Amount cannot be negative")
        //     .test(
        //         "paidAmount",
        //         "Paid Amount cannot be greater than Total Seller Amount",
        //         function (value) {
        //             const { total_seller_amount } = this.parent;

        //             if (!value) return true;

        //             return Number(value) <= Number(total_seller_amount);
        //         }
        //     ),
        paid_amount: yup
            .number()
            .required("Paid Amount is required")
            .test(
                "paidAmount",
                "Paid Amount cannot exceed available amount",
                function (value) {
                    if (!value) return true;

                    return Number(value) <= availableAmount;
                }
            ),
        payment_type: yup.string()
            .required("Payment Type is required"),

        payment_mode: yup.string()
            .required("Payment Mode is required"),

        bank_name: yup.string()
            .when("payment_mode", {
                is: (value) =>
                    value &&
                    value !== "Cash",
                then: (schema) => schema.required("Bank Name is required"),
                otherwise: (schema) => schema.notRequired(),
            }),

        transaction_id: yup.string()
            .when("payment_mode", {
                is: (value) =>
                    value &&
                    value !== "Cash",
                then: (schema) => schema.required("Transaction ID is required"),
                otherwise: (schema) => schema.notRequired(),
            }),

        status: yup.string()
            .required("Status is required"),

        attachment: yup.mixed()
            .required("Attachment is required"),
    });

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: decryEid,
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/sellerpayment`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setPostLoading(false)
            setEditDialog(false)
            formik.resetForm()
            fetch(decryEid)
            Toast({ message: "Payment To Seller Updated Successfully", type: 'success' })
        } catch (error) {
            setPostLoading(false)
            Toast({ message: "Failed to Update Payment To Seller", type: 'error' })
        }

    };
    const formik = useFormik({
        initialValues: {
            date: "",
            prop_id: "",
            seller_name: "",
            mobile_no: "",
            category: "",
            sub_category: "",
            total_seller_amount: "",
            paid_amount: "",
            balance_amount: "",
            payment_type: "",
            payment_mode: "",
            bank_name: "",
            transaction_id: "",
            status: "",
            attachment: null,
        },
        validationSchema: validationSchema,
        onSubmit,
    });



    // search function
    const [filterText, setFilterText] = useState("");
    const searchColumns = [
        "sno",
        "user",
        "mobile",
        "mail",
        "propertyid",
        "property_type",
        "total_amount"
    ];
    const handleFilter = (event) => {
        setFilterText(event.target.value);
    };
    const filterdata = SearchData(getData, filterText, searchColumns);


    return (
        <>

            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex">
                                        <div>
                                            <h4 className="page_heading">Payment TO Seller</h4>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="col-lg-12  mb-4">
                                        <div className="searchbar">
                                            <input
                                                type="text"
                                                className="search"
                                                onChange={handleFilter}
                                                placeholder="..Search"
                                            ></input>
                                        </div>
                                        <DataTable
                                            columns={columns}
                                            data={filterdata}
                                            customStyles={customStyle}
                                            // pagination
                                            // selectableRows
                                            persistTableHead={true}
                                            fixedHeader
                                            progressPending={isLoading}
                                            progressComponent={<CustomLoder />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ReactTooltip
                id="edit"
                place="bottom"
                content="Edit"
                style={{ fontSize: "10px" }}
            />
            <ReactTooltip
                id="view"
                place="bottom"
                content="view"
                style={{ fontSize: "10px" }}
            />
            <ReactTooltip
                id="add"
                place="bottom"
                content="Branch Creation"
                style={{ fontSize: "10px" }}
            />

            <Dialog
                visible={editDialog}
                style={{ width: "58rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Payment To Seller"
                modal
                className="p-fluid"
                onHide={() => {
                    setEditDialog(false);
                    formik.resetForm();
                }}

            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row">


                        {/* Date */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.date && formik.errors.date && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.date}</p>
                            )}
                        </div>

                        {/* Property ID */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Property ID</label>
                            <input
                                type="text"
                                name="prop_id"
                                className="form-control"
                                value={formik.values.prop_id}
                                readOnly
                            />
                        </div>

                        {/* Seller Name */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Seller Name</label>
                            <input
                                type="text"
                                name="seller_name"
                                className="form-control"
                                value={formik.values.seller_name}
                                readOnly
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Mobile Number</label>
                            <input
                                type="text"
                                name="mobile_no"
                                className="form-control"
                                value={formik.values.mobile_no}
                                readOnly
                            />
                        </div>

                        {/* Category */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                name="category"
                                className="form-control"
                                value={formik.values.category}
                                readOnly
                            />
                        </div>

                        {/* Sub Category */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Sub Category</label>
                            <input
                                type="text"
                                name="sub_category"
                                className="form-control"
                                value={formik.values.sub_category}
                                readOnly
                            />
                        </div>

                        {/* Total Seller Amount */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Total Seller Amount</label>
                            <input
                                type="number"
                                name="total_seller_amount"
                                className="form-control"
                                value={formik.values.total_seller_amount}
                                readOnly
                            />
                        </div>

                        {/* Paid Amount */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Paid Amount</label>
                            <input
                                type="text"
                                name="paid_amount"
                                className="form-control"
                                value={formik.values.paid_amount}
                                // onChange={(e) => {
                                //     const paid = Number(e.target.value);
                                //     const total = Number(formik.values.total_seller_amount);

                                //     formik.setFieldValue("paid_amount", paid);
                                //     formik.setFieldValue(
                                //         "balance_amount",
                                //         total - paid
                                //     );
                                // }}
                                onChange={(e) => {
                                    const paid = Number(e.target.value) || 0;

                                    if (paid > availableAmount) {
                                        return;
                                    }

                                    formik.setFieldValue("paid_amount", paid);

                                    formik.setFieldValue(
                                        "balance_amount",
                                        availableAmount - paid
                                    );
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.paid_amount && formik.errors.paid_amount && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.paid_amount}</p>
                            )}
                        </div>

                        {/* Balance Amount */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Balance Amount</label>
                            <input
                                type="number"
                                name="balance_amount"
                                className="form-control"
                                value={formik.values.balance_amount}
                                readOnly
                            />
                        </div>

                        {/* Payment Type */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Payment Type</label>
                            <select
                                name="payment_type"
                                className="form-control"
                                value={formik.values.payment_type}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select Payment Type</option>
                                <option value="Advance">Advance</option>
                                <option value="Partial">Partial</option>
                                <option value="Final">Final</option>
                                <option value="Refund">Refund</option>
                            </select>
                            {formik.touched.payment_type && formik.errors.payment_type && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.payment_type}</p>
                            )}
                        </div>

                        {/* Payment Mode */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Payment Mode</label>
                            <select
                                name="payment_mode"
                                className="form-control"
                                value={formik.values.payment_mode}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select Payment Mode</option>
                                {/* <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Cheque">Cheque</option>
                                <option value="NEFT">NEFT</option>
                                <option value="RTGS">RTGS</option> */}
                                {paymentModeData && paymentModeData.map((mode) => (
                                    <option key={mode.id} value={mode.id}>
                                        {mode.pay_mode}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.payment_mode && formik.errors.payment_mode && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.payment_mode}</p>
                            )}
                        </div>

                        {/* Bank Name */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Bank Name</label>
                            <select
                                name="bank_name"
                                className="form-control"
                                value={formik.values.bank_name}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select Bank</option>
                                {/* <option value="HDFC Bank">HDFC Bank</option>
                                <option value="ICICI Bank">ICICI Bank</option>
                                <option value="SBI">SBI</option>
                                <option value="Axis Bank">Axis Bank</option>
                                <option value="Indian Bank">Indian Bank</option>
                                <option value="Canara Bank">Canara Bank</option> */}
                                {bankData && bankData.map((bank) => (
                                    <option key={bank.id} value={bank.id}>
                                        {bank.bank_name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.bank_name && formik.errors.bank_name && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.bank_name}</p>
                            )}
                        </div>

                        {/* Transaction ID */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Transaction ID</label>
                            <input
                                type="text"
                                name="transaction_id"
                                className="form-control"
                                placeholder="Enter Transaction ID"
                                value={formik.values.transaction_id}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.transaction_id && formik.errors.transaction_id && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.transaction_id}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Status</label>
                            <select
                                name="status"
                                className="form-control"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select Status</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Partial Paid">Partial Paid</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            {formik.touched.status && formik.errors.status && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.status}</p>
                            )}
                        </div>
                        <div className="col-md-4 mt-2">
                            <label className="form-label">Remarks</label>
                            <textarea
                                type="text"
                                name="remark"
                                className="form-control"
                                placeholder="text here...!"
                                value={formik.values.remark}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.remark && formik.errors.remark && (
                                <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.remark}</p>
                            )}
                        </div>

                        {/* Attachment */}
                        <div className="col-md-6 mt-2">
                            <label className="form-label">Attachment</label>
                            <div className="d-flex gap-2 align-items-center">
                                <input
                                    type="file"
                                    name="attachment"
                                    className="form-control"
                                    onChange={(event) => {
                                        formik.setFieldValue(
                                            "attachment",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                />
                                {formik.touched.attachment && formik.errors.attachment && (
                                    <p className="text-danger mt-1" style={{ fontSize: "12px" }} >{formik.errors.attachment}</p>
                                )}

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleViewPdf(editData)}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end gap-2 mt-4">

                        <button
                            type="button"
                            className="btn1"
                            onClick={() => {
                                setEditDialog(false);
                                formik.resetForm();
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn1"
                        >
                            Update
                        </button>

                    </div>
                </form>
            </Dialog>

            <Dialog
                visible={viewModal}
                style={{ width: "58rem", height: "80vh" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="View Attachment"
                modal
                className="p-fluid"
                onHide={() => {
                    setViewModal(false);

                }}

            >
                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        title="PDF Viewer"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                    />
                )}
            </Dialog>

            <Dialog
                visible={dataView}
                style={{ width: "58rem", height: "auto" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Payment Details"
                modal
                className="p-fluid"
                onHide={() => {
                    setDataView(false);
                }}
                position="top"

            >
                <ViewPaymentDetails data={filterdata} />
            </Dialog>
        </>
    );
}

export default PaymentToSellerPreview;




