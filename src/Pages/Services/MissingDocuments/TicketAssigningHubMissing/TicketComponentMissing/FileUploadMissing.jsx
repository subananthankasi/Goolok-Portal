import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DatePicker from "react-datepicker";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useSelector } from "react-redux";

const FileUploadMissing = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [editing, setEditing] = useState(false);
    const [newDialog, setNewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState(null);
    const [getData, setGetData] = useState([]);
    const fileRef = useRef(null);
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
            name: " File",
            selector: (row) => row.document,
            sortable: true,
            cell: (row) =>
                row.document ? (
                    <a
                        href={`${IMG_PATH}/service/document/${row.document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <i
                            className="pi pi-file-pdf"
                            style={{ fontSize: "1.5rem", color: "red" }}
                        ></i>
                    </a>
                ) : (
                    <span>No File</span>
                ),
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
                `${API_BASE_URL}/missingdocdelete/${deleteId}`
            );
            Toast({ message: "Successfully deleted", type: "success" });
            fetch();
            setDeleteDialog(false);
        } catch (error) {
            console.error(error);
        }
    };
    const [pdfUrl, setPdfUrl] = useState(null);
    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("file", row.document);
        formik.setFieldValue("id", row.id);
        const docUrl = `${IMG_PATH}/service/document/${row.document}`;
        setPdfUrl(docUrl);
    };
    const viewFile = () => {
        window.open(pdfUrl, "_blank");
    };
    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: eid,
        };
        setPostLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/addmissingdoc`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            fetch();
            if (editing) {
                Toast({ message: "Successfully Updated", type: "success" });
                setEditDialog(false);
            } else {
                Toast({ message: "Successfully Submited", type: "success" });
                setNewDialog(false);
                setEditDialog(false);
            }
            formik.resetForm();
            setPostLoading(false);
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" });
            setPostLoading(false);
        }
    };
    const fetch = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/missingdoclist/${eid}`,
                {}
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
            file: null,
        },
        validationSchema: yup.object().shape({
            file: yup.string().required("File is required !!"),
        }),
        onSubmit,
    });
    //...............................................
    const [getDate, setGetdate] = useState([]);
    const fetchDate = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/applicationlist/${eid}`,
                {}
            );
            setGetdate(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDate();
    }, []);
    const formatDate = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();

        return `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
    };

    const formik1 = useFormik({
        initialValues: {
            application_no: "",
            application_date: null,
        },
        validationSchema: yup.object().shape({
            application_no: yup.string().required("application_no is required !!"),
            application_date: yup
                .string()
                .required("application_date is required !!"),
        }),
        onSubmit: async (values) => {
            // const payload = {
            //     ...values,
            //     application_date: values.application_date.toLocaleDateString(),
            //     id: id,
            // }
            const payload = {
                ...values,
                application_date: values.application_date
                    ? formatDate(values.application_date)
                    : "",
                id,
            };
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/addappdetails`,
                    payload
                );
                fetchDate();
                if (editing) {
                    Toast({ message: "Successfully Updated", type: "success" });
                } else {
                    Toast({ message: "Successfully Submited", type: "success" });
                }
                formik.resetForm();
            } catch (error) {
                Toast({ message: "Failed to save", type: "error" });
            }
        },
    });
    // useEffect(() => {
    //     if (getDate.length > 0) {
    //         const rawDate = getDate[0].application_date;
    //         const parsedDate = new Date(rawDate);

    //         formik1.setFieldValue("application_date", parsedDate);
    //         formik1.setFieldValue("application_no", getDate[0].application_no);
    //         formik1.setFieldValue("id", getDate[0].id);
    //     }
    // }, [getDate]);

    useEffect(() => {
        if (getDate.length > 0) {
            const rawDate = getDate[0].application_date;

            formik1.setFieldValue(
                "application_date",
                rawDate ? new Date(rawDate) : null
            );
            formik1.setFieldValue("application_no", getDate[0].application_no);
            formik1.setFieldValue("id", getDate[0].id);
        }
    }, [getDate]);

    return (
        <>
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between mt-2">
                            <h6>Application Details</h6>
                            <form onSubmit={formik1.handleSubmit}>
                                <div className="d-flex gap-3">
                                    <div className="">
                                        <FloatLabel>
                                            <InputText
                                                name="application_no"
                                                value={formik1.values.application_no}
                                                onChange={formik1.handleChange}
                                                style={{ fontSize: "13px", height: "35px" }}
                                            />
                                            <label htmlFor="application" style={{ fontSize: "13px" }}>
                                                Application Number{" "}
                                            </label>
                                        </FloatLabel>
                                        {formik1.errors.application_no &&
                                            formik1.touched.application_no ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik1.errors.application_no}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <FloatLabel>
                                            <Calendar
                                                name="application_date"
                                                value={formik1.values.application_date}
                                                // onChange={(date) => formik1.setFieldValue("application_date", date)}
                                                onChange={(e) =>
                                                    formik1.setFieldValue("application_date", e.value)
                                                }
                                                inputId="application_date"
                                                style={{ fontSize: "13px", height: "35px" }}
                                                dateFormat="dd/mm/yy"
                                                showIcon
                                            />
                                            <label
                                                htmlFor="application_date"
                                                style={{ fontSize: "13px" }}
                                            >
                                                Application Date
                                            </label>
                                        </FloatLabel>
                                        {formik1.errors.application_date &&
                                            formik1.touched.application_date ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik1.errors.application_date}
                                            </p>
                                        ) : null}
                                    </div>
                                    {staffid.logintype == "staff" &&
                                        (status === "complete" || status === "pending") &&
                                        pagetype !== "reminder" &&
                                        enquiryDoumentData?.status !== "live" && (
                                            <div>
                                                <button className="btn1" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                </div>
                            </form>
                        </div>

                        <hr />
                        <div className="mt-2 ">
                            <div className="d-flex justify-content-end mb-3">
                                {staffid.logintype == "staff" &&
                                    (status === "complete" || status === "pending") &&
                                    pagetype !== "reminder" &&
                                    enquiryDoumentData?.status !== "live" && (
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
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label className="form-label">
                            {" "}
                            File :<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            id="file"
                            ref={fileRef}
                            accept="application/pdf"
                            onChange={(e) =>
                                formik.setFieldValue("file", e.currentTarget.files[0])
                            }
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.file && formik.touched.file ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.file}
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
                    {postLoading && (
                        <p
                            className="text-center mt-3"
                            style={{ fontSize: "13px", color: "green" }}
                        >
                            {" "}
                            Please wait while file is uploading...!
                        </p>
                    )}
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
                    formik.resetForm();
                }}
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group mt-2">
                        <label className="form-label">
                            {" "}
                            Measurment File :<span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="d-flex gap-1">
                            <input
                                type="file"
                                className="form-control"
                                name="file"
                                id="file"
                                ref={fileRef}
                                onChange={(event) => {
                                    formik.setFieldValue("file", event.currentTarget.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            <button onClick={viewFile}>
                                <RemoveRedEyeIcon />{" "}
                            </button>
                        </div>

                        {formik.errors.file && formik.touched.file ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.file}
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
                            {postLoading ? "Processing..." : "Update"}
                        </Button>
                    </div>

                    {postLoading && (
                        <p
                            className="text-center mt-3"
                            style={{ fontSize: "13px", color: "green" }}
                        >
                            {" "}
                            Please wait while file is uploading...!
                        </p>
                    )}
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

export default FileUploadMissing;
